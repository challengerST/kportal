/**
 * Created by Auser on 2016/12/4.
 */
"use strict";
var Data = (function () {
  var forgetCode = function (data, callback) {
    var _data = {};
    $.ajax({
      url: '/api/login/forgetCode'
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
  var reset = function (data, callback) {
    var _data = {};
    $.ajax({
      url: '/api/login/reset'
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
    reset: reset
    , forgetCode: forgetCode
  }
}());
module.exports.Data = Data;