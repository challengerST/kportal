/**
 * Created by Auser on 2016/11/29.
 */
var request = require('../../utils/request').request;
module.exports = {
    //公司列表
    company: function (token, data, callback) {
        request(token, {
            url: '/api/Airway/Lcl/GetAirCompany'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    },
    //拼货规则
    search: function (token, data, callback) {
        request(token, {
            url: '/api/Airway/Lcl/Search'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    },
    //拼货价格
    price: function (token, data, callback) {
        request(token, {
            url: '/api/AirwayLclOrder/AirwayFee'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    },
    //拼货下单
    submit: function (token, data, callback) {
        console.log(data)
        request(token, {
            url: '/api/AirwayLclOrder/New'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                console.log(body)
                callback(error, body);
            }
        });
    }
};