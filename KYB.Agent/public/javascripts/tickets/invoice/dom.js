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
                str = '<tr class="wrong"><td colspan="7">暂无账单，请添加！</td></tr>';
                $('.list-cout').html('共为您找到 0 条结果');
                $('.outer-pages').html('');
            }
        } else {
            str = '<tr class="wrong"><td colspan="5">请求失败，<a href="">请重试！</a></td></tr>';
            $('.list-cout').html('共为您找到 0 条结果');
            $('.outer-pages').html('');
        }
        function render(d) {
            var state = '';
            switch (d.taxInvoiceState) {
                case 0:
                    state = '未开票';
                    break;
                case 1:
                    state = '已开票';
                    break;
                case 2:
                    state = '部分开票';
                    break;
            }
            return '<tr> <td>' + d.taxInvoiceNum + '</td> <td>' + d.invoiceTitle + '</td><td>' + (d.invoiceType == 1 ? '普票' : '增票') + '</td>' +
                ' <td>' + (d.taxNo || '/') + '</td><td>' + d.totalAmount + '</td><td>' + state + '</td><td><a href="javascript:void(0);" class="show-detail" data-id="' + d.taxInvoiceNum + '">明细</a></td></tr>'
        }

        $('.outer-tb tbody').html(str);
        return dt;
    };
    return {
        list: list
    }
}());
module.exports.Dom = Dom;