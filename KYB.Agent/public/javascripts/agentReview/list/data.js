/**
 * Created by Auser on 2016/12/6.
 */
"use strict";
var Data = (function () {
    var checkTel = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/account/checkTel'
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
    var checkName = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/account/checkName'
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
    var list = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/member/list/search'
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
    var state = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/member/list/state'
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
    var add = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/member/list/add'
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
    var excelReader = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/other/excelReader'
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
            url: '/api/member/list/multiAdd'
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
        checkTel: checkTel
        , checkName: checkName
        , level: level
        , list: list
        , state: state
        , add: add
        , up: up
        , ossUpload: ossUpload
        , excelReader: excelReader
        , multiAdd: multiAdd
    }
}());
module.exports.Data = Data;