'use strict';

exports.getUsers = async db => {
  return db.any('SELECT id, name FROM users')
    .then(data => {
      let result = [];
      Object.values(data).map(user => {
        result.push(`<tr><td>${user.id}</td><td>${user.name}</td></tr>`)
      });
      return result.join('');
    })
    .catch(error => {
      console.log('ERROR:', error);
      let result = {};
      result.success = false;
      result.error = 'ошибка сервера';
      return result;
    });
};
