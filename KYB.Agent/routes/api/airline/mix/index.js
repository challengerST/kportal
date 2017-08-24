/**
 * Created by Jeremy on 2017/1/16.
 */
'use strict';
var router = require("express").Router();
var mix = require('../../../../service/airline/mix');

//拼货列表
router.post('/list', function (req, res) {
    var data = req.body;
    data['pageSize'] = parseInt(data['limit']);
    data['pageIndex'] = Math.floor(parseInt(data.offset / parseInt(data.limit))) + 1;
    mix.list('', data, function (err, body) {
        return res.json(body);
    });
});

//航线搜索
router.post('/search', function (req, res) {
    var data = req.body;
    mix.search('', data, function (err, body) {
        return res.json(body);
    });
});

//新增拼货
router.post('/add', function (req, res) {
    var data = req.body;
    mix.add('', data, function (err, body) {
        return res.json(body);
    });
});

//更新拼货
router.post('/update', function (req, res) {
    var data = req.body;
    mix.update('', data, function (err, body) {
        return res.json(body);
    });
});
module.exports = router;