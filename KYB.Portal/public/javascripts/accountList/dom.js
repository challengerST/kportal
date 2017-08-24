/**
 * Created by Auser on 2016/12/7.
 */
"use strict";
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
                str = '<tr class="wrong-msg"><td colspan="10">暂无对账单资料！</td></tr>';
                $('.page-box').html(' ');
            }
        } else {
            str = '<tr class="wrong-msg"><td colspan="10">获取列表失败，<a href="">请刷新重试</a>！</td></tr>';
            $('.page-box').html(' ');
        }
        $('tbody').html(str);
        return obj;
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
            return '<tr><td><input type="checkbox" name="sg" value="' + d.chargeBillNo + '"' + (d.chargeOffState == 1 ? '' : ' disabled="disabled"') + '></td> <td>' + d.chargeBillNo + '</td> <td>' + (new Date(d.billFrom).Format('yyyy-MM-dd') + ' 至 ' + new Date(d.billTo).Format('yyyy-MM-dd')) + '</td>' +
                ' <td class="ft-y">' + d.totalAmount + '</td> <td class="ft-y">' + d.payAmount + '</td> ' +
                '<td class="ft-y">' + d.remainAmount + '</td> <td>' + new Date(d.billTo).Format('yyyy-MM-dd') + '</td>' +
                ' <td>' + state + '</td> <td>' + (d.IsTaxed ? '已开票' : '未开票') + '</td> ' +
                '<td><a href="/vip/account/detail?id=' + d.chargeBillNo + '">详情</a></td> </tr>'
        }
    };
    return {
        list: list
    }
}());
module.exports.Dom = Dom;