/**
 * Created by Administrator on 2017/8/14.
 */
"use strict";
var router = require('express').Router();
var loginService = require('../../../service/login');
//gt3
var Geetest = require('../../../utils/gt3');
//登录
router.get('/', function (req, res) {
    if ('session' in req && req.session && 'user' in req.session && req.session.user) {
        req.session.user = null;
    }
    return res.render('./newLogin/view', {
        title: "登录"
        , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
        , pos: 'login'
        , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
    });
});
//发送前端验证码
router.get('/sendGt3', function (req, res) {
    Geetest.register(req, res);
});
//注册
router.get('/register', function (req, res) {
    if ('session' in req && req.session && 'user' in req.session && req.session.user) {
        req.session.user = null;
    }
    return res.render('./register/view', {
        title: "注册"
        , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
        , pos: 'register'
        , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
    });
});

//登出
router.get('/out', function (req, res) {
    if ('session' in req && req.session && 'user' in req.session && req.session.user) {
        req.session.user = null;
    }
    return res.redirect('/newLogin')
});

//用户协议
router.get('/deal', function (req, res) {
    return res.render('./deal/view', {
        title: "用户协议"
        , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
        , pos: 'deal'
        , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
    });
});
//发送重置邮件
router.get('/forget', function (req, res) {
    return res.render('./forget/view', {
        title: "忘记密码"
        , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
        , pos: 'forget'
        , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
    });
});
//接收邮件，重置密码
router.get('/reset', function (req, res) {
    return res.render('./forget/reset', {
        title: "修改密码"
        , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
        , pos: 'forget'
        , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
    });
});
//注册激活
router.get('/active', function (req, res) {
    loginService.active('', req.query.key, function (err, body) {
        var data;
        if (body && 'resCode' in body && body.resCode == 0) {
            data = 0;
        } else {
            data = 1;
        }
        return res.render('./active/view', {
            title: "激活账号"
            , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
            , pos: 'active'
            , data: data
            , msg: body && 'resMsg' in body && body.resMsg || '邮箱激活失败'
            , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
        });
    });
});
//货代注册
router.get('/agentRegister', function (req, res) {
    loginService.active('', req.query.key, function (err, body) {
        var data;
        if (body && 'resCode' in body && body.resCode == 0) {
            data = 0;
        } else {
            data = 1;
        }
        return res.render('./agentRegister/view', {
            title: "货代加盟"
            , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
            , pos: 'active'
            , data: data
            , msg: body && 'resMsg' in body && body.resMsg || '货代注册失败'
            , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
        });
    });
});
//企业实名注册
router.get('/Certification', function (req, res) {
    loginService.active('', req.query.key, function (err, body) {
        var data;
        if (body && 'resCode' in body && body.resCode == 0) {
            data = 0;
        } else {
            data = 1;
        }
        return res.render('./agentCertification/view', {
            title: "货代加盟"
            , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
            , pos: 'active'
            , data: data
            , msg: body && 'resMsg' in body && body.resMsg || '货代注册失败'
            , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
        });
    });
});
module.exports = router;