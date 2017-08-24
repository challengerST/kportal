/**
 * Created by Auser on 2016/11/30.
 */
"use strict";
var router = require('express').Router();

//委托成功
router.get('/', function (req, res) {
    return res.render('./order/view', {
        title: "委托成功"
        , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
        , pos: 'order'
        , data: req.session.orderInfo || {}
        , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
    });
});

//委托订舱
router.get('/entrust', function (req, res) {
    return res.render('./entrust/view', {
        title: "委托订舱"
        , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
        , pos: 'order'
        , data: req.query
        , mb: req.session.user.company.companyName || req.session.user.member.name || req.session.user.member.mobile
        , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
    });
});

module.exports = router;