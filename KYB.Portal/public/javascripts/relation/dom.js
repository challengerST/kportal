/**
 * Created by Jeremy on 2016/12/29.
 */
'use strict';
require('../frame/burster');
var Dom = (function () {
    var list = function (json, ele, param) {
        var str = '';
        if (json && 'resCode' in json && json.resCode == 0 && 'resBody' in json && json.resBody && 'sList' in json.resBody) {
            if (json.resBody.sList instanceof Array && json.resBody.sList.length > 0) {
                var body = json.resBody.sList;
                for (var b in body) {
                    if (body.hasOwnProperty(b)) {
                        str += render(body[b]);
                    }
                }
                $.burster($(".page-box"), param.offset || 0, json.resBody.totalCount, 5, param.limit || 10);
            } else {
                str = '<tr class="wrong-msg"><td colspan="7">暂无信息，新添加！</td></tr>';
                $('.page-box').html('');
            }
        } else {
            str = '<tr class="wrong-msg"><td colspan="7">获取列表失败，<a href="">请刷新重试</a>！</td></tr>';
            $('.page-box').html('');
        }
        ele.find('tbody').html(str);
        function render(d) {
            return '<tr> <td>' + (d.contactName || '-') + '</td> ' +
                '<td>' + (d.contactAddress || '-') + '</td> ' +
                '<td>' + (d.contactPerson || '-') + '</td> <td>' + (d.contactTel || '-') + '</td>' +
                ' <td> <a href="javascript:void(0);" class="show-detail" data-tp="receive" data-info="' +
                d.contactName + ',' + d.contactAddress + ',' + d.contactPerson + ',' + d.contactTel + ',' + d.contactEmail + ',' + d.contactFax + ',' + d.contactId
                + '">详情</a> ' +
                '<a href="javascript:void(0);" class="delete-btn" data-id="' + d.contactId + '">删除</a> </td> </tr>'
        }
    };
    return {
        list: list
    }
}());
module.exports.Dom = Dom;