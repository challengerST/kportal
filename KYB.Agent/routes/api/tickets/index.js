/**
 * Created by Jeremy on 2017/1/16.
 */
'use strict';
var router = require("express").Router();

//费用清单
router.use('/expense', require('./expense'));
//对账单
router.use('/account', require('./account'));
//开票管理
router.use('/invoice', require('./invoice'));
//返现
router.use('/cash', require('./cash'));

module.exports = router;