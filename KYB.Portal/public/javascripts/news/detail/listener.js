/**
 * Created by Administrator on 2017/7/27.
 */
"use strict";
require('../../frame/burster');
var url = require('../../frame/function').url;
var Listener = (function () {
    var init = function () {
        document.title =  $(".news-content .title").html();
        var data = {};
        var _data = {};
        $.ajax({
            url: '/api/news/detail'
            , type: 'post'
            , data: data
            , dataType: 'json'
            , timeout: 100000
            , success: function (json) {
                console.log(json);
                if (json && "resBody" in json) {
                    document.title =  $(".news-content .title").html();
                    json.resBody.newsTitle,
                    $(".news-content .title").html(json.resBody.newsTitle),
                    $(".news-content .time").html(json.resBody.modifyDt),
                    $(".news-content #content").html(json.resBody.newsContent);
                } else {
                    _data = {};
                }
            }, complete: function () {
                if (callback && callback instanceof Function) {
                    callback(_data);
                }
            }
        });
//switch($(".news-content").data('nt')){
        //    case 10:
        //        $('.panel').eq(0).addClass('active').siblings().removeClass('active');
        //        break;
        //    case 20:
        //        $('.panel').eq(1).addClass('active').siblings().removeClass('active');
        //        break;
        //    default:
        //        break;
        //
        //};
        console.log($(".news-content").data('st'));
        switch($(".news-content").data('st')){
            case 10:
                $('.panel-body').find('a').eq(0).addClass('active').siblings().removeClass('active');
                break;
            case 20:
                $('.panel-body').find('a').eq(1).addClass('active').siblings().removeClass('active');
                break;
            case 30:
                $('.panel-body').find('a').eq(2).addClass('active').siblings().removeClass('active');
                break;
            case 70:
                $('.panel.panel-default').eq(0).addClass('active').siblings().removeClass('active');
                $('.panel.panel-default').eq(1).find('a').removeClass('active');
                break;
            default:
                break;

        }

    };
    var run = function () {
        init();
    };
    return {
        run: run
    }
}());
module.exports = Listener;