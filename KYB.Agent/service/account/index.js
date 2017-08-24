/**
 * Created by Jeremy on 2017/1/16.
 */
'use strict';
var request = require('../../utils/request').request;
module.exports = {
    //登录
    login: function (token, data, callback) {
        request(token, {
            url: '/api/AgentMember/Login'
            , method: 'post'
            , data: {mobile: data.id, password: data.pwd}
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body && body.resBody && 'agentCompany' in body.resBody && body.resBody.agentCompany && body.resBody.agentCompany.companyType != 17 ? body : (body.resCode == -1 ? body : {
                    resCode: 1,
                    resMsg: "登录失败，请重试",
                    resBody: null
                });
                callback(error, data);
            }
        });
    }
    //检查手机号
    , checkTel: function (token, data, callback) {
        request(token, {
            url: '/api/Member/Exist/' + data
            , method: 'get'
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "查询失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
    //检查公司名
    , checkName: function (token, data, callback) {
        request(token, {
            url: '/api/Customer/Name'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "查询失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
    //修改密码
    , changePwd: function (token, data, callback) {
        request(token, {
            url: '/api/AgentMember/ChangePwd'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "修改失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
};