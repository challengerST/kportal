/**
 * Created by Jeremy on 2017/1/16.
 */
'use strict';
var router = require("express").Router();

//航线维护
router.use('/manage', require('./maintenance'));

//费用模板
router.use('/price', require('./price'));

//航空公司
router.use('/company', require('./company'));

//拼货
router.use('/mix', require('./mix'));

//tact
router.use('/tact', require('./tact'));

module.exports = router;