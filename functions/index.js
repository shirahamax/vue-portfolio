const functions = require('firebase-functions');

// expressによるモジュール化
const express = require('express');
const app = express();
const cors = require('cors');
const HOSTING_URL = ['https://shirahamax-portfolio.web.app/', 'http://localhost:8080']
app.use(cors({
  origin: HOSTING_URL // 指定したhostのみ許可
}));

// 共通の処理：クライアントの制限（直接開けないようにする）
app.use((req, res, next) => {
  const reqHost = req.headers.origin;
  if (HOSTING_URL.indexOf(reqHost) === -1) {
    res.status(403).send('Invalid host');
  }
  next();
});

// 返却データ
const items = require('./data/all.json')
const categories = require('./data/categories.json')

/* URLの定義・export  */
app.get('/items', getItems);
app.get('/items/:id', getItemDetail);
app.get('/categories', getCategories);
exports.shop = functions.region('asia-northeast1').https.onRequest(app);

/***** 関数の定義群 ***************************************************************/
// 全てのアイテムを返す
function getItems(req, res) {
  res.status(200).send(items);
  return;
}
// カテゴリーリスト
function getCategories(req, res) {
  res.status(200).send(categories);
  return;
}
// idに一致するitemを返す
function getItemDetail(req, res) {
  const itemId = req.params.id;
  const itemArr = items.data
  const item = itemArr.filter((item) => {
    return item.id == itemId
  })
  res.status(200).send(item[0]);
  return;
}