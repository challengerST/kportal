/**
 * Created by Jeremy on 2017/1/16.
 */
'use strict';
var router = require("express").Router();
var detail = require('../../../../service/warehouse/detail');

//获取仓库详情
router.post('/', function (req, res) {
  var data = req.body.id;
  detail.detail('', data, function (err, body) {
    return res.json(body);
  });
});

module.exports = router;