/**
 * Created by Jeremy on 2016/11/20.
 */
"use strict";
var router = require('express').Router();
var detail = require('../../../service/order/detail');
var pending = require('../../../service/order/pending');

//订单中心（待处理）
router.get('/pending', function (req, res) {
    return res.render('./order/pending/view', {
        title: "待处理"
        , position: 'order'
        , part: 'pending'
        , user: req.session.user || {}
    });
});
//订单中心（添加新订单）
router.get('/new', function (req, res) {
    return res.render('./order/new/view', {
        title: "新建订单"
        , position: 'order'
        , part: 'pending'
        , user: req.session.user || {}
    });
});
//改配申请
router.get('/change', function (req, res) {
    return res.render('./order/change/view', {
        title: "改配申请"
        , position: 'order'
        , part: 'change'
        , tp: req.query.tp || 'book'
        , user: req.session.user || {}
    });
});
//订单中心（进行中）
router.get('/underway', function (req, res) {
    return res.render('./order/underway/view', {
        title: "进行中"
        , position: 'order'
        , part: 'underway'
        , tp: req.query.tp || 'book'
        , user: req.session.user || {}
    });
});
//进仓数据操作
router.get('/storage', function (req, res) {
    pending.storage('', req.query.id, function (err, body) {
        return res.render('./order/storage/view', {
            title: "进行中"
            , position: 'order'
            , part: 'underway'
            , tp: req.query.tp || 'book'
            , user: req.session.user || {}
            , n: req.query.n || ''
            , c: req.query.c || ''
            , id: req.query.id || ''
            , data: body && 'resCode' in body && body.resCode == 0 && body.resBody || null
        });
    })
});
//订单中心（已结束）
router.get('/done', function (req, res) {
    return res.render('./order/done/view', {
        title: "已结束"
        , position: 'order'
        , part: 'done'
        , user: req.session.user || {}
    });
});

//订单详情
router.get('/detail', function (req, res) {
    var data = {
        orderId: req.query.id
        , subOrderNum: null
        , agentCompanyId: 10000
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
//预录单
router.get('/detail/yld', function (req, res) {
    detail.declareData('', req.query.id, function (err, body) {
        return res.render('./order/yld/view', {
            title: "预录单"
            , user: req.session.user || {}
            , pos: 'detail'
            , data: body
        });
    });
});
//放行通知书
router.get('/detail/ckd', function (req, res) {
    detail.declareData('', req.query.id, function (err, body) {
        return res.render('./order/ckd/view', {
            title: "放行通知书"
            , user: req.session.user || {}
            , pos: 'detail'
            , data: body
        });
    });
});
//提单预览
router.get('/detail/ensure', function (req, res) {
    var data = {
        orderId: req.query.id
        , subOrderNum: req.query.sid || null
        , memberId: 0
    };
    detail.detail('', data, function (err, body) {
        return res.render('./order/lading/view', {
            title: "提单预览"
            , position: 'order'
            , part: req.query.tp || 'pending'
            , data: body
            , user: req.session.user || {}
        });
    });
});
module.exports = router;