/**
 * Created by Jeremy on 2017/1/16.
 */
'use strict';
var request = require('../../../utils/request').request;
module.exports = {
  //详情
  detail: function (token, data, callback) {
    request(token, {
      url: '/api/CreditConfig/' + data
      , method: 'get'
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
  //更新
  , update: function (token, data, callback) {
    request(token, {
      url: '/api/CreditConfig'
      , method: 'post'
      , data: data
      , callback: function (error, resp, body) {
        var data = body && typeof body == 'object' && 'resCode' in body ? body : {
          resCode: 1,
          resMsg: "修改失败，请重试",
          resBody: null
        };
        callback(error, data);
      }
    });
  }
};