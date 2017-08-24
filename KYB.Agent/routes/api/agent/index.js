/**
 * Created by Administrator on 2017/8/15.
 */
/**
 * Created by Jeremy on 2017/1/16.
 */
'use strict';
var router = require("express").Router();
var agent = require('../../../service/agent');


//认证审核列表
router.post('/pending', function (req, res) {
    var data = req.body;
    data['pageSize'] = parseInt(data['limit']);
    data['pageIndex'] = Math.floor(parseInt(data.offset / parseInt(data.limit)))+1;
    agent.pending('', data, function (err, body) {
        return res.json(body);
    });
});

//通过/拒绝审核
router.post('/verify', function (req, res) {
    var data = req.body;

    agent.verify('', data, function (err, body) {
        return res.json(body);
    });
});

router.post('/detail', function (req, res) {
    var data = req.body;
    agent.detail('', data, function (err, body) {
        return res.json(body);
    });
});

//检查公司名称
router.post('/check', function (req, res) {
    var data = req.body;
    agent.check('', data, function (err, body) {
        return res.json(body);
    });
});
//认证审核列表
router.post('/list', function (req, res) {
    var data = req.body;
    data['pageSize'] = parseInt(data['limit']);
    data['pageIndex'] = Math.floor(parseInt(data.offset / parseInt(data.limit)))+1;
    agent.list('', data, function (err, body) {
        return res.json(body);
    });
});
module.exports = router;