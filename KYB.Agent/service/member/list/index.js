/**
 * Created by Jeremy on 2017/1/16.
 */
'use strict';
var request = require('../../../utils/request').request;
module.exports = {
  //搜索会员列表
  search: function (token, data, callback) {
    request(token, {
      url: '/api/Customer/Search'
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
  //认证审核列表
  , pending: function (token, data, callback) {
    request(token, {
      url: '/api/Customer/Pending'
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
  //启用/停用
  , state: function (token, data, callback) {
    request(token, {
      url: '/api/Customer/State'
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
  //启用/停用
  , verify: function (token, data, callback) {
    request(token, {
      url: '/api/Customer/Verify'
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
  //添加
  , add: function (token, data, callback) {
    request(token, {
      url: '/api/Customer/Add'
      , method: 'post'
      , data: data
      , callback: function (error, resp, body) {
        var data = body && typeof body == 'object' && 'resCode' in body ? body : {
          resCode: 1,
          resMsg: "添加失败，请重试",
          resBody: null
        };
        callback(error, data);
      }
    });
  }
  //批量添加
  , multiAdd: function (token, data, callback) {
    request(token, {
      url: '/api/BackGround/CompanyImport'
      , method: 'post'
      , data: data
      , callback: function (error, resp, body) {
        var data = body && typeof body == 'object' && 'resCode' in body ? body : {
          resCode: 1,
          resMsg: "添加失败，请重试",
          resBody: null
        };
        callback(error, data);
      }
    });
  }
  //获取详情
  , detail: function (token, data, callback) {
    request(token, {
      url: '/api/Customer/' + data
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
};