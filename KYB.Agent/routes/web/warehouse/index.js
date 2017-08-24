/**
 * Created by Jeremy on 2016/11/20.
 */
"use strict";
var router = require('express').Router();

//仓库信息维护
router.get('/list', function (req, res) {
    return res.render('./warehouse/list/view', {
        title: "仓库信息维护"
        , position: 'warehouse'
        , part: 'list'
        , user: req.session.user || {}
    });
});
//进仓数据查询
router.get('/query', function (req, res) {
    return res.render('./warehouse/query/view', {
        title: "进仓数据查询"
        , position: 'warehouse'
        , part: 'query'
        , user: req.session.user || {}
    });
});
module.exports = router;