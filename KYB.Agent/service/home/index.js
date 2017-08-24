/**
 * Created by Jeremy on 2017/1/16.
 */
'use strict';
var request = require('../../utils/request').request;
module.exports = {
    //超时未报关
    wbg: function (token, data, callback) {
        request(token, {
            url: '/api/Statistics/Agent/Order/DeclareList'
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
    //超时未进仓
    , wjc: function (token, data, callback) {
        request(token, {
            url: '/api/Statistics/Agent/Order/CargoInList'
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
    //今日起飞
    , jrqf: function (token, data, callback) {
        request(token, {
            url: '/api/Statistics/Agent/Order/DayList'
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
    //未确认费用
    , wqrfy: function (token, data, callback) {
        request(token, {
            url: '/api/Statistics/Agent/Charge/OverTimeList'
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
    //未支付账单
    , wzfzd: function (token, data, callback) {
        request(token, {
            url: '/api/Statistics/Agent/Bill/OverTimeList'
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
};