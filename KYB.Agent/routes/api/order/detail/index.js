/**
 * Created by Jeremy on 2017/1/16.
 */
'use strict';
var router = require("express").Router();
var detail = require('../../../../service/order/detail');
var fs = require('fs');
//订单详情
router.post('/', function (req, res) {
    var data = req.body;
    data['agentCompanyId'] = 10000;
    detail.detail('', data, function (err, body) {
        return res.json(body);
    });
});
//添加订单附件
router.post('/add', function (req, res) {
    var data = req.body;
    detail.add('', data, function (err, body) {
        return res.json(body);
    });
});
//删除订单附件
router.post('/remove', function (req, res) {
    var data = req.body;
    detail.remove('', data, function (err, body) {
        return res.json(body);
    });
});
//订单附件列表
router.post('/list', function (req, res) {
    var data = req.body;
    detail.list('', data, function (err, body) {
        return res.json(body);
    });
});
//获取公司详情
router.post('/company', function (req, res) {
    var data = req.body.id;
    detail.company('', data, function (err, body) {
        return res.json(body);
    });
});
//更新报关状态
router.post('/changeState', function (req, res) {
    var data = req.body;
    data['agentId'] = req.session.user.agentMember.memberId;
    detail.changeState('', data, function (err, body) {
        return res.json(body);
    });
});
//运单跟踪
router.post('/track', function (req, res) {
    var data = req.body.id;
    detail.track('', data, function (err, body) {
        return res.json(body);
    });
});
//进仓数据更新
router.post('/updateData', function (req, res) {
    var data = req.body;
    //var str_json = JSON.stringify(data);
    //fs.writeFile('./data1.json', str_json, 'utf8', function () {
    //    // 保存完成后的回调函数
    //    console.log("保存完成");
    //});
    detail.updateData('', data, function (err, body) {
        return res.json(body);
    });
});
//获取TACT运价
router.post('/tactPrice', function (req, res) {
    var data = req.body;
    detail.tactPrice('', data, function (err, body) {
        return res.json(body);
    });
});
//电子预录单
router.post('/declareData', function (req, res) {
    var data = req.body;
    detail.declareData('', data, function (err, body) {
        return res.json(body);
    });
});
//添加收发货人信息
router.post('/personAdd', function (req, res) {
    var data = req.body;
    detail.personAdd('', data, function (err, body) {
        return res.json(body);
    });
});
//搜索收发货人信息
router.post('/contactList', function (req, res) {
    var data = req.body;
    data['keyword'] = data['key'];
    data['pageSize'] = parseInt(data['limit']);
    data['pageIndex'] = Math.floor(parseInt(data.offset / parseInt(data.limit))) + 1;
    detail.contactList('', data, function (err, body) {
        return res.json(body);
    });
});
//添加收发货人信息
router.post('/subData', function (req, res) {
    var data = req.body.id;
    detail.subData('', data, function (err, body) {
        return res.json(body);
    });
});
//保存提单
router.post('/ladingSave', function (req, res) {
    detail.ladingSave('', req.body, function (err, body) {
        return res.json(body);
    });
});
//获取新分单号
router.post('/NewSubNum', function (req, res) {
    var data = req.body;
    detail.NewSubNum('', data, function (err, body) {
        return res.json(body);
    });
});
//创建新分单
router.post('/newStorage', function (req, res) {
    var data = req.body;
    detail.newStorage('', data, function (err, body) {
        return res.json(body);
    });
});
router.post('/addStorage', function (req, res) {
    var data = req.body;
    detail.addStorage('', data, function (err, body) {
        return res.json(body);
    });
});
router.post('/moveStorage', function (req, res) {
    var data = req.body;
    detail.moveStorage('', data, function (err, body) {
        return res.json(body);
    });
});
router.post('/changeName', function (req, res) {
    var data = req.body;
    detail.changeName('', data, function (err, body) {
        return res.json(body);
    });
});
module.exports = router;