/**
 * Created by Jeremy on 2017/1/16.
 */
'use strict';
var router = require("express").Router();

//会员评级
router.use('/level', require('./level'));
//会员列表
router.use('/list', require('./list'));
//会员详情
router.use('/detail', require('./detail'));
module.exports = router;