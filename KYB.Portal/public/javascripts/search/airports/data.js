/**
 * Created by Auser on 2016/12/4.
 */
"use strict";
var Data = (function () {
  var airports = function (data, callback) {
    var _data = {};
    $.ajax({
      url: '/api/search/airports'
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
    airports: airports
  }
}());
module.exports.Data = Data;