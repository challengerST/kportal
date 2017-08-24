/**
 * Created by Jeremy on 2016/11/20.
 */
"use strict";
var router = require('express').Router();
var manage = require('../../../service/waybill/manage');
//运单管理
router.get('/manage', function (req, res) {
    return res.render('./waybill/manage/view', {
        title: "运单管理"
        , position: 'waybill'
        , part: 'manage'
        , user: req.session.user || {}
    });
});
//运单状态
router.get('/state', function (req, res) {
    var data = 10000;
    manage.collect('', data, function (err, body) {
        return res.render('./waybill/state/view', {
            title: "运单状态"
            , position: 'waybill'
            , part: 'state'
            , data: body
            , c: req.query.c || 'all'
            , user: req.session.user || {}
        });
    });
});
//运单汇总
router.get('/collect', function (req, res) {
    var data = 10000;
    manage.collect('', data, function (err, body) {
        return res.render('./waybill/collect/view', {
            title: "运单汇总"
            , position: 'waybill'
            , part: 'collect'
            , data: body
            , user: req.session.user || {}
        });
    });
});

module.exports = router;