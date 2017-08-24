/**
 * Created by Jeremy on 2017/1/5.
 */
'use strict';
require('../general/burster');
var Data = require('./data').Data
    , Dom = require('./dom').Dom;
var url = require('../general/function').url
    ,myformat = require('../general/function').format
    , Modal = require('../general/modal');
var Listener = (function () {
    var wbg = function () {
        var str = '';
        var num = 0;
        var ele = $('.cswbg');
        Data.wbg(function (json) {
            if (json && 'resBody' in json && json.resBody instanceof Array) {
                var arr = json.resBody;
                num = arr.length;
                if (arr.length > 0) {
                    for (var a in arr) {
                        if (arr.hasOwnProperty(a)) {
                            var d = arr[a].order;
                            var c = arr[a].company || {};
                            var state = '';
                            switch (d.declareState) {
                                case 0:
                                    state = '未报关';
                                    break;
                                case 1:
                                    state = '预审中';
                                    break;
                                case 2:
                                    state = '预审通过';
                                    break;
                                case 3:
                                    state = '开始报关';
                                    break;
                                case 4:
                                    state = '报关中';
                                    break;
                                case 5:
                                    state = '报关完成';
                                    break;
                                case -6:
                                    state = '报关失败';
                                    break;
                                case -4:
                                    state = '退关中';
                                    break;
                                case -5:
                                    state = '退关完成';
                                    break;
                            }
                            str += '<tr><td style="width: 25%;line-height: 20px;">' + d.orderNum + (d.airwayBillNum ? '<br/>' + d.airwayBillNum : '') + '</td><td style="width: 20%">' + (c.companyName || '/') + '</td>' +
                                '<td  style="width: 20%">' + d.airCompanyCode + '/' + d.deptCode + '->' + d.destCode + '</td><td style="width: 20%">' + new Date(d.flightDate).Format('yyyy-MM-dd') + '</td><td style="width: 15%">' + state + '</td></tr>';
                        }
                    }
                } else {
                    str += '<tr><td style="width: 100%;" class="wrong" colspan="5"></td></tr>';
                }
            } else {
                num = 0;
                str += '<tr><td style="width: 100%;" class="wrong" colspan="5"></td></tr>';
            }
            ele.find('.num').html(num);
            ele.find('tbody').html(str);
            if (ele.find('tbody').height() > 175) {
                ele.find('thead').css('padding-right', '37px');
            }
        });
    };
    var wjc = function () {
        var str = '';
        var num = 0;
        var ele = $('.cswjc');
        Data.wjc(function (json) {
            if (json && 'resBody' in json && json.resBody instanceof Array) {
                var arr = json.resBody;
                num = arr.length;
                if (arr.length > 0) {
                    for (var a in arr) {
                        if (arr.hasOwnProperty(a)) {
                            var d = arr[a].order;
                            var c = arr[a].company || {};
                            var state = '';
                            switch (d.entryState) {
                                case 0:
                                    state = '待进仓';
                                    break;
                                case 1:
                                    state = '已进仓，未确认';
                                    break;
                                case 2:
                                    state = '已确认';
                                    break;
                            }
                            str += '<tr><td style="width: 25%;line-height: 20px;">' + d.orderNum + (d.airwayBillNum ? '<br/>' + d.airwayBillNum : '') + '</td><td style="width: 20%">' + (c.companyName || '/') + '</td>' +
                                '<td style="width: 20%">' + d.airCompanyCode + '/' + d.deptCode + '->' + d.destCode + '</td><td style="width: 20%">' + new Date(d.flightDate).Format('yyyy-MM-dd') + '</td><td style="width: 15%">' + state + '</td></tr>';
                        }
                    }
                } else {
                    str += '<tr><td style="width: 100%;" class="wrong" colspan="5"></td></tr>';
                }
            } else {
                str += '<tr><td style="width: 100%;" class="wrong" colspan="5"></td></tr>';
                num = 0;
            }
            ele.find('.num').html(num);
            ele.find('tbody').html(str);
            if (ele.find('tbody').height() > 175) {
                ele.find('thead').css('padding-right', '37px');
            }
        });
    };
    var jrqf = function () {
        var str = '';
        var num = 0;
        var ele = $('.jrqf');
        Data.jrqf(function (json) {
            if (json && 'resBody' in json && json.resBody instanceof Array) {
                var arr = json.resBody;
                num = arr.length;
                if (arr.length > 0) {
                    for (var a in arr) {
                        if (arr.hasOwnProperty(a)) {
                            var d = arr[a].order;
                            var c = arr[a].company || {};
                            var state = '', bg = '', ys = '';
                            switch (d.entryState) {
                                case 0:
                                    state = '待进仓';
                                    break;
                                case 1:
                                    state = '已进仓，未确认';
                                    break;
                                case 2:
                                    state = '已确认';
                                    break;
                            }
                            switch (d.declareState) {
                                case 0:
                                    bg = '未报关';
                                    break;
                                case 1:
                                    bg = '预审中';
                                    break;
                                case 2:
                                    bg = '预审通过';
                                    break;
                                case 3:
                                    bg = '开始报关';
                                    break;
                                case 4:
                                    bg = '报关中';
                                    break;
                                case 5:
                                    bg = '报关完成';
                                    break;
                                case -6:
                                    bg = '报关失败';
                                    break;
                                case -4:
                                    bg = '退关中';
                                    break;
                                case -5:
                                    bg = '退关完成';
                                    break;
                            }
                            switch (d.transState) {
                                case 0:
                                    ys = '待出库';
                                    break;
                                case 1:
                                    ys = '已出库，待起飞';
                                    break;
                                case 2:
                                    ys = '已起飞';
                                    break;
                                case 3:
                                    ys = '已到达';
                                    break;
                            }
                            str += '<tr><td style="width:12%;">' + d.orderNum + '</td><td style="width:15%;">' + (c.companyName || '/') + '</td>' +
                                '<td style="width:7%;">' + d.airCompanyCode + '</td><td style="width:5%;">' + d.deptCode + '</td><td style="width:5%;">' + d.destCode + '</td><td style="width:25%;line-height: 20px;">件数：' + d.cargo.cargoCount + 'PCS 重量：' + d.cargo.cargoWeight + 'KGS<br/>体积：' + myformat.formatvolume(d.cargo.cargoSize) + 'CBM 品名：' + d.cargo.cargoCount + '</td><td style="width:7%;">' + state + '</td>' +
                                '<td style="width:10%;">' + (d.airlineInfo || '') + ' / ' + (d.airlineTime || '') + '</td><td style="width:7%;">' + bg + '</td><td style="width:7%;">' + ys + '</td></tr>';
                        }
                    }
                    ele.find('.title').html('<span class="info-txt"><span class="icon fa fa-plane"></span>今日起飞</span><span class="num">' + num + '</span>');
                    ele.addClass('notZ');
                } else {
                    str += '<tr><td style="width: 100%" colspan="10">暂无该类型订单！</td></tr>';
                    ele.addClass('wrong');
                    ele.find('.tb').hide();
                }
            } else {
                str += '<tr><td style="100%" colspan="10">请求失败，请刷新重试！</td></tr>';
                ele.addClass('wrong');
                ele.find('.tb').hide();
                num = 0;
            }
            ele.find('tbody').html(str);
            ele.find('.num').html(num);
            if (ele.find('tbody').height() > 175) {
                ele.find('thead').css('padding-right', '37px');
            }
        });
    };
    var wqrfy = function () {
        var str = '';
        var num = 0;
        var ele = $('.wqrfy');
        Data.wqrfy(function (json) {
            if (json && 'resBody' in json && json.resBody instanceof Array) {
                var arr = json.resBody;
                num = arr.length;
                if (arr.length > 0) {
                    for (var a in arr) {
                        if (arr.hasOwnProperty(a)) {
                            var d = arr[a];
                            var state = '';
                            switch (d.chargeState) {
                                case 0:
                                    state = '未确认';
                                    break;
                                case 1:
                                    state = '已确认';
                                    break;
                                case 2:
                                    state = '申诉中';
                                    break;
                                case 3:
                                    state = '已开账';
                                    break;
                            }
                            str += '<tr><td style="width: 25%;line-height: 20px;">' + d.orderNum + (d.airwayBillNum ? '<br/> ' + d.airwayBillNum : '') + '</td><td style="width: 20%">' + d.companyName + '</td>' +
                                '<td style="width: 20%">' + d.airlineTime + '</td><td style="width: 20%">' + d.entryChargingWeight + '</td><td style="width: 15%">' + state + '</td></tr>';
                        }
                    }
                } else {
                    str += '<tr><td colspan="5">暂无该类型订单！</td></tr>';
                    ele.find('.tb').hide();
                }
            } else {
                num = 0;
                str += '<tr><td colspan="5">请求失败，请刷新重试！</td></tr>';
                ele.find('.tb').hide();
            }
            if (ele.find('tbody').height() > 175) {
                ele.find('thead').css('padding-right', '37px');
            }
            ele.find('.num').html(num);
            ele.find('tbody').html(str);
            if (ele.find('tbody').height() > 175) {
                ele.find('thead').css('padding-right', '37px');
            }
        });
    };
    var wzfzd = function () {
        var str = '';
        var num = 0;
        var ele = $('.wzfzd');
        Data.wzfzd(function (json) {
            if (json && 'resBody' in json && json.resBody instanceof Array) {
                var arr = json.resBody;
                num = arr.length;
                if (arr.length > 0) {
                    for (var a in arr) {
                        if (arr.hasOwnProperty(a)) {
                            var d = arr[a];
                            var state = '';
                            switch (d.chargeOffState) {
                                case 0:
                                    state = '未付款';
                                    break;
                                case 1:
                                    state = '已付款';
                                    break;
                                case 2:
                                    state = '部分付款';
                                    break;
                            }
                            str += '<tr><td style="width: 25%;">' + d.chargeBillNo + '</td><td style="width: 20%;">' + d.customerCompanyName + '</td>' +
                                '<td style="width: 20%;">' + d.totalAmount + '</td><td style="width: 20%;">' + new Date(d.BilllTimeEnd).Format('yyyy-MM-dd') + '</td><td  style="width: 15%;">' + state + '</td></tr>';
                        }
                    }
                } else {
                    str += '<tr><td colspan="5">暂无该类型账单！</td></tr>';
                    ele.find('.tb').hide();
                }
            } else {
                num = 0;
                str += '<tr><td colspan="5">请求失败，请刷新重试！</td></tr>';
                ele.find('.tb').hide();
            }
            ele.find('.num').html(num);
            ele.find('tbody').html(str);
            if (ele.find('tbody').height() > 175) {
                ele.find('thead').css('padding-right', '37px');
            }
        });
    };
    var run = function () {

        wbg();
        wjc();
        jrqf();
        wqrfy();
        wzfzd();
    };
    return {
        run: run
    }
}());
module.exports.Listener = Listener;