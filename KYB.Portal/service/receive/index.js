/**
 * Created by Auser on 2016/11/29.
 */
var request = require('../../utils/request').request;
module.exports = {
  //收发货人列表
  list: function (token, data, callback) {
    request(token, {
      url: '/api/Contact/PageList'
      , method: 'post'
      , data: data
      , callback: function (error, resp, body) {
        callback(error, body);
      }
    });
  },
  //修改收发货人信息
  update: function (token, data, callback) {
    request(token, {
      url: '/api/Contact/Update'
      , method: 'post'
      , data: data
      , callback: function (error, resp, body) {
        callback(error, body);
      }
    });
  },
  //新增收发货人信息
  add: function (token, data, callback) {
    request(token, {
      url: '/api/Contact/Add'
      , method: 'post'
      , data: data
      , callback: function (error, resp, body) {
        callback(error, body);
      }
    });
  },
  //获取收发货人详情
  detail: function (token, data, callback) {
    request(token, {
      url: '/api/Contact/' + data.id
      , method: 'get'
      , data: data
      , callback: function (error, resp, body) {
        callback(error, body);
      }
    });
  },
  //单条删除
  del: function (token, data, callback) {
    request(token, {
      url: '/api/Contact/Delete'
      , method: 'post'
      , data: data
      , callback: function (error, resp, body) {
        callback(error, body);
      }
    });
  },
  //单条删除
  multiAdd: function (token, data, callback) {
    request(token, {
      url: '/api/BackGround/ContactImport'
      , method: 'post'
      , data: data
      , callback: function (error, resp, body) {
        callback(error, body);
      }
    });
  }
};