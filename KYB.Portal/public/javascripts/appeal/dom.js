/**
 * Created by Auser on 2016/12/7.
 */
"use strict";
require('../frame/burster');
var Dom = (function () {
    var list = function (json, param) {
        var str = '';
        var obj = {};
        if (json && 'resCode' in json && json.resCode == 0 && 'resBody' in json && json.resBody) {
            if ('sList' in json.resBody && json.resBody.sList instanceof Array && json.resBody.sList.length > 0) {
                var body = json.resBody.sList;
                for (var b in body) {
                    if (body.hasOwnProperty(b)) {
                        str += render(body[b]);
                        obj[body[b]['chargeBillNo']] = body[b];
                    }
                }
                //加载分页器
                $.burster($(".page-box"), param.offset || 0, json.resBody.totalCount, 5, param.limit || 20);
            } else {
                str = '<tr class="wrong-msg"><td colspan="9">暂无对账单资料！</td></tr>';
                $('.page-box').html(' ');
            }
        } else {
            str = '<tr class="wrong-msg"><td colspan="9">获取列表失败，<a href="">请刷新重试</a>！</td></tr>';
            $('.page-box').html(' ');
        }
        $('tbody').html(str);
        return obj;
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
            return '<tr><td>' + d.taxInvoiceNum + '</td><td>' + d.totalAmount + '</td><td>' + (d.ems || '/') + '</td><td>' + state + '</td>' +
                '<td><a href="javascript:void(0);" class="show-detail" data-id="' + d.taxInvoiceNum + '">明细</a></td> </tr>'
        }
    };
    return {
        list: list
    }
}());
module.exports.Dom = Dom;