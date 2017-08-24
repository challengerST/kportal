/**
 * Created by Jeremy on 2017/1/16.
 */
'use strict';
var request = require('../../utils/request').request;
module.exports = {
    //待预审列表
    preList: function (token, data, callback) {
        request(token, {
            url: '/api/CustomBroker/PreCheck'
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
    //待报关列表
    , customList: function (token, data, callback) {
        request(token, {
            url: '/api/CustomBroker/Pending'
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
    //报关中列表
    , declareList: function (token, data, callback) {
        request(token, {
            url: '/api/CustomBroker/Processing'
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
    //报关成功列表
    , passList: function (token, data, callback) {
        request(token, {
            url: '/api/CustomBroker/Success'
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
    //其他列表
    , otherList: function (token, data, callback) {
        request(token, {
            url: '/api/CustomBroker/Exception'
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
    //更改状态
    , changeState: function (token, data, callback) {
        request(token, {
            url: '/api/CustomBroker/Update'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "更改状态失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
};