/**
 * Created by Jeremy on 2017/1/16.
 */
'use strict';
var request = require('../../../utils/request').request;
module.exports = {
    //员工角色列表
    list: function (token, data, callback) {
        request(token, {
            url: '/api/AgentMember/GetList'
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
    //操作员列表
    , opList: function (token, data, callback) {
        request(token, {
            url: '/api/AgentMember/GetOpList'
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
    //新增
    , add: function (token, data, callback) {
        request(token, {
            url: '/api/AgentMember/Create'
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
    //批量启用&禁用
    , multiStates: function (token, data, callback) {
        request(token, {
            url: '/api/AgentMembers/ChangeStates'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "操作失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
    //获取详情
    , detail: function (token, data, callback) {
        request(token, {
            url: '/api/AgentMember/Search/' + data
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
    //获取该用户订单列表
    , orders: function (token, data, callback) {
        request(token, {
            url: '/api/AgentMember/Order/GetOrders'
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
    //更新用户角色
    , update: function (token, data, callback) {
        request(token, {
            url: '/api/AgentMember/Role/Update'
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
    //转移订单
    , transfer: function (token, data, callback) {
        request(token, {
            url: '/api/AgentMember/Order/Transfer'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "转移失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
    //删除员工
    , del: function (token, data, callback) {
        request(token, {
            url: '/api/AgentMember/Removes'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "删除失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
    //重置密码
    , reset: function (token, data, callback) {
        request(token, {
            url: '/api/AgentMember/ResetPwds'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "重置失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
};