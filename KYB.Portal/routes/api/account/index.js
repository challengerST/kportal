/**
 * Created by Auser on 2016/11/29.
 */
var router = require("express").Router()
  , account = require('../../../service/account');

//对账单列表
router.post('/list', function (req, res) {
  var data = req.body;
  data['companyId'] = req.session.user.company.companyId;
  data['agentCompanyId'] = req.session.user.company.agentCompanyId;
  data['pageSize'] = parseInt(req.body['limit']);
  data['pageIndex'] = Math.floor(parseInt(req.body.offset / parseInt(req.body.limit))) + 1;
  account.list('', data, function (err, body) {
    if (body && 'resCode' in body && body.resCode == 0) {
      return res.json(body);
    } else {
      return res.json({
        resCode: 1,
        resMsg: '对账单列表获取失败，请重试',
        resBody: null
      });
    }
  });
});
module.exports = router;