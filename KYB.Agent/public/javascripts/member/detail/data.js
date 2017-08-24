/**
 * Created by Auser on 2016/12/6.
 */
"use strict";
var Data = (function () {
  var level = function (callback) {
    var _data = {};
    $.ajax({
      url: '/api/member/level/level'
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
  var credit = function (data, callback) {
    var _data = {};
    $.ajax({
      url: '/api/member/detail/credit'
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
  var setLevel = function (data, callback) {
    var _data = {};
    $.ajax({
      url: '/api/member/detail/level'
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
      url: '/api/member/detail/update'
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
  var invoiceList = function (data, callback) {
    var _data = {};
    $.ajax({
      url: '/api/member/detail/invoiceList'
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
  var removeImg = function (data, callback) {
    var _data = {};
    $.ajax({
      url: '/api/member/detail/removeImg'
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
  return {
    level: level
    , credit: credit
    , setLevel: setLevel
    , update: update
    , img: img
    , invoiceList: invoiceList
    , removeImg: removeImg
    , down: down
  }
}());
module.exports.Data = Data;