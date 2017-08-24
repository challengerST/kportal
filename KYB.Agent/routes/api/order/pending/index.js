/**
 * Created by Jeremy on 2017/1/16.
 */
'use strict';
var router = require("express").Router();
var pending = require('../../../../service/order/pending');

//待处理列表
router.post('/list', function (req, res) {
    var data = req.body;
    data['agentCompanyId'] = req.session.user.agentCompany.companyId;
    data['agentMemberId'] = req.session.user.agentMember.memberId;
    data['pageSize'] = parseInt(data['limit']);
    data['pageIndex'] = Math.floor(parseInt(data.offset / parseInt(data.limit))) + 1;
    pending.list('', data, function (err, body) {
        return res.json(body);
    });
});
//添加进仓数据
router.post('/addData', function (req, res) {
    var data = req.body;
    pending.addData('', data, function (err, body) {
        return res.json(body);
    });
});
//获取进仓数据
router.post('/storage', function (req, res) {
    var data = req.body.id;
    pending.storage('', data, function (err, body) {
        return res.json(body);
    });
});
//添加进仓数据
router.post('/ensureData', function (req, res) {
    var data = req.body;
    data['memberId'] = 10000;
    pending.ensureData('', data, function (err, body) {
        return res.json(body);
    });
});
//更新报关状态
router.post('/bgUpdate', function (req, res) {
    var data = req.body;
    pending.bgUpdate('', data, function (err, body) {
        return res.json(body);
    });
});
//航线搜索
router.post('/airlineSearch', function (req, res) {
    var data = req.body;
    data['pageSize'] = parseInt(req.body['limit']);
    data['pageIndex'] = Math.floor(parseInt(req.body.offset / parseInt(req.body.limit))) + 1;
    pending.airlineSearch('', data, function (err, body) {
        return res.json(body);
    });
});
//计算运费
router.post('/calculate', function (req, res) {
    var data = req.body;
    pending.calculate('', data, function (err, body) {
        return res.json(body);
    });
});
//搜索客户
router.post('/customer', function (req, res) {
    var data = req.body;
    pending.customer('', data, function (err, body) {
        return res.json(body);
    });
});
//提交订单
router.post('/order', function (req, res) {
    var data = req.body;
    data['agentCompanyId'] = req.session.user.agentCompany.companyId;
    data['agentId'] = req.session.user.agentMember.memberId;
    pending.order('', data, function (err, body) {
        return res.json(body);
    });
});
//取消订单
router.post('/cancel', function (req, res) {
    var data = req.body;
    data['memberId'] = req.session.user.agentMember.memberId;
    pending.cancel('', data, function (err, body) {
        return res.json(body);
    });
});
//接单
router.post('/confirm', function (req, res) {
    var data = req.body;
    data['memberId'] = req.session.user.agentMember.memberId;
    pending.confirm('', data, function (err, body) {
        return res.json(body);
    });
});
//搜索运单
router.post('/ydSearch', function (req, res) {
    var data = req.body;
    pending.ydSearch('', data, function (err, body) {
        return res.json(body);
    });
});
//关联已有运单
router.post('/ydExist', function (req, res) {
    var data = req.body;
    pending.ydExist('', data, function (err, body) {
        return res.json(body);
    });
});
//关联新运单
router.post('/ydNew', function (req, res) {
    var data = req.body;
    data['memberId'] = req.session.user.agentMember.memberId;
    pending.ydNew('', data, function (err, body) {
        return res.json(body);
    });
});
//操作日志
router.post('/log', function (req, res) {
    var data = req.body.id;
    pending.log('', data, function (err, body) {
        return res.json(body);
    });
});
//获取员工列表
router.post('/member', function (req, res) {
    var data = req.body;
    pending.member('', data, function (err, body) {
        return res.json(body);
    });
});
module.exports = router;