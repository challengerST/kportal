/**
 * Created by Jeremy on 2016/12/27.
 */
'use strict';
var router = require('express').Router();
var home = require('../../../service/home');

//未报关
router.post('/wbg', function (req, res) {
    var data = {
        companyId: req.session.user.agentCompany.companyId
    };
    home.wbg('', data, function (err, body) {
        return res.json(body);
    });
});

//未进仓
router.post('/wjc', function (req, res) {
    var data = {
        companyId: req.session.user.agentCompany.companyId
    };
    home.wjc('', data, function (err, body) {
        return res.json(body);
    });
});

//今日起飞
router.post('/jrqf', function (req, res) {
    var data = {
        companyId: req.session.user.agentCompany.companyId
    };
    home.jrqf('', data, function (err, body) {
        return res.json(body);
    });
});

//未确认费用
router.post('/wqrfy', function (req, res) {
    var data = {
        companyId: req.session.user.agentCompany.companyId
    };
    home.wqrfy('', data, function (err, body) {
        return res.json(body);
    });
});

//未支付账单
router.post('/wzfzd', function (req, res) {
    var data = {
        companyId: req.session.user.agentCompany.companyId
    };
    home.wzfzd('', data, function (err, body) {
        return res.json(body);
    });
});
module.exports = router;