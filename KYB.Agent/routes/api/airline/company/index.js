/**
 * Created by Jeremy on 2017/1/16.
 */
'use strict';
var router = require("express").Router();
var company = require('../../../../service/airline/company');

//新增费用模板
router.post('/add', function (req, res) {
    var data = req.body;
    data['companyId'] = req.session.user.agentCompany.companyId;
    company.add('', data, function (err, body) {
        return res.json(body);
    });
});
//获取列表
router.post('/list', function (req, res) {
    var data = req.body;
    data['agentCompanyId'] = req.session.user.agentCompany.companyId;
    company.list('', data, function (err, body) {
        return res.json(body);
    });
});
//删除
router.post('/del', function (req, res) {
    var data = req.body;
    data['companyId'] = req.session.user.agentCompany.companyId;
    company.del('', data, function (err, body) {
        return res.json(body);
    });
});
//详情
router.post('/detail', function (req, res) {
    var data = req.body.id;
    company.detail('', data, function (err, body) {
        return res.json(body);
    });
});
//更新
router.post('/update', function (req, res) {
    var data = req.body;
    data['companyId'] = req.session.user.agentCompany.companyId;
    company.update('', data, function (err, body) {
        return res.json(body);
    });
});
//添加文件
router.post('/addFile', function (req, res) {
    var data = req.body;
    data['agentCompanyId'] = req.session.user.agentCompany.companyId;
    company.addFile('', data, function (err, body) {
        return res.json(body);
    });
});
//删除文件
router.post('/delFile', function (req, res) {
    var data = req.body;
    data['agentCompanyId'] = req.session.user.agentCompany.companyId;
    company.delFile('', data, function (err, body) {
        return res.json(body);
    });
});
module.exports = router;