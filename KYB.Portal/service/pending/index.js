/**
 * Created by Jeremy on 2016/11/25.
 */
"use strict";
var request = require('../../utils/request').request;

module.exports = {
  //待处理列表
  list: function (token, data, callback) {
    request(token, {
      url: '/api/AirwayOrder/Pending'
      , method: 'post'
      , data: data
      , callback: function (error, resp, body) {
        var data = body && typeof body == 'object' && 'resCode' in body ? body : {
          resCode: 1,
          resMsg: "搜索失败，请重试",
          resBody: null
        };
        callback(error, data);
      }
    });
  }
};