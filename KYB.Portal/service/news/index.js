/**
 * Created by Auser on 2016/11/29.
 */
var request = require('../../utils/request').request;
var env = process.env.NODE_ENV || "development";
module.exports = {
  //前五条新闻
  topF: function (token, data, callback) {
    request(token, {
      url: '/api/News/Top5/' + (data && 'type' in data && data.type || 10)
      , method: 'get'
      , callback: function (error, resp, body) {
        callback(error, body);
      }
    });
  }
  //新闻详情
  , detail: function (token, data, callback) {
    request(token, {
      url: '/api/News/' + (data || '0')
      , method: 'get'
      , callback: function (error, resp, body) {
        callback(error, body);
      }
    });
  }
  //新闻列表
  , list: function (token, data, callback) {
    request(token, {
      url: '/api/News/PageList'
      , method: 'post'
      , data: data
      , callback: function (error, resp, body) {
        callback(error, body);
      }
    });
  }
};