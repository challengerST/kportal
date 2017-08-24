/**
 * Created by Jeremy on 2016/12/27.
 */
'use strict';
var router = require('express').Router();
var env = process.env.NODE_ENV || "development";
var account = require('../../../service/account');
var open = require('../../../config/config')[env]['captcha']['open'];
//登录出错的次数以及时间
var times = parseInt(require('../../../config/config')[env]['validate']['times'])
    , interval = parseInt(require('../../../config/config')[env]['validate']['interval']);
//gt3
var Geetest = require('../../../utils/gt3');
//登录
router.post('/login', function (req, res) {
    var data = req.body;
    Geetest.validate(req, res, function () {
        var data = req.body;
        account.login('', data, function (err, body) {
            //登录成功，保存用户信息
            if ('resBody' in body && body.resBody && typeof body.resBody === 'object') {
                req.session.user = body.resBody;
            }
            return res.json(body);
        });
    });
});
//检查手机号
router.post('/checkTel', function (req, res) {
    account.checkTel('', req.body.tel, function (err, body) {
        return res.json(body);
    });
});
//检查公司名称
router.post('/checkName', function (req, res) {
    account.checkName('', req.body, function (err, body) {
        return res.json(body);
    });
});
//修改密码
router.post('/changePwd', function (req, res) {
    var data = req.body;
    data['agentMemberId'] = req.session.user.agentMember.memberId;
    account.changePwd('', req.body, function (err, body) {
        return res.json(body);
    });
});
module.exports = router;