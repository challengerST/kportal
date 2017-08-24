/**
 * Created by Jeremy on 2017/1/16.
 */
'use strict';
var request = require('../../../utils/request').request;
module.exports = {
    //该货代账单列表
    list: function (token, data, callback) {
        request(token, {
            url: '/api/ChargeBill/Agent/GetList'
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
    //查询账单
    , searchBill: function (token, data, callback) {
        request(token, {
            url: '/api/ChargeBill/Muty/CustomerDetail'
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
    //生成账单
    , createBill: function (token, data, callback) {
        request(token, {
            url: '/api/ChargeBill/Create'
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
    //账单详情
    , billDetail: function (token, data, callback) {
        request(token, {
            url: '/api/ChargeBill/GetChargeBill/' + data
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
    //批量开张
    , batch: function (token, data, callback) {
        request(token, {
            url: '/api/ChargeBill/Muty/GetList'
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
    //批量生成账单
    , createBatch: function (token, data, callback) {
        request(token, {
            url: '/api/ChargeBill/Muty/Create'
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
    //核销账单
    , chargeOff: function (token, data, callback) {
        request(token, {
            url: '/api/ChargeBill/ChargeOff'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "核销失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
};