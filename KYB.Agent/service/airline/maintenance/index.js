/**
 * Created by Jeremy on 2017/1/16.
 */
'use strict';
var request = require('../../../utils/request').request;
module.exports = {
    //添加新节点
    add: function (token, data, callback) {
        request(token, {
            url: '/api/Airway/Add'
            , method: 'post'
            , data: JSON.parse(data)
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
    //添加新节点
    , update: function (token, data, callback) {
        request(token, {
            url: '/api/Airway/Update'
            , method: 'post'
            , data: JSON.parse(data)
            , callback: function (error, resp, body) {
                console.log(body);
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "更新失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
    //删除节点
    , del: function (token, data, callback) {
        request(token, {
            url: '/api/Airway/Delete'
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
    //获取节点详情
    , detail: function (token, data, callback) {
        request(token, {
            url: '/api/Airway/Node/' + data.id
            , method: 'get'
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "获取详情失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
    //获取节点树
    , tree: function (token, data, callback) {
        request(token, {
            url: '/api/Airway/Tree/' + data.cid + '/' + data.code
            , method: 'get'
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "获取航线列表失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
    //添加根节点
    , root: function (token, data, callback) {
        request(token, {
            url: '/api/Airway/Root'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "添加根节点失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
    //航线发布
    , publish: function (token, data, callback) {
        request(token, {
            url: '/api/Airway/Publish'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "航线发布失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
    //获取机场名称
    , getName: function (token, data, callback) {
        request(token, {
            url: '/api/Airport/Search/' + data.key
            , method: 'get'
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
    //获取航空公司
    , getCode: function (token, data, callback) {
        request(token, {
            url: '/api/AirCompany/Search/' + data.key
            , method: 'get'
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
};