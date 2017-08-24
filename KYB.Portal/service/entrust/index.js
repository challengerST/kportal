/**
 * Created by Auser on 2016/11/29.
 */
var request = require('../../utils/request').request;

module.exports = {
  //获取委托书
  list: function (token, data, callback) {
    console.log(data)
    request(token, {
      url: '/api/PreOrder/PageList'
      , method: 'post'
      , data: data
      , callback: function (error, resp, body) {
        callback(error, body);
      }
    });
  }
};