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
                str = '<tr class="wrong"><td colspan="8">暂无信息，请添加！</td></tr>';
            }
        } else {
            str = '<tr class="wrong"><td colspan="8">请求失败，<a href="">请重试！</a></td></tr>';
        }
        function render(d) {
            var str = '';
            for (var e in d.deptAirports) {
                if (d.deptAirports.hasOwnProperty(e)) {
                    var dt = d.deptAirports[e];
                    str += dt.airportCode + (e == d.deptAirports.length - 1 ? '' : ' , ');
                }
            }
            return '<tr> <td>' + d.airCompanyCode + '（' + d.airCompanyName + '）</td>  <td>' + d.airCompanyCountry + '</td> ' +
                '<td>' + (parseFloat(d.bulkyRate) * 10 + '/' + (10 - parseFloat(d.bulkyRate) * 10)) + '</td> <td>' + d.warehouseName + '</td> <td>' + str + '</td>' +
                '<td>' + d.destCount + '</td><td>' + d.airwayCount + '</td> <td>' +
                ' <a href="/airline/company/detail?id=' + d.Id + '" data-id="' + d.Id + '">修改</a> ' +
                '<a href="javascript:void(0);" class="del-btn" data-id="' + d.Id + '">删除</a> </td> </tr>';
        }

        $('.outer-tb').find('tbody').html(str);
    };
    return {
        list: list
    }
}());
module.exports.Dom = Dom;