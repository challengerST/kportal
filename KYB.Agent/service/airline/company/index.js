/**
 * Created by Jeremy on 2017/1/16.
 */
'use strict';
var request = require('../../../utils/request').request;
module.exports = {
    //新增
    add: function (token, data, callback) {
        console.log(data)
        request(token, {
            url: '/api/AirConfig/Add'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                console.log(body)
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "新增失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
    //获取列表
    , list: function (token, data, callback) {
        request(token, {
            url: '/api/AirConfig/Company'
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
    //删除
    , del: function (token, data, callback) {
        request(token, {
            url: '/api/AirConfig/Remove'
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
    //详情
    , detail: function (token, data, callback) {
        request(token, {
            url: '/api/AirConfig/' + data
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
    //更新
    , update: function (token, data, callback) {
        request(token, {
            url: '/api/AirConfig/Update'
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
    //上传保函
    , addFile: function (token, data, callback) {
        request(token, {
            url: '/api/FileManager/Guaranty/New'
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
    //删除保函
    , delFile: function (token, data, callback) {
        request(token, {
            url: '/api/FileManager/Guaranty/Remove'
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
};