/**
 * Created by Jeremy on 2017/1/16.
 */
'use strict';
var router = require("express").Router();
var maintenance = require('../../../../service/airline/maintenance');
var fs = require('fs');
//添加根节点
router.post('/root', function (req, res) {
    var data = req.body;
    maintenance.root('', data, function (err, body) {
        return res.json(body);
    });
});
//添加新节点
router.post('/add', function (req, res) {
    var data = req.body.data;
    fs.writeFile('./data.json', data, 'utf8', function () {
        // 保存完成后的回调函数
        console.log("保存完成");
    });
    maintenance.add('', data, function (err, body) {
        return res.json(body);
    });
});
//获取节点树
router.post('/tree', function (req, res) {
    var data = req.body;
    maintenance.tree('', data, function (err, body) {
        return res.json(body);
    });
});
//删除节点
router.post('/del', function (req, res) {
    var data = req.body;
    maintenance.del('', data, function (err, body) {
        return res.json(body);
    });
});
//获取详情
router.post('/detail', function (req, res) {
    var data = req.body;
    maintenance.detail('', data, function (err, body) {
        return res.json(body);
    });
});
//更新数据
router.post('/update', function (req, res) {
    var data = req.body.data;
    //for (var d in data) {
    //    if (data.hasOwnProperty(d)) {
    //        data[d].flightDay = JSON.parse(data[d].flightDay);
    //        data[d].childNodes = JSON.parse(data[d].childNodes);
    //    }
    //}
    //var str_json = JSON.stringify(data);
    //
    //fs.writeFile('./data1.json', data, 'utf8', function () {
    //    // 保存完成后的回调函数
    //    console.log("保存完成");
    //});

    maintenance.update('', data, function (err, body) {
        return res.json(body);
    });
});
//航线发布
router.post('/publish', function (req, res) {
    var data = req.body;
    data['companyId'] = req.session.user.agentCompany.companyId;
    maintenance.publish('', data, function (err, body) {
        return res.json(body);
    });
});
//获取机场名称
router.post('/getName', function (req, res) {
    var data = req.body;
    maintenance.getName('', data, function (err, body) {
        return res.json(body);
    });
});
//获取航空公司代码
router.post('/getCode', function (req, res) {
    var data = req.body;
    maintenance.getCode('', data, function (err, body) {
        return res.json(body);
    });
});
module.exports = router;