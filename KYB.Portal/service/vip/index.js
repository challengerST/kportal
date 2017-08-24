/**
 * Created by Jeremy on 2016/11/25.
 */
"use strict";
var request = require('../../utils/request').request;

module.exports = {
  //公司信息
  info: function (token, data, callback) {
    request(token, {
      url: '/api/Member/' + data
      , method: 'get'
      , callback: function (error, resp, body) {
        callback(error, body);
      }
    });
  }
  //订单详情
  , detail: function (token, data, callback) {
    request(token, {
      url: '/api/AirwayOrder/Member/Detail'
      , method: 'post'
      , data: data
      , callback: function (error, resp, body) {
        callback(error, body);
      }
    });
  }
  //订单数量、金额
  , centerInfo: function (token, data, callback) {
    request(token, {
      url: '/api/UserCenter/GetUserCenterInfo'
      , method: 'post'
      , data: data
      , callback: function (error, resp, body) {
        callback(error, body);
      }
    });
  }
};