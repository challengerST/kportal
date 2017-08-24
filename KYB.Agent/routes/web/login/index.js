/**
 * Created by Jeremy on 2016/11/20.
 */
"use strict";
var router = require('express').Router();
var request = require('request');
var env = process.env.NODE_ENV || "development";
var URI = require('../../../config/config')[env]['url']['other'];
var captcha = require('../../../config/config')[env]['captcha']['url'];
//gt3
var Geetest = require('../../../utils/gt3');


//登录页面
router.get('/', function (req, res) {
    //登录是否超过时效
    if ('session' in req && req.session && 'user' in req.session && req.session.user) {
        return res.redirect('/home');
    } else {
        return res.render('./login/view', {
            title: "登录"
            , position: 'login'
            , needCode: req.session.needCode || 0
        });
    }

});

//发送前端验证码
router.get('/sendGt3', function (req, res) {
    Geetest.register(req, res);
});


//获取验证码
router.get('/captcha', function (req, res) {
    var code = '';
    var random = [2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'K', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    for (var i = 0; i < 4; i++) {
        var index = Math.floor(Math.random() * random.length);
        code += random[index];
    }
    req.session.code = code;
    req.pipe(request(URI + captcha + code)).pipe(res);
});

//注销
router.get('/out', function (req, res) {
    //清除session数据
    if ('session' in req && req.session) {
        req.session.destroy()
    }
    return res.redirect('/login');
});


module.exports = router;