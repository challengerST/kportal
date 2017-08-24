/**
 * Created by Auser on 2016/11/29.
 */
var router = require("express").Router()
    , mix = require('../../../service/mix');

//获取拼货公司
router.post('/company', function (req, res) {
    var body = req.body;
    mix.company('', body, function (err, body) {
        if (body && 'resCode' in body && body.resCode == 0) {
            return res.json(body);
        } else {
            return res.json({
                resCode: 1,
                resMsg: '获取列表失败，请重试',
                resBody: null
            });
        }
    });
});
//获取拼货规则
router.post('/search', function (req, res) {
    var body = req.body;
    mix.search('', body, function (err, body) {
        if (body && 'resCode' in body && body.resCode == 0) {
            return res.json(body);
        } else {
            return res.json({
                resCode: 1,
                resMsg: '获取失败，请重试',
                resBody: null
            });
        }
    });
});
//计算拼货价格
router.post('/price', function (req, res) {
    var body = req.body;
    mix.price('', body, function (err, body) {
        if (body && 'resCode' in body && body.resCode == 0) {
            return res.json(body);
        } else {
            return res.json({
                resCode: 1,
                resMsg: '获取失败，请重试',
                resBody: null
            });
        }
    });
});
//计算拼货价格
router.post('/submit', function (req, res) {
    if ('session' in req && req.session && 'user' in req.session && req.session.user) {
        var body = req.body
            , user = req.session.user;
        body['memberId'] = user.member.memberId;
        body['companyId'] = user.company.companyId;
        mix.submit('', body, function (err, body) {
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
module.exports = router;