/**
 * Created by Jeremy on 2016/11/23.
 */
"use strict";
var router = require('express').Router();

//登录
router.get('/', function (req, res) {
    return res.render('./tools/view', {
        title: "实用工具"
        , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
        , pos: 'tools'
        , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
    });
});


module.exports = router;