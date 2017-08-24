/**
 * Created by Jeremy on 2017/2/6.
 */
'use strict';
var url = require('../../general/function').url
    , myformat = require('../../general/function').format;
var Dom = (function () {
    var list = function (json, param) {
        var dt = {};
        var str = '';
        var operate = '';
        str += '<thead> <tr> <td><input type="checkbox" id="check-all"></td><td>主单号/订单号</td> <td colspan="3">订单信息</td> <td colspan="4">航班信息</td> <td colspan="7">货物信息</td></tr> </thead>';
        if (json && json.resCode == 0 && 'resBody' in json && json.resBody && 'sList' in json.resBody && json.resBody.sList instanceof Array) {
            if (json.resBody.sList.length > 0) {
                var arr = json.resBody.sList;
                for (var a in arr) {
                    if (arr.hasOwnProperty(a)) {
                        str += render(arr[a], a);
                    }
                }
                $.burster($(".outer-pages"), param.offset || 0, json.resBody.totalCount || 0, 5, param.limit || 20);
                $('.list-cout').html('共为您找到 ' + json.resBody.totalCount + ' 条结果');
            } else {
                str = '<tr class="wrong"><td colspan="9">暂无订单信息，请添加！</td></tr>';
                $('.outer-pages').html('');
                $('.list-cout').html('共为您找到 0 条结果');
            }
        } else {
            str = '<tr class="wrong"><td colspan="9">请求失败，<a href="">请重试！</a></td></tr>';
            $('.outer-pages').html('');
            $('.list-cout').html('共为您找到 0 条结果');
        }
        function render(d, index) {
            dt[d.order.orderId] = d;
            var oStr = '', type = url.get('tp') || 'book';
            var o = d;
            oStr += '<tr> <td>' + (o.order.airwayBillNum || '/') + '<br><a href="/order/detail?tp=change&id=' + o.order.orderId + '">' + o.order.orderNum + '</a></td> <td>' + o.company.companyName + '</td> ' +
                '<td>' + (o.member.name || '/') + ' <br/> ' + (o.member.mobile || '/') + '</td>' +
                ' <td>待确认</td> <td>' + (o.order.deptCode || '/') + '</td> <td>' + (o.order.destCode || '/') + '</td> <td>' + (o.order.airCompanyCode || '/') + '</td> <td>' + (new Date(o.order.flightDate.replace(/-/g, "/")).Format('yyyy-MM-dd')) + '</td> ' +
                '<td>' + o.order.cargo.cargoCount + '</td> <td>' + o.order.cargo.cargoWeight + '</td> ' +
                '<td>' + myformat.formatvolume(o.order.cargo.cargoSize) + '</td> <td><div class="tw" title="'+o.order.cargo.cargoName+'">' + o.order.cargo.cargoName + '</div></td> <td>' + (o.order.cargo.cargoType == 1 ? '普货' : '转关') + '</td> <td>' + (new Date(new Date(o.order.flightDate.replace(/-/g, "/")).getTime() - 24 * 60 * 60 * 1000).Format('yyyy-MM-dd')) + ' 12:00</td>' +
                '</tr>';

            operate = '<td class="opt-td" rowspan="2" data-jcbh="' + o.order.warehouseEntryNum + '" data-khmc="' + (o.company.companyName || '/') + '" data-lxr="' + (o.company.companyContact || '/') + '">' +
                ' <a class="show-opt" href="javascript:void(0);">操作<span class="caret"></span></a> <div class="opt-part dp-n" style="display: none;">' +
                '<a href="javascript:void(0);" class="show-change" data-id="' + o.order.orderId + '">改配</a>' +
                '<a href="javascript:void(0);" class="refuse" data-id="' + o.order.orderId + '">取消</a>' +
                '<a href="javascript:void(0);" class="show-log" data-id="' + o.order.orderId + '">操作日志</a>' +
                '</div> </td>';


            return '<tbody><tr><td class="short-td" colspan="15"></td></tr></tbody><tbody class="data-tbd"> <tr><td rowspan="2" style="padding: 0 5px;"><input data-id="' + o.order.orderId + '" type="checkbox" name="list-sg"></td>  <td class="' + (o.order.orderType == 1 ? 'bg-p' : (o.order.allowClearence ? 'bg-q' : 'bg-y')) + '">' + (o.order.orderType == 1 ? '月结' : '票结') + (d.agent ? (o.agent.name ? '&nbsp;&nbsp;&nbsp;&nbsp;' + o.agent.name : '&nbsp;&nbsp;&nbsp;&nbsp;/') : '&nbsp;&nbsp;&nbsp;&nbsp;/') + '</td> <td class="bg-g">客户公司</td>' +
                ' <td class="bg-g">联系人/方式</td> <td class="bg-g">改配状态</td> ' +
                '<td class="bg-g">起始港</td> <td class="bg-g">目的港</td> ' +
                '<td class="bg-g">航空公司</td> <td class="bg-g">航班日期</td> ' +
                '<td class="bg-g">数量（PCS）</td> <td class="bg-g">重量（KGS）</td> <td class="bg-g">体积（CBM）</td> ' +
                '<td class="bg-g">品名</td> <td class="bg-g">类型</td> <td class="bg-g">最晚进仓</td>' + operate +
                '</tr> ' + oStr + ' </tbody>'
        }

        function getStr(type, d) {
            var str = '';
            if (type == 'book') {
                switch (d.bookingState) {
                    case 0:
                        str = '未订舱';
                        break;
                    case 1:
                        str = '已订舱';
                        break;
                    case -1:
                        str = '订舱失败';
                        break;
                    case 2:
                        str = '已改配';
                        break;
                }
            } else if (type == 'entry') {
                switch (d.entryState) {
                    case 0:
                        str = '待进仓';
                        break;
                    case 1:
                        str = '已进仓，未确认';
                        break;
                    case 2:
                        str = '已确认';
                        break;
                }
            } else if (type == 'declare') {
                switch (d.declareState) {
                    case 0:
                        str = '未报关';
                        break;
                    case 1:
                        str = '报关中';
                        break;
                    case 2:
                        str = '报关完成';
                        break;
                    case -1:
                        str = '退关中';
                        break;
                    case -2:
                        str = '退关失败';
                        break;
                    case -3:
                        str = '退关完成';
                        break;
                }
            } else if (type == 'check') {
                switch (d.checkState) {
                    case 0:
                        str = '待查验';
                        break;
                    case 1:
                        str = '查验中';
                        break;
                    case 2:
                        str = '直接放行';
                        break;
                    case 3:
                        str = '查验放行';
                        break;
                    case 4:
                        str = '查验扣货';
                        break;
                }
            } else if (type == 'transform') {
                switch (d.transState) {
                    case 0:
                        str = '待起飞';
                        break;
                    case 1:
                        str = '已起飞';
                        break;
                    case 2:
                        str = '已到达';
                        break;
                }
            }
            return str;
        }

        function getTp(type) {
            switch (type) {
                case 'book':
                    return '订舱状态';
                case 'entry':
                    return '进仓状态';
                case 'declare':
                    return '报关状态';
                case 'check':
                    return '查验状态';
                case 'transform':
                    return '运输状态';
            }
        }

        $('.outer-tb').html(str);
        return dt;
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
                    n += 1;
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
                $.burster($(".gp-pages"), param.offset || 0, json.resBody.totalCount || 0, 5, param.limit || 20);
            } else {
                str = '<tr class="wrong"><td colspan="9">暂无搜索信息！</td></tr>';
                $('.gp-pages').html('');
            }
        } else {
            str = '<tr class="wrong"><td colspan="9">请求失败，<a href="">请重试！</a></td></tr>';
            $('.gp-pages').html('');
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

        $('.gp-tb').find('tbody').html(str);
    };
    return {
        list: list
        , renderTr: renderTr
        , innerList: innerList
    }
}());
module.exports.Dom = Dom;