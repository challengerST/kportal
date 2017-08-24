/**
 * Created by Jeremy on 2016/11/23.
 */
"use strict";

var router = require("express").Router()
    , orderService = require('../../../service/order')
    , vipService = require('../../../service/vip');

//下单请求
router.post('/submit', function (req, res) {
    if ('session' in req && req.session && 'user' in req.session && req.session.user) {
        var data = req.body;
        data['memberId'] = req.session.user.member.memberId;
        orderService.order('', data, function (err, body) {
            if (body && 'resCode' in body) {
                if (body.resCode == 0) {
                    req.session.orderInfo = body.resBody || {};
                }
                return res.json(body);
            } else {
                return res.json({
                    resCode: 1
                    , resMsg: '下单失败，请重试'
                    , resBody: null
                });
            }
        });
    } else {
        return res.json({
            resCode: -100
            , resMsg: '请登录！'
            , resBody: null
        });
    }
});
//快速订舱下单
router.post('/fastSubmit', function (req, res) {
    if ('session' in req && req.session && 'user' in req.session && req.session.user) {
        var data = req.body;
        data['memberId'] = req.session.user.member.memberId;
        orderService.fastSubmit('', data, function (err, body) {
            if (body && 'resCode' in body) {
                if (body.resCode == 0) {
                    req.session.orderInfo = body.resBody || {};
                }
                return res.json(body);
            } else {
                return res.json({
                    resCode: 1
                    , resMsg: '下单失败，请重试'
                    , resBody: null
                });
            }
        });
    } else {
        return res.json({
            resCode: -100
            , resMsg: '请登录！'
            , resBody: null
        });
    }
});
//获取订单数量信息
router.post('/sum', function (req, res) {
    var data = {
        "memberId": req.session.user.member.memberId,
        "companyId": req.session.user.company.companyId,
        "roleId": req.session.user.role.roleId
    };
    orderService.sum('', data, function (err, body) {
        return res.json(body);
    });
});
//获取订单详情
router.post('/orderDetail', function (req, res) {
    var data = req.body;
    data['agentCompanyId'] = 10000;
    vipService.detail('', data, function (err, body) {
        return res.json(body);
    });
});
//获取仓库详情
router.post('/detail', function (req, res) {
    var data = req.body.id;
    orderService.detail('', data, function (err, body) {
        return res.json(body);
    });
});
//查看主单发货人信息

//我要发货的航线详情
router.post('/fhDetail', function (req, res) {
    var data = req.body.id;
    orderService.fhDetail('', data, function (err, body) {
        return res.json(body);
    });
});
//获取订单列表
router.post('/newList', function (req, res) {
    var data = req.body;
    data['memberId'] = req.session.user.member.memberId;
    data['pageSize'] = parseInt(data['limit']);
    data['pageIndex'] = Math.floor(parseInt(data.offset / parseInt(data.limit))) + 1;
    orderService.newList('', data, function (err, body) {
        return res.json(body);
    });
});
//get contactList
router.post('/commonConList', function (req, res) {
    var data = req.body;
    data['memberId'] = req.session.user.member.memberId;
    data['pageSize'] = parseInt(data['limit']);
    data['pageIndex'] = Math.floor(parseInt(data.offset / parseInt(data.limit))) + 1;
    orderService.commonConList('', data, function (err, body) {
        console.log(data);
        return res.json(body);
    });
});
//取消订单
router.post('/refuse', function (req, res) {
    var data = req.body;
    data['memberId'] = req.session.user.member.memberId;
    orderService.refuse('', data, function (err, body) {
        return res.json(body);
    });
});
//确认进仓数据
router.post('/entry', function (req, res) {
    var data = req.body;
    data['memberId'] = req.session.user.member.memberId;
    orderService.entry('', data, function (err, body) {
        return res.json(body);
    });
});
//添加收发货人信息
router.post('/personAdd', function (req, res) {
    var data = req.body;
    data['memberId'] = req.session.user.member.memberId;
    orderService.personAdd('', data, function (err, body) {
        return res.json(body);
    });
});
//分单添加收发货人信息
router.post('/subOrderpersonAdd', function (req, res) {
    var data = req.body;
    data['memberId'] = req.session.user.member.memberId;
    orderService.personAdd('', data, function (err, body) {
        return res.json(body);
    });
});
//改配搜索
router.post('/gpSearch', function (req, res) {
    var data = req.body;
    data['pageSize'] = parseInt(data['limit']);
    data['pageIndex'] = Math.floor(parseInt(data.offset / parseInt(data.limit))) + 1;
    orderService.gpSearch('', data, function (err, body) {
        return res.json(body);
    });
});

//改配申请
router.post('/submitChange', function (req, res) {
    var data = req.body;
    data['memberId'] = req.session.user.member.memberId;
    orderService.submitChange('', data, function (err, body) {
        return res.json(body);
    });
});
//航空公司详情
router.post('/companyDetail', function (req, res) {
    var data = req.body;
    orderService.companyDetail('', data, function (err, body) {
        return res.json(body);
    });
});
//提单确认
router.post('/orderConfirm', function (req, res) {
    var data = req.body;
    data['memberId'] = req.session.user.member.memberId;
    orderService.orderConfirm('', data, function (err, body) {
        return res.json(body);
    });
});
//提单保存
router.post('/orderSave', function (req, res) {
    var data = req.body;
    data['memberId'] = req.session.user.member.memberId;
    console.log(data);
    orderService.orderSave('', data, function (err, body) {
        return res.json(body);
    });
});
//运单跟踪
router.post('/track', function (req, res) {
    var data = req.body.id;
    orderService.track('', data, function (err, body) {
        return res.json(body);
    });
});
//电子预录单
router.post('/declareData', function (req, res) {
    var data = req.body;
    orderService.declareData('', data, function (err, body) {
        return res.json(body);
    });
});
//获取TACT运价
router.post('/tactPrice', function (req, res) {
    var data = req.body;
    orderService.tactPrice('', data, function (err, body) {
        return res.json(body);
    });
});
router.post('/changeName', function (req, res) {
    var data = req.body;
    orderService.changeName('', data, function (err, body) {
        return res.json(body);
    });
});
module.exports = router;