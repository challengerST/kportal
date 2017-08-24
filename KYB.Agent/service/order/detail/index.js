/**
 * Created by Jeremy on 2017/1/16.
 */
'use strict';
var request = require('../../../utils/request').request;
module.exports = {
    //订单详情
    detail: function (token, data, callback) {
        request(token, {
            url: '/api/AirwayOrder/Detail'
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
    //添加订单附件
    , add: function (token, data, callback) {
        request(token, {
            url: '/api/FileManager/Order/New'
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
    //删除订单附件
    , remove: function (token, data, callback) {
        request(token, {
            url: '/api/FileManager/Order/Remove'
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
    //添加订单附件
    , list: function (token, data, callback) {
        request(token, {
            url: '/api/FileManager/Order/' + data.id + (data.sid ? '/' + data.sid : '')
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
    //获取用户详情
    , company: function (token, data, callback) {
        request(token, {
            url: '/api/Customer/' + data
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
    //更新报关状态
    , changeState: function (token, data, callback) {
        request(token, {
            url: '/api/CustomBroker/Update'
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
    //进仓数据更新
    , updateData: function (token, data, callback) {
        if (!data['data']) {
            data['data'] = [];
        }
        request(token, {
            url: '/api/AirwayOrder/Storage/Update'
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
    //搜索收发货人
    , contactList: function (token, data, callback) {
        request(token, {
            url: '/api/Contact/ByCompany'
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
    //搜索收发货人
    , subData: function (token, data, callback) {
        request(token, {
            url: '/api/AirwayOrder/Sub/Warehouse/EntryList/' + data
            , method: 'get'
            , data: data
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "获取数据失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
    //保存
    , ladingSave: function (token, data, callback) {
        request(token, {
            url: '/api/AirwayOrder/Agent/UpdateLadingBill'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {

                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "获取数据失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
    //获取新分单号
    , NewSubNum: function (token, data, callback) {
        request(token, {
            url: '/api/AirwayOrder/Sub/NewSubNum'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "获取数据失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
    //创建新分单
    , newStorage: function (token, data, callback) {
        request(token, {
            url: '/api/AirwayOrder/Sub/New'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "拆分单失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
    //分单添加规格
    , addStorage: function (token, data, callback) {
        request(token, {
            url: '/api/AirwayOrder/Sub/AddStorage'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "拆分单失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
    //转移规格
    , moveStorage: function (token, data, callback) {
        request(token, {
            url: '/api/AirwayOrder/Sub/MoveStorage'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "转移分单失败，请重试",
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