/**
 * Created by Jeremy on 2017/1/16.
 */
'use strict';
var router = require("express").Router();
var underway = require('../../../../service/order/underway');

//搜索会员列表
router.post('/list', function (req, res) {
    var data = req.body;
    data['agentCompanyId'] = req.session.user.agentCompany.companyId;
    data['agentMemberId'] = req.session.user.agentMember.memberId;
    data['pageSize'] = parseInt(data['limit']);
    data['pageIndex'] = Math.floor(parseInt(data.offset / parseInt(data.limit))) + 1;
    underway.list('', data, function (err, body) {
        return res.json(body);
    });
});
//更新航班信息、起飞时间
router.post('/update', function (req, res) {
    var data = req.body;
    data['memberId'] = req.session.user.agentMember.memberId;
    underway.update('', data, function (err, body) {
        return res.json(body);
    });
});
//更新航班信息、起飞时间
router.post('/pmxg', function (req, res) {
    var data = req.body;
    data['memberId'] = req.session.user.agentMember.memberId;
    underway.pmxg('', data, function (err, body) {
        return res.json(body);
    });
});
//报关
router.post('/bg', function (req, res) {
    var data = req.body;
    underway.bg('', data, function (err, body) {
        return res.json(body);
    });
});
//查验
router.post('/cy', function (req, res) {
    var data = req.body;
    underway.cy('', data, function (err, body) {
        return res.json(body);
    });
});
//运输
router.post('/ys', function (req, res) {
    var data = req.body;
    underway.ys('', data, function (err, body) {
        return res.json(body);
    });
});
//改配
router.post('/gp', function (req, res) {
    var data = req.body;
    underway.gp('', data, function (err, body) {
        return res.json(body);
    });
});
module.exports = router;