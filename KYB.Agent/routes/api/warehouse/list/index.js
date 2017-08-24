/**
 * Created by Jeremy on 2017/1/16.
 */
'use strict';
var router = require("express").Router();
var list = require('../../../../service/warehouse/list');

//获取仓库列表
router.post('/', function (req, res) {
    var data = req.body;
    data['agentCompanyId'] = req.session.user.agentCompany.companyId;
    list.list('', data, function (err, body) {
        return res.json(body);
    });
});
//添加仓库信息
router.post('/add', function (req, res) {
    var data = req.body;
    data['companyId'] = req.session.user.agentCompany.companyId;
    list.add('', data, function (err, body) {
        return res.json(body);
    });
});
//更新
router.post('/update', function (req, res) {
    var data = req.body;
    data['companyId'] = req.session.user.agentCompany.companyId;
    list.update('', data, function (err, body) {
        return res.json(body);
    });
});
//删除
router.post('/del', function (req, res) {
    var data = req.body;
    list.del('', data.id, function (err, body) {
        return res.json(body);
    });
});
//设为默认
router.post('/def', function (req, res) {
    var data = req.body;
    data['companyId'] = req.session.user.agentCompany.companyId;
    list.def('', data, function (err, body) {
        return res.json(body);
    });
});
module.exports = router;