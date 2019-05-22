'use strict';

// sending registration data to server
function registration() {
  const regData = {
    'name' : document.getElementById('registration-name').value,
    'email' : document.getElementById('registration-email').value,
    'password' : document.getElementById('registration-password').value
  };
  if (!validator.isEmail(regData.email)) {
    document.getElementById('registration-error').innerHTML = 'такой email адрес не поддерживается';
  } else if (!validator.isAlphanumeric(regData.password)) {
    document.getElementById('registration-error').innerHTML = 'пароль должен содержать только <br> английские буквы и цифры';
  } else if (!validator.isAlphanumeric(regData.name)) {
    document.getElementById('registration-error').innerHTML = 'имя должно содержать только <br> английские буквы и цифры';
  } else {
    $.post( '/registration', regData)
      .done(res => {
        alert(res);
      });
  };
};
