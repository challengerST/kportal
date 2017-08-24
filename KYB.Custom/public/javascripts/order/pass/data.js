/**
 * Created by Auser on 2016/12/6.
 */
"use strict";
var Data = (function () {
    var list = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/order/passList'
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
    var changeState = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/order/changeState'
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
    var up = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/other/ossUp'
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
    var orderFile = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/orderFile/list'
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
    var addFile = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/orderFile/add'
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
    var removeFile = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/orderFile/remove'
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
        , changeState: changeState
        , down: down
        , up: up
        , ossUpload: ossUpload
        , orderFile: orderFile
        , addFile: addFile
        , removeFile: removeFile
    }
}());
module.exports.Data = Data;