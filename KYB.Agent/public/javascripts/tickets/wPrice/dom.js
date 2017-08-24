/**
 * Created by Jeremy on 2017/2/6.
 */
'use strict';
var Dom = (function () {
    var list = function (json, param) {
        var dt = {};
        var str = '';
        if (json && json.resCode == 0 && 'resBody' in json && json.resBody && 'serviceFeeExList' in json.resBody && json.resBody.serviceFeeExList) {
            if (json.resBody.serviceFeeExList.sList.length > 0) {
                var arr = json.resBody.serviceFeeExList.sList;
                for (var a in arr) {
                    if (arr.hasOwnProperty(a)) {
                        str += render(arr[a]);
                    }
                }
                $.burster($(".outer-pages"), param.offset || 0, json.resBody.serviceFeeExList.totalCount, 5, param.limit || 10);
                $('.list-cout').html('总计 ' + json.resBody.total + ' 笔，CNY ' + json.resBody.sum);
            } else {
                str = '<tr class="wrong"><td colspan="5">暂无仓库费用！</td></tr>';
                $('.list-cout').html('总计 0 笔，CNY 0');
                $('.outer-pages').html('');
            }
        } else {
            str = '<tr class="wrong"><td colspan="5">请求失败，<a href="">请重试！</a></td></tr>';
            $('.list-cout').html('总计 0 笔，CNY 0');
            $('.outer-pages').html('');
        }
        function render(d) {
            return '<tr> <td>' + d.orderNum + '</td> <td>' + d.wareHouseName + '</td><td>' + d.itemName + '</td>' +
                ' <td>' + (d.itemTotal || '/') + '</td><td>' + (new Date(d.createDt).Format('yyyy-MM-dd')) + '</td></tr>'
        }

        $('.outer-tb tbody').html(str);
        return dt;
    };
    return {
        list: list
    }
}());
module.exports.Dom = Dom;