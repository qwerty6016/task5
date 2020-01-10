'use strict';

require('dotenv').config();
const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const send = require('koa-send');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const crypto = require('crypto');
const validator = require('validator');
const pgp = require('pg-promise')();
const db = pgp(process.env.DATABASE_URL);
const secret = process.env.PASSWORD_SECRET;
const PORT = process.env.PORT || 3000;

const authorization = require('./authorization');
const registration = require('./registration');
const users = require('./users');

db.none('CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, email TEXT UNIQUE NOT NULL, name TEXT NOT NULL, password TEXT NOT NULL)');

app
  .use(serve('./public'))
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

router
  .get('/', async ctx => {
    await send(ctx, '/public/index.html');
  })
  .get('/task1', async ctx => {
    await send(ctx, '/public/task1/task1.html');
  })
  .get('/task2', async ctx => {
    await send(ctx, '/public/task2/task2.html');
  })
  .get('/task3', async ctx => {
    await send(ctx, '/public/task3/task3.html');
  })
  .get('/task4', async ctx => {
    await send(ctx, '/public/task4/task4.html');
  })
  .get('/authorization', async ctx => {
    await send(ctx, '/public/authorization/authorization.html');
  })
  .get('/registration', async ctx => {
    await send(ctx, '/public/registration/registration.html');
  })
  .get('/questionnaire', async ctx => {
    await send(ctx, '/public/questionnaire/questionnaire.html');
  })
  .get('/users', async ctx => {
    await Promise.resolve(users.getUsers(db))
      .then(result => {
        // send to client page with table of users
        ctx.body = `<title>Пользователи</title>
          <p><a href="/">На главную</a></p>
          <table><tr><th>id</th><th>имя</th></tr>${result}</table>`;
      })
  })
  .post('/authorization', async ctx => {
    let requestBody = ctx.request.body;

    if (!validator.isEmail(requestBody.email)) {
      ctx.body = 'неверный email';
    } else if (!validator.isAlphanumeric(requestBody.password)) {
      ctx.body = 'неверный пароль';
    } else {
      await Promise.resolve(authorization.loginUser(requestBody, crypto, db, secret))
        .then(result => {
          if (result.success === true) {
            console.log('user logged in successfully');
            ctx.body = 'вход на сайт выполнен успешно';
          } else {
            console.log(result);
            ctx.body = result.error;
          };
        });
    };
  })
  .post('/registration', async ctx => {
    let requestBody = ctx.request.body;

    if (!validator.isEmail(requestBody.email)) {
      ctx.body = 'такой email адрес не поддерживается';
    } else if (!validator.isAlphanumeric(requestBody.name)) {
      ctx.body = 'пароль должен содержать только <br> английские буквы и цифры';
    } else if (!validator.isAlphanumeric(requestBody.password)) {
      ctx.body = 'имя должно содержать только <br> английские буквы и цифры';
    } else {
      await Promise.resolve(registration.registerUser(requestBody, crypto, db, secret))
        .then(result => {
          if (result.success === true) {
            console.log('user registered successfully');
            ctx.body = 'пользователь успешно зарегистрирован';
          } else {
            ctx.body = result.error;
          };
        });
    };
  });

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
