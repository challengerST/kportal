/**
 * Created by Jeremy on 2017/1/16.
 */
'use strict';
var request = require('../../../utils/request').request;
module.exports = {
    //获取Tact运价分页
    list: function (token, data, callback) {
        request(token, {
            url: '/api/AirwayTact/Search'
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
    //获取单条详情
    , detail: function (token, data, callback) {
        request(token, {
            url: '/api/AirwayTact/Search/' + data
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
    //新增一条
    , add: function (token, data, callback) {
        request(token, {
            url: '/api/AirwayTact/Add'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "新增失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
    //新增一条
    , update: function (token, data, callback) {
        request(token, {
            url: '/api/AirwayTact/Update'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "新增失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
};