/**
 * Created by Jeremy on 2016/11/23.
 */
"use strict";

var router = require("express").Router()
  , pending = require('../../../service/pending');

router.post('/list', function (req, res) {
  var data = req.body;
  data['pageSize'] = parseInt(data['limit']);
  data['pageIndex'] = Math.floor(parseInt(data.offset / parseInt(data.limit))) + 1;
  pending.list('', data, function (err, body) {
    return res.json(body);
  });
});
module.exports = router;