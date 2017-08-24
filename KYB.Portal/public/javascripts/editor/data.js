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
    var sendMail = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/login/sendMail'
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
        , sendMail: sendMail
    }
}());
module.exports.Data = Data;