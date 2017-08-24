/**
 * Created by Jeremy on 2017/1/16.
 */
'use strict';
var request = require('../../../utils/request').request;
module.exports = {
    //待处理列表
    list: function (token, data, callback) {
        request(token, {
            url: '/api/AirwayOrder/Pending'
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
    //添加进仓数据
    , addData: function (token, data, callback) {
        request(token, {
            url: '/api/AirwayOrder/Storage/Add'
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
    //获取进仓数据
    , storage: function (token, data, callback) {
        request(token, {
            url: '/api/AirwayOrder/Storage/' + data
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
    //确认进仓数据
    , ensureData: function (token, data, callback) {
        request(token, {
            url: '/api/AirwayOrder/Storage/Confirm'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "确认失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
    //更新报关状态
    , bgUpdate: function (token, data, callback) {
        request(token, {
            url: '/api/AirwayOrder/Custom/Update'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "确认失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
    //搜索航线
    , airlineSearch: function (token, data, callback) {
        request(token, {
            url: '/api/Airway/Search'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "确认失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
    //计算运费
    , calculate: function (token, data, callback) {
        request(token, {
            url: '/api/SelfBooking/AirwayFee'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "确认失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
    //搜索用户
    , customer: function (token, data, callback) {
        request(token, {
            url: '/api/Customer/ExpressSearch'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "确认失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
    //提交订单
    , order: function (token, data, callback) {
        request(token, {
            url: '/api/AirwayOrder/New'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "确认失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
    //取消订单
    , cancel: function (token, data, callback) {
        request(token, {
            url: '/api/AirwayOrder/Cancel'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "确认失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
    //接单
    , confirm: function (token, data, callback) {
        request(token, {
            url: '/api/AirwayOrder/Confirm'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "确认失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
    //运单搜索
    , ydSearch: function (token, data, callback) {
        request(token, {
            url: '/api/AirwayBill/Search'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "确认失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
    //关联已有运单
    , ydExist: function (token, data, callback) {
        request(token, {
            url: '/api/AirwayOrder/AirwayBill/Exist'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "确认失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
    //关联新运单
    , ydNew: function (token, data, callback) {
        request(token, {
            url: '/api/AirwayOrder/AirwayBill/New'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "确认失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
    //操作日志
    , log: function (token, data, callback) {
        request(token, {
            url: '/api/AirwayOrder/Log/' + data
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
    //获取员工列表
    , member: function (token, data, callback) {
        request(token, {
            url: '/api/Member/GetList'
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