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
var Listener = (function () {
    var WPrice = []//仓库费用
        , DPrice = [];//报关费用
    var defaultPrice = {}
        , stopgap = {};
    var doneList = {};
    var operateId;
    var process = {};
    var listener = function () {
        $(document).on('mouseenter', '.opt-td', function () {
            $(this).children('.opt-part').fadeIn(200);
        });
        $(document).on('mouseleave', '.opt-td', function () {
            $(this).children('.opt-part').fadeOut(200);
        });
        $(document).on('click', '.sel-type p', function () {
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
            $('.' + $(this).data('tar')).show();
            $('.' + $(this).data('tar')).siblings().hide();
        });
        $(document).on('click', '#check-all', function () {
            $('input[type="checkbox"][name="list-sg"]').prop('checked', $(this).prop('checked'));
        });
        $(document).on('click', '.outer-page .pages', function () {
            url.set('offset', $(this).data('offset'));
            init();
        });
        $(document).on('click', '#search', function () {
            url.set('offset', 0);
            init();
        });
        $(document).on('click', '.close-btn', function () {
            $('.alert-part').addClass('dp-n');
            $('.white-back').addClass('dp-n');
        });
        $(document).on('click', '.show-detail', function () {
            Data.expenseDetail({id: $(this).data('id')}, function (json) {
                if (json && 'resCode' in json && json.resCode == 0) {
                    var ele = $('.qr-part')
                        , o = json.resBody;
                    stopgap = json.resBody;
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
                    $('.pm').attr("title",o.entryCargo.cargoName || '/');
                    $('.lx').html(type || '/');
                    $('.wtbg').html(o.entryCargo.isBulkyCargo ? '是' : '否');
                    $('.js').html(o.entryCargo.cargoCount + '件');
                    $('.tj').html(myformat.formatvolume(o.entryCargo.cargoSize) + 'm³');
                    $('.zl').html(o.entryCargo.cargoWeight + 'KG（计费重量：' + o.entryCargo.chargingWeight + 'KG）');
                    var priceTotal = 0,totalCount= 0,totalAmount=0;
                    for (var s in o.serviceFeeList) {
                        if (o.serviceFeeList.hasOwnProperty(s)  && o.serviceFeeList[s].itemName !='报关费') {
                            var d = o.serviceFeeList[s];
                            str += '<tr class="data"> <td><input type="text" class="fymt" readonly value="' + d.itemName + '"/>' +
                                '</td> <td><input type="text" class="ip-dj" value="' + d.itemPrice + '"/>' +
                                '</td> <td><input type="text" class="ip-zl" value="' + d.itemCount + '"/>' +
                                '</td> <td><input type="text" class="ttp" readonly value="' + d.itemTotal + '"/>' +
                                '</td> </tr>';
                            priceTotal +=d.itemPrice;
                            totalCount +=d.itemCount;
                            totalAmount +=d.itemTotal;
                        }
                    }
                    //str += '<tr class="tr-add"> <td></td> <td></td> <td></td> <td></td> <td><span class="glyphicon glyphicon-plus"></span></td> </tr>';
                    str += '<tr class="tr-total"> <td>总计</td> <td  class="total-price">' + priceTotal + '</td> <td class="total-count">' + totalCount + '</td> <td class="total-amount">' + totalAmount + '</td>  </tr>';
                    var wStr = '<tr><td colspan="3">暂无费用</td></tr>', dStr = '<tr><td colspan="3">暂无费用</td></tr>';
                    var arrW = o.wareHouseFeeList || []
                        , arrD = o.declareFeeList || [];
                    for (var w = 0; w < arrW.length; w++) {
                        var d1 = arrW[w];
                        if (w == 0) {
                            wStr = '';
                        }
                        wStr += '<tr class="data"><td><input type="text" class="fymt" readonly value="' + d1.itemName + '"/></td><td><input type="text" class="ex-je" value="' + d1.itemTotal + '"></td>' +
                            '</tr>'
                    }
                    for (var dd = 0; dd < arrD.length; dd++) {
                        var d2 = arrD[dd];
                        if (dd == 0) {
                            dStr = '';
                        }
                        dStr += '<tr class="data"><td><input type="text" class="fymt" readonly value="' + d2.itemName + '"/></td><td><input type="text" class="ex-je" value="' + d2.itemTotal + '"></td>' +
                            '</tr>'
                    }

                    ele.find('.zd-tb').find('tbody').html(str);
                    ele.find('.zd-ckfy').find('tbody').html(wStr);
                    ele.find('.zd-bgfy').find('tbody').html(dStr);
                    if (o.chargeState == 1 || o.chargeState == 3) {
                        $('#ensure-charge').hide();
                    } else {
                        $('#ensure-charge').show();
                    }
                    $('.zd-fyqd').show();
                    $('.zd-ex').hide();
                    $('.sel-type p').removeClass('active');
                    $('p[data-tar="zd-fyqd"]').addClass('active');
                    ele.removeClass('dp-n');
                    $('.white-back').removeClass('dp-n');
                } else {
                    Modal.setAlert(json.resMsg || '获取详情失败，请重试');
                }
            });
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
        $(document).on('click', '#transfer', function () {
            var arr = [];
            $('input[name="list-sg"]:checked').each(function () {
                arr.push($(this).data('id'));
            });
            if (arr.length > 0) {
                $('.white-back').removeClass('dp-n');
                $('.transfer-part').removeClass('dp-n');
            }
        });
        $(document).on('click', '#accept-transfer', function () {
            var arr = [];
            var mId;
            $('input[name="list-sg"]:checked').each(function () {
                arr.push($(this).data('id'));
            });
            mId = $('#czy').find('option:selected').val();
            if (arr.length > 0 && mId) {
                var data = {
                    "orderIds": arr,
                    "companyId": 0,
                    "memberFrom": 0,
                    "memberTo": mId,
                    "requireMeberId": 0
                };
                Data.transfer(data, function (json) {
                    if (json && 'resCode' in json && json.resCode == 0) {
                        Modal.setAlert('转移成功！', null, function () {
                            location.reload();
                        });
                    } else {
                        Modal.setAlert(json.resMsg || '转移失败，请重试！');
                    }
                });
            }
        });
        $(document).on('click', '.show-log', function () {
            Data.log({id: $(this).data('id')}, function (json) {
                if (json && 'resBody' in json && json.resBody instanceof Array) {
                    var str = '';
                    var arr = json.resBody;
                    if (arr.length > 0) {
                        for (var a in arr) {
                            if (arr.hasOwnProperty(a)) {
                                var type = '';
                                var d = arr[a];
                                switch (d.operatorType) {
                                    case 1:
                                        type = '客户';
                                        break;
                                    case 2:
                                        type = '货代';
                                        break;
                                    case 3:
                                        type = '报关行';
                                        break;
                                }
                                str += '<tr><td>' + (new Date(d.createDt).Format('yyyy-MM-dd hh:mm')) + '</td><td>' + d.orderNum + '</td>' +
                                    '<td>' + type + '</td><td>' + d.operatorId + '</td><td class="long">' + d.remark + '</td></tr>'
                            }
                        }
                    } else {
                        str = '<tr><td colspan="5">暂无操作日志</td></tr>'
                    }
                    $('.log-part').find('tbody').html(str);
                    $('.log-part').removeClass('dp-n');
                    $('.white-back').removeClass('dp-n');
                } else {
                    Modal.setAlert(json.resMsg || '获取失败，请重试');
                }
            });
        });
        $(document).on('click', '.show-ys', function () {
            init();
            operateId = $(this).data('id');
            var d = doneList[operateId];
            var ele = $('.ys-part');
            var jczt = '', dczt = '';
            console.log(d);
            switch (d.order.bookingState) {
                case 0:
                    dczt = '未订舱';
                    break;
                case 1:
                    dczt = '已订舱';
                    break;
                case -1:
                    dczt = '订舱失败';
                    break;
                case 2:
                    dczt = '已改配';
                    break;
            }
            switch (d.order.entryState) {
                case 0:
                    jczt = '待进仓';
                    break;
                case 1:
                    jczt = '已进仓';
                    break;
                case 2:
                    jczt = '已确认';
                    break;
            }
            ele.find('.ddh').html(d.order.orderNum);
            ele.find('.qsg').html(d.order.deptCode);
            ele.find('.mdg').html(d.order.destCode);
            ele.find('.hkgs').html(d.order.airCompanyCode);
            ele.find('.qfrq').html(new Date(d.order.flightDate.replace(/-/g, "/")).Format('yyyy-MM-dd'));
            ele.find('.jczt').html(jczt);
            ele.find('.dczt').html(dczt);
            $('.white-back').removeClass('dp-n');
            ele.removeClass('dp-n');
        });
        $(document).on('click', '#ys-ensure', function () {
            var data = {
                "orderId": operateId,
                "state": $('#c-yszt').find('option:selected').val()
            };
            Data.ys(data, function (json) {
                if (json && 'resCode' in json && json.resCode == 0) {
                    Modal.setAlert(json.resMsg || '更新成功！', null, function () {
                        location.reload();
                    });
                } else {
                    Modal.setAlert(json.resMsg || '更新失败，请重试！')
                }
            });
        });
    };
    var init = function () {
        var data = {
            offset: url.get('offset') || 0,
            limit: url.get('limit') || 10,
            "deptCode": $('#start').val(),
            "destCode": $('#end').val(),
            "number": $('#order-num').val()
        };
        Data.list(data, function (json) {
            Dom.list(json, data);
            var dt = {};
            if (json && 'resCode' in json && json.resCode == 0 && json.resBody && json.resBody.sList.length > 0) {
                var list = json.resBody.sList;
                for (var l in list) {
                    if (list.hasOwnProperty(l)) {
                        var d = list[l];
                        dt[d.order.orderId] = d;
                    }
                }
            }
            doneList = dt;
        });
    };
    var zdTable = function () {
        $(document).on('click', '.show-zd', function () {
            stopgap = doneList[$(this).data('id')] || null;
            if (stopgap) {
                var ele = $('.zd-part')
                    , c = stopgap.company
                    , o = stopgap.order;
                var type = '', str = '';
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
                switch (o.cargo.cargoType) {
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
                $('.ddh').html(o.orderNum || '/');
                $('.kh').html(c.companyName || '/');
                $('.ddqd').html(channel || '/');
                $('.qsg').html(o.deptCode || '/');
                $('.mdg').html(o.destCode || '/');
                $('.hkgs').html(o.airCompanyCode || '/');
                $('.qfrq').html(o.flightDate ? new Date(o.flightDate).Format('yyyy-MM-dd') : '/');
                $('.hbh').html(o.airlineInfo || '/');
                $('.pm').html(o.cargo.cargoName || '/');
                $('.pm').attr("title",o.cargo.cargoName || '/');
                $('.lx').html(type || '/');
                $('.wtbg').html(o.cargo.isBulkyCargo ? '是' : '否');
                $('.js').html(o.cargo.cargoCount + 'PCS');
                $('.tj').html( myformat.formatvolume(o.cargo.cargoSize) + 'CBM');
                $('.zl').html( myformat.formatweight(o.cargo.cargoWeight) + 'KGS（计费重量：' + o.cargo.chargingWeight + 'KGS）');
                str += '<tr class="data"> <td><input type="text" class="fymt" readonly value="空运费"/>' +
                    '</td> <td><input type="text" class="ip-dj" value="' + o.chargingPrice + '"/>' +
                    '</td> <td><input type="text" class="ip-zl" value="' + o.chargingWeight + '"/>' +
                    '</td> <td><input type="text" class="ttp" readonly value="' + o.chargingPrice * o.chargingWeight + '"/>' +
                    '</td> <td><span class="glyphicon glyphicon-remove"></span></td></tr>';
                var priceTotal = o.chargingPrice,totalCount= o.chargingWeight,totalAmount=o.chargingPrice * o.chargingWeight ;
                for (var s in o.serviceFeeList) {
                    if (o.serviceFeeList.hasOwnProperty(s) && o.serviceFeeList[s].itemName !='报关费') {
                        var d = o.serviceFeeList[s];
                        str += '<tr class="data"> <td><input type="text" class="fymt" readonly value="' + d.itemName + '"/>' +
                            '</td> <td><input type="text" class="ip-dj" value="' + d.itemPrice + '"/>' +
                            '</td> <td><input type="text" class="ip-zl" value="' + d.itemCount + '"/>' +
                            '</td> <td><input type="text" class="ttp" readonly value="' + d.itemTotal + '"/>' +
                            '</td> <td><span class="glyphicon glyphicon-remove"></span></td></tr>';
                        priceTotal +=d.itemPrice;
                        totalCount +=d.itemCount;
                        totalAmount +=d.itemTotal;
                    }
                }
                str += '<tr class="tr-add"> <td></td> <td></td> <td></td> <td></td> <td><span class="glyphicon glyphicon-plus fyqd-add"></span></td> </tr>';
                str += '<tr class="tr-total"> <td>总计</td> <td  class="total-price">' + priceTotal + '</td> <td class="total-count">' + totalCount + '</td> <td class="total-amount">' + totalAmount + '</td> <td></td> </tr>';
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
                $('.zd-fyqd').show();
                $('.zd-ex').hide();
                $('.sel-type p').removeClass('active');
                $('p[data-tar="zd-fyqd"]').addClass('active');
                ele.removeClass('dp-n');
                $('.white-back').removeClass('dp-n');
            }
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
            Dom.calExpense();
        });
        $(document).on('click', '.glyphicon-remove', function () {
            $(this).parents('tr.data').remove();
            Dom.calExpense();
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
                    "orderId": stopgap.order.orderId,
                    "serviceFeeList": arr,
                    "orderChargingTotal": total,
                    "chargeState": 0,
                    "wareHouseFeeList": w,
                    "declareFeeList": d,
                    "orderHasFee": $('#wfy').prop('checked')
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
    var opInit = function () {
        Data.opList(function (json) {
            var option = '';
            if (json && 'resCode' in json && json.resCode == 0 && json.resBody.length > 0) {
                var arr = json.resBody || [];
                for (var a = 0; a < arr.length; a++) {
                    option += '<option value="' + arr[a].memberId + '">' + arr[a].name + '</option>'
                }
                $('#czy').html(option);
            } else {
                option = '暂无操作员，请添加！';
                $('.transfer-part').find('.dp-tb').html(option);
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
    var run = function () {
        listener();
        init();
        zdTable();
        priceInit();
        opInit();
        exPriceInit();
    };
    return {
        run: run
    }
}());
module.exports.Listener = Listener;