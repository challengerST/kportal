/**
 * Created by Jeremy on 2017/1/16.
 */
'use strict';
var router = require("express").Router();
var cash = require('../../../../service/tickets/cash');

//公司数据
router.post('/sum', function (req, res) {
    cash.sum('', req.body.id, function (err, body) {
        return res.json(body);
    });
});
//返现记录
router.post('/history', function (req, res) {
    var data = req.body;
    cash.history('', data, function (err, body) {
        return res.json(body);
    });
});
//确认返现
router.post('/ensure', function (req, res) {
    var data = req.body;
    data['operatorId'] = req.session.user.agentMember.memberId;
    cash.ensure('', data, function (err, body) {
        return res.json(body);
    });
});
//查询返现列表
router.post('/list', function (req, res) {
    var data = req.body;
    data['pageSize'] = parseInt(data['limit']);
    data['pageIndex'] = Math.floor(parseInt(data.offset / parseInt(data.limit))) + 1;
    cash.list('', data, function (err, body) {
        return res.json(body);
    });
});
//更改状态
router.post('/state', function (req, res) {
    var data = req.body;
    data['operatorId'] = req.session.user.agentMember.memberId;
    cash.state('', data, function (err, body) {
        return res.json(body);
    });
});
module.exports = router;