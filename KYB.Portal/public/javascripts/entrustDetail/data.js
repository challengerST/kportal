/**
 * Created by Auser on 2016/12/6.
 */
"use strict";
var Data = (function () {
    var ensure = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/bill/ensure'
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
        ensure: ensure
    }
}());
module.exports.Data = Data;