/**
 * Created by Auser on 2016/12/7.
 */
"use strict";
var Dom = (function () {
    var list = function (json, param) {
        var str = '';
        if (json && 'resCode' in json && json.resCode == 0 && 'resBody' in json && json.resBody) {
            if ('sList' in json.resBody && json.resBody.sList instanceof Array && json.resBody.sList.length > 0) {
                var body = json.resBody.sList;
                for (var b in body) {
                    if (body.hasOwnProperty(b)) {
                        str += render(body[b]);
                    }
                }
                //加载分页器
                $.burster($(".page-box"), param.offset || 0, json.resBody.totalCount, 5, param.limit || 20);
            } else {
                str = '<tr class="wrong-msg"><td colspan="9">暂无账单资料！</td></tr>';
                $('.page-box').html(' ');
            }
        } else {
            str = '<tr class="wrong-msg"><td colspan="9">获取列表失败，<a href="">请刷新重试</a>！</td></tr>';
            $('.page-box').html(' ');
        }
        $('tbody').html(str);
        function render(d) {
            var oState = ''
                , bState = '';
            switch (d.orderState) {
                case 0:
                    oState = '新订单，未确认';
                    break;
                case 1:
                    oState = '已确认订单';
                    break;
                case 2:
                    oState = '进行中';
                    break;
                case 3:
                    oState = '已结束，正常结束';
                    break;
                case 4:
                    oState = '已制单，彻底结束';
                    break;
                case -1:
                    oState = '已取消，无费用';
                    break;
                case -2:
                    oState = '已取消，已产生费用';
                    break;
                default:
                    oState = '新订单，未确认';
                    break;
            }
            switch (d.chargeState) {
                case 0:
                    bState = '未确认';
                    break;
                case 1:
                    bState = '已确认';
                    break;
                case 2:
                    bState = '申诉中';
                    break;
                case 3:
                    bState = '已开账';
                    break;
                default :
                    bState = '未确认';
                    break;
            }
            return '<tr' + (d.chargeState == 2 ? ' class="bg-r"' : '') + '> <td>' + d.orderNum + '</td> <td>' + d.deptPortCode + '</td>' +
                ' <td>' + d.destPortCode + '</td> <td>' + d.airCompanyCode + '</td> ' +
                '<td>' + d.airlineTime + '</td> <td>CNY ' + d.orderChargingTotal + '</td>' +
                ' <td>' + oState + '</td> <td>' + bState + '</td> ' +
                '<td><a href="/vip/bill/detail?id=' + d.orderId + '">详情</a></td> </tr>'
        }
    };
    return {
        list: list
    }
}());
module.exports.Dom = Dom;