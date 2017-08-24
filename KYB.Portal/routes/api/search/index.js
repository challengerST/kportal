/**
 * Created by Jeremy on 2016/11/23.
 */
"use strict";

var router = require("express").Router()
  , search = require('../../../service/search');

//搜索航空公司
router.post('/company', function (req, res) {
  var data = req.body;
  data['pageSize'] = parseInt(data['limit']);
  data['pageIndex'] = Math.floor(parseInt(data.offset / parseInt(data.limit))) + 1;
  search.company('', data, function (err, body) {
    return res.json(body);
  });
});

//搜索机场
router.post('/airports', function (req, res) {
  var data = req.body;
  data['pageSize'] = parseInt(data['limit']);
  data['pageIndex'] = Math.floor(parseInt(data.offset / parseInt(data.limit))) + 1;
  search.airports('', data, function (err, body) {
    return res.json(body);
  });
});
module.exports = router;