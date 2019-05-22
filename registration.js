'use strict';

exports.registerUser = async (regData, crypto, db, secret) => {
  console.log('registering new user...');

  // encrypting password
  const cipher = crypto.createCipher('aes192', secret);
  let encrypted = cipher.update(regData.password, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  regData.password = encrypted;

  return db.one('INSERT INTO users(email, name, password) VALUES($1, $2, $3) RETURNING id', [regData.email, regData.name, regData.password])
    .then(data => {
      let result = {};
      console.log('user registered successfully, id:', data.id);
      result.success = true;
      result.name = regData.name;
      result.email = regData.email;
      return result;
    })
    .catch(error => {
      console.log('ERROR:', error);
      let result = {};
      result.success = false;
      result.error = 'ошибка сервера';
      return result;
    });
};
