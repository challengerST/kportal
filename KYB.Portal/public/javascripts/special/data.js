/**
 * Created by Jeremy on 2016/11/24.
 */
"use strict";
var Data = (function () {
  var company = function (data, callback) {
    var _data = {};
    $.ajax({
      url: '/api/airline/company'
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
  var getArea = function (data, callback) {
    var _data = {};
    $.ajax({
      url: '/api/airline/getArea'
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
  var detail = function (data, callback) {
    var _data = {};
    $.ajax({
      url: '/api/airline/detail'
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
  var extra = function (data, callback) {
    var _data = {};
    $.ajax({
      url: '/api/airline/extra'
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
  var history = function (data, callback) {
    var _data = {};
    $.ajax({
      url: '/api/airline/history'
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
  //费用数据引入
  var expenseTex = function (data, callback) {
    var _data = {};
    $.ajax({
      url: '/api/airline/expensetExmplate'
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
    company: company
    , detail: detail
    , getArea: getArea
    , calculate: calculate
    , order: order
    , extra: extra
    , history: history
    ,expenseTex : expenseTex
  }
}());
module.exports.Data = Data;