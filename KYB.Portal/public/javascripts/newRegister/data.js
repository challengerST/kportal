/**
 * Created by Jeremy on 2016/11/24.
 */
"use strict";
var Data = (function () {
  var sendText = function (data, callback) {
    var _data = {};
    $.ajax({
      url: '/api/login/sendText'
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
  var nextStep = function (data, callback) {
    var _data = {};
    $.ajax({
      url: '/api/login/nextStep'
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
  var checkSms = function (data, callback) {
    var _data = {};
    $.ajax({
      url: '/api/login/sendSms'
      , type: 'post'
      , data: data
      , dataType: 'json'
      , timeout: 100000
      , success: function (json) {
        console.log(json);
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
    sendText: sendText
    , nextStep: nextStep
    , checkMobile: checkMobile
    , checkSms :checkSms
  }
}());
module.exports.Data = Data;