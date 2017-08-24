/**
 * Created by Administrator on 2017/8/15.
 */
"use strict";
var router = require('express').Router();
var agent = require('../../../service/agent');
//认证审核
router.get('/review', function (req, res) {
    return res.render('./agent/review/view', {
        title: "加盟审核-待审核"
        , position: 'agent'
        , part: 'review'
        , user: req.session.user || {}
    });
});
//加盟申请详情详情
router.get('/detail', function (req, res) {
    var data = req.body;
    data["applyId"] = req.query.id;
    agent.detail('',data , function (err, body) {
        return res.render('./agent/detail/view', {
            title: "待审核详情"
            , position: 'agent'
            , part: 'detail'
            , data: body && 'resCode' in body && body.resCode == 0 && body.resBody || {}
            , user: req.session.user || {}
        });
    });
});
//认证审核
router.get('/list', function (req, res) {
    return res.render('./agent/list/view', {
        title: "加盟审核-审核日志"
        , position: 'agent'
        , part: 'list'
        , user: req.session.user || {}
    });
});
module.exports = router;