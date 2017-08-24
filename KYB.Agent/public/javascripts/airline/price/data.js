/**
 * Created by Auser on 2016/12/6.
 */
"use strict";
var Data = (function () {
  var list = function (callback) {
    var _data = {};
    $.ajax({
      url: '/api/airline/price/list'
      , type: 'post'
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
  var add = function (data, callback) {
    var _data = {};
    $.ajax({
      url: '/api/airline/price/add'
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
  var del = function (data, callback) {
    var _data = {};
    $.ajax({
      url: '/api/airline/price/del'
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
  var def = function (data, callback) {
    var _data = {};
    $.ajax({
      url: '/api/airline/price/def'
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
  var detail = function (data, callback) {
    var _data = {};
    $.ajax({
      url: '/api/airline/price/detail'
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
  var update = function (data, callback) {
    var _data = {};
    $.ajax({
      url: '/api/airline/price/update'
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
    list: list
    , add: add
    , del: del
    , def: def
    , detail: detail
    , update: update
  }
}());
module.exports.Data = Data;