/**
 * Created by Jeremy on 2017/2/6.
 */
'use strict';
var myformat = require('../../general/function').format;
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
                $('.page-box').html('');
                $.burster($(".page-box"), param.offset || 0, json.resBody.totalCount, 5, param.limit || 10);
            } else {
                str = '<tr class="wrong"><td colspan="13">暂无运单号，请添加！</td></tr>';
                $('.page-box').html('');
            }
        } else {
            str = '<tr class="wrong"><td colspan="13">请求失败，<a href="">请重试！</a></td></tr>';
            $('.page-box').html('');
        }
        function render(d) {
            return '<tr><td>' + (d.airwayBillNum || '/') + '</td> ' +
                '<td>' + (d.airCompanyCode || '/') + '</td> <td>' + (d.bookCount || 0) + '</td> <td>' + myformat.formatweight(d.bookWeight || '0') + 'KG</td> <td>' + myformat.formatvolume(d.bookSize || '0') + 'm³</td> ' +
                '<td>' + (d.deptDate ? new Date(d.deptDate.replace(/-/g, "/")).Format('yyyy-MM-dd') : '/' ) + '</td> <td>' + (d.deptPort || '/') + '</td> <td>' + (d.destPort || '/') + '</td> <td>' + (d.deptTime ? new Date(d.deptTime).Format('hh:mm') : '/') + '</td> ' +
                '<td>' + (d.airlineInfo || '/') + '</td> ' +
                '<td>' + (d.billState == 1 ? '未使用' : '已使用') + '</td> <td>' +
                '<a href="javascript:void(0);" class="show-detail" data-id="' + d.billId + '">查看</a>' +
                    //'<a href="javascript:void(0);" class="connect-line" data-id="' + d.billId + '">关联航线</a>' +
                '</td> </tr>'
        }

        $('.list-tb tbody').html(str);
    };
    return {
        list: list
    }
}());
module.exports.Dom = Dom;