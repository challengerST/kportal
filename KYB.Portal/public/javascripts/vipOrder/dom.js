/**
 * Created by Auser on 2016/12/3.
 */
"use strict";
var Dom = (function () {
    var list = function (json, param, type) {
        changeStr(type);
        var str = '';
        if (json && json.resCode == 0 && 'resBody' in json && json.resBody && 'sList' in json.resBody && json.resBody.sList instanceof Array) {
            if (json.resBody.sList.length > 0) {
                var arr = json.resBody.sList;
                for (var a in arr) {
                    if (arr.hasOwnProperty(a)) {
                        str += render(arr[a], type);
                    }
                }
                $('.total-count').html(json.resBody.totalCount);
                $.burster($(".page-box"), param.offset || 0, json.resBody.totalCount, 5, param.limit || 10);
            } else {
                str = '<tr"><td colspan="10" class="wrong-msg">暂时没有您搜索的订单信息</td></tr>';
                $('.total-count').html(0);
                $('.page-box').html('');
            }
        } else {
            str = '<tr><td colspan="10" class="wrong-msg">您搜索的订单信息出错，<a href="javascript:void(0);" class="reload">请重试</a></td></tr>';
            $('.total-count').html(0);
            $('.page-box').html('');
        }
        $('tbody').html(str);
        if($('.total-count').html()>0){
            $('#curNo').html('1');
            $('tbody tr').click(function(){
                $('#curNo').html($(this).index()+1);
            });
        }else{
            $('#curNo').parent().html('0');
        }
        function render(d, type) {
            var str = '';
            if (type == 'all' || type == 'pending' || !type) {
                switch (d.orderState) {
                    case 0:
                        str = '新订单，未确认';
                        break;
                    case 1:
                        str = '已确认订单';
                        break;
                    case 2:
                        str = '进行中';
                        break;
                    case 3:
                        str = '已结束，正常结束';
                        break;
                    case 4:
                        str = '已制单，彻底结束';
                        break;
                    case -1:
                        str = '已取消，无费用';
                        break;
                    case -2:
                        str = '已取消，已产生费用';
                        break;
                }
            } else if (type == 'book') {
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
                        str = '预审中';
                        break;
                    case 2:
                        str = '预审通过';
                        break;
                    case 3:
                        str = '开始报关';
                        break;
                    case 4:
                        str = '报关中';
                        break;
                    case 5:
                        str = '报关完成';
                        break;
                    case -6:
                        str = '报关失败';
                        break;
                    case -4:
                        str = '退关中';
                        break;
                    case -5:
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
                        str = '待出库';
                        break;
                    case 1:
                        str = '已出库，待起飞';
                        break;
                    case 2:
                        str = '已起飞';
                        break;
                    case 3:
                        str = '已到达';
                        break;
                }
            }
            var t = '';
            switch (d.orderChannel) {
                case 1:
                    t = '自助订舱';
                    break;
                case 2:
                    t = '快速订舱';
                    break;
                case 3:
                    t = '后台下单';
                    break;
                case 6:
                    t = '拼货订单';
                    break;
                default:
                    t = '自助订舱';
                    break;
            }
            return '<tr> <td>' + d.orderNum + '</td> <td>' + (d.airwayBillNum || '/') + '</td><td>' + t + '</td>' +
                ' <td>' + (d.flightDate ? new Date(d.flightDate.replace(/-/g, "/")).Format('yyyy-MM-dd') : '/') + '</td> <td>' + d.deptCode + '</td> ' +
                '<td>' + d.destCode + '</td> <td><div class="tw" title="'+d.cargo.cargoName+'">' + d.cargo.cargoName + '</div></td> ' +
                '<td>' + str + '</td> ' +
                '<td>CNY ' + d.chargingTotal + '</td> ' +
                '<td><a href="/vip/order/detail?id=' + d.orderId + '&sid=' + (d.subNum || '') + '">详情</a></td> </tr>'
        }

        function changeStr(type) {
            var str = '';
            switch (type) {
                case 'all':
                case 'pending':
                    str = '订单状态';
                    break;
                case 'book':
                    str = '订舱状态';
                    break;
                case 'entry':
                    str = '进仓状态';
                    break;
                case 'declare':
                    str = '报关状态';
                    break;
                case 'check':
                    str = '查验状态';
                    break;
                case 'transform':
                    str = '运输状态';
                    break;
            }
            $('.change-str').html(str);
        }
    };
    return {
        list: list
    };
}());
module.exports.Dom = Dom;


