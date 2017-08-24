/**
 * Created by Jeremy on 2017/1/16.
 */
'use strict';
var router = require("express").Router();
var price = require('../../../../service/airline/price');

//新增费用模板
router.post('/add', function (req, res) {
  var data = req.body;
  data['companyId'] = 10000;
  price.add('', data, function (err, body) {
    return res.json(body);
  });
});

//删除费用模板
router.post('/del', function (req, res) {
  var data = req.body;
  data['companyId'] = 10000;
  price.del('', data, function (err, body) {
    return res.json(body);
  });
});

//更新费用模板
router.post('/update', function (req, res) {
  var data = req.body;
  data['companyId'] = 10000;
  price.update('', data, function (err, body) {
    return res.json(body);
  });
});

//费用模板详情
router.post('/detail', function (req, res) {
  var data = req.body.id;
  price.detail('', data, function (err, body) {
    return res.json(body);
  });
});

//设置默认模板
router.post('/def', function (req, res) {
  var data = req.body;
  data['companyId'] = 10000;
  price.def('', data, function (err, body) {
    return res.json(body);
  });
});

//获取模板列表
router.post('/list', function (req, res) {
  var data = 10000;
  price.list('', data, function (err, body) {
    return res.json(body);
  });
});


module.exports = router;