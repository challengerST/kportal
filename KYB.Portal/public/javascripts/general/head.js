/**
 * Created by Jeremy on 2016/11/22.
 */
"use strict";
var head = function () {
    //时间格式化
    Date.prototype.Format = function (fmt) { //author: Jeremyyy
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
    //返回顶部
    $(document).on('click', '.back-top', function () {
        $("html,body").animate({scrollTop:0},100);
        return false;
    });
    $(document).on('mouseenter', '.vip-part', function () {
        $(this).children('.vip-select').stop(true);
        $(this).children('.vip-select').slideDown(100);
        return false;
    });
    $(document).on('mouseleave', '.vip-part', function () {
        $(this).children('.vip-select').stop(true);
        $(this).children('.vip-select').slideUp(100);
        return false;
    });
    $(document).on('mouseenter', '.wechat-logo', function () {
        $(this).children('.big-wechat').fadeIn(200);
        return false;
    });
    $(document).on('mouseleave', '.wechat-logo', function () {
        $(this).children('.big-wechat').fadeOut(200);
        return false;
    });
};
module.exports.head = head;