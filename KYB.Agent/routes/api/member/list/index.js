/**
 * Created by Jeremy on 2017/1/16.
 */
'use strict';
var router = require("express").Router();
var list = require('../../../../service/member/list');

//搜索会员列表
router.post('/search', function (req, res) {
  var data = req.body;
  data['pageSize'] = parseInt(data['limit']);
  data['pageIndex'] = Math.floor(parseInt(data.offset / parseInt(data.limit)))+1;
  list.search('', data, function (err, body) {
    return res.json(body);
  });
});
//认证审核列表
router.post('/pending', function (req, res) {
  var data = req.body;
  data['pageSize'] = parseInt(data['limit']);
  data['pageIndex'] = Math.floor(parseInt(data.offset / parseInt(data.limit)))+1;
  list.pending('', data, function (err, body) {
    return res.json(body);
  });
});
//启用/停用
router.post('/state', function (req, res) {
  var data = req.body;
  list.state('', data, function (err, body) {
    return res.json(body);
  });
});
//通过/拒绝审核
router.post('/verify', function (req, res) {
  var data = req.body;
  list.verify('', data, function (err, body) {
    return res.json(body);
  });
});
//添加
router.post('/add', function (req, res) {
  var data = req.body;
  list.add('', data, function (err, body) {
    return res.json(body);
  });
});
//批量添加
router.post('/multiAdd', function (req, res) {
  var data = {
    Users: req.body.Users
    , agentMemberId:req.session.user.agentMember.memberId
  };
  list.multiAdd('', data, function (err, body) {
    return res.json(body);
  });
});
module.exports = router;