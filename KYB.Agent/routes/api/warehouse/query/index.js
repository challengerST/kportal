/**
 * Created by Jeremy on 2017/1/16.
 */
'use strict';
var router = require("express").Router();
var query = require('../../../../service/warehouse/query');

//获取仓库详情
router.post('/', function (req, res) {
  var data = req.body;
  console.log(data)
  data['agentCompanyId'] = 10000;
  data['pageSize'] = parseInt(data['limit']);
  data['pageIndex'] = Math.floor(parseInt(data.offset / parseInt(data.limit))) + 1;
  query.list('', data, function (err, body) {
    return res.json(body);
  });
});

module.exports = router;