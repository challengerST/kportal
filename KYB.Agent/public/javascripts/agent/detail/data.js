/**
 * Created by Auser on 2016/12/6.
 */
"use strict";
var Data = (function () {

  var check = function (data, callback) {
    var _data = {};
    $.ajax({
      url: '/api/agent/check'
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

  var verify = function (data, callback) {
    var _data = {};
    $.ajax({
      url: '/api/agent/verify'
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
  var img = function (data, callback) {
    var _data = {};
    $.ajax({
      url: '/api/member/detail/img'
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


  var down = function (data, callback) {
    var _data = {};
    $.ajax({
      url: '/api/other/ossDown'
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

  var imageUrl = function (data, callback) {
    var _data = {};
    $.ajax({
      url: '/api/other/imageUrl'
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
     check: check
    , verify: verify
    , img: img
    , down: down
    , imageUrl:imageUrl
  }
}());
module.exports.Data = Data;