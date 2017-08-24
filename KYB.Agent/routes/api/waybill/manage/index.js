/**
 * Created by Jeremy on 2017/1/16.
 */
'use strict';
var router = require("express").Router();
var manage = require('../../../../service/waybill/manage');

//获取仓库列表
router.post('/list', function (req, res) {
  var data = req.body;
  data['companyId'] = 10000;
  data['pageSize'] = parseInt(data['limit']);
  data['pageIndex'] = Math.floor(parseInt(data.offset / parseInt(data.limit))) + 1;
  manage.list('', data, function (err, body) {
    return res.json(body);
  });
});
//检车运单号
router.post('/check', function (req, res) {
  var data = req.body;
  data['companyId'] = 10000;
  manage.check('', data, function (err, body) {
    return res.json(body);
  });
});
//添加运单号
router.post('/add', function (req, res) {
  var data = req.body;
  data['companyId'] = 10000;
  manage.add('', data, function (err, body) {
    return res.json(body);
  });
});
//删除运单
router.post('/del', function (req, res) {
  var data = req.body.id;
  manage.del('', data, function (err, body) {
    return res.json(body);
  });
});
//获取详情
router.post('/detail', function (req, res) {
  var data = req.body.id;
  manage.detail('', data, function (err, body) {
    return res.json(body);
  });
});
//更新
router.post('/update', function (req, res) {
  var data = req.body;
  data['companyId'] = 10000;
  manage.update('', data, function (err, body) {
    return res.json(body);
  });
});
//汇总统计
router.post('/collect', function (req, res) {
  var data = 10000;
  manage.collect('', data, function (err, body) {
    return res.json(body);
  });
});
//运单状态
router.post('/state', function (req, res) {
  var data = req.body;
  data['companyId'] = 10000;
  data['pageSize'] = parseInt(data['limit']);
  data['pageIndex'] = Math.floor(parseInt(data.offset / parseInt(data.limit))) + 1;
  manage.state('', data, function (err, body) {
    return res.json(body);
  });
});
module.exports = router;