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
    var ss=window.location.href;
    var newUrl=ss.substr(ss.lastIndexOf('/') + 1);
    var listener = function () {
        var headerColl=function(){
            $('.shop-briefInfoBtn').click(function(){
                $(this).parents('.briefInfo').animate({
                    height:'46px'
                },function(){
                    $('.briefInfo').find('p').hide();
                    $('.shop-briefInfoBtn').hide();
                    $('.shop_learnMore').css('marginTop','0px');
                    $('.shop_learnMore').css('paddingTop','8px');
                });
            });
            $('.shop-briefInfoBtn').hover(function(){
                $(this).find('em').addClass('bounce');
            });
            $('.shop_learnMore').click(function(){
                $(this).parents('.briefInfo').animate({
                    height:'280px'
                },function(){
                    $('.briefInfo').find('p').fadeIn();
                    $('.shop-briefInfoBtn').show();
                    $('.shop_learnMore').css('paddingTop','0px');
                    $('.shop_learnMore').css('marginTop','24px');
                    $('.shop-briefInfoBtn').css('marginTop','');
                });
            });
        };
        headerColl();
        $('.shopCollect').click(function () {
            if($('.shopCollect').find('em').data('companyid')==''){
                window.location.href='../../newLogin';
            }else{
                var data = {
                    "freightCompanyId": newUrl,
                };
                if($('.shopCollect').data('status')){
                    Data.favouriteAdd(data, function (json) {
                        if (json && 'resCode' in json && json.resCode == 0) {
                            $('.shopCollect').data('status',true);
                            Modal.setAlert('收藏成功!');
                            if($('.shopCollect').data('status')){
                                $('.shopCollect').find('em').css('color','rgb(230, 76, 123)');
                            }else{
                                $('.shopCollect').find('em').css('color','rgb(51,51,51)');
                            }
                        } else {
                            Modal.setAlert('已收藏过该店铺!');
                            $('.shopCollect').find('em').css('color','rgb(230, 76, 123)');
                        }
                    });
                }else{
                    Data.favouriteAdd(data, function (json) {
                        if (json && 'resCode' in json && json.resCode == 0) {
                            $('.shopCollect').data('status',true);
                            Modal.setAlert('收藏成功!');
                            if($('.shopCollect').data('status')){
                                $('.shopCollect').find('em').css('color','rgb(230, 76, 123)');
                            }else{
                                $('.shopCollect').find('em').css('color','rgb(51,51,51)');
                            }
                        } else {
                            Modal.setAlert('收藏失败!');
                        }
                    });
                }

            }

        });
        $('#f-time').datetimepicker({
            format: 'yyyy-mm-dd',//日期的格式
            startDate: new Date(),//选择器的开始日期
            autoclose: true,//日期选择完成后是否关闭选择框
            bootcssVer: 3,//显示向左向右的箭头
            language: 'zh-CN',//语言
            minView: "month"//表示日期选择的最小范围，默认是hour
        });
        $(document).on('click', '.chaXun', function () {
            url.set('s', $('#start_location').val());
            url.set('e', $('#end_location').val());
            init();
        });
        $(document).on('click', '.pages', function () {
            url.set('offset', $(this).data('offset'));
            init();
        });
    };
    var airlines = function () {
        $(document).on('blur', '#start_location,#end_location', function () {
            var _this = $(this)
                , ul = _this.siblings('.ajax-part');
            var data = ul.children('.active').html() || ul.find('li:first-child').html() || '';
            $(this).val(data);
            $(this).data('val', data);
            ul.hide();
        });
        $(document).on('keyup', '#start_location,#end_location', function (e) {
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
        //$(document).on('click', '.chaXun', function () {
        //    var s = $('#start_location').val()
        //        , e = $('#end_location').val();
        //    location.href = '/delivery?s=' + s + '&e=' + e;
        //});
        $('.ajax-part').on('click', 'li', function () {
            $(this).parent().siblings('input').val($(this).html());
            $(this).parent().addClass('dp-n')
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
            "freightCompanyId": newUrl,
            "memberId":$('.shopCollect').data('memberid'),
            "deptPortCode": url.get('s') ? url.get('s').split('(')[1].split(')')[0] : '',
            "destPortCode": url.get('e') ? url.get('e').split('(')[1].split(')')[0] : '',
            "offset": url.get('offset') || 0,
            "limit": url.get('limit') || 20
        };
        Data.airList(data, function (json) {
            Dom.airline(json, data);
        });
    };
    var run = function () {
        $('#start_location').val(url.get('s') || '');
        $('#end_location').val(url.get('e') || '');
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