/**
 * Created by Jeremy on 2017/2/6.
 */
'use strict';
require('../../general/burster');
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
                str = '<tr class="wrong"><td colspan="10">暂无信息，请添加！</td></tr>';
                $('.list-cout').html('共为您找到 0 条结果');
                $('.outer-page').html('');
            }
        } else {
            str = '<tr class="wrong"><td colspan="10">请求失败，<a href="">请重试！</a></td></tr>';
            $('.list-cout').html('共为您找到 0 条结果');
            $('.outer-page').html('');
        }
        function render(d) {
            var p = d.PriceList.rate[0] || {};
            return '<tr><td>' + d.destCode + '</td><td>' + (p.policy['0'] || '/') + '</td><td>' + (p.min || '/') + '</td><td>' + (p.policy['45'] || '/') + '</td><td>' + (p.policy['100'] || '/') + '</td><td>' + (p.policy['300'] || '/') + '</td>' +
                '<td>' + (p.policy['500'] || '/') + '</td><td>' + (p.policy['1000'] || '/') + '</td><td>' + (d.airlineName || '/') + '</td><td><a href="javascript:void(0);" class="update" data-code="' + d.destCode + '">编辑</a></td></tr>'
        }

        $('tbody').html(str);
    };
    return {
        list: list
    }
}());
module.exports.Dom = Dom;