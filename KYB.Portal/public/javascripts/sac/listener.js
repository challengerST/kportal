/**
 * Created by Jeremy on 2016/11/22.
 */
"use strict";
require('../frame/burster');
var Modal = require('../frame/modal');
var url = require('../frame/function').url;
var Listener = (function () {
    var Data = require('./data').Data
        , Dom = require('./dom').Dom;
    var listener = function () {
        $('.chaXun').click(function () {
            init();
        });
        $('#f-time').datetimepicker({
            format: 'yyyy-mm-dd',//日期的格式
            startDate: new Date(),//选择器的开始日期
            autoclose: true,//日期选择完成后是否关闭选择框
            bootcssVer: 3,//显示向左向右的箭头
            language: 'zh-CN',//语言
            minView: "month"//表示日期选择的最小范围，默认是hour
        });
        $('.shop_orderMustsee').hover(function () {
            $(this).parent().parent().parent().find('.tipWithBorder').show();
        }, function () {
            $(this).parent().parent().parent().find('.tipWithBorder').hide();
        });
        $(document).on('click', '#search_btn', function () {
            url.set('s', $('#start').val());
            url.set('e', $('#end').val());
            url.set('c', $('#company').val());
            url.set('d', $('#f-time').val());
            init();
        });
        $(document).on('click', '.pages', function () {
            url.set('offset', $(this).data('offset'));
            init();
        });
    };
    var airlines = function () {
        $(document).on('blur', '#start,#end', function () {
            var _this = $(this)
                , ul = _this.siblings('.ajax-part');
            var data = ul.children('.active').html() || ul.find('li:first-child').html() || '';
            $(this).val(data);
            $(this).data('val', data);
            ul.hide();
        });
        $(document).on('keyup', '#start,#end', function (e) {
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
    var getCompany = function () {
        $(document).on('keyup', '#company', function (e) {
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
                Data.getCode({key: _this.val()}, function (json) {
                    var str = '';
                    if (json && 'resBody' in json && json.resBody instanceof Array && json.resBody.length > 0) {
                        var body = json.resBody;
                        for (var b in body) {
                            if (body.hasOwnProperty(b)) {
                                var d = body[b];
                                str += '<li data-val="' + d.airlineCode + '" class="' + (b == 0 ? 'active' : '') + '">' + d.companyName + '(' + d.airlineCode + ')' + '</li>';
                            }
                        }
                    }
                    ul.html(str);
                    ul.show();
                });
            }
        });
        $(document).on('blur', '#company', function () {
            var ul = $(this).siblings('.ajax-part');
            var data = ul.children('.active').html() || ul.find('li:first-child').html() || '';
            $(this).val(data);
            $(this).data('val', data);
            ul.hide();
        });
    };
    var init = function () {
        var load = '<div class="loading-box"><div class="spinner"> <div class="rect1"></div> <div class="rect2"></div> <div class="rect3"></div><div class="rect4"></div><div class="rect5"></div> </div></div>';
        $('.table-body').html(load);
        var data = {
            "searchFreightCompanyName": $('#sac_shop').val() || '',
            "transCount": 0,
            "offset": url.get('offset') || 0,
            "limit": url.get('limit') || 20
        };
        Data.favouriteShop(data, function (json) {
            Dom.favouriteShop(json, data);
        });
    };
    var run = function () {
        listener();
        init();
        airlines();
        getCompany();
    };
    return {
        run: run
    }
}());
module.exports = Listener;