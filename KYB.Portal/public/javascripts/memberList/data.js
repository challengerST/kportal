/**
 * Created by Jeremy on 2016/11/24.
 */
"use strict";
var Data = (function () {
  var checkMobile = function (data, callback) {
    var _data = {};
    $.ajax({
      url: '/api/login/checkMobile'
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
  var role = function (callback) {
    var _data = {};
    $.ajax({
      url: '/api/member/role'
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
  var list = function (data, callback) {
    var _data = {};
    $.ajax({
      url: '/api/member/list'
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
  var multiStates = function (data, callback) {
    var _data = {};
    $.ajax({
      url: '/api/member/multiStates'
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
  var add = function (data, callback) {
    var _data = {};
    $.ajax({
      url: '/api/member/add'
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
    checkMobile: checkMobile
    , role: role
    , list: list
    , multiStates: multiStates
    , add: add
  }
}());
module.exports.Data = Data;