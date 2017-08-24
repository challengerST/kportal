/**
 * Created by Jeremy on 2017/2/6.
 */
'use strict';
var Dom = (function () {
    var list = function (json, param) {
        var str = '';
        str += '<thead> <tr> <td>订单号</td> <td colspan="2">订单信息</td> <td colspan="4">航线信息</td> <td colspan="5">货物信息</td> <td colspan="2">价格（CNY）</td> </tr> </thead>';
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
                str = '<tr class="wrong"><td colspan="14">暂无订单信息，请添加！</td></tr>';
                $('.outer-page').html('');
                $('.list-cout').html('共为您找到 0 条结果');
            }
        } else {
            str = '<tr class="wrong"><td colspan="14">请求失败，<a href="">请重试！</a></td></tr>';
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
                default:
                    type = '自助订舱';
                    break;
            }

            return '<tbody><tr><td class="short-td" colspan="14"></td></tr></tbody><tbody class="data-tbd"> <tr> <td rowspan="2"><a href="/order/detail?tp=pending&id=' + o.orderId + '">' + o.orderNum + '</a></td>' +
                ' <td class="font-g">客户公司</td> ' +
                '<td class="font-g">委托时间/方式</td> <td class="font-g">起始港</td>' +
                ' <td class="font-g">目的港</td> <td class="font-g">航空公司</td> ' +
                '<td class="font-g">起飞时间</td> <td class="font-g">数量（PCS）</td> <td class="font-g">重量（KGS）</td>' +
                ' <td class="font-g">体积（CBM）</td> <td class="font-g">品名</td> <td class="font-g">单价（CNY）</td> ' +
                '<td rowspan="2" class="font-r">' + o.declareChargingTotal + '</td> <td class="opt-td" rowspan="2" data-jcbh="' + o.warehouseEntryNum + '" data-khmc="' + (c.companyName || '/') + '" data-lxr="' + (m.memberName || '/') + '">' +
                '<a class="show-opt" href="javascript:void(0);">操作 <span class="caret"></span></a><div class="opt-part dp-n">' +

                (o.orderState == 0 ?
                '<a href="javascript:void(0);" class="show-jd" data-id="' + o.orderId + '">确认订单</a>' +
                '<a href="javascript:void(0);" class="refuse" data-id="' + o.orderId + '">取消</a>'
                    :
                '<a href="javascript:void(0);" class="show-yd" data-id="' + o.orderId + '">关联运单</a> ' +
                '<a href="javascript:void(0);" class="refuse" data-id="' + o.orderId + '">取消</a>' ) +
                '</div></td> </tr> ' +
                '<tr> <td>' + (c.companyName || '/') + '</td> <td>' + new Date(o.createDt.replace(/-/g, "/")).Format('yyyy-MM-dd hh:mm') + ' <br/> ' + type + '</td> <td>' + (o.deptCode || '/') + '</td>' +
                ' <td>' + (o.destCode || '/') + '</td> <td>' + (o.airCompanyCode || '/') + '</td> <td>' + new Date(o.flightDate.replace(/-/g, "/")).Format('yyyy-MM-dd') + '</td> <td>' + (o['declareCargo'].cargoCount || '/') + '</td> <td>' + (o['declareCargo'].cargoWeight || '/') + '</td> <td>' + (o['declareCargo'].cargoSize || '/') + '</td>' +
                ' <td>' + (o['declareCargo'].cargoName || '/') + '</td> <td>' + o.chargingPrice + '</td> </tr> </tbody>'

        }

        $('.outer-tb').html(str);
    };
    var renderTr = function (json) {
        var n = 0;//计算是否会出现滚动条
        var str = '';
        var tft = '';
        if (json && 'storageBatch' in json && json.storageBatch instanceof Array) {
            var list = json.storageBatch;
            if (list.length > 0) {
                for (var l in list) {
                    if (list.hasOwnProperty(l)) {
                        var d = list[l];
                        str += render(d, parseInt(l) + 1);
                    }
                }
                tft += '<div></div> <div class="big">总计</div> ' +
                    '<div>' + json.totalCount + '</div> <div></div> <div></div> ' +
                    '<div></div> <div>' + json.totalSize + '</div> <div>' + json.totalWeight + '</div> <div></div>' +
                    ' <div>' + json.totalDamage + '</div> <div>' + json.totalDamp + '</div> <div>' + json.totalTransform + '</div> <div>' + json.totalOther + '</div>' +
                    ' <div></div>';
            } else {
                str = '<div class="wrong">暂无进仓数据，请添加！</div>';
            }
        } else {
            str = '<div class="wrong">请求数据出错，请重试！</div>';
        }
        if (n > 6) {
            $('.ensure-data-part').find('.tbd').css('padding-right', '3px')
        }
        $('.ensure-data-part').find('.tbd').html(str);
        $('.ensure-data-part').find('.tft').html(tft);
        function render(d, index) {
            n += 1;
            var str = '';
            str += '<div class="ttr fill"> <div>' + index + '</div> <div class="big">批次小计</div> ' +
                '<div>' + d.batchCount + '</div> <div></div> <div></div> ' +
                '<div></div> <div>' + d.batchSize + '</div> <div>' + d.batchWeight + '</div> <div></div>' +
                ' <div>' + d.batchDamage + '</div> <div>' + d.batchDamp + '</div> <div>' + d.batchTransform + '</div> <div>' + d.batchOther + '</div>' +
                ' <div></div> </div>';
            for (var i in d.batchList) {
                if (d.batchList.hasOwnProperty(i)) {
                    n += 1
                    var dt = d.batchList[i];
                    var type;
                    switch (dt.packageType) {
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
                    str += '<div class="ttr fill"> <div></div> <div class="big">' + new Date(dt.storageTime.replace(/-/g, "/")).Format('yyyy-MM-dd hh:mm') + '</div> ' +
                        '<div>' + dt.storageCount + '</div> <div>' + dt.storageLength + '</div> <div>' + dt.storageWidth + '</div> ' +
                        '<div>' + dt.storageHeight + '</div> <div>' + dt.storageSize + '</div> <div>' + dt.storageWeight + '</div> <div>' + type + '</div>' +
                        ' <div>' + dt.damageCount + '</div> <div>' + dt.dampCount + '</div> <div>' + dt.transformCount + '</div> <div>' + dt.otherCount + '</div>' +
                        ' <div>' + dt.storageRemark + '</div> </div>';
                }
            }
            return str;
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
                str = '<tr class="wrong"><td colspan="10">暂无搜索信息！</td></tr>';
                $('.inner-page').html('');
            }
        } else {
            str = '<tr class="wrong"><td colspan="10">请求失败，<a href="">请重试！</a></td></tr>';
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
                '<td>' + d.airCompanyCode + '</td> <td>' + str + '</td> <td>' + (d.airwayPrice.rate[0].min || '0') + '</td><td>' + d.airwayPrice.rate[0].policy['45'] + '</td> ' +
                '<td>' + d.airwayPrice.rate[0].policy['100'] + '</td> <td>' + d.airwayPrice.rate[0].policy['300'] + '</td>' +
                ' <td>' + d.airwayPrice.rate[0].policy['500'] + '</td> <td>' + d.airwayPrice.rate[0].policy['1000'] + '</td><td>' + (d.remarks || '/') + '</td></tr>'

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