/**
 * Created by Jeremy on 2016/11/22.
 */
"use strict";
require('../frame/burster');
var Modal = require('../frame/modal');
var url = require('../frame/function').url;
var Data = require('./data').Data
    , Dom = require('./dom').Dom;
var Listener = (function () {
    var listener = function () {
        $(document).on('click', '.search-btn', function () {
            url.set('s', $('#start_location').data('val'));
            url.set('e', $('#end_location').data('val'));
            init();
        });
        $(document).on('click', '.sel-title', function () {
            url.set('offset', 0);
            url.set('tp', $(this).data('tp'));
            $('.page-box').html('');
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
            init();
        });
        $(document).on('click', '.pages', function () {
            url.set('offset', $(this).data('offset'));
            init();
        });
        $('#day-time').datetimepicker({
            format: 'yyyy-mm-dd',//日期的格式
            startDate: '1900-01-01',//选择器的开始日期
            autoclose: true,//日期选择完成后是否关闭选择框
            bootcssVer: 3,//显示向左向右的箭头
            language: 'zh-CN',//语言
            minView: "month"//表示日期选择的最小范围，默认是hour
        });
    };
    var airlines = function () {
        $(document).on('blur', '#start_location,#end_location', function () {
            var _this = $(this)
                , ul = _this.siblings('.ajax-part');
            var data = ul.children('.active').html() || ul.find('li:first-child').html() || '';
            var data2=ul.children('.active').data('val') || ul.find('li:first-child').data('val') || '';
            $(this).val(data);
            $(this).data('val', data2);
            ul.hide();
        });
        $(document).on('keyup', '#start_location,#end_location', function (e) {
            var _this = $(this)
                , ul = _this.siblings('.ajax-part');
            var index = ul.find('.active').index() || 0
                , len = ul.children().length;
            if (e.keyCode == 13) {//回车键
                var data = ul.children('.active').html() || ul.find('li:first-child').html() || '';
                var data2=ul.children('.active').data('val') || ul.find('li:first-child').data('val') || '';
                $(this).val(data);
                $(this).data('val', data2);
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
        $('.ajax-part').on('click', 'li', function () {
            $(this).parent().siblings('input').val($(this).html());
            $(this).parent().addClass('dp-n')
        });
    };
    var init = function (req, res) {
        var newTp = 0;
        var tp = url.get('tp') || 'all';
        switch (tp) {
            case 'all':
                newTp=0;
                break;
            case 'pending':
                newTp=1;
                break;
            case 'underway':
                newTp=2;
                break;
            case 'done':
                newTp=3;
                break;
        }
        var data = {
            "orderState": newTp,
            "orderNum": $('#order-num').val(),
            "deptCode": url.get('s') || '',
            "destCode": url.get('e') || '',
            "flightDate": $('#day-time').val() ? $('#day-time').val() + ' 00:00:00' : null,
            "offset": url.get('offset') || 0,
            "limit": url.get('limit') || 20
        };
        Data.newList(data, function (json) {
            Dom.list(json, data, tp);
        });
    };
    var run = function () {
        $('#start_location').val(url.get('s') || '');
        $('#end_location').val(url.get('e') || '');
        listener();
        init();
        airlines();
    };
    return {
        run: run
    }
}());
module.exports = Listener;