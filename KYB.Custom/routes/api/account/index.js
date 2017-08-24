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
//登录
router.post('/login', function (req, res) {
    var data = req.body;
    var code = data.Code.toUpperCase();
    if (open) {//是否开启图形验证
        if (req.session.needCode) {
            if (code != req.session.code) {
                return res.json({
                    resCode: -1
                    , resMsg: '验证码错误'
                    , resBody: null
                });
            }
        }
    }
    account.login('', data, function (err, body) {
        //如果登录失败，记录登录出错的次数以及时间
        if (body.resCode != 0) {
            if (!'wrongTime' in req.session || !req.session.wrongTime) {
                req.session.wrongTime = [];
            }
            req.session.wrongTime.push(new Date());
            var arr = req.session.wrongTime;
            if (arr.length >= times && (new Date(arr[arr.length - 1]).getTime() - new Date(arr[arr.length - times]).getTime() <= interval)) {
                req.session.needCode = 1;
            }
        }
        //登录成功，清除出错记录
        if (body.resCode == 0) {
            req.session.wrongTime = [];
            req.session.needCode = 0;
        }
        //登录成功，保存用户信息
        if ('resBody' in body && body.resBody && typeof body.resBody === 'object') {
            req.session.user = body.resBody;
        }
        //将失败次数验证返回
        body.needCode = req.session.needCode;
        return res.json(body);
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
module.exports = router;