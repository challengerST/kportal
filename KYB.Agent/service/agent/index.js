/**
 * Created by liuxufeng on 2017/8/15.
 */
'use strict';
var request = require('../../utils/request').request;
module.exports = {

    //认证审核列表
     pending: function (token, data, callback) {
        request(token, {
            url: '/api/Member/FreightJoinAuditList'
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
    //认证审核日志
    ,list: function (token, data, callback) {
        request(token, {
            url: '/api/Member/FreightJoinAuditLogs'
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
    //审核通过/不通过
    , verify: function (token, data, callback) {
        request(token, {
            url: '/api/Member/FreightApplyAudit'
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
    //获取详情
    , detail: function (token, data, callback) {
        request(token, {
            url: '/api/Member/FreightJoinAuditDetail'
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
    //post /api/Member/CheckCompanyName
    , check: function (token, data, callback) {
        request(token, {
            url: '/api/Member/CheckCompanyName'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "检查失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
};