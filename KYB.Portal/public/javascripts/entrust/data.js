/**
 * Created by Jeremy on 2016/11/24.
 */
"use strict";
var Data = (function () {
  var calculate = function (data, callback) {
    var _data = {};
    $.ajax({
      url: '/api/airline/calculate'
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
  var order = function (data, callback) {
    var _data = {};
    $.ajax({
      url: '/api/order/submit'
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
  var fhDetail = function (data, callback) {
    var _data = {};
    $.ajax({
      url: '/api/order/fhDetail'
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
  return {
    calculate: calculate
    , order: order
    , fhDetail: fhDetail
  }
}());
module.exports.Data = Data;