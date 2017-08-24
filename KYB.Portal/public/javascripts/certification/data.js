/**
 * Created by Jeremy on 2016/11/24.
 */
"use strict";
var Data = (function () {
  var editor = function (data, callback) {
    var _data = {};
    $.ajax({
      url: '/api/login/editor'
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
  var up = function (data, callback) {
    var _data = {};
    $.ajax({
      url: '/api/down/ossUp'
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
  var ossUpload = function (param, data, callback) {
    var _data = {};
    var formdata = new FormData();
    formdata.append("OSSAccessKeyId", param.AccessKeyId);
    formdata.append("policy", param.Policy);
    formdata.append("Signature", param.Signature);
    formdata.append("key", param.Keyname);
    formdata.append("Content-Disposition", "attachment;filename=\"" + data.name + "\"");
    formdata.append("file", data);
    $.ajax({
      url: param.UploadURL
      , data: formdata
      , processData: false
      , cache: false
      , async: false
      , contentType: false
      , type: 'post'
      , timeout: 100000
      , success: function () {
        _data = {
          status: 1
        }
      }, error: function () {
        _data = {
          status: -1
        }
      }, complete: function () {
        if (callback && callback instanceof Function) {
          callback(_data);
        }
      }
    });
  };
  var auth = function (data, callback) {
    var _data = {};
    $.ajax({
      url: '/api/login/auth'
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
  var addFile = function (data, callback) {
    var _data = {};
    $.ajax({
      url: '/api/login/addFile'
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
  var uploadQy=function (data, callback) {
    var _data = {};
    $.ajax({
      url: '/api/login/uploadQy'
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
  var removeFile = function (data, callback) {
    var _data = {};
    $.ajax({
      url: '/api/login/removeFile'
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
    editor: editor
    , up: up
    , ossUpload: ossUpload
    , auth: auth
    , addFile: addFile
    , removeFile: removeFile
    ,uploadQy :uploadQy
  }
}());
module.exports.Data = Data;