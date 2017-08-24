/**
 * Created by Jeremy on 2016/11/24.
 */
"use strict";

var router = require("express").Router();

//关于我们
router.get('/about', function (req, res) {
    return res.render('./info/about/view', {
        title: "关于我们"
        , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
        , pos: 'about'
        , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
    });
});
//常见问题
router.get('/problems', function (req, res) {
    return res.render('./info/problems/view', {
        title: "常见问题"
        , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
        , pos: 'problems'
        , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
    });
});
//服务条款
router.get('/terms', function (req, res) {
    return res.render('./info/terms/view', {
        title: "服务条款"
        , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
        , pos: 'terms'
        , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
    });
});
//网站地图
router.get('/map', function (req, res) {
    return res.render('./info/map/view', {
        title: "网站地图"
        , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
        , pos: 'map'
        , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
    });
});
//联系我们
router.get('/connect', function (req, res) {
    return res.render('./info/connect/view', {
        title: "联系我们"
        , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
        , pos: 'connect'
        , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
    });
});

module.exports = router;