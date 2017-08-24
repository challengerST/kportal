/**
 * Created by Jeremy on 2017/1/16.
 */
'use strict';
var request = require('../../../utils/request').request;
module.exports = {
  //新增费用模板
  add: function (token, data, callback) {
    request(token, {
      url: '/api/ExpenseTemplate/Add'
      , method: 'post'
      , data: data
      , callback: function (error, resp, body) {
        var data = body && typeof body == 'object' && 'resCode' in body ? body : {
          resCode: 1,
          resMsg: "新增失败，请重试",
          resBody: null
        };
        callback(error, data);
      }
    });
  }
  //删除费用模板
  , del: function (token, data, callback) {
    request(token, {
      url: '/api/ExpenseTemplate/Remove'
      , method: 'post'
      , data: data
      , callback: function (error, resp, body) {
        var data = body && typeof body == 'object' && 'resCode' in body ? body : {
          resCode: 1,
          resMsg: "删除失败，请重试",
          resBody: null
        };
        callback(error, data);
      }
    });
  }
  //更新费用模板
  , update: function (token, data, callback) {
    request(token, {
      url: '/api/ExpenseTemplate/Update'
      , method: 'post'
      , data: data
      , callback: function (error, resp, body) {
        var data = body && typeof body == 'object' && 'resCode' in body ? body : {
          resCode: 1,
          resMsg: "删除失败，请重试",
          resBody: null
        };
        callback(error, data);
      }
    });
  }
  //指定模板详情
  , detail: function (token, data, callback) {
    request(token, {
      url: '/api/ExpenseTemplate/' + data
      , method: 'get'
      , callback: function (error, resp, body) {
        var data = body && typeof body == 'object' && 'resCode' in body ? body : {
          resCode: 1,
          resMsg: "获取详情失败，请重试",
          resBody: null
        };
        callback(error, data);
      }
    });
  }
  //设置默认模板
  , def: function (token, data, callback) {
    request(token, {
      url: '/api/ExpenseTemplate/Default'
      , method: 'post'
      , data: data
      , callback: function (error, resp, body) {
        var data = body && typeof body == 'object' && 'resCode' in body ? body : {
          resCode: 1,
          resMsg: "获取详情失败，请重试",
          resBody: null
        };
        callback(error, data);
      }
    });
  }
  //费用模板列表
  , list: function (token, data, callback) {
    request(token, {
      url: '/api/ExpenseTemplate/Company/' + data
      , method: 'get'
      , callback: function (error, resp, body) {
        var data = body && typeof body == 'object' && 'resCode' in body ? body : {
          resCode: 1,
          resMsg: "获取详情失败，请重试",
          resBody: null
        };
        callback(error, data);
      }
    });
  }
};