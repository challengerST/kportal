/**
 * Created by Jeremy on 2017/1/16.
 */
'use strict';
var request = require('../../../utils/request').request;
module.exports = {
  //设置信用额度
  credit: function (token, data, callback) {
    request(token, {
      url: '/api/Customer/Credit'
      , method: 'post'
      , data: data
      , callback: function (error, resp, body) {
        var data = body && typeof body == 'object' && 'resCode' in body ? body : {
          resCode: 1,
          resMsg: "设置失败，请重试",
          resBody: null
        };
        callback(error, data);
      }
    });
  }
  //设置等级
  , level: function (token, data, callback) {
    request(token, {
      url: '/api/Customer/Level'
      , method: 'post'
      , data: data
      , callback: function (error, resp, body) {
        var data = body && typeof body == 'object' && 'resCode' in body ? body : {
          resCode: 1,
          resMsg: "设置失败，请重试",
          resBody: null
        };
        callback(error, data);
      }
    });
  }
  //更新公司信息
  , update: function (token, data, callback) {
    request(token, {
      url: '/api/Customer/Update'
      , method: 'post'
      , data: data
      , callback: function (error, resp, body) {
        var data = body && typeof body == 'object' && 'resCode' in body ? body : {
          resCode: 1,
          resMsg: "更新失败，请重试",
          resBody: null
        };
        callback(error, data);
      }
    });
  }
  //获取公司资料
  , img: function (token, data, callback) {
    request(token, {
      url: '/api/CompanyFile/' + data
      , method: 'get'
      , data: data
      , callback: function (error, resp, body) {
        var data = body && typeof body == 'object' && 'resCode' in body ? body : {
          resCode: 1,
          resMsg: "更新失败，请重试",
          resBody: null
        };
        callback(error, data);
      }
    });
  }
  //删除公司资料
  , removeImg: function (token, data, callback) {
    request(token, {
      url: '/api/CompanyFile/Remove'
      , method: 'post'
      , data: data
      , callback: function (error, resp, body) {
        var data = body && typeof body == 'object' && 'resCode' in body ? body : {
          resCode: 1,
          resMsg: "更新失败，请重试",
          resBody: null
        };
        callback(error, data);
      }
    });
  },
  //开票资料
  list: function (token, data, callback) {
    request(token, {
      url: '/api/Invoice/List/' + data
      , method: 'get'
      , callback: function (error, resp, body) {
        callback(error, body);
      }
    });
  }
};