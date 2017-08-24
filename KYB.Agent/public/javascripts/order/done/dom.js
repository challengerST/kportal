/**
 * Created by Jeremy on 2017/2/6.
 */
'use strict';
var myformat = require('../../general/function').format;
var Dom = (function () {
    var list = function (json, param) {
        var str = '';
        str += '<thead> <tr> <td><input type="checkbox" id="check-all"></td><td>订单号</td> <td colspan="2">订单信息</td> <td colspan="4">航线信息</td> <td colspan="5">货物信息</td> <td colspan="2">价格（CNY）</td> </tr> </thead>';
        if (json && json.resCode == 0 && 'resBody' in json && json.resBody && 'sList' in json.resBody && json.resBody.sList instanceof Array) {
            if (json.resBody.sList.length > 0) {
                var arr = json.resBody.sList;
                for (var a in arr) {
                    if (arr.hasOwnProperty(a)) {
                        str += render(arr[a]);
                    }
                }
                $.burster($(".outer-page"), param.offset || 0, json.resBody.totalCount || 0, 5, param.limit || 20);
                $('.list-cout').html('共为您找到 ' + json.resBody.totalCount + ' 条结果');
            } else {
                str = '<tr class="wrong"><td colspan="9">暂无订单信息，请添加！</td></tr>';
                $('.outer-page').html('');
                $('.list-cout').html('共为您找到 0 条结果');
            }
        } else {
            str = '<tr class="wrong"><td colspan="9">请求失败，<a href="">请重试！</a></td></tr>';
            $('.outer-page').html('');
            $('.list-cout').html('共为您找到 0 条结果');
        }
        function render(d) {
            var c = d.company || {}
                , o = d.order || {}
                , m = d.member || {}
                , type;
            switch (o.orderChannel) {
                case 1:
                    type = '自助订舱';
                    break;
                case 2:
                    type = '快速订舱';
                    break;
                case 3:
                    type = '后台下单';
                    break;
                case 6:
                    type = '拼货订单';
                    break;
                default:
                    type = '自助订舱';
                    break;
            }

            return '<tbody><tr><td class="short-td" colspan="14"></td></tr></tbody><tbody class="data-tbd"> <tr>  <td rowspan="2" style="padding: 0 10px;"><input data-id="' + o.orderId + '" type="checkbox" name="list-sg"></td> <td class="' + (o.orderType == 1 ? 'bg-p' : (o.allowClearence ? 'bg-q' : 'bg-y')) + '">' + (o.orderType == 1 ? '月结' : '票结') + (d.agent ? (d.agent.name ? '&nbsp;&nbsp;&nbsp;&nbsp;' + d.agent.name : '&nbsp;&nbsp;&nbsp;&nbsp;/') : '&nbsp;&nbsp;&nbsp;&nbsp;/') + '</td>' +
                ' <td class="bg-g">客户公司</td> ' +
                '<td class="bg-g">委托时间/方式</td> <td class="bg-g">起始港</td>' +
                ' <td class="bg-g">目的港</td> <td class="bg-g">航空公司</td> ' +
                '<td class="bg-g">起飞时间</td> <td class="bg-g">数量（PCS）</td> <td class="bg-g">重量（KGS）</td>' +
                ' <td class="bg-g">体积（CBM）</td> <td class="bg-g">品名</td> <td class="bg-g">单价（CNY）</td> ' +
                '<td rowspan="2" class="font-r">' + o.airwayFee + '</td> <td class="opt-td" rowspan="2" data-jcbh="' + o.warehouseEntryNum + '" data-khmc="' + (c.companyName || '/') + '" data-lxr="' + (m.memberName || '/') + '">' +
                '<a class="show-opt" href="javascript:void(0);">操作 <span class="caret"></span></a><div class="opt-part dp-n">' +
                (o.chargeFinish ? '<a href="javascript:void(0);" class="show-detail" data-id="' + o.orderId + '">查看</a>' : '<a href="javascript:void(0);" class="show-zd" data-id="' + o.orderId + '">结算</a>') +

                '<a href="javascript:void(0);" class="show-ys" data-id="' + o.orderId + '">运输</a>'+'<a href="javascript:void(0);" class="show-log" data-id="' + o.orderId + '">操作日志</a>'+
                '</div></td> </tr> ' +
                '<tr> <td><a href="/order/detail?tp=done&id=' + o.orderId + '">' + o.orderNum + '</a></td><td>' + (c.companyName || '/') + '</td> <td>' + new Date(o.createDt.replace(/-/g, "/")).Format('yyyy-MM-dd hh:mm') + ' <br/> ' + type + '</td> <td>' + (o.deptCode || '/') + '</td>' +
                ' <td>' + (o.destCode || '/') + '</td> <td>' + (o.airCompanyCode || '/') + '</td> ' +
                '<td>' + new Date(o.flightDate.replace(/-/g, "/")).Format('yyyy-MM-dd') + '</td> <td>' + (o['cargo'].cargoCount || '/') + '</td> ' +
                '<td>' + (o['cargo'].cargoWeight || '/') + '</td> <td>' + (myformat.formatvolume(o['cargo'].cargoSize) || '/') + '</td>' +
                ' <td><div class="tw" title="'+o['cargo'].cargoName+'">' + (o['cargo'].cargoName || '/') + '</div></td> <td>' + o.chargingPrice + '</td> </tr> </tbody>';
        }

        $('.outer-tb').html(str);
    };
    var renderTr = function (json) {
        var str = ''
            , result = "";
        if (json && 'list' in json && json.list instanceof Array) {
            var list = json.list;
            if (list.length > 0) {
                for (var l in list) {
                    if (list.hasOwnProperty(l)) {
                        var d = list[l];
                        str += render(d, parseInt(l) + 1);
                    }
                }
                result += '<tr> <td></td> <td>总计</td> ' +
                    '<td>' + json.totalCount + '</td> <td>' + myformat.formatvolume(json.totalSize) + '</td> <td>' + myformat.formatweight(json.totalWeight) + '</td>' +
                    ' <td></td> <td>' + json.totalDamage + '</td> <td>' + json.totalDamp + '</td> <td>' + json.totalTransform + '</td> <td>' + json.totalOther +
                    '</td> <td></td> </tr>';
            } else {
                str = '<tr><td colspan="10" class="long-td">暂无进仓数据，请添加！</td></tr>';
            }
        } else {
            str = '<tr><td colspan="10" class="long-td">请求出错，请重试！</td></tr>';
        }
        $('.ensure-data-tb').find('tbody').html(str);
        $('.ensure-data-tb').find('tfoot').html(result);
        function render(d, index) {
            var type;
            switch (d.packageType) {
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
                default:
                    type = '纸箱';
                    break;
            }
            return '<tr> <td>' + index + '</td> <td>' + new Date(d.createDt.replace(/-/g, "/")).Format('yyyy-MM-dd hh:mm') + '</td>' +
                ' <td>' + d.storageCount + '</td> <td>' +  myformat.formatvolume(d.storageSize) + '</td> <td>' +  myformat.formatweight(d.storageWeight) + '</td>' +
                ' <td>' + type + '</td> <td>' + d.damageCount + '</td> <td>' + d.dampCount + '</td>' +
                ' <td>' + d.transformCount + '</td> <td>' + d.otherCount + '</td> <td>' + d.storageRemark + '</td> </tr>';
        }
    };
    var innerList = function (json, param) {
        var str = '';
        if (json && json.resCode == 0 && 'resBody' in json && json.resBody && 'sList' in json.resBody && json.resBody.sList instanceof Array) {
            if (json.resBody.sList.length > 0) {
                var arr = json.resBody.sList;
                for (var a in arr) {
                    if (arr.hasOwnProperty(a)) {
                        str += render(arr[a]);
                    }
                }
                $.burster($(".inner-page"), param.offset || 0, json.resBody.totalCount || 0, 5, param.limit || 20);
            } else {
                str = '<tr class="wrong"><td colspan="9">暂无搜索信息！</td></tr>';
                $('.inner-page').html('');
            }
        } else {
            str = '<tr class="wrong"><td colspan="9">请求失败，<a href="">请重试！</a></td></tr>';
            $('.inner-page').html('');
        }
        function render(d) {
            var str = '';
            for (var t in d.transPort) {
                if (d.transPort.hasOwnProperty(t)) {
                    var s = d.transPort[t];
                    str += s.portCode + (t == d.transPort.length - 1 ? '' : ' -> ');
                }
            }
            return ' <tr> <td><input type="radio" name="i-sg" data-id="' + d.airwayId + '"/></td> ' +
                '<td>' + d.airCompanyCode + '</td> <td>' + str + '</td> <td>' + d.airwayPrice.rate[0].policy['45'] + '</td> ' +
                '<td>' + d.airwayPrice.rate[0].policy['100'] + '</td> <td>' + d.airwayPrice.rate[0].policy['300'] + '</td>' +
                ' <td>' + d.airwayPrice.rate[0].policy['500'] + '</td> <td>' + d.airwayPrice.rate[0].policy['1000'] + '</td>'

        }

        $('.search-tb').find('tbody').html(str);
    };
    var calExpense = function(){
        var priceTotal = 0,totalCount= 0,totalAmount=0;
        $('.zd-part .zd-tb').find('tr.data').each(function () {
            var dj = parseFloat($(this).find('.ip-dj').val())
                , zl = parseFloat($(this).find('.ip-zl').val());
            priceTotal +=dj;
            totalCount +=zl;
            totalAmount +=dj*zl;
        });
        $('.zd-part .zd-tb').find('tr.tr-total').find('.total-price').html(priceTotal);
        $('.zd-part .zd-tb').find('tr.tr-total').find('.total-count').html(totalCount);
        $('.zd-part .zd-tb').find('tr.tr-total').find('.total-amount').html(totalAmount);
    }

    return {
        list: list
        , renderTr: renderTr
        , innerList: innerList
        ,calExpense : calExpense
    }
}());
module.exports.Dom = Dom;