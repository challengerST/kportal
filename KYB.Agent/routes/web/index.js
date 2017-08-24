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

    return res.redirect('/login')
  }
});

//首页
router.use('/home', require('./home'));

//航线管理
router.use('/airline', require('./airline'));

//运单管理
router.use('/waybill', require('./waybill'));

//订单管理
router.use('/order', require('./order'));

//财务管理
router.use('/tickets', require('./tickets'));

//会员管理
router.use('/member', require('./member'));

//员工管理
router.use('/staff', require('./staff'));

//仓库管理
router.use('/warehouse', require('./warehouse'));

//下载
router.use('/download', require('./download'));

//加盟商管理
router.use('/agent', require('./agent'));

module.exports = router;