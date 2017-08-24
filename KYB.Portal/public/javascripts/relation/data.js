/**
 * Created by Jeremy on 2016/11/24.
 */
"use strict";
var Data = (function () {
    var list = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/receive'
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
    var update = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/receive/update'
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
    var add = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/receive/add'
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
    var del = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/receive/del'
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
    var excelReader = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/receive/excelReader'
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
    var multiAdd = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/receive/multiAdd'
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
        , update: update
        , add: add
        , del: del
        , up: up
        , ossUpload: ossUpload
        , excelReader: excelReader
        , multiAdd: multiAdd
    }
}());
module.exports.Data = Data;