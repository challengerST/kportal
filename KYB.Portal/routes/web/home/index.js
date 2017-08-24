/**
 * Created by Jeremy on 2016/11/22.
 */
"use strict";

var router = require("express").Router()
    , newsService = require('../../../service/news');

//首页
router.get('/', function (req, res) {
    return res.render('./home/view', {
        title: "首页"
        , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
        , pos: 'home'
        , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
    });
});
//新闻-空运邦动态
router.get('/news/dynamic', function (req, res) {
    return res.render('./news/dynamic/view', {
        title: "行业动态"
        , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
        , 'tt': 'dynamic'
        , pos: 'dynamic'
        , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
    });
});
//新闻-常见问题-注册与登录
router.get('/news/login', function (req, res) {
    return res.render('./news/login/view', {
        title: "注册与登录"
        , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
        , tt: 'common'
        , pos: 'newLogin'
        , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
    });
});
//新闻-常见问题-订舱须知
router.get('/news/order', function (req, res) {
    return res.render('./news/order/view', {
        title: "订舱须知"
        , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
        , tt: 'common'
        , pos: 'order'
        , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
    });
});
//新闻-常见问题-会员管理中心
router.get('/news/center', function (req, res) {
    return res.render('./news/center/view', {
        title: "订舱须知"
        , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
        , tt: 'common'
        , pos: 'center'
        , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
    });
});
//新闻-详情
router.get('/news/detail', function (req, res) {
    newsService.detail('', req.query.id, function (err, body) {
        return res.render('./news/detail/view', {
            title: "订舱须知"
            , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
            , tt: req.query.tt == 'd' ? 'dynamic' : 'common'
            , pos: req.query.pos == 'l' ? 'newLogin' : (req.query.pos == 'o' ? 'order' : 'center')
            , data: typeof body == 'string' ? JSON.parse(body) : body
            , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
        });
    });
});
module.exports = router;