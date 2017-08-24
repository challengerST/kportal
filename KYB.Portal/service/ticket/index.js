/**
 * Created by Jeremy on 2016/11/25.
 */
"use strict";
var request = require('../../utils/request').request;

module.exports = {
    //增加开票信息
    add: function (token, data, callback) {
        request(token, {
            url: '/api/Invoice/Add'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    }
    //列表
    , list: function (token, data, callback) {
        request(token, {
            url: '/api/Invoice/List/' + data
            , method: 'get'
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    }
    //删除
    , del: function (token, data, callback) {
        request(token, {
            url: '/api/Invoice/Delete'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    }
    //更新
    , update: function (token, data, callback) {
        request(token, {
            url: '/api/Invoice/Update'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    }
    //开票申请
    , appeal: function (token, data, callback) {
        console.log(data)
        request(token, {
            url: '/api/TaxInvoice/Customer/AddTaxInvoice'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                console.log(body)
                callback(error, body);
            }
        });
    }
};