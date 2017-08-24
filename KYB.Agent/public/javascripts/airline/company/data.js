/**
 * Created by Auser on 2016/12/6.
 */
"use strict";
var Data = (function () {
    var getName = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/airline/manage/getName'
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
    var getCode = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/airline/manage/getCode'
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
    var priceList = function (callback) {
        var _data = {};
        $.ajax({
            url: '/api/airline/price/list'
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
    var warehouse = function (callback) {
        var _data = {};
        $.ajax({
            url: '/api/warehouse/list'
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
    var add = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/airline/company/add'
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
    var list = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/airline/company/list'
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
    var del = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/airline/company/del'
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
    var detail = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/airline/company/detail'
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
            url: '/api/airline/company/update'
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
    var addFile = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/airline/company/addFile'
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
    var delFile = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/airline/company/delFile'
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
        getName: getName
        , getCode: getCode
        , priceList: priceList
        , warehouse: warehouse
        , add: add
        , list: list
        , del: del
        , detail: detail
        , update: update
        , down: down
        , up: up
        , ossUpload: ossUpload
        , addFile: addFile
        , delFile: delFile
    }
}());
module.exports.Data = Data;