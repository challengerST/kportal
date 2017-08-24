/**
 * Created by Jeremy on 2016/11/23.
 */
"use strict";

var router = require("express").Router();
var entrustService = require('../../../service/entrust');
//下单请求
router.post('/list', function (req, res) {
  var body = req.body
    , user = req.session.user;
  body['pageSize'] = body.limit;
  body['pageIndex'] = Math.floor(parseInt(body.offset / parseInt(body.limit)));
  body['memberId'] = user.member.memberId;
  entrustService.list('', body, function (err, body) {
    if (body && 'resCode' in body) {
      return res.json(body);
    } else {
      return res.json({
        resCode: 1
        , resMsg: '获取列表失败，请重试'
        , resBody: null
      });
    }
  });
});
module.exports = router;