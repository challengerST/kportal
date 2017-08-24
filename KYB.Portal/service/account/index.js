/**
 * Created by Auser on 2016/11/29.
 */
var request = require('../../utils/request').request;

module.exports = {
  //对账单列表
  list: function (token, data, callback) {
    request(token, {
      url: '/api/ChargeBill/Customer/GetList'
      , method: 'post'
      , data: data
      , callback: function (error, resp, body) {
        callback(error, body);
      }
    });
  }
  //对账单列表
  , detail: function (token, data, callback) {
    request(token, {
      url: '/api/ChargeBill/GetChargeBill/'+ data
      , method: 'get'
      , data: data
      , callback: function (error, resp, body) {
        callback(error, body);
      }
    });
  }
};