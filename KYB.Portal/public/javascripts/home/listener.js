/**
 * Created by Jeremy on 2016/11/22.
 */
"use strict";
var Listener = (function () {
    var Data = require('./data').Data
        , Dom = require('./dom').Dom;
    var timer = null;
    var listener = function () {
        $(document).on('click', '.location-open', function () {
            var targetEle = $('.select-part')
                , open = $(this).data('open');
            if (open == 0) {
                $(this).data('open', 1);
                targetEle.removeClass('dp-n');
                $(this).find('.arrow').removeClass('arrow-down');
                $(this).find('.arrow').addClass('arrow-up');
            } else {
                $(this).data('open', 0);
                targetEle.addClass('dp-n');
                $(this).find('.arrow').addClass('arrow-down');
                $(this).find('.arrow').removeClass('arrow-up');
            }
        });
        $(document).on('click', function (e) {
            var target = $(e.target);
            var targetEle = $('.select-part')
                , openEle = $('.location-open')
                , open = openEle.data('open');
            if (open == 1) {
                if (target.closest('.location-open').length == 0) {
                    openEle.data('open', 0);
                    targetEle.addClass('dp-n');
                    openEle.find('.arrow').addClass('arrow-down');
                    openEle.find('.arrow').removeClass('arrow-up');
                }
            }
        });
        $(document).on('click', '.select-port', function () {
            var input = $(this).parents('.location').find('input')
                , text = $(this).text();
            input.val(text);
            $(this).parent('ul').addClass('dp-n');
        });
        $(document).on('focus', '#start_location', function () {
            $(this).focus();
        });
        $(document).on('click', '#search-btn', function () {
            var s = $('#start_location').val()
                , e = $('#end_location').val();
            location.href = '/delivery?s=' + s + '&e=' + e;
        });
        $('.ajax-part').on('click', 'li', function () {
            $(this).parent().siblings('input').val($(this).html());
            $(this).parent().addClass('dp-n')
        });
        $(document).on('click', function (e) {
            var target = $(e.target);
            if (target.closest('.ajax-part,#end_location').length == 0) {
                $('.ajax-part').addClass('dp-n');
            }
        });
        $(document).on('blur', '#end_location,#start_location', function () {
            var _this = $(this)
                , ul = _this.siblings('.ajax-part');
            var data = ul.children('.active').html() || ul.find('li:first-child').html() || '';
            $(this).val(data);
            $(this).data('val', data);
            ul.hide();
        });
        $(document).on('keyup', '#end_location,#start_location', function (e) {
            var _this = $(this)
                , ul = _this.siblings('.ajax-part');
            var index = ul.find('.active').index() || 0
                , len = ul.children().length;
            if (e.keyCode == 13) {//回车键
                var data = ul.children('.active').html() || ul.find('li:first-child').html() || '';
                $(this).val(data);
                $(this).data('val', data);
                ul.hide();
            } else if (e.keyCode == 38) {//上键
                index = index == 0 ? len - 1 : index - 1;
                ul.find('li').removeClass('active');
                ul.find('li').eq(index).addClass('active');
            } else if (e.keyCode == 40) {//下键
                index = index == len - 1 ? 0 : index + 1;
                ul.find('li').removeClass('active');
                ul.find('li').eq(index).addClass('active');
            } else if (e.keyCode == 8) {
                e.preventDefault();
                _this.val('');
                _this.trigger('keyup');
            } else {//正常输入
                Data.airport({key: _this.val()}, function (json) {
                    var str = '';
                    if (json && 'resBody' in json && json.resBody instanceof Array && json.resBody.length > 0) {
                        var body = json.resBody;
                        for (var b in body) {
                            if (body.hasOwnProperty(b)) {
                                var d = body[b];
                                str += '<li data-val="' + d.airportCode + '" class="' + (b == 0 ? 'active' : '') + '">' + d.displayName + '</li>'
                            }
                        }
                    }
                    ul.html(str);
                    ul.show();
                });
            }
        });
        $(document).on('mouseover', '.ajax-part li', function () {
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
        });
    };
    var news = function () {
        var load = '<div class="loading-box"><div class="spinner"> <div class="rect1"></div> <div class="rect2"></div> <div class="rect3"></div><div class="rect4"></div><div class="rect5"></div> </div></div>';
        $('.news-body').html(load);
        Data.topF({type: 10}, function (json) {
            Dom.renderNews(json, 10);
        });
        Data.topF({type: 20}, function (json) {
            Dom.renderNews(json, 20);
        });
    };
    var run = function () {
        listener();
        news();
    };
    return {
        run: run
    }
}());
module.exports = Listener;