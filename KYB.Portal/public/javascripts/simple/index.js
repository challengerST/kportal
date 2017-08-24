/**
 * Created by Auser on 2016/12/2.
 */
"use strict";

$(document).on('click', '.open-modal', function () {
    $('.white-back').removeClass('dp-n');
    $('.month-modal').removeClass('dp-n');
});

$(document).on('click', '.close-btn', function () {
    $('.white-back').addClass('dp-n');
    $('.month-modal').addClass('dp-n');
});
var _data = {
    orderCount: 0
    , orderSum: 0
};
$.ajax({
    url: '/api/order/sum'
    , type: 'post'
    , dataType: 'json'
    , timeout: 100000
    , success: function (json) {
        if (json && "resCode" in json && json.resCode == 0) {
            _data = json.resBody;
        }
    }, complete: function () {
        $('.money').find('.font-red').html(_data.orderSum + '<span class="unit"> 元</span>');
        $('.total-sum').find('.font-black').html(_data.orderCount + '<span class="unit"> 单</span>');
    }
});


require('../general').run();