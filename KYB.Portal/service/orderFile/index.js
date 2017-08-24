/**
 * Created by Auser on 2016/11/29.
 */
var request = require('../../utils/request').request;

module.exports = {
    //添加订单附件
    add: function (token, data, callback) {
        request(token, {
            url: '/api/FileManager/Order/New'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                callback(error, body);
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
                callback(error, body);
            }
        });
    }
    //获取订单附件
    , list: function (token, data, callback) {
        request(token, {
            url: '/api/FileManager/Order/' + data.id + (data.sid ? '/' + data.sid : '')
            , method: 'get'
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    }
};