/**
 * Created by Jeremy on 2017/1/16.
 */
'use strict';
var router = require("express").Router();
var tact = require('../../../../service/airline/tact');

//获取Tact运价分页
router.post('/list', function (req, res) {
    var data = req.body;
    data['pageSize'] = parseInt(data['limit']);
    data['pageIndex'] = Math.floor(parseInt(data.offset / parseInt(data.limit))) + 1;
    tact.list('', data, function (err, body) {
        return res.json(body);
    });
});
//详情
router.post('/detail', function (req, res) {
    var data = req.body.code;
    tact.detail('', data, function (err, body) {
        return res.json(body);
    });
});
//新增
router.post('/add', function (req, res) {
    var data = req.body;
    tact.add('', data, function (err, body) {
        return res.json(body);
    });
});
//修改
router.post('/update', function (req, res) {
    var data = req.body;
    tact.update('', data, function (err, body) {
        return res.json(body);
    });
});

module.exports = router;