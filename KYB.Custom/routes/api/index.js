/**
 * Created by Jeremy on 2016/11/20.
 */
"use strict";
var router = require("express").Router();

//账号相关
router.use('/account', require('./account'));
//订单相关
router.use('/order', require('./order'));
//订单文件相关
router.use('/orderFile', require('./orderFile'));
//其他相关
router.use('/other', require('./other'));

module.exports = router;