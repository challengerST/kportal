/**
 * Created by Jeremy on 2017/1/16.
 */
'use strict';
var router = require("express").Router();

//员工列表
router.use('/list', require('./list'));
//员工角色管理
router.use('/role', require('./role'));
module.exports = router;