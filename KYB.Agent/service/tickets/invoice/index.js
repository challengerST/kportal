/**
 * Created by Jeremy on 2017/1/16.
 */
'use strict';
var request = require('../../../utils/request').request;
module.exports = {
    //开票列表
    list: function (token, data, callback) {
        request(token, {
            url: '/api/TaxInvoice/Agent/Tax/Search'
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
    //开票详情
    , detail: function (token, data, callback) {
        request(token, {
            url: '/api/TaxInvoice/Detail/' + data
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
    //更新
    , update: function (token, data, callback) {
        request(token, {
            url: '/api/TaxInvoice/Agent/Tax/Update'
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
    //仓库费用列表
    , wareHouse: function (token, data, callback) {
        request(token, {
            url: '/api/OrderCharge/WareHouse/GetList'
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
    //仓库费用导出数据
    , exportW: function (token, data, callback) {
        request(token, {
            url: '/api/OrderCharge/WareHouse/Export'
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
    //报关行费用列表
    , declare: function (token, data, callback) {
        request(token, {
            url: '/api/OrderCharge/CustomDeclare/GetList'
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
    //报关行费用导出数据
    , exportD: function (token, data, callback) {
        request(token, {
            url: '/api/OrderCharge/CustomDeclare/Export'
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