/**
 * Created by Jeremy on 2017/1/16.
 */
'use strict';
var request = require('../../../utils/request').request;
module.exports = {
    //航线搜索
    search: function (token, data, callback) {
        request(token, {
            url: '/api/Airway/Search'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "搜索失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
    //新增拼货
    , add: function (token, data, callback) {
        request(token, {
            url: '/api/Airway/Lcl/Create'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "搜索失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
    //更新拼货
    , update: function (token, data, callback) {
        request(token, {
            url: '/api/Airway/Lcl/Update'
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
    //拼货列表
    , list: function (token, data, callback) {
        request(token, {
            url: '/api/Airway/Lcl/Search'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "搜索失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
    //拼货详情
    , detail: function (token, data, callback) {
        request(token, {
            url: '/api/Airway/Lcl/' + data
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
};