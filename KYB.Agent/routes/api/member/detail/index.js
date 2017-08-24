/**
 * Created by Jeremy on 2017/1/16.
 */
'use strict';
var router = require("express").Router();
var detail = require('../../../../service/member/detail');

//设置信用额度
router.post('/credit', function (req, res) {
  var data = req.body;
  detail.credit('', data, function (err, body) {
    return res.json(body);
  });
});

//设置等级
router.post('/level', function (req, res) {
  var data = req.body;
  detail.level('', data, function (err, body) {
    return res.json(body);
  });
});

//更新
router.post('/update', function (req, res) {
  var data = req.body;
  detail.update('', data, function (err, body) {
    return res.json(body);
  });
});
//获取图片资料
router.post('/img', function (req, res) {
  var data = req.body.id;
  detail.img('', data, function (err, body) {
    return res.json(body);
  });
});
//获取开票资料
router.post('/invoiceList', function (req, res) {
  var data = req.body.id;
  detail.list('', data, function (err, body) {
    return res.json(body);
  });
});
//删除图片资料
router.post('/removeImg', function (req, res) {
  var data = req.body;
  detail.removeImg('', data, function (err, body) {
    return res.json(body);
  });
});
module.exports = router;