/**
 * Created by Jeremy on 2016/11/20.
 */
"use strict";
var router = require('express').Router();
var level = require('../../../service/member/level');
var list = require('../../../service/member/list');
//会员列表
router.get('/list', function (req, res) {
    return res.render('./member/list/view', {
        title: "会员列表"
        , position: 'member'
        , part: 'list'
        , user: req.session.user || {}
    });
});
//会员评级
router.get('/level', function (req, res) {
    var data = 10000;
    level.detail('', data, function (err, body) {
        return res.render('./member/level/view', {
            title: "会员评级"
            , position: 'member'
            , part: 'level'
            , data: body
            , user: req.session.user || {}
        });
    });
});
//认证审核
router.get('/review', function (req, res) {
    return res.render('./member/review/view', {
        title: "认证审核"
        , position: 'member'
        , part: 'review'
        , user: req.session.user || {}
    });
});
//会员详情
router.get('/detail', function (req, res) {
    list.detail('', req.query.id, function (err, body) {
        return res.render('./member/detail/view', {
            title: "会员详情"
            , position: 'member'
            , part: 'detail'
            , data: body && 'resCode' in body && body.resCode == 0 && body.resBody || {}
            , user: req.session.user || {}
        });
    });
});

module.exports = router;