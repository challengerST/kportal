"use strict";
var request = require('../../utils/request').request;

module.exports = {
    //店铺收藏
    favouriteAdd: function (token, data, callback) {
        request(token, {
            url: '/api/MyFavourite/Add'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    }
};