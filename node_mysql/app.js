'use strict';

const path = require('path');
const express = require('express');
const router = require('express').Router();
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const layouts = require('express-ejs-layouts');

app.use(layouts);
app.set('view engine', 'ejs');

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({ extended: true }));

// mysql > database: 'db_test',db_testに接続
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'choko7',
  database: 'db_test'
});

con.connect(function (err) {
  if (err) throw err;
  console.log('接続できました');
});

app.router('/', (req, res) =>
  res.sendFile(path.join(__dirname, './index.html')));
app.post('/', (req, res) => {
  const sql = 'INSERT INTO users SET ?';
  con.query(sql, req.body, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send('登録が完了しました');
  });
});

/*****/
app.router('/', (req, res) => {
  const sql = 'select * from users';
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.render('index', { users: result });
  });
});

app.use('/', router);
app.listen(app.get('port'), () => {
  console.log(`port${app.get('port')}を監視しています`);
});

/* // mysqlに接続
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'choko7',
});

// DB作成コード
con.connect(function (err) {
  if (err) throw err;
  console.log('接続できました');
  con.query('CREATE DATABASE db_test', function (err, result) {
    if (err) throw err;
    console.log('database created');
  });
});

// テーブル作成(テーブル名:user, id, name, emailの3つの列, idはオートインクリメントで1つずつ増える整数でプライマリキーに設定, 残りの2つのname, emailはVARCHARでNOT NULLを設定)
con.connect(function (err) {
  if (err) throw err;
  console.log('Connected');
  const sql = 'CREATE TABLE users (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL)';
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log('table created');
  });
});

// テーブルの内容を参照
con.connect(function (err) {
  if (err) throw err;
  console.log('Connected');
  const sql = 'select * from users';
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});

// レコードにデータを追加①
con.connect(function (err) {
  if (err) throw err;
  console.log('Connected');
  const sql = 'INSERT INTO users set ?';
  con.query(sql, { name: 'choko', email: 'c@gmail.com' }, function (err, response) {
    if (err) throw err;
    console.log(response);
  });
});

// レコードにデータを追加②
con.connect(function (err) {
  if (err) throw err;
  console.log('Connected');
});
const sql = "INSERT INTO users(name, email) VALUES( 'puku', 'p@gmail.com' )";
con.query(sql, function (err, result, fields) {
  if (err) throw err;
  console.log(result);
});

// Webにjson形式で表示
app.get('/', (request, response) => {
  const sql = 'select * from users';
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    response.send(result);
  });
});

// POSTからメールの情報をDBに保存
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './index.html')));
app.post('/', (req, res) => {
  const sql = 'INSERT INTO users SET ?'

  con.query(sql, req.body, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send('登録が完了しました');
  });
});

*/
