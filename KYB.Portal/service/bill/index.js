/**
 * Created by Auser on 2016/11/29.
 */
var request = require('../../utils/request').request;

module.exports = {
    //对账单列表
    list: function (token, data, callback) {
        request(token, {
            url: '/api/OrderCharge/SearchMemberChargeList'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    }
    //对账单详情
    , detail: function (token, data, callback) {
        request(token, {
            url: '/api/OrderCharge/Search/' + data
            , method: 'get'
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    }
    //确认账单
    , ensure: function (token, data, callback) {
        request(token, {
            url: '/api/OrderCharge/UpdateState'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    }
    //账单申诉
    , appeal: function (token, data, callback) {
        request(token, {
            url: '/api/OrderCharge/Appeal'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    }

};