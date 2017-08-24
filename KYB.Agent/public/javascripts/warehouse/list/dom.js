/**
 * Created by Jeremy on 2017/2/6.
 */
'use strict';
var Dom = (function () {
    var list = function (json) {
        var str = '';
        var dt = {};
        if (json && json.resCode == 0 && 'resBody' in json && json.resBody && 'sList' in json.resBody && json.resBody.sList instanceof Array) {
            if (json.resBody.sList.length > 0) {
                var arr = json.resBody.sList;
                for (var a in arr) {
                    if (arr.hasOwnProperty(a)) {
                        str += render(arr[a]);
                        dt[arr[a].warehouseId] = arr[a];
                    }
                }
                $('.list-cout').html('共为您找到 ' + arr.length + ' 条结果');
            } else {
                str = '<tr class="wrong"><td colspan="8">暂无仓库信息，请添加！</td></tr>';
                $('.list-cout').html('共为您找到 0 条结果');
            }
        } else {
            str = '<tr class="wrong"><td colspan="8">请求失败，<a href="">请重试！</a></td></tr>';
            $('.list-cout').html('共为您找到 0 条结果');
        }
        function render(d) {
            return '<tr> <td>' + d.warehouseId + '</td>' +
                ' <td>' + d.warehouseName + '</td> <td>' + (d.warehouseType == 1 ? '普货仓库' : '关封仓库') + '</td> <td>' + d.warehouseAddress + '</td> ' +
                '<td><a class="up-img glyphicon glyphicon-file" target="_blank" href="javascript:void(0);" data-key="' + (d.warehouseMap ? d.warehouseMap : -1) + '"></a></td> ' +
                '<td>' + d.warehouseContact + '</td> <td>' + d.warehouseTel + '</td> <td>' +
                '<a href="javascript:void(0);" class="update" data-id="' + d.warehouseId + '">修改</a>' +
                '<a href="javascript:void(0);" style="margin-left: 5px;" class="remove" data-id="' + d.warehouseId + '">删除</a>' +
                '</td></tr>'
        }

        $('tbody').html(str);
        return dt;
    };
    return {
        list: list
    }
}());
module.exports.Dom = Dom;