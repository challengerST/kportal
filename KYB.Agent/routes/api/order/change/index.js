/**
 * Created by Jeremy on 2017/1/16.
 */
'use strict';
var router = require("express").Router();
var change = require('../../../../service/order/change');


//申请改配列表
router.post('/list', function (req, res) {
    var data = req.body;
    data['agentCompanyId'] = req.session.user.agentCompany.companyId;
    data['agentMemberId'] = req.session.user.agentMember.memberId;
    data['pageSize'] = parseInt(data['limit']);
    data['pageIndex'] = Math.floor(parseInt(data.offset / parseInt(data.limit))) + 1;
    change.list('', data, function (err, body) {
        return res.json(body);
    });
});
module.exports = router;