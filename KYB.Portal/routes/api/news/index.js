/**
 * Created by Auser on 2016/11/29.
 */
var router = require("express").Router()
  , newsService = require('../../../service/news');

//前五条新闻
router.post('/topF', function (req, res) {
  newsService.topF('', req.body, function (err, body) {
    if (body && 'resCode' in body && body.resCode == 0) {
      return res.json(body);
    } else {
      return res.json({
        resCode: 1,
        resMsg: '获取最新新闻失败，请重试',
        resBody: null
      });
    }
  });
});
//新闻列表
router.post('/list', function (req, res) {
  var data = req.body;
  data['pageSize'] = parseInt(req.body['limit']);
  data['pageIndex'] = Math.floor(parseInt(req.body.offset / parseInt(req.body.limit)));
  newsService.list('', data, function (err, body) {
    if (body && 'resCode' in body && body.resCode == 0) {
      return res.json(body);
    } else {
      return res.json({
        resCode: 1,
        resMsg: '获取新闻列表失败，请重试',
        resBody: null
      });
    }
  });
});
//新闻详情
router.post('/', function (req, res) {
  var data = req.body.id;
  newsService.detail('', data, function (err, body) {
    if (body && 'resCode' in body && body.resCode == 0) {
      return res.json(body);
    } else {
      return res.json({
        resCode: 1,
        resMsg: '获取新闻详情失败，请重试',
        resBody: null
      });
    }
  });
});

module.exports = router;