/**
 * Created by Jeremy on 2017/1/16.
 */
'use strict';
var router = require("express").Router();
var invoice = require('../../../../service/tickets/invoice');

//开票列表
router.post('/list', function (req, res) {
    var data = req.body;
    data['agentCompanyId'] = req.session.user.agentCompany.companyId;
    data['roleId'] = req.session.user.roleInfo.roleId;
    //data['agentId'] = req.session.user.agentMember.memberId;
    data['agentId'] = 0;
    data['pageSize'] = parseInt(data['limit']);
    data['pageIndex'] = Math.floor(parseInt(data.offset / parseInt(data.limit))) + 1;
    invoice.list('', data, function (err, body) {
        return res.json(body);
    });
});
//开票详情
router.post('/detail', function (req, res) {
    var data = req.body.id;
    invoice.detail('', data, function (err, body) {
        return res.json(body);
    });
});
//更新
router.post('/update', function (req, res) {
    var data = req.body;
    data['companyId'] = req.session.user.agentCompany.companyId;
    data['roleId'] = req.session.user.roleInfo.roleId;
    data['agentId'] = req.session.user.agentMember.memberId;
    invoice.update('', data, function (err, body) {
        return res.json(body);
    });
});
//仓库费用列表
router.post('/wareHouse', function (req, res) {
    var data = req.body;
    data['pageSize'] = parseInt(data['limit']);
    data['pageIndex'] = Math.floor(parseInt(data.offset / parseInt(data.limit))) + 1;
    invoice.wareHouse('', data, function (err, body) {
        return res.json(body);
    });
});
//仓库费用列表
router.post('/declare', function (req, res) {
    var data = req.body;
    data['pageSize'] = parseInt(data['limit']);
    data['pageIndex'] = Math.floor(parseInt(data.offset / parseInt(data.limit))) + 1;
    invoice.declare('', data, function (err, body) {
        return res.json(body);
    });
});
module.exports = router;