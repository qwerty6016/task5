'use strict';

exports.loginUser = async (obj, crypto, db, secret) => {
  console.log('logging in user...');
  return db.any('SELECT name, password FROM users WHERE email = $1', obj.email)
    .then(data => {
      let result = {};

      // if user with this email is found in database
      if(data[0]) {

        // decrypting password
        const crypto = require('crypto');
        const decipher = crypto.createDecipher('aes192', secret);
        const encrypted = data[0].password;
        let decrypted_password = decipher.update(encrypted, 'hex', 'utf8');
        decrypted_password += decipher.final('utf8');

        // if password from user matches password in database
        if (decrypted_password == obj.password) {
          result.success = true;
          result.name = data[0].name;
          result.email = obj.email;
          return result;
        } else {
          console.log('неверный пароль');
          result.success = false;
          result.error = 'неверный пароль';
          return result;
        };
      } else {
        console.log('неверный email');
        result.success = false;
        result.error = 'неверный email';
        return result;
      };
    })
    .catch(error => {
      console.log('ERROR:', error);
      let result = {};
      result.success = false;
      result.error = 'ошибка сервера';
      return result;
    });
};
