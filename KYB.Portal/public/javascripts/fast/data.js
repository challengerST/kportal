/**
 * Created by Jeremy on 2016/11/24.
 */
"use strict";
var Data = (function () {
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
  var order = function (data, callback) {
    var _data = {};
    $.ajax({
      url: '/api/order/fastSubmit'
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
  var fastSearch = function (data, callback) {
    var _data = {};
    $.ajax({
      url: '/api/airline/fastSearch'
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
  var fastExtra = function (data, callback) {
    var _data = {};
    $.ajax({
      url: '/api/airline/fastExtra'
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
  var fastPrice = function (data, callback) {
    var _data = {};
    $.ajax({
      url: '/api/airline/fastPrice'
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
    airport: airport
    , order: order
    , getCode: getCode
    , fastSearch: fastSearch
    , fastExtra: fastExtra
    , fastPrice: fastPrice
  }
}());
module.exports.Data = Data;