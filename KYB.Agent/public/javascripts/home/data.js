/**
 * Created by Auser on 2016/12/6.
 */
"use strict";
var Data = (function () {
    var wbg = function (callback) {
        var _data = {};
        $.ajax({
            url: '/api/home/wbg'
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
    var wjc = function (callback) {
        var _data = {};
        $.ajax({
            url: '/api/home/wjc'
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
    var jrqf = function (callback) {
        var _data = {};
        $.ajax({
            url: '/api/home/jrqf'
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
    var wqrfy = function (callback) {
        var _data = {};
        $.ajax({
            url: '/api/home/wqrfy'
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
    var wzfzd = function (callback) {
        var _data = {};
        $.ajax({
            url: '/api/home/wzfzd'
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
        wbg: wbg
        , wjc: wjc
        , jrqf: jrqf
        , wqrfy: wqrfy
        , wzfzd: wzfzd
    }
}());
module.exports.Data = Data;