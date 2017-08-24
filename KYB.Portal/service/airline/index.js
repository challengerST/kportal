/**
 * Created by Auser on 2016/11/29.
 */
var request = require('../../utils/request').request;

module.exports = {
    //该公司能自助订舱的所有线路
    airline: function (token, data, callback) {
        request(token, {
            url: '/api/SelfBooking/Departure/' + data.id
            , method: 'get'
            , data: data
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    }
    //获取分区
    , getArea: function (token, data, callback) {
        request(token, {
            url: '/api/SelfBooking/Destination/'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    }
    //获取详情
    , detail: function (token, data, callback) {
        request(token, {
            url: '/api/SelfBooking/' + data.id
            , method: 'get'
            , callback: function (error, resp, body) {
                callback(error, body);
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
                callback(error, body);
            }
        });
    }
    //杂费清单
    , extra: function (token, data, callback) {
        request(token, {
            url: '/api/SelfBooking/ExtraFee'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    }
    //快速订舱杂费清单
    , fastExtra: function (token, data, callback) {
        request(token, {
            url: '/api/ExpressBooking/ExtraFee'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    }
    //快速订舱杂费清单
    , fastPrice: function (token, data, callback) {
        request(token, {
            url: '/api/ExpressBooking/AirwayFee'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    }
    //航空港搜索
    , airport: function (token, data, callback) {
        request(token, {
            url: '/api/Airport/Search/' + data.key
            , method: 'get'
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    }
    //航空公司搜索
    , aircom: function (token, data, callback) {
        request(token, {
            url: '/api/AirCompany/Search/' + data.key
            , method: 'get'
            , data: data
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    }
    //快速订舱搜索
    , fastSearch: function (token, data, callback) {
        request(token, {
            url: '/api/ExpressBooking/Search'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    }
    //航线搜索
    , search: function (token, data, callback) {
        request(token, {
            url: '/api/Airway/Search'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    }
    //航线搜索
    , searchList: function (token, data, callback) {
        request(token, {
            url: '/api/Airway/AirwayListSearch'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    }
    //历史报价
    , history: function (token, data, callback) {
        request(token, {
            url: '/api/Airway/Archive/' + data
            , method: 'get'
            , data: data
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    }
    //费用报价模板
    , expenseTemplate: function (token, data, callback) {
        request(token, {
            url: '/api/ExpenseTemplate/' + data
            , method: 'get'
            , data: data
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    }
    //杂费报价模板
    , zFexpenseTemplate: function (token, data, callback) {
        request(token, {
            url: '/api/ExpenseTemplate/GetByAirCompany'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    }
};