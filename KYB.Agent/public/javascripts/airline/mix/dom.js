/**
 * Created by Jeremy on 2017/2/6.
 */
'use strict';
var Dom = (function () {
    var list = function (json) {
        var str = '';
        if (json && json.resCode == 0 && 'resBody' in json && json.resBody && 'sList' in json.resBody && json.resBody.sList instanceof Array) {
            if (json.resBody.sList.length > 0) {
                var arr = json.resBody.sList;
                for (var a in arr) {
                    if (arr.hasOwnProperty(a)) {
                        str += render(arr[a]);
                    }
                }
            } else {
                str = '<tr class="wrong"><td colspan="9">暂无信息，请添加！</td></tr>';
            }
        } else {
            str = '<tr class="wrong"><td colspan="9">请求失败，<a href="">请重试！</a></td></tr>';
        }
        function render(d) {
            var str = '';
            switch (d.transPort.length) {
                case 2:
                    str = '直达';
                    break;
                case 3:
                    str = d.transPort[1].portCode + ' 转关';
                    break;
                case 4:
                    str = d.transPort[1].portCode + '、' + d.transPort[2].portCode + ' 转关';
                    break;
            }
            var state = '';
            switch (d.enableState) {
                case 1:
                    state = '已发布';
                    break;
                case -1:
                    state = '未发布';
                    break;
                case -2:
                    state = '已删除';
                    break;
            }
            return '<tr> <td>' + d.airCompanyCode + '</td>  <td>' + d.airCompanyName + '</td> ' +
                '<td>' + d.deptCode + '</td> <td>' + d.destCode + '</td> <td>' + str + '</td>' +
                '<td>' + new Date(d.flightDate).Format('yyyy-MM-dd') + '</td><td>' + (d.airwayLimit.dangerousGoods ? '是' : '否') + '</td><td>' + state + '</td> <td>' +
                ' <a href="/airline/mixDetail?id=' + d.lclId + '" data-id="' + d.lclId + '" target="_blank">详情</a> ' +
                '</td> </tr>';
        }

        $('.outer-tb').find('tbody').html(str);
    };
    return {
        list: list
    }
}());
module.exports.Dom = Dom;