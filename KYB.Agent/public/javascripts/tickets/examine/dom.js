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
                str = '<tr class="wrong"><td colspan="10">暂无账单，请添加！</td></tr>';
                $('.list-cout').html('共为您找到 0 条结果');
                $('.outer-pages').html('');
            }
        } else {
            str = '<tr class="wrong"><td colspan="10">请求失败，<a href="">请重试！</a></td></tr>';
            $('.list-cout').html('共为您找到 0 条结果');
            $('.outer-pages').html('');
        }
        function render(d) {
            var level = '';
            var state = '', cls = '';
            switch (d.accountLevel) {
                case 0:
                    level = 'D';
                    break;
                case 1:
                    level = 'C';
                    break;
                case 2:
                    level = 'B';
                    break;
                case 3:
                    level = 'A';
                    break;
                case 4:
                    level = 'AA';
                    break;
            }
            switch (d.confirmState) {
                case 0:
                    state = '未审核';
                    break;
                case 1:
                    state = '审核完成';
                    break;
                case -1:
                    state = '审核失败';
                    cls = 'font-red';
                    break;
            }
            return '<tr><td>' + d.companyId + '</td><td class="name">' + d.companyName + '</td><td>' + level + '</td>' +
                '<td>' + d.accountCredit + '</td><td>' + d.accountAviliable + '</td><td>' + d.total + '</td><td>' + d.count + '</td>' +
                '<td>' + d.balance + '</td><td>' + new Date(d.createDt).Format('yyyy-MM-dd') + '</td><td class="' + cls + '">' + state + '</td><td>' +
                '<a href="javascript:void(0);" class="accept" data-id="' + d.logId + '">通过</a>' +
                '<a data-id="' + d.logId + '" href="javascript:void(0);" class="refuse">不通过</a>' +
                '</td>' +
                '</tr>'
        }

        $('.outer-tb tbody').html(str);
        return dt;
    };
    return {
        list: list
    }
}());
module.exports.Dom = Dom;