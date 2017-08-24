/**
 * Created by Jeremy on 2016/11/24.
 */
"use strict";
var Data = (function () {
    var add = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/ticket/add'
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
    var list = function (callback) {
        var _data = {};
        $.ajax({
            url: '/api/ticket/list'
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
    var del = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/ticket/del'
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
            url: '/api/ticket/update'
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
        add: add
        , list: list
        , del: del
        , update: update
    }
}());
module.exports.Data = Data;