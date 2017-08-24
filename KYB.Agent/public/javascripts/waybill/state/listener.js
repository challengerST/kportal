/**
 * Created by Jeremy on 2017/1/5.
 */
'use strict';
require('../../general/burster');
var url = require('../../general/function').url
    , Modal = require('../../general/modal');
var Data = require('./data').Data
    , Dom = require('./dom').Dom;
var Listener = (function () {
    var listener = function () {
        $('#s-qfsj').datetimepicker({
            format: 'hh:ii',//日期的格式
            startView: 0,//选择器的开始日期
            startDate: new Date().Format('yyyy-MM-dd'),
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
        $(document).on('click', '#search', function () {
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
                    $('#s-qfsj').val(data.deptTime ? new Date(data.deptTime).Format('hh:mm') : '');
                    $('#s-date').val(data.deptDate ? new Date(data.deptDate.replace(/-/g, "/")).Format('yyyy-MM-dd') : '/');
                    $('#order-num').val(data.bookCount || '/');
                    $('#order-wei').val(data.bookWeight || '/');
                    $('#order-size').val(data.bookSize || '/');
                    $('#person').val(data.contactPerson || '/');
                    $('#connect').val(data.contactTel || '/');
                    $('#s-bz').val(data.billRemark || '/');

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
        $(document).on('click', '.sel-c', function () {
            if (!$(this).hasClass('active')) {
                $(this).addClass('active');
                $(this).siblings().removeClass('active');
                url.set('c', $(this).data('c'));
                url.set('offset', 0);
                init();
            }
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
                "billRemark": '',
                "airlineInfo": '',
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
    };
    var init = function () {
        var data = {
            "companyId": 0,
            "airwayBillNum": $('#num-s').val(),
            "airCompanyCode": url.get('c') == '' || url.get('c') == 'all' ? '' : url.get('c'),
            "state": 2,
            "offset": url.get('offset') || 0,
            "limit": url.get('limit') || 20
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