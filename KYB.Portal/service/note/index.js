/**
 * Created by Auser on 2016/11/29.
 */
var request = require('../../utils/request').request;
module.exports = {
    //消息列表
    list: function (token, data, callback) {
        request(token, {
            url: '/api/Message/PageList'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    },
    //未读消息数量
    nums: function (token, data, callback) {
        request(token, {
            url: '/api/Message/Get/' + data
            , method: 'get'
            , data: data
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    },
    //标记消息
    read: function (token, data, callback) {
        request(token, {
            url: '/api/Message/State'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    },
    //删除消息
    del: function (token, data, callback) {
        request(token, {
            url: '/api/Message/Delete'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    },
    //消息详情
    detail: function (token, data, callback) {
        request(token, {
            url: '/api/Message/' + data
            , method: 'get'
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    },
    //消息设置信息
    setting: function (token, data, callback) {
        request(token, {
            url: '/api/Customer/Settings/Search/' + data
            , method: 'get'
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    },
    //保存消息设置
    save: function (token, data, callback) {
        request(token, {
            url: '/api/Customer/Settings/Save'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    }
};