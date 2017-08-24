/**
 * Created by Jeremy on 2017/1/16.
 */
'use strict';
var request = require('../../../utils/request').request;
module.exports = {
    //进行中列表
    list: function (token, data, callback) {
        request(token, {
            url: '/api/AirwayOrder/Processing'
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
    //更新航班信息
    , update: function (token, data, callback) {
        request(token, {
            url: '/api/AirwayOrder/Agent/UpdateAirlineInfo'
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
    //更新品名信息
    , pmxg: function (token, data, callback) {
        request(token, {
            url: '/api/AirwayOrder/Agent/UpdateGoodsInfo'
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
    //报关
    , bg: function (token, data, callback) {
        request(token, {
            url: '/api/AirwayOrder/Custom/Update'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "确认失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
    //查验
    , cy: function (token, data, callback) {
        request(token, {
            url: '/api/AirwayOrder/Check/Update'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "确认失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
    //运输
    , ys: function (token, data, callback) {
        request(token, {
            url: '/api/AirwayOrder/Transport/Update'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "确认失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
    //改配
    , gp: function (token, data, callback) {
        request(token, {
            url: '/api/AirwayOrder/Change'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "确认失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
};