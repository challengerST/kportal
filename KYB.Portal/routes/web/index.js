/**
 * Created by Jeremy on 2016/11/20.
 */
"use strict";
var router = require('express').Router();
var note = require('../../service/note');
//登录
router.use('/login', require('./newLogin'));
router.use('/newLogin', require('./newLogin'));

//获取图片验证码
router.use('/getImgCode', require('./getCode'));

/**
 *  项目启动不设置sid过期时间，为实时过期。如果勾选免登陆，重新设置过期cookie过期时间为7天。
 * */
router.use(function (req, res, next) {
    req.session.loginUrl = req.originalUrl;
    if (req && 'session' in req && req.session && 'keepL' in req.session && req.session.keepL == 1) {
        res.cookie('connect.sid', req.cookies['connect.sid'], {maxAge: 1000 * 60 * 60 * 24 * 7});
    }
    next();
});
//补全url
router.get('/', function (req, res) {
    return res.redirect('/home');
});
//如果已经登录，请求未读消息数量
router.use(function (req, res, next) {
    if ('session' in req && req.session && 'user' in req.session && req.session.user && 'member' in req.session.user) {
        note.nums('', req.session.user.member.memberId, function (err, body) {
            if (body && 'resCode' in body && body.resCode == 0) {
                req.session.notes = body.resBody;
                next();
            } else {
                req.session.notes = {
                    "systemCount": 0,
                    "orderCount": 0
                };
                next();
            }
        });
    } else {
        req.session.notes = {
            "systemCount": 0,
            "orderCount": 0
        };
        next();
    }
});

//首页
router.use('/home', require('./home'));
//我要发货&&特价航班
router.use('/delivery', require('./delivery'));
//简介
router.use('/info', require('./info'));

//店铺
router.use('/shop', require('./shop'));



//拦截所有路由请求，进行登陆验证
router.use(function (req, res, next) {
    if ('session' in req && req.session && 'user' in req.session && req.session.user && 'member' in req.session.user) {
        next();
    } else {
        return res.redirect('./newLogin');
    }
});
//收藏店铺
router.use('/sac', require('./sac'));

/**
 *   以下请求没有登陆无法访问
 * */
//会员中心
router.use('/vip', require('./vip'));

//航线委托
router.use('/order', require('./order'));

//新会员中心
router.use('/newVip', require('./newVip'));

module.exports = router;