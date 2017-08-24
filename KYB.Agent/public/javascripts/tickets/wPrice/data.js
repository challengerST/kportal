/**
 * Created by Auser on 2016/12/6.
 */
"use strict";
var Data = (function () {
    var list = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/tickets/invoice/wareHouse'
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
    var wlist = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/warehouse/list'
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
        , wlist: wlist
    }
}());
module.exports.Data = Data;