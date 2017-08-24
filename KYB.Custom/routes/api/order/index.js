var router = require("express").Router();
var order = require('../../../service/order');

//待预审列表
router.post('/preList', function (req, res) {
    var data = req.body;
    data['agentCompanyId'] = req.session.user.agentCompany.companyId;
    data['pageSize'] = parseInt(data['limit']);
    data['pageIndex'] = Math.floor(parseInt(data.offset / parseInt(data.limit))) + 1;
    order.preList('', data, function (err, body) {
        return res.json(body);
    });
});
//待报关列表
router.post('/customList', function (req, res) {
    var data = req.body;
    data['agentCompanyId'] = req.session.user.agentCompany.companyId;
    data['pageSize'] = parseInt(data['limit']);
    data['pageIndex'] = Math.floor(parseInt(data.offset / parseInt(data.limit))) + 1;
    order.customList('', data, function (err, body) {
        return res.json(body);
    });
});
//报关中列表
router.post('/declareList', function (req, res) {
    var data = req.body;
    data['agentCompanyId'] = req.session.user.agentCompany.companyId;
    data['pageSize'] = parseInt(data['limit']);
    data['pageIndex'] = Math.floor(parseInt(data.offset / parseInt(data.limit))) + 1;
    order.declareList('', data, function (err, body) {
        return res.json(body);
    });
});
//报关成功列表
router.post('/passList', function (req, res) {
    var data = req.body;
    data['agentCompanyId'] = req.session.user.agentCompany.companyId;
    data['pageSize'] = parseInt(data['limit']);
    data['pageIndex'] = Math.floor(parseInt(data.offset / parseInt(data.limit))) + 1;
    order.passList('', data, function (err, body) {
        return res.json(body);
    });
});
//其他列表
router.post('/otherList', function (req, res) {
    var data = req.body;
    data['agentCompanyId'] = req.session.user.agentCompany.companyId;
    data['pageSize'] = parseInt(data['limit']);
    data['pageIndex'] = Math.floor(parseInt(data.offset / parseInt(data.limit))) + 1;
    order.otherList('', data, function (err, body) {
        return res.json(body);
    });
});
//更改状态
router.post('/changeState', function (req, res) {
    var data = req.body;
    data['agentId'] = req.session.user.agentMember.memberId;
    order.changeState('', data, function (err, body) {
        return res.json(body);
    });
});
module.exports = router;