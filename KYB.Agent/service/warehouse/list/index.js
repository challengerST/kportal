/**
 * Created by Jeremy on 2017/1/16.
 */
'use strict';
var request = require('../../../utils/request').request;
module.exports = {
    //获取仓库列表
    list: function (token, data, callback) {
        request(token, {
            url: '/api/Warehouse/Company'
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
    //增加仓库信息
    , add: function (token, data, callback) {
        request(token, {
            url: '/api/Warehouse/Add'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "添加失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
    //修改仓库信息
    , update: function (token, data, callback) {
        console.log(data)
        request(token, {
            url: '/api/Warehouse/Update'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                console.log(body)
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "更新失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
    //删除仓库信息
    , del: function (token, data, callback) {
        request(token, {
            url: '/api/Warehouse/Remove'
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
    //设置默认仓库
    , def: function (token, data, callback) {
        request(token, {
            url: '/api/Warehouse/Default'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "设置失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
};