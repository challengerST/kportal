/**
 * Created by Jeremy on 2017/1/16.
 */
'use strict';
var router = require("express").Router();
var expense = require('../../../../service/tickets/expense');

//货代费用列表
router.post('/list', function (req, res) {
    var data = req.body;
    data['angentId'] = 10000;
    data['pageSize'] = parseInt(data['limit']);
    data['pageIndex'] = Math.floor(parseInt(data.offset / parseInt(data.limit))) + 1;
    expense.list('', data, function (err, body) {
        return res.json(body);
    });
});
//获取详情
router.post('/detail', function (req, res) {
    var data = req.body.id;
    expense.detail('', data, function (err, body) {
        return res.json(body);
    });
});
//更新费用
router.post('/update', function (req, res) {
    var data = req.body;
    expense.update('', data, function (err, body) {
        return res.json(body);
    });
});
//确认费用
router.post('/ensure', function (req, res) {
    var data = req.body;
    expense.ensure('', data, function (err, body) {
        return res.json(body);
    });
});
//仓库费用和报关费用
router.post('/exPrice', function (req, res) {
    var data = req.body.id;
    expense.exPrice('', data, function (err, body) {
        return res.json(body);
    });
});

module.exports = router;