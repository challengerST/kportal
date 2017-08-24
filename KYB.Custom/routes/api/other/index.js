/**
 * Created by Jeremy on 2016/12/27.
 */
'use strict';
var router = require('express').Router();
var request = require('request');
var env = process.env.NODE_ENV || "development";
var URI = require('../../../config/config')[env]['url']['other']
  , down = require('../../../config/config')[env]['oss']['down']
  , up = require('../../../config/config')[env]['oss']['up']
  , excel = require('../../../config/config')[env]['oss']['excel'];

//获取oss 下载token
router.post('/ossDown', function (req, res) {
  request({
    method: 'post'
    , uri: URI + down
    , json: req.body
  }, function (error, response, body) {
    return res.json(body);
  });
});
//获取oss 上传token
router.post('/ossUp', function (req, res) {
  request({
    method: 'post'
    , uri: URI + up
    , json: req.body
  }, function (error, response, body) {
    return res.json(body);
  });
});
//解析excel
router.post('/excelReader', function (req, res) {
  request({
    method: 'post'
    , uri: URI + excel
    , json: req.body
  }, function (error, response, body) {
    return res.json(body);
  });
});
module.exports = router;