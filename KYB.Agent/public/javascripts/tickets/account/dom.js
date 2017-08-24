/**
 * Created by Jeremy on 2017/2/6.
 */
'use strict';
var Dom = (function () {
    var list = function (json, param) {
        var dt = {};
        var str = '';
        if (json && json.resCode == 0 && 'resBody' in json && json.resBody && 'sList' in json.resBody && json.resBody.sList instanceof Array) {
            if (json.resBody.sList.length > 0) {
                var arr = json.resBody.sList;
                for (var a in arr) {
                    if (arr.hasOwnProperty(a)) {
                        dt[arr[a].chargeBillNo] = arr[a];
                        str += render(arr[a]);
                    }
                }
                $.burster($(".outer-pages"), param.offset || 0, json.resBody.totalCount, 5, param.limit || 10);
                $('.list-cout').html('共为您找到 ' + json.resBody.totalCount + ' 条结果');
            } else {
                str = '<tr class="wrong"><td colspan="9">暂无账单，请添加！</td></tr>';
                $('.list-cout').html('共为您找到 0 条结果');
                $('.outer-pages').html('');
            }
        } else {
            str = '<tr class="wrong"><td colspan="9">请求失败，<a href="">请重试！</a></td></tr>';
            $('.list-cout').html('共为您找到 0 条结果');
            $('.outer-pages').html('');
        }
        function render(d) {
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
            return '<tr class="' + (d.isBillOverTime ? 'bg-r' : '') + '"> <td>' + d.chargeBillNo + '</td> <td>' + d.companyName + '</td>' +
                ' <td>' + (new Date(d.chargeBillFrom).Format('yyyy-MM-dd') + ' 至 ' + new Date(d.chargeBillTo).Format('yyyy-MM-dd')) + '</td><td>' + new Date(d.billTo).Format('yyyy-MM-dd') + '</td> <td>CNY ' + d.totalAmount.toFixed(2) + '</td> ' +
                '<td>CNY ' + d.payAmount.toFixed(2) + '</td> <td>CNY ' + d.remainAmount.toFixed(2) + '</td>' +
                ' <td>' + state + '</td> <td>' + (d.IsTaxed ? '已开票' : '未开票') + '</td> <td> ' +
                '<a class="show-detail" href="javascript:void(0);" data-id="' + d.chargeBillNo + '">详情</a>' +
                '</td> </tr>';
        }

        $('.outer-tb tbody').html(str);
        return dt;
    };
    return {
        list: list
    }
}());
module.exports.Dom = Dom;