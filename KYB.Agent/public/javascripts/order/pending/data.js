/**
 * Created by Auser on 2016/12/6.
 */
"use strict";
var Data = (function () {
    var list = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/order/pending/list'
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
    var log = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/order/pending/log'
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
    var storage = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/order/pending/storage'
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
    var addData = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/order/pending/addData'
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
    var ensureData = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/order/pending/ensureData'
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
    var bgUpdate = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/order/pending/bgUpdate'
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
    var calculate = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/order/pending/calculate'
            , type: 'post'
            , dataType: 'json'
            , timeout: 100000
            , data: data
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
    var search = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/order/pending/airlineSearch'
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
    var order = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/order/pending/order'
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
    var customer = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/order/pending/customer'
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
    var cancel = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/order/pending/cancel'
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
    var confirm = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/order/pending/confirm'
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
    var createCharge = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/order/done/createCharge'
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
    var ydSearch = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/order/pending/ydSearch'
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
    var ydExist = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/order/pending/ydExist'
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
    var ydNew = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/order/pending/ydNew'
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
    var transfer = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/staff/list/transfer'
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
    var opList = function (callback) {
        var _data = {};
        $.ajax({
            url: '/api/staff/list/opList'
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
    return {
        list: list
        , getName: getName
        , getCode: getCode
        , storage: storage
        , addData: addData
        , ensureData: ensureData
        , bgUpdate: bgUpdate
        , warehouse: warehouse
        , priceList: priceList
        , calculate: calculate
        , search: search
        , order: order
        , customer: customer
        , cancel: cancel
        , createCharge: createCharge
        , confirm: confirm
        , ydSearch: ydSearch
        , ydExist: ydExist
        , ydNew: ydNew
        , opList: opList
        , transfer: transfer
        , log: log
    }
}());
module.exports.Data = Data;