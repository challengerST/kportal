/**
 * Created by Auser on 2016/12/4.
 */
"use strict";
var Data = (function () {
  var company = function (data, callback) {
    var _data = {};
    $.ajax({
      url: '/api/search/company'
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
  }
}());
module.exports.Data = Data;