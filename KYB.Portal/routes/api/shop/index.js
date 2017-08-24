"use strict";

var router = require("express").Router()
    , shopService = require('../../../service/shop');
//搜索航空公司
router.post('/add', function (req, res) {
    var data = req.body;
    data['memberId'] = req.session.user.member.memberId;
    console.log(data);
    shopService.favouriteAdd('', data, function (err, body) {
        console.log(body);
        if (body && typeof body === 'object' && 'resCode' in body) {
            return res.json(body);
        } else {
            return res.json({
                resCode: 1
                , resMsg: '收藏失败，请重试'
                , resBody: null
            });
        }
    })
});
router.post('/', function (req, res) {
    var data = req.body;
    data['memberId'] = req.session.user.member.memberId;
    console.log(data);
    shopService.favouriteAdd('', data, function (err, body) {
        console.log(body);
        if (body && typeof body === 'object' && 'resCode' in body) {
            return res.json(body);
        } else {
            return res.json({
                resCode: 1
                , resMsg: '收藏失败，请重试'
                , resBody: null
            });
        }
    })
});
module.exports = router;