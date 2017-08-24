/**
 * Created by Jeremy on 2016/11/24.
 */
"use strict";
var Data = (function () {
    var login = function (data, callback) {
        var _data = {};
        $.ajax({
            url: '/api/login'
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
        login: login
    }
}());
module.exports.Data = Data;