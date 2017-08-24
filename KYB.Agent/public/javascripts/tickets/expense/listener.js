/**
 * Created by Jeremy on 2017/1/5.
 */
'use strict';
require('../../general/burster');
var url = require('../../general/function').url
    ,myformat = require('../../general/function').format
    , Modal = require('../../general/modal');
var Data = require('./data').Data
    , Dom = require('./dom').Dom;
//存储默认价格模板，以及单条信息
var defaultPrice = {}, stopgap = {};
var WPrice = []//仓库费用
    , DPrice = [];//报关费用
//存储费用清单列表
var expenseList = {};
var Listener = (function () {
    var listener = function () {
        $(document).on('click', '.outer-page .pages', function () {
            url.set('offset', $(this).data('offset'));
            init();
        });
        $(document).on('click', '#search', function () {
            url.set('offset', 0);
            init();
        });
        $(document).on('click', '.close-btn', function () {
            $('.white-back').addClass('dp-n');
            $('.alert-part').addClass('dp-n');
        });
        $(document).on('click', '.show-detail', function () {
            var _this = $(this);
            Data.detail({id: _this.data('id')}, function (json) {
                if (json && 'resCode' in json && json.resCode == 0) {
                    stopgap = json.resBody || null;
                    if (stopgap) {
                        var ele = $('.zd-part')
                            , o = stopgap;
                        var type = '', str = '';
                        switch (o.entryCargo.cargoType) {
                            case 1:
                                type = '普货';
                                break;
                            case 2:
                                type = '木箱';
                                break;
                            case 3:
                                type = '卷';
                                break;
                            case 4:
                                type = '托盘';
                                break;
                        }
                        var channel = '';
                        switch (o.orderChannel) {
                            case 1:
                                channel = '自助订舱';
                                break;
                            case 2:
                                channel = '快速订舱';
                                break;
                            case 3:
                                channel = '后台下单';
                                break;
                            case 6:
                                channel = '拼货订单';
                                break;
                            default:
                                channel = '自助订舱';
                                break;
                        }
                        //if (o.appealComment) {
                        //    $('#refuse-reason').val(o.appealComment || '/').show();
                        //} else {
                        //    $('#refuse-reason').hide();
                        //}
                        $('#refuse-reason').val(o.appealComment || '/');
                        $('.ddh').html(o.orderNum || '/');
                        $('.kh').html(o.companyName || '/');
                        $('.ddqd').html(channel || '/');
                        $('.qsg').html(o.deptPortCode || '/');
                        $('.mdg').html(o.destPortCode || '/');
                        $('.hkgs').html(o.airCompanyCode || '/');
                        $('.qfrq').html(o.airlineTime ? new Date(o.airlineTime).Format('yyyy-MM-dd') : '/');
                        $('.hbh').html(o.airlineInfo || '/');
                        $('.pm').html(o.entryCargo.cargoName || '/');
                        $('.lx').html(type || '/');
                        $('.wtbg').html(o.entryCargo.isBulkyCargo ? '是' : '否');
                        $('.js').html(o.entryCargo.cargoCount + '件');
                        $('.tj').html(myformat.formatvolume(o.entryCargo.cargoSize) + 'm³');
                        $('.zl').html(o.entryCargo.cargoWeight + 'KG（计费重量：' + o.entryCargo.chargingWeight + 'KG）');
                        for (var s in o.serviceFeeList) {
                            if (o.serviceFeeList.hasOwnProperty(s)) {
                                var d = o.serviceFeeList[s];
                                str += '<tr class="data"> <td><input type="text" class="fymt" readonly value="' + d.itemName + '"/>' +
                                    '</td> <td><input type="text" class="ip-dj" value="' + d.itemPrice + '"/>' +
                                    '</td> <td><input type="text" class="ip-zl" value="' + d.itemCount + '"/>' +
                                    '</td> <td><input type="text" class="ttp" readonly value="' + d.itemTotal + '"/>' +
                                    '</td> <td></td></tr>';
                            }
                        }
                        //str += '<tr class="tr-add"> <td></td> <td></td> <td></td> <td></td> <td><span class="glyphicon glyphicon-plus"></span></td> </tr>';
                        var wStr = '<tr><td colspan="3">暂无费用</td></tr>', dStr = '<tr><td colspan="3">暂无费用</td></tr>';
                        var arrW = o.wareHouseFeeList || []
                            , arrD = o.declareFeeList || [];
                        for (var w = 0; w < arrW.length; w++) {
                            var d1 = arrW[w];
                            if (w == 0) {
                                wStr = '';
                            }
                            wStr += '<tr class="data"><td><input type="text" class="fymt" readonly value="' + d1.itemName + '"/></td><td><input type="text" class="ex-je" value="' + d1.itemTotal + '"></td>' +
                                '<td></td></tr>'
                        }
                        for (var dd = 0; dd < arrD.length; dd++) {
                            var d2 = arrD[dd];
                            if (dd == 0) {
                                dStr = '';
                            }
                            dStr += '<tr class="data"><td><input type="text" class="fymt" readonly value="' + d2.itemName + '"/></td><td><input type="text" class="ex-je" value="' + d2.itemTotal + '"></td>' +
                                '<td></td></tr>'
                        }

                        ele.find('.zd-tb').find('tbody').html(str);
                        ele.find('.zd-ckfy').find('tbody').html(wStr);
                        ele.find('.zd-bgfy').find('tbody').html(dStr);
                        $('#update-ensure').hide();
                        if (_this.data('type') == 'show') {
                            $('#ensure-charge').show();
                        } else {
                            $('#ensure-charge').hide();
                        }
                        $('.zd-fyqd').show();
                        $('.zd-ex').hide();
                        $('.sel-type p').removeClass('active');
                        $('p[data-tar="zd-fyqd"]').addClass('active');
                        ele.removeClass('dp-n');
                        $('.white-back').removeClass('dp-n');
                    }
                } else {
                    Modal.setAlert(json.resMsg || '获取详情失败，请重试');
                }
            });
        });
        $(document).on('click', '.zd-part .sel-type p', function () {
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
            $('.' + $(this).data('tar')).show();
            $('.' + $(this).data('tar')).siblings().hide();
        });
    };
    var init = function () {
        var data = {
            "memberId": 0,
            "angentId": 0,
            "orderNum": $('#search-ddbh').val(),
            "companyName": $('#search-khmc').val(),
            "chargeState": $('#fkzt').find('option:selected').val(),
            offset: url.get('offset') || 0,
            limit: url.get('limit') || 20
        };
        Data.list(data, function (json) {
            Dom.list(json, data);
            var dt = {};
            if (json && 'resCode' in json && json.resCode == 0 && json.resBody && json.resBody.sList.length > 0) {
                var list = json.resBody.sList;
                for (var l in list) {
                    if (list.hasOwnProperty(l)) {
                        var d = list[l];
                        dt[d.orderId] = d;
                    }
                }
            }
            expenseList = dt;
        });
    };
    var priceInit = function () {
        Data.priceList(function (json) {
            if (json && 'resCode' in json && json.resCode == 0 && json.resBody && json.resBody.sList) {
                var arr = json.resBody.sList;
                for (var a in arr) {
                    if (arr.hasOwnProperty(a)) {
                        var d = arr[a];
                        if (d.expenseDefault) {
                            for (var e in d.expenseTemplate) {
                                if (d.expenseTemplate.hasOwnProperty(e)) {
                                    var dt = d.expenseTemplate[e];
                                    defaultPrice[dt.itemName] = dt;
                                }
                            }
                            break;
                        }
                    }
                }
            }
        });
    };
    var zdTable = function () {
        $(document).on('click', '.show-zd', function () {
            Data.detail({id: $(this).data('id')}, function (json) {
                if (json && 'resCode' in json && json.resCode == 0) {
                    stopgap = json.resBody || null;
                    if (stopgap) {
                        var ele = $('.zd-part')
                            , o = stopgap;
                        var type = '', str = '';
                        switch (o.entryCargo.cargoType) {
                            case 1:
                                type = '纸箱';
                                break;
                            case 2:
                                type = '木箱';
                                break;
                            case 3:
                                type = '卷';
                                break;
                            case 4:
                                type = '托盘';
                                break;
                        }
                        var channel = '';
                        switch (o.orderChannel) {
                            case 1:
                                channel = '自助订舱';
                                break;
                            case 2:
                                channel = '快速订舱';
                                break;
                            case 3:
                                channel = '后台下单';
                                break;
                            case 6:
                                channel = '拼货订单';
                                break;
                            default:
                                channel = '自助订舱';
                                break;
                        }
                        $('#refuse-reason').val(o.appealComment || '/');
                        $('.ddh').html(o.orderNum || '/');
                        $('.kh').html(o.companyName || '/');
                        $('.ddqd').html(channel || '/');
                        $('.qsg').html(o.deptPortCode || '/');
                        $('.mdg').html(o.destPortCode || '/');
                        $('.hkgs').html(o.airCompanyCode || '/');
                        $('.qfrq').html(o.airlineTime ? new Date(o.airlineTime).Format('yyyy-MM-dd') : '/');
                        $('.hbh').html(o.airlineInfo || '/');
                        $('.pm').html(o.entryCargo.cargoName || '/');
                        $('.lx').html(type || '/');
                        $('.wtbg').html(o.entryCargo.isBulkyCargo ? '是' : '否');
                        $('.js').html(o.entryCargo.cargoCount + '件');
                        $('.tj').html(myformat.formatvolume(o.entryCargo.cargoSize) + 'm³');
                        $('.zl').html(o.entryCargo.cargoWeight + 'KG（计费重量：' + o.entryCargo.chargingWeight + 'KG）');
                        for (var s in o.serviceFeeList) {
                            if (o.serviceFeeList.hasOwnProperty(s)) {
                                var d = o.serviceFeeList[s];
                                str += '<tr class="data"> <td><input type="text" class="fymt" readonly value="' + d.itemName + '"/>' +
                                    '</td> <td><input type="text" class="ip-dj" value="' + d.itemPrice + '"/>' +
                                    '</td> <td><input type="text" class="ip-zl" value="' + d.itemCount + '"/>' +
                                    '</td> <td><input type="text" class="ttp" readonly value="' + d.itemTotal + '"/>' +
                                    '</td> <td><span class="glyphicon glyphicon-remove"></span></td></tr>';
                            }
                        }
                        str += '<tr class="tr-add"> <td></td> <td></td> <td></td> <td></td> <td><span class="glyphicon glyphicon-plus fyqd-add"></span></td> </tr>';

                        var wStr = '', dStr = '';
                        var arrW = o.wareHouseFeeList || []
                            , arrD = o.declareFeeList || [];
                        for (var w = 0; w < arrW.length; w++) {
                            var d1 = arrW[w];
                            if (w == 0) {
                                wStr = '';
                            }
                            wStr += '<tr class="data"><td><input type="text" class="fymt" readonly value="' + d1.itemName + '"/></td><td><input type="text" class="ex-je" value="' + d1.itemTotal + '"></td>' +
                                '<td><span class="glyphicon glyphicon-remove"></span></td></tr>'
                        }
                        wStr += '<tr class="tr-add"> <td></td> <td></td> <td><span class="glyphicon glyphicon-plus w-add"></span></td> </tr>';
                        for (var dd = 0; dd < arrD.length; dd++) {
                            var d2 = arrD[dd];
                            if (dd == 0) {
                                dStr = '';
                            }
                            dStr += '<tr class="data"><td><input type="text" class="fymt" readonly value="' + d2.itemName + '"/></td><td><input type="text" class="ex-je" value="' + d2.itemTotal + '"></td>' +
                                '<td><span class="glyphicon glyphicon-remove"></span></td></tr>'
                        }
                        dStr += '<tr class="tr-add"><td></td> <td></td> <td><span class="glyphicon glyphicon-plus d-add"></span></td> </tr>';

                        ele.find('.zd-tb').find('tbody').html(str);
                        ele.find('.zd-ckfy').find('tbody').html(wStr);
                        ele.find('.zd-bgfy').find('tbody').html(dStr);
                        $('#update-ensure').show();
                        $('#ensure-charge').hide();
                        $('.zd-fyqd').show();
                        $('.zd-ex').hide();
                        $('.sel-type p').removeClass('active');
                        $('p[data-tar="zd-fyqd"]').addClass('active');
                        ele.removeClass('dp-n');
                        $('.white-back').removeClass('dp-n');
                    }
                } else {
                    Modal.setAlert(json.resMsg || '获取详情失败，请重试');
                }
            });
        });
        $(document).on('click', '.fymt.choose', function () {
            $('.se-part').addClass('dp-n');
            $(this).siblings('.se-part').removeClass('dp-n');
        });
        $(document).on('click', '.se-part li', function () {
            var dj = parseFloat($(this).data('dj'))
                , zl = parseFloat($(this).data('zl'))
                , ele = $(this).parents('tr.data');
            ele.find('.ip-dj').val(dj);
            ele.find('.ip-zl').val(zl);
            ele.find('.ttp').val(dj * zl);
            $(this).parents('ul').siblings('input').val($(this).html());
            $(this).parents('ul').addClass('dp-n');
            ele.find('.fymt').removeClass('choose');
            ele.find('.se-part').remove();
        });
        $(document).on('click', function (e) {
            var target = $(e.target);
            if (target.closest('.fymt.choose,.se-part li').length == 0) {
                $('.se-part').addClass('dp-n');
            }
        });
        $(document).on('keyup', '.ip-zl,.ip-dj', function () {
            $(this).val($(this).val().replace(/[^\d.]/g, ""))
        });
        $(document).on('blur', '.ip-zl,.ip-dj', function () {
            var v = $(this).val() || 0;
            $(this).val(parseFloat(v));
            var ele = $(this).parents('tr.data');
            var dj = parseFloat(ele.find('.ip-dj').val())
                , zl = parseFloat(ele.find('.ip-zl').val());
            ele.find('.ttp').val(dj * zl);
        });
        $(document).on('click', '.glyphicon-remove', function () {
            $(this).parents('tr.data').remove();
        });
        $(document).on('click', '.fyqd-add', function () {
            var exist = [], arr = [], str = '', ul = '';
            //获取已存在的项目
            $('.zd-tb').find('.fymt').each(function () {
                exist.push($(this).val());
            });
            //计算可添加的项目
            for (var d in defaultPrice) {
                if (defaultPrice.hasOwnProperty(d)) {
                    if (exist.indexOf(d) < 0) {
                        arr.push(defaultPrice[d]);
                    }
                }
            }
            if (arr.length > 0) {
                for (var a in arr) {
                    if (arr.hasOwnProperty(a)) {
                        var sg = arr[a];
                        ul += '<li data-dj="' + sg.itemPrice + '" data-zl="' + sg.itemUnit + '">' + sg.itemName + '</li>';
                    }
                }
                str += '<tr class="data"> <td><input type="text" class="fymt choose" readonly value="请选择费用名称"/> ' +
                    '<ul class="se-part dp-n">' + ul + '</ul> ' +
                    '</td> <td><input type="text" class="ip-dj" value="0"/>' +
                    '</td> <td><input type="text" class="ip-zl" value="0"/></td> ' +
                    '<td><input type="text" class="ttp" readonly value="0"/></td> <td><span class="glyphicon glyphicon-remove"></span></td> </tr>';
                $('.zd-tb').find('.tr-add').before(str);
            }
        });
        $(document).on('click', '.w-add', function () {
            var exist = [], arr = [], str = '', ul = '';
            //获取已存在的项目
            $('.zd-ckfy').find('.fymt').each(function () {
                exist.push($(this).val());
            });
            //计算可添加的项目
            for (var d in WPrice) {
                if (WPrice.hasOwnProperty(d)) {
                    if (exist.indexOf(WPrice[d]) < 0) {
                        arr.push(WPrice[d]);
                    }
                }
            }
            if (arr.length > 0) {
                for (var a in arr) {
                    if (arr.hasOwnProperty(a)) {
                        var sg = arr[a];
                        ul += '<li>' + sg + '</li>';
                    }
                }
                str += '<tr class="data"> <td><input type="text" class="fymt choose" readonly value="请选择费用名称"/> ' +
                    '<ul class="se-part dp-n">' + ul + '</ul> ' +
                    '<td><input type="text" class="ex-je" value="0"/></td> <td><span class="glyphicon glyphicon-remove"></span></td> </tr>';
                $('.zd-ckfy').find('.tr-add').before(str);
            }
        });
        $(document).on('click', '.d-add', function () {
            var exist = [], arr = [], str = '', ul = '';
            //获取已存在的项目
            $('.zd-bgfy').find('.fymt').each(function () {
                exist.push($(this).val());
            });
            //计算可添加的项目
            for (var d in DPrice) {
                if (DPrice.hasOwnProperty(d)) {
                    if (exist.indexOf(DPrice[d]) < 0) {
                        arr.push(DPrice[d]);
                    }
                }
            }
            if (arr.length > 0) {
                for (var a in arr) {
                    if (arr.hasOwnProperty(a)) {
                        var sg = arr[a];
                        ul += '<li>' + sg + '</li>';
                    }
                }
                str += '<tr class="data"> <td><input type="text" class="fymt choose" readonly value="请选择费用名称"/> ' +
                    '<ul class="se-part dp-n">' + ul + '</ul> ' +
                    '<td><input type="text" class="ex-je" value="0"/></td> <td><span class="glyphicon glyphicon-remove"></span></td> </tr>';
                $('.zd-bgfy').find('.tr-add').before(str);
            }
        });
        $(document).on('click', '#zd-ensure', function () {
            var arr = [], total = 0;
            $('.zd-tb').find('tr.data').each(function () {
                var data = {
                    "itemName": $(this).find('.fymt').val(),
                    "itemPrice": parseFloat($(this).find('.ip-dj').val()),
                    "itemUnit": 1,
                    "itemCount": parseFloat($(this).find('.ip-zl').val()),
                    "itemTotal": parseFloat($(this).find('.ttp').val())
                };
                arr.push(data);
                total += parseFloat($(this).find('.ttp').val());
            });
            if (arr.length > 0) {
                var data = {
                    "orderId": stopgap.order.orderId,
                    "serviceFeeList": arr,
                    "orderChargingTotal": total,
                    "chargeState": 0
                };
                Data.createCharge(data, function (json) {
                    if (json && 'resCode' in json && json.resCode == 0) {
                        Modal.setAlert(json.resMsg || '制单成功！', null, function () {
                            location.reload();
                        });
                    } else {
                        Modal.setAlert(json.resMsg || '制单失败，请重试！');
                    }
                });
            }
        });
    };
    var exPriceInit = function () {
        Data.exPrice({id: 2}, function (json) {
            if (json && 'resCode' in json && json.resCode == 0) {
                DPrice = json.resBody || [];
            }
        });
        Data.exPrice({id: 1}, function (json) {
            if (json && 'resCode' in json && json.resCode == 0) {
                WPrice = json.resBody || [];
            }
        });
    };
    var submit = function () {
        $(document).on('click', '#update-ensure', function () {
            var arr = [], w = [], d = [], total = 0;
            $('.zd-part .zd-tb').find('tr.data').each(function () {
                if ($(this).find('.fymt').val() != '请选择费用名称') {
                    arr.push({
                        "itemName": $(this).find('.fymt').val(),
                        "itemPrice": parseFloat($(this).find('.ip-dj').val()),
                        "itemUnit": 1,
                        "itemCount": parseFloat($(this).find('.ip-zl').val()),
                        "itemTotal": parseFloat($(this).find('.ttp').val())
                    });
                    total += parseFloat($(this).find('.ttp').val());
                }
            });
            $('.zd-part .zd-ckfy').find('tr.data').each(function () {
                if ($(this).find('.fymt').val() != '请选择费用名称') {
                    w.push({
                        "itemName": $(this).find('.fymt').val(),
                        "itemPrice": $(this).find('.ex-je').val(),
                        "chargeExFeeType": 1,
                        "itemCount": 1,
                        "wareHouseId": 0,
                        "declareCompanyId": 0,
                        "createDt": new Date(),
                        "itemTotal": $(this).find('.ex-je').val()
                    });
                }
            });
            $('.zd-part .zd-bgfy').find('tr.data').each(function () {
                if ($(this).find('.fymt').val() != '请选择费用名称') {
                    d.push({
                        "itemName": $(this).find('.fymt').val(),
                        "itemPrice": $(this).find('.ex-je').val(),
                        "chargeExFeeType": 2,
                        "itemCount": 1,
                        "wareHouseId": 0,
                        "declareCompanyId": 0,
                        "createDt": new Date(),
                        "itemTotal": $(this).find('.ex-je').val()
                    });
                }
            });
            if (arr.length > 0) {
                var data = {
                    "orderId": stopgap.orderId,
                    "serviceFeeList": arr,
                    "wareHouseFeeList": w,
                    "declareFeeList": d,
                    "orderChargingTotal": total,
                    "orderHasFee": 0,
                    "chargeState": 0
                };
                Data.update(data, function (json) {
                    if (json && 'resCode' in json && json.resCode == 0) {
                        Modal.setAlert(json.resMsg || '修改成功！', null, function () {
                            location.reload();
                        });
                    } else {
                        Modal.setAlert(json.resMsg || '修改失败，请重试！');
                    }
                });
            }
        });
        $(document).on('click', '#ensure-charge', function () {
            var data = {
                "orderId": stopgap.orderId,
                "chargeState": 1
            };
            Data.ensure(data, function (json) {
                if (json && 'resCode' in json && json.resCode == 0) {
                    Modal.setAlert(json.resMsg || '确认成功！', null, function () {
                        location.reload();
                    });
                } else {
                    Modal.setAlert(json.resMsg || '确认失败，请重试！');
                }
            });
        });
    };


    var run = function () {
        listener();
        init();
        priceInit();
        zdTable();
        submit();
        exPriceInit();
    };
    return {
        run: run
    }
}());
module.exports.Listener = Listener;