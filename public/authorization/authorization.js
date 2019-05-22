'use strict';

// sending login data to server
function login() {
  const loginData = {
    'email' : document.getElementById('login-email').value,
    'password' : document.getElementById('login-password').value
  };
  if (!validator.isEmail(loginData.email)) {
    document.getElementById('login-error').innerHTML = 'неверный email';
  } else if (!validator.isAlphanumeric(loginData.password)) {
    document.getElementById('login-error').innerHTML = 'неверный пароль';
  } else {
    $.post( '/authorization', loginData)
      .done(res => {
        alert(res);
      });
  };
};
