/**
 * Created by Jeremy on 2017/1/16.
 */
'use strict';
var request = require('../../../utils/request').request;
module.exports = {
    //该货代下属费用列表
    list: function (token, data, callback) {
        request(token, {
            url: '/api/OrderCharge/SearchAgentChargeList'
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
    //获取详情
    , detail: function (token, data, callback) {
        request(token, {
            url: '/api/OrderCharge/Search/' + data
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
    //更新费用
    , update: function (token, data, callback) {
        console.log(data)
        request(token, {
            url: '/api/OrderCharge/Update'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "更新失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
    //确认费用
    , ensure: function (token, data, callback) {
        request(token, {
            url: '/api/OrderCharge/UpdateState'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "更新失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
    //其他费用
    , exPrice: function (token, data, callback) {
        request(token, {
            url: '/api/OrderCharge/GetFeeNames/' + data
            , method: 'get'
            , data: data
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "更新失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
};