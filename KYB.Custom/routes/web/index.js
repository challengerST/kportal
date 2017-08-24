/**
 * Created by Jeremy on 2016/11/20.
 */
"use strict";
var router = require('express').Router();

router.get('/', function (req, res) {
    return res.redirect('/login');
});

//登录
router.use('/login', require('./login'));

/**
 *  登录验证
 **/
router.use(function (req, res, next) {
    if ('session' in req && req.session && 'user' in req.session && req.session.user) {
        next();
    } else {
        //return res.redirect('/login');
    }
});

//订单管理
router.use('/order', require('./order'));


module.exports = router;