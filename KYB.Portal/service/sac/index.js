var request = require('../../utils/request').request;

module.exports = {
    //店铺收藏
    favouriteShop: function (token, data, callback) {
        request(token, {
            url: '/api/MyFavourite/SearchMyFavourite'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    },
    favouriteRemove: function (token, data, callback) {
        request(token, {
            url: '/api/MyFavourite/Delete'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    }
};