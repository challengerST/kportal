/**
 * Created by Jeremy on 2017/2/6.
 */
'use strict';
var myformat = require('../../general/function').format;
var Dom = (function () {
    var list = function (json, param) {
        var str = '';
        if (json && json.resCode == 0 && 'resBody' in json && json.resBody  && json.resBody instanceof Array) {
            if (json.resBody.length > 0) {
                var arr = json.resBody;

                for (var a in arr) {
                    if (arr.hasOwnProperty(a)) {
                        for (var itemDtl in arr[a].entryDetail) {
                            if (arr[a].entryDetail.hasOwnProperty(itemDtl)) {
                                str += render(arr[a],arr[a].entryDetail[itemDtl]);
                            }
                        }
                    }
                }
                $('.list-cout').html('共为您找到 ' + json.resBody.length + ' 条结果');
            } else {
                str = '<tr class="wrong"><td colspan="13">暂无进仓数据，请添加！</td></tr>';
                $('.page-box').html('');
                $('.list-cout').html('共为您找到 0 条结果');
            }
        } else {
            str = '<tr class="wrong"><td colspan="13">请求失败，<a href="">请重试！</a></td></tr>';
            $('.page-box').html('');
            $('.list-cout').html('共为您找到 0 条结果');
        }
        function render(d,itemDtl) {
            return '<tr>' +
                '<td>' + d.entryNum + '</td><td>' + new Date(d.storageTime.replace(/-/g, "/")).Format('yyyy-MM-dd hh:mm') + '</td><td>' + itemDtl.itemCount + '</td>' +
                '<td>' + itemDtl.itemLength + '</td><td>' + itemDtl.itemWidth + '</td><td>' + itemDtl.itemHeight + '</td>' +
                '<td>' + myformat.formatvolume(itemDtl.itemCount * itemDtl.itemLength * itemDtl.itemWidth * itemDtl.itemHeight / 1000000) + '</td><td>' + d.storageWeight + '</td><td>' + d.damageCount + '</td>' +
                '<td>' + d.dampCount + '</td><td>' + d.transformCount + '</td><td>' + d.otherCount + '</td></tr>'
        }

        $('tbody').html(str);
    };
    return {
        list: list
    }
}());
module.exports.Dom = Dom;