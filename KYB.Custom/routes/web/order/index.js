/**
 * Created by Jeremy on 2016/11/20.
 */
"use strict";
var router = require('express').Router();

//订单中心（待预审）
router.get('/pre', function (req, res) {
    return res.render('./order/pre/view', {
        title: "待预审"
        , position: 'order'
        , part: 'pre'
        , user: req.session.user || {}
    });
});
//订单中心（待报关）
router.get('/custom', function (req, res) {
    return res.render('./order/custom/view', {
        title: "待报关"
        , position: 'order'
        , part: 'custom'
        , user: req.session.user || {}
    });
});
//订单中心（报关中）
router.get('/declare', function (req, res) {
    return res.render('./order/declare/view', {
        title: "报关中"
        , position: 'order'
        , part: 'declare'
        , user: req.session.user || {}
    });
});
//订单中心（报关完成）
router.get('/pass', function (req, res) {
    return res.render('./order/pass/view', {
        title: "报关完成"
        , position: 'order'
        , part: 'pass'
        , user: req.session.user || {}
    });
});
//订单中心（其他）
router.get('/other', function (req, res) {
    return res.render('./order/other/view', {
        title: "其他"
        , position: 'order'
        , part: 'other'
        , user: req.session.user || {}
    });
});

//订单详情
router.get('/detail', function (req, res) {
    var data = {
        orderId: req.query.id
        , memberId: 0
    };
    detail.detail('', data, function (err, body) {
        return res.render('./order/detail/view', {
            title: "订单详情"
            , position: 'order'
            , part: req.query.tp || 'pending'
            , data: body
            , user: req.session.user || {}
        });
    });
});

module.exports = router;