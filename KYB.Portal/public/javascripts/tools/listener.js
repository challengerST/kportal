/**
 * Created by Jeremy on 2016/11/22.
 */
"use strict";
var Listener = (function () {
    var listener = function () {
        $(document).on('click', '.t-options', function () {
            var tarEle = $('#'+$(this).data('tar'));
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
            tarEle.addClass('active');
            tarEle.siblings().removeClass('active');
        });
    };
    var run = function () {
        listener();
    };
    return {
        run: run
    }
}());
module.exports = Listener;