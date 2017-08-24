/**
 * Created by Jeremy on 2017/2/6.
 */
'use strict';
var Dom = (function () {
    var list = function (json, param) {
        var str = '';
        str += '<thead> <tr> <td>订单号/主单号</td> <td colspan="2">客户信息</td> <td colspan="4">航线信息</td> <td colspan="4">货物信息</td> <td>操作员</td> <td>文件</td> <td>操作</td> </tr> </thead>';
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
                str += '<tobdy><tr class="wrong"><td colspan="14">暂无订单信息，请添加！</td></tr></tobdy>';
                $('.outer-page').html('');
                $('.list-cout').html('共为您找到 0 条结果');
            }
        } else {
            str += '<tr class="wrong"><td colspan="14">请求失败，<a href="">请重试！</a></td></tr>';
            $('.outer-page').html('');
            $('.list-cout').html('共为您找到 0 条结果');
        }
        function render(d) {
            var c = d.company || {}
                , o = d.order || {}
                , a = d.agent
                , type;
            switch (o.orderChannel) {
                case 1:
                    type = '自助订舱';
                    break;
                case 2:
                    type = '快速订舱';
                    break;
                case 3:
                    type = '后台下单';
                    break;
                default:
                    type = '自助订舱';
                    break;
            }
            var czy = '';
            if (a) {
                if (a.name) {
                    czy += '姓名：' + a.name;
                }
                if (a.mobile) {
                    czy += (czy ? '<br/>' : '') + '电话：' + a.mobile;
                }
                if (a.QQ) {
                    czy += (czy ? '<br/>' : '') + 'QQ：' + a.QQ;
                }
            } else {
                czy = '/';
            }
            return '<tbody><tr><td class="short-td" colspan="14"></td></tr></tbody><tbody class="data-tbd"> <tr> <td>' + (o.orderNum || '/') + '</td>' +
                ' <td class="font-g">客户公司</td> ' +
                '<td class="font-g">海关注册编码</td> <td class="font-g">起始港</td>' +
                ' <td class="font-g">目的港</td> <td class="font-g">航空公司</td> ' +
                '<td class="font-g">起飞时间</td> <td class="font-g">数量（PCS）</td> <td class="font-g">重量（KGS）</td>' +
                ' <td class="font-g">体积（CBM）</td> <td class="font-g">品名</td>' +
                '<td rowspan="2">' + czy + '</td> <td rowspan="2"><a class="d-files" href="javascript:void(0);" data-id="' + o.orderId + '"  data-subid="' + o.subNum + '">下载报关资料</a> <br> <a class="u-files" href="javascript:void(0);" data-id="' + o.orderId + '" data-subid="' + o.subNum + '">上传文件</a></td> <td rowspan="2" class="font-q"><a data-subnum="' + o.subNum + '" data-id="' + o.orderId + '" class="show-bg" href="javascript:void(0);">更新状态</a></td></tr> ' +
                '<tr><td>' + (o.airwayBillNum || '/') + (o.subNum ? '<br/>_' + o.subNum : '') + '</td><td>' + (c.companyName || '/') + '</td> <td>' + (c.registerCode || '/') + '</td> <td>' + (o.deptCode || '/') + '</td>' +
                ' <td>' + (o.destCode || '/') + '</td> <td>' + (o.airCompanyCode || '/') + '</td> ' +
                '<td>' + new Date(o.flightDate).Format('yyyy-MM-dd') + '</td> <td>' + (o['cargo'].cargoCount || '/') + '</td> ' +
                '<td>' + (o['cargo'].cargoWeight || '/') + '</td> <td>' + (o['cargo'].cargoSize || '/') + '</td>' +
                ' <td>' + (o['cargo'].cargoName || '/') + '</td> </tr> </tbody>'

        }

        $('.outer-tb').html(str);
    };
    return {
        list: list
    }
}());
module.exports.Dom = Dom;