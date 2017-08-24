/**
 * Created by Jeremy on 2017/2/6.
 */
'use strict';
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
            var type
                , level
                , currentLevel;
            switch (d.companyType) {
                case 11:
                    type = '个人';
                    break;
                case 12:
                    type = '货运代理';
                    break;
                case 13:
                    type = '贸易商';
                    break;
                case 14:
                    type = '电子商务';
                    break;
                case 15:
                    type = '制造商';
                    break;
                case 16:
                    type = '其他';
                    break;
                default:
                    type = '货运代理';
                    break;
            }
            switch (d.applyLevel) {
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
            switch (d.accountLevel) {
                case 0:
                    currentLevel = 'D';
                    break;
                case 1:
                    currentLevel = 'C';
                    break;
                case 2:
                    currentLevel = 'B';
                    break;
                case 3:
                    currentLevel = 'A';
                    break;
                case 4:
                    currentLevel = 'AA';
                    break;
            }
            return '<tr> <td><input type="checkbox" class="sg" name="sg" data-id="' + d.companyId + '"/></td>' +
                ' <td>' + d.companyId + '</td> <td>' + d.companyName + '</td> ' +
                '<td>' + type + '</td> <td>' + d.companyContact + '</td> <td>' + d.companyTel + '</td> <td>' + currentLevel + '</td> <td>' + d.accountCredit + '</td> ' +
                ' <td>' + level + '</td> <td>' + (d.applyDate ? new Date(d.applyDate.replace(/-/g, "/")).Format('yyyy-MM-dd') : '/') + '</td> <td>' + (d.accountType == 2 ? '月结' : '票结') + '</td> ' +
                ' <td>' +
                ' <div class="dp-tb"> ' +
                '<a href="javascript:void(0);" class="pass" data-id="' + d.companyId + '">通过审核</a>' +
                '<a href="javascript:void(0);" class="refuse" data-id="' + d.companyId + '">拒绝通过</a>' +
                ' </div> </td> </tr>';
        }

        $('tbody').html(str);
    };
    return {
        list: list
    }
}());
module.exports.Dom = Dom;