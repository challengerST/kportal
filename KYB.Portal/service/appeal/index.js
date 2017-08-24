/**
 * Created by Jeremy on 2016/11/25.
 */
"use strict";
var request = require('../../utils/request').request;

module.exports = {
    //列表
    list: function (token, data, callback) {
        request(token, {
            url: '/api/TaxInvoice/Customer/Tax/Search'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    }
    //详情
    , detail: function (token, data, callback) {
        request(token, {
            url: '/api/TaxInvoice/Detail/' + data
            , method: 'get'
            , data: data
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    }
};