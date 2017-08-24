/**
 * Created by Jeremy on 2017/1/16.
 */
'use strict';
var router = require("express").Router();

//仓库列表
router.use('/list', require('./list'));
//查询进仓数据
router.use('/query', require('./query'));
//仓库详情
router.use('/detail', require('./detail'));
module.exports = router;