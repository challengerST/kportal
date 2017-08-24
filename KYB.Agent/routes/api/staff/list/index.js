/**
 * Created by Jeremy on 2017/1/16.
 */
'use strict';
var router = require("express").Router();
var list = require('../../../../service/staff/list');

//员工列表
router.post('/list', function (req, res) {
    var data = req.body;
    data['companyId'] = req.session.user.agentCompany.companyId;
    data['pageSize'] = parseInt(data['limit']);
    data['pageIndex'] = Math.floor(parseInt(data.offset / parseInt(data.limit))) + 1;

    list.list('', data, function (err, body) {
        return res.json(body);
    });
});
//操作员列表
router.post('/opList', function (req, res) {
    var data = req.body;
    data['companyId'] = req.session.user.agentCompany.companyId;
    list.opList('', data, function (err, body) {
        return res.json(body);
    });
});
//新增员工
router.post('/add', function (req, res) {
    var data = req.body;
    data['agentMemberId'] = req.session.user.agentMember.memberId;
    data['companyId'] = req.session.user.agentCompany.companyId;
    list.add('', data, function (err, body) {
        return res.json(body);
    });
});
//批量启用&禁用
router.post('/multiStates', function (req, res) {
    var data = req.body;
    data['requestAgentMemberId'] = req.session.user.agentMember.memberId;
    list.multiStates('', data, function (err, body) {
        return res.json(body);
    });
});
//获取用户订单列表
router.post('/orders', function (req, res) {
    var data = req.body;
  
    data['pageSize'] = parseInt(data['limit']);
    data['pageIndex'] = Math.floor(parseInt(data.offset / parseInt(data.limit))) + 1;
    list.orders('', data, function (err, body) {
        return res.json(body);
    });
});
//更新用户角色
router.post('/update', function (req, res) {
    var data = req.body;
    data['requestAgentMemberId'] = req.session.user.agentMember.memberId;
    list.update('', data, function (err, body) {
        return res.json(body);
    });
});
//transfer
router.post('/transfer', function (req, res) {
    var data = req.body;
    data['requireMeberId'] = req.session.user.agentMember.memberId;
    data['companyId'] = req.session.user.agentCompany.companyId;
    list.transfer('', data, function (err, body) {
        return res.json(body);
    });
});
//批量删除
router.post('/del', function (req, res) {
    var data = req.body;
    data['operatorId'] = req.session.user.agentMember.memberId;
    list.del('', data, function (err, body) {
        return res.json(body);
    });
});
//批量重置密码
router.post('/reset', function (req, res) {
    var data = req.body;
    data['operatorId'] = req.session.user.agentMember.memberId;
    list.reset('', data, function (err, body) {
        return res.json(body);
    });
});
module.exports = router;