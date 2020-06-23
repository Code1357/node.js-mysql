'use strict';

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');

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

// 登録フォーム表示経路(index.htmlのフォームを表示)
app.get('/create', (req, res) =>
  res.sendFile(path.join(__dirname, './index.html')));

// 登録処理経路(index.htmlから受けたPOSTリクエストを処理)
app.post('/', (req, res) => {
  const sql = 'INSERT INTO users SET ?';
  con.query(sql, req.body, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.redirect('/');
  });
});

// ユーザーリスト表示経路(index.ejsに値を渡す)
app.get('/', (req, res) => {
  const sql = 'select * from users';
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.render('index', { users: result });
  });
});

// 削除処理経路(index.ejsからの経路)
app.get('/delete/:id', (req, res) => {
  const sql = 'DELETE FROM users WHERE id = ?';
  con.query(sql, [req.params.id], function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.redirect('/');
  });
});

// 更新フォーム経路(index.ejsからの経路 -> edit.jsに値を渡す)
app.get('/edit/:id', (req, res) => {
  const sql = 'SELECT * FROM users WHERE id = ?';
  con.query(sql, [req.params.id], function (err, result, fields) {
    if (err) throw err;
    res.render('edit', { user: result });
  });
});

// 更新処理経路(edit.ejsからの経路)
app.post('/update/:id', (req, res) => {
  const sql = 'UPDATE users SET ? WHERE id = ' + req.params.id;
  con.query(sql, req.body, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.redirect('/');
  });
});

app.listen(app.get('port'), () => {
  console.log(`port${app.get('port')}を監視しています`);
});

/*

// mysqlに接続
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

*/
