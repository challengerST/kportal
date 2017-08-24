/**
 * Created by Jeremy on 2017/2/6.
 */
'use strict';
var Dom = (function () {
    var list = function (json, param) {
        var str = '';
        if (json && json.resCode == 0 && 'resBody' in json && json.resBody && 'sList' in json.resBody && json.resBody.sList instanceof Array) {
            if (json.resBody.sList.length > 0) {
                var arr = json.resBody.sList;
                for (var a in arr) {
                    if (arr.hasOwnProperty(a)) {
                        str += render(arr[a]);
                    }
                }
                $.burster($(".outer-page"), param.offset || 0, json.resBody.totalCount || 0, 5, param.limit || 20);
            } else {
                str = '<tr class="wrong"><td colspan="9">暂无订单信息，请添加！</td></tr>';
                $('.outer-page').html('');
            }
        } else {
            str = '<tr class="wrong"><td colspan="9">请求失败，<a href="">请重试！</a></td></tr>';
            $('.outer-page').html('');
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
                default:
                    type = '自助订舱';
                    break;
            }
            return '<tr> <td rowspan="2">' + o.orderNum + '</td> <td rowspan="2">' + (c.companyName || '/') + '</td>' +
                ' <td>' + new Date(o.createDt.replace(/-/g, "/")).Format('yyyy-MM-dd hh:mm') + '</td> <td>起始港：' + (o.deptCode || '/') + '</td> <td>航空公司：' + (o.airCompanyCode || '/') + '</td> ' +
                '<td colspan="2">数量：（' + (o['declareCargo'].cargoCount || '/') + '件） 体积：（' + (myformat.formatvolume(o['declareCargo'].cargoSize) || '/') + 'm³） 重量：（' + (o['declareCargo'].cargoWeight || '/') + 'KG）</td> ' +
                '<td rowspan="2">CNY ' + o.declareChargingTotal + '</td> <td rowspan="2" data-jcbh="' + o.warehouseEntryNum + '" data-khmc="' + (c.companyName || '/') + '" data-lxr="' + (m.memberName || '/') + '"> ' +
                    //(o.orderState == 0 ?
                    //'<a href="javascript:void(0);" class="accept" data-id="' + o.orderId + '">订单确认</a>' :
                    //'<a href="javascript:void(0);" class="show-bg" data-id="' + o.orderId + '">报关</a>' +
                    //'<a href="javascript:void(0);" class="show-zd" data-id="' + o.orderId + '">制单</a>' +
                    //'<a href="javascript:void(0);" class="add-data" data-id="' + o.orderId + '">录入进仓数据</a>' +
                    //'<a href="javascript:void(0);" class="ensure-data" data-id="' + o.orderId + '">确认进仓数据</a> ') +
                    //'<a href="javascript:void(0);" class="refuse" data-id="' + o.orderId + '">取消</a>' +
                '<a href="javascript:void(0);" class="show-zd" data-id="' + o.orderId + '">制单</a>' +
                ' </td> </tr> <tr> <td>' + (type || '/') + '</td> <td>目的港：' + (o.destCode || '/') + '</td> <td>起飞时间：' + new Date(o.flightDate.replace(/-/g, "/")).Format('yyyy-MM-dd') + '</td> ' +
                '<td>品名：' + (o['declareCargo'].cargoName || '/') + '</td> <td>单价：CNY ' + o.chargingPrice + '</td> </tr>' +
                '<tr><td colspan="9" class="short-td"></td></tr>';
        }

        $('.outer-tb').find('tbody').html(str);
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
                    '<td>' + json.totalCount + '</td> <td>' + myformat.formatvolume(json.totalSize) + '</td> <td>' + myformat.formatvolume(json.totalWeight) + '</td>' +
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
                ' <td>' + d.storageCount + '</td> <td>' + d.storageSize + '</td> <td>' + d.storageWeight + '</td>' +
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
    return {
        list: list
        , renderTr: renderTr
        , innerList: innerList
    }
}());
module.exports.Dom = Dom;