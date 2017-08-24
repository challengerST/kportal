/**
 * Created by Jeremy on 2016/11/24.
 */
"use strict";
var Data = (function () {
  var airline = function (data, callback) {
    var _data = {};
    $.ajax({
      url: '/api/airline/search'
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
  var airport = function (data, callback) {
    var _data = {};
    $.ajax({
      url: '/api/airline/airport'
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
  var getCode = function (data, callback) {
    var _data = {};
    $.ajax({
      url: '/api/airline/aircom'
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
    airline: airline
    , airport: airport
    , getCode: getCode
  }
}());
module.exports.Data = Data;