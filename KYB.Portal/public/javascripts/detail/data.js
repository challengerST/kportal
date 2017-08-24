/**
 * Created by Auser on 2016/12/6.
 */
"use strict";
var Data = (function () {
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
    var refuse = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/order/refuse'
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
    var entry = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/order/entry'
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
    var down = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/down/ossDown'
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
    var addFile = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/orderFile/add'
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
            url: '/api/orderFile/remove'
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
    var fileList = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/orderFile/list'
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
            url: '/api/airline/aircom'
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
    var airport = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/airline/airport'
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
    var gpSearch = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/order/gpSearch'
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
    var submitChange = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/order/submitChange'
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
    var personAdd = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/order/personAdd'
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
    //分单添加收发货人信息
    var subOrderpersonAdd = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/order/subOrderpersonAdd'
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
    var contactList = function (data, callback) {
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
    var warehouse = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/order/detail'
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
    var companyDetail = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/order/companyDetail'
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
    var declareData = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/order/declareData'
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
    var track = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/order/track'
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
    var orderDetail = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/order/orderDetail'
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
    //分单费用数据引入
    var zfexpenseTem = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/airline/zFexpenseTem'
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
    var changeName = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/order/changeName'
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
        extra: extra
        , refuse: refuse
        , entry: entry
        , personAdd: personAdd
        , down: down
        , up: up
        , ossUpload: ossUpload
        , addFile: addFile
        , removeFile: removeFile
        , fileList: fileList
        , airport: airport
        , getCode: getCode
        , gpSearch: gpSearch
        , submitChange: submitChange
        , contactList: contactList
        , warehouse: warehouse
        , companyDetail: companyDetail
        , track: track
        , declareData: declareData
        , orderDetail: orderDetail
        , changeName: changeName
        , expenseTex: expenseTex
        ,zfexpenseTem:zfexpenseTem
    }
}());
module.exports.Data = Data;