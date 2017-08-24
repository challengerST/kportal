/**
 * Created by Jeremy on 2017/1/5.
 */
'use strict';
require('../../general/burster');
var Data = require('./data').Data
    , Dom = require('./dom').Dom;
var url = require('../../general/function').url
    , Modal = require('../../general/modal');
var Listener = (function () {
    var operateId;//操作id

    var listener = function () {
        $('#s-qfsj').datetimepicker({
            format: 'hh:ii',//日期的格式
            startView: 0,//选择器的开始日期
            autoclose: true,//日期选择完成后是否关闭选择框
            bootcssVer: 3,//显示向左向右的箭头
            language: 'zh-CN',//语言
            minView: 0,//表示日期选择的最小范围，默认是hour
            minuteStep: 5
            //format: 'hh:ii',
            //autoclose: true,
            //startView: 'hour',
            //minView: 0,
            //minuteStep: 1
        });
        $(document).on('click', '#ot-search', function () {
            url.set('offset', 0);
            init();
        });
        $(document).on('click', '.pages', function () {
            url.set('offset', $(this).data('offset'));
            init();
        });
        $(document).on('click', '.close-btn', function () {
            $('.white-back').addClass('dp-n');
            $('.alert-part').addClass('dp-n');
        });
        $(document).on('click', '#editor', function () {
            $('.detail-part').find('input').removeAttr('readonly');
        });
        $(document).on('click', '.close-this', function () {
            $(this).parents('.alert-part').addClass('dp-n');
        });
        $(document).on('click', '.remove', function () {
            operateId = $(this).data('id');
            $('.white-back').removeClass('dp-n');
            $('.delete-part').removeClass('dp-n');
        });
        $(document).on('click', '#add', function () {
            $('.white-back').removeClass('dp-n');
            $('.add-part').removeClass('dp-n');
        });
        $(document).on('click', '.connect-line', function () {
            $('.white-back').removeClass('dp-n');
            $('.connect-part').removeClass('dp-n');
        });
        $(document).on('click', '#add-ensure', function () {
            var arr = $('#multi-add').val().split('\n');
            var send = [];
            for (var i = 0; i <= arr.length - 1; i++) {
                if (arr[i] != '' && !new RegExp("^[ ]+$").test(arr[i])) {
                    send.push(arr[i]);
                }
            }
            var data = {
                "companyId": 0,
                "list": send
            };
            Data.check(data, function (json) {
                if (json && 'resCode' in json && json.resCode == 0) {
                    var data = json.resBody
                        , sStr = '', fStr = '';
                    $('.add-total').html(data.totalCount);
                    $('.add-success').html(data.okCount);
                    $('.add-fail').html(data.notOkCount);
                    if (data.okCount > 0) {
                        for (var s in data.staticGroup) {
                            if (data.staticGroup.hasOwnProperty(s)) {
                                var d = data.staticGroup[s];
                                sStr += '<p>' + s + ' <span class="fl-r">' + d + ' 条</span></p>';
                            }
                        }
                        $('.success-info').show();
                        $('.success-tb').html(sStr).show();
                    } else {
                        $('.success-info').hide();
                        $('.success-tb').hide();
                    }
                    if (data.notOkCount > 0) {
                        for (var f in data.errorGroup) {
                            if (data.errorGroup.hasOwnProperty(f)) {
                                var dt = data.errorGroup[f];
                                fStr += '<p>' + f + '（' + (dt == 2 ? '主单无效' : '主单重复') + '）</p>';
                            }
                        }
                        $('.fail-info').show();
                        $('.fail-tb').html(fStr).show();
                    } else {
                        $('.fail-info').hide();
                        $('.fail-tb').hide();
                    }
                    $('.feedback-part').removeClass('dp-n');
                }
            });
        });
        $(document).on('click', '.show-detail', function () {
            Data.detail({id: $(this).data('id')}, function (json) {
                if (json && 'resCode' in json && json.resCode == 0) {
                    var data = json.resBody.billInfo;
                    $('.ydh').html(data.airwayBillNum);
                    $('.hkgs').html(data.airCompanyCode || '/');
                    $('.zt').html(data.billState == 1 ? '未使用' : '已使用');
                    $('#start').val(data.deptPort || '/');
                    $('#end').val(data.destPort || '/');
                    $('#hxlj').val(data.routePath || '/');
                    $('#s-hbh').val(data.airlineInfo || '/');
                    $('#s-date').val(data.deptDate ? new Date(data.deptDate.replace(/-/g, "/")).Format('yyyy-MM-dd') : '/');
                    $('#order-num').val(data.bookCount || '/');
                    $('#order-wei').val(data.bookWeight || '/');
                    $('#order-size').val(data.bookSize || '/');
                    $('#person').val(data.contactPerson || '/');
                    $('#connect').val(data.contactTel || '/');
                    $('#s-bz').val(data.billRemark || '/');
                    $('#s-qfsj').val(data.deptTime ? new Date(data.deptTime.replace(/-/g, "/")).Format('hh:mm') : '/');
                    var str = '';
                    var arr = json.resBody.orderList || [];
                    for (var a in arr) {
                        if (arr.hasOwnProperty(a)) {
                            var d = arr[a];
                            var entryCargo = d.entryCargo || {};
                            str += '<tr> <td>' + d.orderNum + '</td> <td>' + d.declareCargo.cargoCount + '</td> ' +
                                '<td>' + d.declareCargo.cargoWeight + '</td> <td>' + d.declareCargo.cargoSize + '</td> <td>' + (entryCargo.cargoCount || '/') + '</td>' +
                                ' <td>' + (entryCargo.cargoWeight || '/') + '</td> <td>' + (entryCargo.cargoSize || '/') + '</td>' +
                                ' <td>' + (d.entryState == 2 ? '是' : '否') + '</td> </tr>'
                        }
                    }
                    if (arr.length == 0) {
                        str += '<tr><td colspan="8">暂无关联订单</td></tr>'
                    }
                    $('.inner-tb').find('tbody').html(str);
                    $('#save-ensure').data('id', data.billId);
                    $('#save-ensure').data('code', data.airCompanyCode);
                    $('#save-ensure').data('num', data.airwayBillNum);
                    $('.white-back').removeClass('dp-n');
                    $('.detail-part').removeClass('dp-n');
                } else {
                    Modal.setAlert(json.resMsg || '获取详情失败，请重试！');
                }
            });
        });
        $(document).on('click', '#feedback-ensure', function () {
            var data = {
                "companyId": 0,
                "list": $('#multi-add').val().split('\n')
            };
            Data.add(data, function (json) {
                if (json && 'resCode' in json && json.resCode == 0) {
                    Modal.setAlert(json.resMsg || '添加成功！<br>成功导入' + json.resBody + '条', null, function () {
                        location.reload();
                    });
                } else {
                    Modal.setAlert(json.resMsg || '添加失败，请重试！');
                }
            });
        });
        $(document).on('click', '#delete-ensure', function () {
            Data.del({id: operateId}, function (json) {
                if (json && 'resCode' in json && json.resCode == 0) {
                    Modal.setAlert(json.resMsg || '删除成功！', null, function () {
                        location.reload();
                    });
                } else {
                    Modal.setAlert(json.resMsg || '删除失败，请重试！');
                }
            });
        });
        $(document).on('click', '#save-ensure', function () {
            var data = {
                "billId": $(this).data('id'),
                "companyId": 0,
                "airwayBillNum": $(this).data('num'),
                "airCompanyCode": $(this).data('code'),
                "deptPort": $('#start').val(),
                "destPort": $('#end').val(),
                "deptDate": $('#s-date').val(),
                "bookCount": $('#order-num').val(),
                "bookWeight": $('#order-wei').val(),
                "bookSize": $('#order-size').val(),
                "contactPerson": $('#person').val(),
                "contactTel": $('#connect').val(),
                "billRemark": $('#s-bz').val(),
                "airlineInfo": $('#s-hbh').val(),
                "deptTime": $('#s-qfsj').val(),
                "billState": 1,
                "createDt": new Date(),
                "modifyDt": new Date()
            };
            Data.update(data, function (json) {
                if (json && 'resCode' in json && json.resCode == 0) {
                    Modal.setAlert(json.resMsg || '更新成功！', null, function () {
                        location.reload();
                    });
                } else {
                    Modal.setAlert(json.resMsg || '更新失败，请重试！');
                }
            });
        });
        //获取机场名称
        $(document).on('keyup', 'input.getName', function (e) {
            var _this = $(this)
                , ul = _this.siblings('.get-name');
            var index = ul.find('.active').index() || 0
                , len = ul.children().length;
            if (e.keyCode == 13) {//回车键
                var data = ul.children('.active').data('val') || ul.find('li:first-child').data('val') || '';
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
            } else {//正常输入
                Data.getName({key: _this.val()}, function (json) {
                    if (json && 'resBody' in json && json.resBody instanceof Array && json.resBody.length > 0) {
                        var str = ''
                            , body = json.resBody;
                        for (var b in body) {
                            if (body.hasOwnProperty(b)) {
                                var d = body[b];
                                str += '<li data-val="' + d.airportCode + '" class="' + (b == 0 ? 'active' : '') + '">' + d.displayName + '</li>'
                            }
                        }
                        ul.html(str);
                        ul.show();
                    }
                });
            }
        });
        //input失去焦点
        $(document).on('blur', 'input.getName', function () {
            if (typeof($(this).attr("readonly")) == "undefined") {
                var ul = $(this).siblings('.get-name');
                var data = ul.children('.active').data('val') || ul.find('li:first-child').data('val') || '';
                $(this).val(data);
                $(this).data('val', data);
                ul.hide();
            }
        });
        //li元素悬浮获得焦点
        $(document).on('mouseenter ', '.get-name li', function () {
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
        });
    };
    var init = function () {
        var data = {
            companyId: 0,
            airwayBillNum: $('#num').val(),
            airCompanyCode: $('#com').val(),
            state: $('#state').find('option:selected').val(),
            offset: url.get('offset') || 0,
            limit: url.get('limit') || 20
        };
        Data.list(data, function (json) {
            Dom.list(json, data);
        });
    };
    var run = function () {
        listener();
        init();
    };
    return {
        run: run
    }
}());
module.exports.Listener = Listener;