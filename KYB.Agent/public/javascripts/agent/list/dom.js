/**
 * Created by Jeremy on 2017/2/6.
 */
'use strict';
var Dom = (function () {
    var list = function (json, param) {
        var str = '';
        if (json && json.resCode == 0 && 'resBody' in json && json.resBody && 'sList' in json.resBody) {
            if (json.resBody.sList instanceof Array && json.resBody.sList.length > 0) {
                var arr = json.resBody.sList;
                for (var a in arr) {
                    if (arr.hasOwnProperty(a)) {
                        str += render(arr[a]);
                    }
                }
                $.burster($(".page-box"), param.offset || 0, json.resBody.totalCount || 0, 5, param.limit || 20);
                $('.list-cout').html('共为您找到 ' + json.resBody.totalCount + ' 条结果');
            } else {
                str = '<tr class="wrong"><td colspan="14">暂无需审核会员！</td></tr>';
                $('.page-box').html('');
                $('.list-cout').html('共为您找到 0 条结果');
            }
        } else {
            str = '<tr class="wrong"><td colspan="14">请求失败，<a href="">请重试！</a></td></tr>';
            $('.page-box').html('');
            $('.list-cout').html('共为您找到 0 条结果');
        }
        function render(d) {
            var str = '<tr>' +
                ' <td>' + d.name + '</td> <td>' + d.mobile + '</td> ' +
                '<td>' + d.email + '</td> <td>' + (d.applyDt ? new Date(d.applyDt.replace(/-/g, "/")).Format('yyyy-MM-dd') : '/') + '</td> <td>' + (d.auditDt ? new Date(d.applyDt.replace(/-/g, "/")).Format('yyyy-MM-dd') : '/') + '</td> <td>' + (d.auditorId || '/') + '</td> <td class="checkState" data-state="' + d.applyState + '">' + (d.applyState == 1 ? '待审核' : (d.applyState == 2 ? '审核通过' : '审核不通过')) + '</td> ' +
                ' <td>';
            if (d.applyState == 3) {
                str += '<i  title="' + d.failureReason + '" class="icon ion-document"></i>';
            }
            str += ' </td> </tr>';
            return str;
        }

        $('tbody').html(str);
        if ($('.checkState').data('state') == 3) {
            $(this).css('color', 'red');
        }
    };
    return {
        list: list
    }
}());
module.exports.Dom = Dom;