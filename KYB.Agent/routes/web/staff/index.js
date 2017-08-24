/**
 * Created by Jeremy on 2016/11/20.
 */
"use strict";
var router = require('express').Router();
var list = require('../../../service/staff/list');
//员工列表
router.get('/list', function (req, res) {
    return res.render('./staff/list/view', {
        title: "员工列表"
        , position: 'staff'
        , part: 'list'
        , user: req.session.user || {}
    });
});
//角色管理
router.get('/role', function (req, res) {
    return res.render('./staff/role/view', {
        title: "角色管理"
        , position: 'staff'
        , part: 'role'
        , user: req.session.user || {}
    });
});
//会员列表
router.get('/detail', function (req, res) {
    list.detail('', req.query.id, function (err, body) {
        return res.render('./staff/detail/view', {
            title: "员工详情"
            , position: 'staff'
            , part: 'list'
            , user: req.session.user || {}
            , data: body && 'resCode' in body && body.resCode == 0 && body.resBody ? body : {}
        });
    });
});

module.exports = router;