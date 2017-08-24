/**
 * Created by Jeremy on 2017/1/16.
 */
'use strict';
var router = require("express").Router();
var level = require('../../../../service/member/level');

//更新费用模板
router.post('/update', function (req, res) {
  var data = req.body;
  data['agentCompanyId'] = 10000;
  level.update('', data, function (err, body) {
    return res.json(body);
  });
});
//获取详情
router.post('/level', function (req, res) {
  var data = 10000;
  level.detail('', data, function (err, body) {
    return res.json(body);
  });
});
module.exports = router;