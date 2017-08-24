"use strict";
var router = require("express").Router()
    , sacService = require('../../../service/sac');
//搜索航空公司
router.post('/list', function (req, res) {
    var data = req.body;
    data['memberId'] = req.session.user.member.memberId;
    sacService.favouriteShop('', data, function (err, body) {
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
//删除数据
router.post('/remove', function (req, res) {
    var data = req.body;
    data['memberId'] = req.session.user.member.memberId;
    sacService.favouriteRemove('', data, function (err, body) {
        console.log(data);
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