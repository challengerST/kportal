/**
 * Created by Jeremy on 2017/1/16.
 */
'use strict';
var router = require("express").Router();
var account = require('../../../../service/tickets/account');

//货代费用列表
router.post('/list', function (req, res) {
    var data = req.body;
    data['agentCompanyId'] = 10000;
    data['pageSize'] = parseInt(data['limit']);
    data['pageIndex'] = Math.floor(parseInt(data.offset / parseInt(data.limit))) + 1;
    account.list('', data, function (err, body) {
        return res.json(body);
    });
});
//查询账单
router.post('/searchBill', function (req, res) {
    var data = req.body;
    data['agentCompanyId'] = 10000;
    data['pageSize'] = parseInt(data['limit']);
    data['pageIndex'] = Math.floor(parseInt(data.offset / parseInt(data.limit))) + 1;

    account.searchBill('', data, function (err, body) {
        return res.json(body);
    });
});
//生成账单
router.post('/createBill', function (req, res) {
    var data = req.body;
    account.createBill('', data, function (err, body) {
        return res.json(body);
    });
});
//账单详情
router.post('/billDetail', function (req, res) {
    var data = req.body.id;
    account.billDetail('', data, function (err, body) {
        return res.json(body);
    });
});
//批量开张
router.post('/batch', function (req, res) {
    var data = req.body;
    data['pageSize'] = parseInt(data['limit']);
    data['pageIndex'] = Math.floor(parseInt(data.offset / parseInt(data.limit))) + 1;
    account.batch('', data, function (err, body) {
        return res.json(body);
    });
});
//批量生成账单
router.post('/createBatch', function (req, res) {
    var data = req.body;
    data['requestAgentMemberId'] = req.session.user.agentMember.memberId;
    account.createBatch('', data, function (err, body) {
        return res.json(body);
    });
});
//核销账单
router.post('/chargeOff', function (req, res) {
    var data = req.body;
    account.chargeOff('', data, function (err, body) {
        return res.json(body);
    });
});
module.exports = router;