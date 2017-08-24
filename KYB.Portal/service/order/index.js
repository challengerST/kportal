/**
 * Created by Jeremy on 2016/11/25.
 */
"use strict";
var request = require('../../utils/request').request;

module.exports = {
    //下单
    order: function (token, data, callback) {
        request(token, {
            url: '/api/SelfBooking/Submit'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    }
    //快速订舱下单
    , fastSubmit: function (token, data, callback) {
        request(token, {
            url: '/api/ExpressBooking/Submit'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    }
    //获取订单数量信息
    , sum: function (token, data, callback) {
        request(token, {
            url: '/api/Member/Order/Sum'
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
    //获取指定仓库详情
    , detail: function (token, data, callback) {
        request(token, {
            url: '/api/Warehouse/' + data
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
    //我要发货的航线详情
    , fhDetail: function (token, data, callback) {
        request(token, {
            url: '/api/Airway/' + data
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
    //订单列表
    , list: function (token, data, callback) {
        request(token, {
            url: '/api/AirwayOrder/Member/List'
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
    //新的订单列表
    , newList: function (token, data, callback) {
        request(token, {
            url: '/api/AirwayOrder/OrderList'
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
    //new common contact list
    , commonConList: function (token, data, callback) {
        request(token, {
            url: '/api/AirwayOrder/OrderList'
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
    //取消订单
    , refuse: function (token, data, callback) {
        request(token, {
            url: '/api/AirwayOrder/Member/Cancel'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "取消失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
    //确认进仓数据
    , entry: function (token, data, callback) {
        request(token, {
            url: '/api/AirwayOrder/Storage/Confirm'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "取消失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
    //添加收发货人信息
    , personAdd: function (token, data, callback) {
        request(token, {
            url: '/api/AirwayOrder/LadingBill'
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
    //分单添加收发货人信息
    , subOrderpersonAdd: function (token, data, callback) {
        request(token, {
            url: '/api/AirwayOrder/Sub/LadingBill'
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
    //改配搜索
    , gpSearch: function (token, data, callback) {
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
    //改配申请
    , submitChange: function (token, data, callback) {
        request(token, {
            url: '/api/AirwayOrder/Member/Change'
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
    //航空公司详情
    , companyDetail: function (token, data, callback) {
        request(token, {
            url: '/api/FileManager/Guaranty'
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
    //提单确认
    , orderConfirm: function (token, data, callback) {
        request(token, {
            url: '/api/AirwayOrder/Customer/OrderConfirm'
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
    //提单确认
    , orderSave: function (token, data, callback) {
        request(token, {
            url: '/api/AirwayOrder/Agent/UpdateLadingBill'
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
    //运单信息
    , track: function (token, data, callback) {
        request(token, {
            url: '/api/AirwayOrder/Track/Order/' + data
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
    //电子预录单
    , declareData: function (token, data, callback) {
        request(token, {
            url: '/api/FileManager/Declare/' + data.id + (data.sid ? '/' + data.sid : '')
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
    //获取TACT运价
    , tactPrice: function (token, data, callback) {

        request(token, {
            url: '/api/AirwayTact/CalTactFee'
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
    //修改品名
    , changeName: function (token, data, callback) {
        request(token, {
            url: '/api/AirwayOrder/Sub/UpdateCargo'
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