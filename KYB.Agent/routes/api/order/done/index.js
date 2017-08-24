/**
 * Created by Jeremy on 2017/1/16.
 */
'use strict';
var router = require("express").Router();
var done = require('../../../../service/order/done');

//结束列表
router.post('/list', function (req, res) {
    var data = req.body;
    data['agentCompanyId'] = req.session.user.agentCompany.companyId;
    data['agentMemberId'] = req.session.user.agentMember.memberId;
    data['pageSize'] = parseInt(data['limit']);
    data['pageIndex'] = Math.floor(parseInt(data.offset / parseInt(data.limit))) + 1;
    done.list('', data, function (err, body) {
        return res.json(body);
    });
});
//创建费用信息
router.post('/createCharge', function (req, res) {
    var data = req.body;
    done.createCharge('', data, function (err, body) {
        return res.json(body);
    });
});
module.exports = router;