/**
 * Created by Jeremy on 2017/1/5.
 */
'use strict';
require('../../general/burster');
var Data = require('./data').Data
    , Dom = require('./dom').Dom;
var url = require('../../general/function').url
    , Modal = require('../../general/modal');
var bill = {
    offset: 0
    , limit: 25
    , dataList: {}
};
var batch = {
    offset: 0
    , limit: 5
    , dataList: {}
};
var memberId;
var LIST = {};
var operateId;
var Listener = (function () {
    var timeInit = function () {
        $('#sel-time').datetimepicker({
            format: 'yyyy-mm-dd',//日期的格式
            startDate: new Date(),//选择器的开始日期
            autoclose: true,//日期选择完成后是否关闭选择框
            bootcssVer: 3,//显示向左向右的箭头
            language: 'zh-CN',//语言
            minView: "month",//表示日期选择的最小范围，默认是hour
            initialDate: new Date(new Date().getTime() + (7 * 24 * 60 * 60 * 1000))//默认选中时间
        });
        $('#addStart').datetimepicker({
            format: 'yyyy-mm-dd',//日期的格式
            autoclose: true,//日期选择完成后是否关闭选择框
            bootcssVer: 3,//显示向左向右的箭头
            language: 'zh-CN',//语言
            minView: "month"//表示日期选择的最小范围，默认是hour
        }).on('changeDate', function (e) {
            var ele = $('#addEnd');
            ele.val('');
            ele.datetimepicker('setStartDate', new Date(new Date(e.date)));
            ele.datetimepicker('setInitialDate', new Date(e.date.getTime() + 2592000000));
            ele.val(new Date(e.date.getTime() + 2592000000).Format('yyyy-MM-dd'));
        });
        $('#addEnd').datetimepicker({
            format: 'yyyy-mm-dd',//日期的格式
            autoclose: true,//日期选择完成后是否关闭选择框
            bootcssVer: 3,//显示向左向右的箭头
            language: 'zh-CN',//语言
            minView: "month"//表示日期选择的最小范围，默认是hour
            , initialDate: new Date()
        });
        $('#batchStart').datetimepicker({
            format: 'yyyy-mm-dd',//日期的格式
            autoclose: true,//日期选择完成后是否关闭选择框
            bootcssVer: 3,//显示向左向右的箭头
            language: 'zh-CN',//语言
            minView: "month"//表示日期选择的最小范围，默认是hour
        }).on('changeDate', function (e) {
            var ele = $('#batchEnd');
            ele.val('');
            ele.datetimepicker('setStartDate', new Date(new Date(e.date)));
            ele.datetimepicker('setInitialDate', new Date(e.date.getTime() + 2592000000));
            ele.val(new Date(e.date.getTime() + 2592000000).Format('yyyy-MM-dd'));
        });
        $('#batchEnd').datetimepicker({
            format: 'yyyy-mm-dd',//日期的格式
            autoclose: true,//日期选择完成后是否关闭选择框
            bootcssVer: 3,//显示向左向右的箭头
            language: 'zh-CN',//语言
            minView: "month"//表示日期选择的最小范围，默认是hour
            , initialDate: new Date()
        });
    };
    var listener = function () {
        $(document).on('click', '#search', function () {
            url.set('offset', 0);
            init();
        });
        $(document).on('click', '.outer-pages .pages', function () {
            url.set('offset', $(this).data('offset'));
            init();
        });
        $(document).on('click', '.close-btn', function () {
            bill.offset = 0;
            batch.offset = 0;
            $('.white-back').addClass('dp-n');
            $('.alert-part').addClass('dp-n');
        });
        $(document).on('click', '.close-this', function () {
            $(this).parents('.alert-part').addClass('dp-n');
        });
        $(document).on('click', '.show-detail', function () {
            var id = $(this).data('id');
            operateId = id;
            var ele = $('.detail-part');
            Data.billDetail({id: id}, function (json) {
                if (json && 'resCode' in json && json.resCode == 0) {
                    var d = json.resBody;
                    ele.find('.zdbh').html(d.chargeBillNo);
                    ele.find('.kh').html(d.companyName);
                    ele.find('.zdje').html(d.totalAmount);
                    ele.find('.kprq').html(new Date(d.BillTime).Format('yyyy-MM-dd'));
                    ele.find('.fkjz').html(new Date(d.BilllTimeEnd).Format('yyyy-MM-dd'));
                    ele.find('.zdzq').html(new Date(d.chargeBillFrom).Format('yyyy-MM-dd') + ' 至 ' + new Date(d.chargeBillTo).Format('yyyy-MM-dd'));
                    var arr = d.orderChargeList, body = '', total = 0;
                    for (var a in arr) {
                        if (arr.hasOwnProperty(a)) {
                            var dt = arr[a];
                            total += parseFloat(dt.Price);
                            body += '<tr> <td>' + dt.orderNum + '</td> <td>CNY ' + dt.Price + '</td> </tr>'
                        }
                    }
                    ele.find('tbody').html(body);
                    ele.find('tfoot').html('<tr> <td>总计</td> <td>CNY ' + total + '</td> </tr>');
                    $('.white-back').removeClass('dp-n');
                    ele.removeClass('dp-n');
                }else{
                    Modal.setAlert(json.resMsg || '数据异常，请重试');
                }

            });
        });
        $(document).on('click', '.remove', function () {
            operateId = $(this).data('id');
            $('.white-back').removeClass('dp-n');
            $('.delete-part').removeClass('dp-n');
        });
        $(document).on('click', '.add-close', function () {
            $('.add-part').addClass('dp-n');
            $('.add-part').find('.header').html('新建账单 <span class="close-btn">X</span>');
            $('.add-part').find('.add-search').show();
            $('.add-part').find('.btn-pt').show();
        });
        $(document).on('click', '#d-hxfy', function () {
            $('.white-back').removeClass('dp-n');
            $('.publish-part').removeClass('dp-n');
        });
        $(document).on('click', '#ensure-publish', function () {
            var data = {
                "chargeBillNo": operateId,
                "payAmount": $('#expireDate').val(),
                "state": 0
            };
            if (data.payAmount) {
                $('#expireDate').removeClass('warm');
                Data.chargeOff(data, function (json) {
                    if (json && 'resCode' in json && json.resCode == 0) {
                        Modal.setAlert('核销成功！', null, function () {
                            location.reload();
                        });
                    } else {
                        Modal.setAlert(json.resMsg || '核销失败，请重试');
                    }
                });
            } else {
                $('#expireDate').addClass('warm');
            }
        });
    };
    var init = function () {
        var data = {
            "chargeBillNo": $('#search-zdbh').val(),
            "companyName": $('#search-khmc').val(),
            "state": $('#fkzt').find('option:selected').val(),
            "agentCompanyId": 0,
            "billState": 99,
            "offset": url.get('offset') || 0,
            "limit": url.get('limit') || 20
        };
        Data.list(data, function (json) {
            LIST = Dom.list(json, data);
        });
    };
    var customer = function () {
        //获取客户名称
        $(document).on('keyup', '#a-kh', function (e) {
            var _this = $(this)
                , ul = _this.siblings('.get-name');
            var index = ul.find('.active').index() || 0
                , len = ul.children().length;
            if (e.keyCode == 13) {//回车键
                var mID = ul.children('.active').data('val') || ul.find('li:first-child').data('val') || '';
                var data = ul.children('.active').html() || ul.find('li:first-child').html() || '';
                memberId = mID;
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
                Data.customer({"agentCompanyId": 10000, "keyword": $(this).val()}, function (json) {
                    if (json && 'resBody' in json && json.resBody instanceof Array && json.resBody.length > 0) {
                        var str = ''
                            , body = json.resBody;
                        for (var b in body) {
                            if (body.hasOwnProperty(b)) {
                                var d = body[b];
                                str += '<li data-val="' + d.companyId + '" class="' + (b == 0 ? 'active' : '') + '">' + d.companyName + '</li>';
                            }
                        }
                        ul.html(str);
                        ul.show();
                    }
                });
            }
        });
        //input失去焦点
        $(document).on('blur', '#a-kh', function () {
            var ul = $(this).siblings('.get-name');
            var mID = ul.children('.active').data('val') || ul.find('li:first-child').data('val') || '';
            var data = ul.children('.active').html() || ul.find('li:first-child').html() || '';
            memberId = mID;
            $(this).val(data);
            $(this).data('val', data);
            ul.hide();
        });
        $(document).on('mouseenter', '.get-name li', function () {
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
        });
    };
    var newBill = function () {
        var sList = {};
        $(document).on('click', '#new-bill', function () {
            $('#a-kh').val('');
            $('#addStart').val('');
            $('#addEnd').val('');
            $('.add-tb').find('tbody').html('');
            $('.white-back').removeClass('dp-n');
            $('.add-part').removeClass('dp-n');
        });
        $(document).on('click', '#search-bills', function () {
            var pass = true;
            $('.a-require').each(function () {
                if (!$(this).val()) {
                    pass = false;
                    $(this).css('border-color', 'red');
                } else {
                    $(this).css('border-color', '#d4d4d4');
                }
            });
            if (pass) {
                bill.offset = 0;
                searchInit();
            }
        });
        $(document).on('click', '.add-pages .pages', function () {
            bill.offset = $(this).data('offset');
            searchInit();
        });
        $(document).on('click', 'input[type="checkbox"][name="a-sg"]', function () {
            var id = $(this).data('id')
                , isok = $(this).prop('checked');
            if (isok) {
                bill.dataList[id] = sList[id];
            } else {
                if (id in bill.dataList) {
                    delete bill.dataList[id]
                }
            }
        });
        $(document).on('click', '#a-sczd', function () {
            var arr = [];
            for (var a in bill.dataList) {
                if (bill.dataList.hasOwnProperty(a)) {
                    var d = bill.dataList[a];
                    arr.push(d);
                }
            }
            if (arr.length > 0) {
                var data = {
                    "feeList": arr,
                    "companyId": $('#a-kh').val(),
                    "chargeBillFrom": $('#addStart').val(),
                    "chargeBillTo": $('#addEnd').val()
                };
                Data.createBill(data, function (json) {
                    if (json && 'resCode' in json && json.resCode == 0) {
                        Modal.setAlert(json.resMsg || '生成账单成功！', null, function () {
                            location.reload();
                        });
                    } else {
                        Modal.setAlert(json.resMsg || '生成账单失败，请重试！');
                    }
                });
            }
        });
        var searchInit = function () {
            var data = {
                "timeFrom": $('#addStart').val(),
                "timeTo": $('#addEnd').val(),
                "companyId": memberId,
                "state": 99,
                "offset": bill.offset,
                "limit": bill.limit
            };

            Data.searchBill(data, function (json) {
                var str = '';
                var dt = {};
                if (json && 'resBody' in json && json.resBody && 'sList' in json.resBody && json.resBody.sList && json.resBody.sList.length > 0) {
                    var arr = json.resBody.sList;
                    for (var a in arr) {
                        if (arr.hasOwnProperty(a)) {
                            var d = arr[a];
                            dt[d.orderId] = d;
                            str += '<tr> <td><input type="checkbox" name="a-sg" data-id="' + d.orderId + '"/></td> <td>' + d.orderNum + '</td> <td>CNY ' + d.Price + '</td> </tr>'
                        }
                    }
                    $.burster($(".add-pages"), data.offset || 0, json.resBody.totalCount, 5, data.limit || 10);
                } else {
                    str = ' <tr> <td colspan="3" class="wrong">暂无明细</td></tr>';
                    $('.add-pages').html('');
                }
                sList = dt;
                $('.add-tb').find('tbody').html(str);
            });
        };
    };
    var batchInit = function () {
        var sList = {};
        $(document).on('click', '#batch-bills', function () {
            $('#batchStart').val('');
            $('#batchEnd').val('');
            $('.batch-tb').find('tbody').html('');
            $('.white-back').removeClass('dp-n');
            $('.batch-part').removeClass('dp-n');
        });
        $(document).on('click', '#batch-search', function () {
            var pass = true;
            $('.b-require').each(function () {
                if (!$(this).val()) {
                    pass = false;
                    $(this).css('border-color', 'red');
                } else {
                    $(this).css('border-color', '#d4d4d4');
                }
            });
            if (pass) {
                batch.offset = 0;
                searchInit();
            }
        });
        $(document).on('click', 'input[type="checkbox"][name="b-sg"]', function () {
            var id = $(this).data('id')
                , isok = $(this).prop('checked');
            if (isok) {
                batch.dataList[id] = sList[id];
            } else {
                if (id in batch.dataList) {
                    delete batch.dataList[id]
                }
            }
        });
        $(document).on('click', '.batch-pages .pages', function () {
            batch.offset = $(this).data('offset');
            searchInit();
        });
        $(document).on('click', '#b-plsc', function () {
            var arr = [];
            for (var a in batch.dataList) {
                if (batch.dataList.hasOwnProperty(a)) {
                    arr.push(a);
                }
            }
            if (arr.length > 0) {
                var data = {
                    "timeFrom": $('#batchStart').val(),
                    "timeTo": $('#batchEnd').val(),
                    "agentCompanyId": 10000,
                    "companyIds": arr,
                    "requestAgentMemberId": 0
                };
                Data.createBatch(data, function (json) {
                    if (json && 'resCode' in json && json.resCode == 0) {
                        Modal.setAlert(json.resMsg || '生成账单成功！', null, function () {
                            location.reload();
                        });
                    } else {
                        Modal.setAlert(json.resMsg || '生成账单失败，请重试！');
                    }
                });
            }
        });
        $(document).on('click', '.inner-detail', function () {
            var s = $(this).data('s')
                , e = $(this).data('e')
                , id = $(this).data('id');
            $('#a-kh').val(id);
            $('#addStart').val(new Date(s).Format('yyyy-MM-dd'));
            $('#addEnd').val(new Date(e).Format('yyyy-MM-dd'));
            memberId = id;
            $('#search-bills').trigger('click');
            $('.add-part').find('.header').html('账单详情 <span class="add-close">X</span>');
            $('.add-part').find('.add-search').hide();
            $('.add-part').find('.btn-pt').hide();
            $('.add-part').removeClass('dp-n');
        });
        var searchInit = function () {
            var data = {
                "timeFrom": $('#batchStart').val(),
                "timeTo": $('#batchEnd').val(),
                "agentCompanyId": 10000,
                "offset": batch.offset,
                "limit": batch.limit
            };
            Data.batch(data, function (json) {
                var str = '';
                var dt = {};
                if (json && 'resBody' in json && json.resBody && 'sList' in json.resBody && json.resBody.sList && json.resBody.sList.length > 0) {
                    var arr = json.resBody.sList;
                    for (var a in arr) {
                        if (arr.hasOwnProperty(a)) {
                            var d = arr[a];
                            dt[d.companyId] = d;
                            str += ' <tr> <td><input type="checkbox" name="b-sg" data-id="' + d.companyId + '"/></td> <td>' + d.companyName + '</td> <td>' + ((new Date(d.BillTimeTo).getTime() - new Date(d.BillTimeFrom).getTime()) / 1000 / 60 / 60 / 24) + '天</td> <td>' + d.chargeCount + '</td> <td>CNY ' + d.totalAmount + '</td> <td><a data-id="' + d.companyId + '" data-s="' + d.BillTimeFrom + '" data-e="' + d.BillTimeTo + '" href="javascript:void(0);" class="inner-detail">详情</a></td> </tr>'
                        }
                    }
                    $.burster($(".batch-pages"), data.offset || 0, json.resBody.totalCount, 5, data.limit || 10);
                } else {
                    str = ' <tr> <td colspan="6" class="wrong">暂无明细</td></tr>';
                    $('.batch-pages').html('');
                }
                sList = dt;
                $('.batch-tb').find('tbody').html(str);
            });
        };
    };
    var run = function () {
        listener();
        init();
        customer();
        timeInit();
        newBill();
        batchInit();
    };
    return {
        run: run
    }
}());
module.exports.Listener = Listener;