/**
 * Created by Auser on 2016/11/29.
 */
var router = require("express").Router()
  , billService = require('../../../service/bill');

//对账单列表
router.post('/list', function (req, res) {
  var data = req.body;
  data['memberId'] = req.session.user.member.memberId;
  data['pageSize'] = parseInt(req.body['limit']);
  data['pageIndex'] = Math.floor(parseInt(req.body.offset / parseInt(req.body.limit))) + 1;
  billService.list('', data, function (err, body) {
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
//确认账单
router.post('/ensure', function (req, res) {
  var data = req.body;
  billService.ensure('', data, function (err, body) {
    if (body && 'resCode' in body && body.resCode == 0) {
      return res.json(body);
    } else {
      return res.json({
        resCode: 1,
        resMsg: '确认账单失败，请重试',
        resBody: null
      });
    }
  });
});

//账单申诉
router.post('/appeal', function (req, res) {
  var data = req.body;
  billService.appeal('', data, function (err, body) {
    if (body && 'resCode' in body && body.resCode == 0) {
      return res.json(body);
    } else {
      return res.json({
        resCode: 1,
        resMsg: '申诉失败，请重试',
        resBody: null
      });
    }
  });
});
module.exports = router;