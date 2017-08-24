/**
 * Created by Jeremy on 2016/11/24.
 */
"use strict";
var Data = (function () {
  var warehouse = function (data, callback) {
    var _data = {};
    $.ajax({
      url: '/api/order/detail'
      , type: 'post'
      , data: data
      , dataType: 'json'
      , timeout: 100000
      , success: function (json) {
        if (json && "resCode" in json) {
          _data = json;
        } else {
          _data = {};
        }
      }, complete: function () {
        if (callback && callback instanceof Function) {
          callback(_data);
        }
      }
    });
  };
  var ossDown = function (data, callback) {
    var _data = {};
    $.ajax({
      url: '/api/down/ossDown'
      , type: 'post'
      , dataType: 'json'
      , data: data
      , timeout: 100000
      , success: function (json) {
        if (json && "resCode" in json) {
          _data = json;
        } else {
          _data = {};
        }
      }, complete: function () {
        if (callback && callback instanceof Function) {
          callback(_data);
        }
      }
    });
  };
  return {
    warehouse: warehouse
    , ossDown: ossDown
  }
}());
module.exports.Data = Data;