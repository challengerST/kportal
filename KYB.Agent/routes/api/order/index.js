/**
 * Created by Jeremy on 2017/1/16.
 */
'use strict';
var router = require("express").Router();

//待处理
router.use('/pending', require('./pending'));
//改配申请
router.use('/change', require('./change'));
//进行中
router.use('/underway', require('./underway'));
//已结束
router.use('/done', require('./done'));
//详情
router.use('/detail', require('./detail'));
module.exports = router;