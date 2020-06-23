'use strict';

const express = require('express');
const app = express();
const router = require('express').Router();
const mysql = require('mysql');

// mysqlに接続
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'choko7'
});

con.connect(function (err) {
  if (err) throw err;
  else console.log('接続できました');
});

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  res.send('はじめまして');
});

app.use('/', router);
app.listen(app.get('port'), () => {
  console.log(`port${app.get('port')}を監視しています`);
});
