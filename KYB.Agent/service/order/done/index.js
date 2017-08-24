/**
 * Created by Jeremy on 2017/1/16.
 */
'use strict';
var request = require('../../../utils/request').request;
module.exports = {
  //已结束列表
  list: function (token, data, callback) {
    request(token, {
      url: '/api/AirwayOrder/Closed'
      , method: 'post'
      , data: data
      , callback: function (error, resp, body) {
        var data = body && typeof body == 'object' && 'resCode' in body ? body : {
          resCode: 1,
          resMsg: "获取失败，请重试",
          resBody: null
        };
        callback(error, data);
      }
    });
  }
  //创建费用信息
  , createCharge: function (token, data, callback) {
    request(token, {
      url: '/api/OrderCharge/Create'
      , method: 'post'
      , data: data
      , callback: function (error, resp, body) {
        var data = body && typeof body == 'object' && 'resCode' in body ? body : {
          resCode: 1,
          resMsg: "获取失败，请重试",
          resBody: null
        };
        callback(error, data);
      }
    });
  }
};