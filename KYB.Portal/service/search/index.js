/**
 * Created by Auser on 2016/11/29.
 */
var request = require('../../utils/request').request;

module.exports = {
  //航空公司搜索
  company: function (token, data, callback) {
    request(token, {
      url: '/api/AirCompany/List'
      , method: 'post'
      , data: data
      , callback: function (error, resp, body) {
        callback(error, body);
      }
    });
  }
  //机场查询
  , airports: function (token, data, callback) {
    request(token, {
      url: '/api/Airport/List'
      , method: 'post'
      , data: data
      , callback: function (error, resp, body) {
        callback(error, body);
      }
    });
  }
};