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
                $('.list-cout').html('共为您找到 ' + json.resBody.totalCount + ' 条结果');
            } else {
                str = '<tr class="wrong"><td colspan="9">暂无费用清单！</td></tr>';
                $('.list-cout').html('共为您找到 0 条结果');
                $('.outer-page').html('');
            }
        } else {
            str = '<tr class="wrong"><td colspan="9">请求失败，<a href="">请重试！</a></td></tr>';
            $('.list-cout').html('共为您找到 0 条结果');
            $('.outer-page').html('');
        }
        function render(d) {
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
            return '<tr' + (d.chargeState == 2 ? ' class="ssz"' : '') + '> <td>' + d.orderNum + '</td> ' +
                '<td>' + d.companyName + '</td> <td>' + d.deptPortCode + '</td><td>' + d.destPortCode + '</td>' +
                ' <td>' + d.airCompanyCode + '</td> <td>' + d.airlineTime + '</td> <td>CNY ' + d.orderChargingTotal + '</td>' +
                ' <td>' + state + '</td> <td>' +
                ' <a href="javascript:void(0);" class="show-detail" data-id="' + d.orderId + '" data-type="' + (d.chargeState == 1 || d.chargeState == 3 ? 'hide' : 'show') + '">查看</a> ' +
                (d.chargeState == 1 || d.chargeState == 3 ? '' : '<a href="javascript:void(0);" class="show-zd" data-id="' + d.orderId + '">修改</a> ') +
                '</td> </tr>';
        }

        $('.outer-tb').find('tbody').html(str);
    };
    return {
        list: list
    }
}());
module.exports.Dom = Dom;