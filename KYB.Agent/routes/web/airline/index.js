/**
 * Created by Jeremy on 2016/11/20.
 */
"use strict";
var router = require('express').Router();
var company = require('../../../service/airline/company');
var mix = require('../../../service/airline/mix');
//航空公司维护
router.get('/company', function (req, res) {
    return res.render('./airline/company/view', {
        title: "航空公司维护"
        , position: 'airline'
        , part: 'company'
        , user: req.session.user || {}
    });
});
//航空公司维护
router.get('/company/detail', function (req, res) {
    var id = req.query.id || 0;
    company.detail('', id, function (err, body) {
        var d = body && 'resCode' in body && body.resCode == 0 && 'resBody' in body && body.resBody ? body.resBody : null;
        return res.render('./airline/detail/view2', {
            title: d ? '修改航空公司' : '新增航空公司'
            , position: 'airline'
            , part: 'company'
            , user: req.session.user || {}
            , d: d
        });
    });
});
//费用模板
router.get('/price', function (req, res) {
    return res.render('./airline/price/view', {
        title: "费用模板"
        , position: 'airline'
        , part: 'price'
        , user: req.session.user || {}
    });
});
//tact
router.get('/tact', function (req, res) {
    return res.render('./airline/tact/view', {
        title: "TACT费率维护"
        , position: 'airline'
        , part: 'tact'
        , user: req.session.user || {}
    });
});
//航线维护
router.get('/maintenance', function (req, res) {
    return res.render('./airline/maintenance/view', {
        title: "航线维护"
        , position: 'airline'
        , part: 'maintenance'
        , user: req.session.user || {}
    });
});
//拼货维护
router.get('/mix', function (req, res) {
    return res.render('./airline/mix/view', {
        title: "拼货设置"
        , position: 'airline'
        , part: 'mix'
        , user: req.session.user || {}
    });
});
//拼货维护
router.get('/mixDetail', function (req, res) {
    var id = req.query.id || 0;
    mix.detail('', id, function (err, body) {
        var d = body && 'resCode' in body && body.resCode == 0 && 'resBody' in body && body.resBody ? body.resBody : {};
        return res.render('./airline/mixDetail/view', {
            title: d ? '修改拼货' : '新增拼货'
            , position: 'airline'
            , part: 'mix'
            , user: req.session.user || {}
            , d: d
        });
    });


});
module.exports = router;