/**
 * Created by Jeremy on 2016/11/20.
 */
"use strict";
var router = require('express').Router();
//主页
router.get('/', function (req, res) {
    return res.render('./home/view', {
        title: "首页"
        , position: 'home'
        , part: 'home'
        , user: req.session.user || {}
    });
});

module.exports = router;