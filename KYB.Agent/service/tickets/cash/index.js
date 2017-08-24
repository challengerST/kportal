/**
 * Created by Jeremy on 2017/1/16.
 */
'use strict';
var request = require('../../../utils/request').request;
module.exports = {
    //公司统计信息
    sum: function (token, data, callback) {
        request(token, {
            url: '/api/Customer/Company/Credit/Sum/' + data
            , method: 'get'
            , data: data
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "获取失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
    //返现记录
    , history: function (token, data, callback) {
        request(token, {
            url: '/api/Customer/Company/Credit/List'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "获取失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
    //确认返现
    , ensure: function (token, data, callback) {
        request(token, {
            url: '/api/Customer/Company/Credit/Cash'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "获取失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
    //审核列表
    , list: function (token, data, callback) {
        request(token, {
            url: '/api/Customer/Agent/Credit/List'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "获取失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
    //审核
    , state: function (token, data, callback) {
        request(token, {
            url: '/api/Customer/Company/Credit/ConfirmCash'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "审核失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
};