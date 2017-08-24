/**
 * Created by Auser on 2016/12/6.
 */
"use strict";
var Data = (function () {
  var list = function (data, callback) {
    var _data = {};
    $.ajax({
      url: '/api/warehouse/query'
      , type: 'post'
      , dataType: 'json'
      , data: data
      , timeout: 0
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
  }
}());
module.exports.Data = Data;