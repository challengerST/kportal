/**
 * Created by Jeremy on 2016/11/20.
 */
"use strict";
var router = require("express").Router();

//登陆，注册
router.use('/login', require('./login'));

//航线搜索，特价航线
router.use('/airline', require('./airline'));

//订单相关
router.use('/order', require('./order'));

//拼货相关
router.use('/mix', require('./mix'));

//开票信息
router.use('/ticket', require('./ticket'));

//账单详情
router.use('/bill', require('./bill'));

//对账单
router.use('/account', require('./account'));

//开票
router.use('/appeal', require('./appeal'));

//下载
router.use('/down', require('./down'));

//新闻
router.use('/news', require('./news'));

//待处理订单列表
router.use('/pending', require('./pending'));

//收发货人
router.use('/receive', require('./receive'));

//消息
router.use('/note', require('./note'));

//委托书
router.use('/entrust', require('./entrust'));

//订单附件
router.use('/orderFile', require('./orderFile'));

//实用工具搜索
router.use('/search', require('./search'));

//员工管理
router.use('/member', require('./member'));

//新版本店铺首页
router.use('/shop', require('./shop'));

//新版本收藏店铺
router.use('/sac', require('./sac'));

module.exports = router;