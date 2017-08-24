/**
 * Created by Jeremy on 2016/11/20.
 */
"use strict";
var router = require("express").Router();
/**
 *  增加session参数
 **/
router.use(function (req, res, next) {
    if ('session' in req && req.session && 'user' in req.session && req.session.user) {
       req.body['sessionId'] = req.sessionID;
    }
    next();

});

//账号相关
router.use('/account', require('./account'));

//主页相关
router.use('/home', require('./home'));

//航线相关
router.use('/airline', require('./airline'));

//仓库
router.use('/warehouse', require('./warehouse'));

//订单
router.use('/order', require('./order'));

//财务管理
router.use('/tickets', require('./tickets'));

//运单
router.use('/waybill', require('./waybill'));

//会员管理
router.use('/member', require('./member'));

//员工管理
router.use('/staff', require('./staff'));

//其他
router.use('/other', require('./other'));

//其他
router.use('/readExcel', require('./readExcel'));

//货代加盟商管理
router.use('/agent', require('./agent'));

module.exports = router;