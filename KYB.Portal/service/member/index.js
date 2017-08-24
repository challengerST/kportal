/**
 * Created by Auser on 2016/11/29.
 */
var request = require('../../utils/request').request;

module.exports = {
    //获取角色列表
    role: function (token, data, callback) {
        request(token, {
            url: '/api/Roles/GetRoleList?type=' + data.type
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    }
    //获取员工列表
    , list: function (token, data, callback) {
        request(token, {
            url: '/api/Member/GetList'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    }
    //获取员工订单
    , orders: function (token, data, callback) {
        request(token, {
            url: '/api/Member/Order/GetOrders'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    }
    //启用&禁用
    , state: function (token, data, callback) {
        request(token, {
            url: '/api/Member/ChangeState'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    }
    //批量启用&禁用
    , multiStates: function (token, data, callback) {
        request(token, {
            url: '/api/Member/ChangeStates'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    }
    //新增会员
    , add: function (token, data, callback) {
        request(token, {
            url: '/api/Member/AddMember'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    }
    //转移订单
    , transfer: function (token, data, callback) {
        request(token, {
            url: '/api/Member/Order/Transfer'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    }
    //更新角色
    , update: function (token, data, callback) {
        request(token, {
            url: '/api/Member/Role/Update'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    }
    //会员详情
    , detail: function (token, data, callback) {
        request(token, {
            url: '/api/Member/' + data
            , method: 'get'
            , data: data
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    }
    //等级详情
    , level: function (token, data, callback) {
        request(token, {
            url: '/api/CreditConfig/' + data
            , method: 'get'
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