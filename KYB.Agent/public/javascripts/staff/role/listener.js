/**
 * Created by Jeremy on 2017/1/5.
 */
'use strict';
require('../../general/burster');
var Data = require('./data').Data;
var url = require('../../general/function').url
    , Modal = require('../../general/modal');
var Listener = (function () {
    var listener = function () {

    };
    var init = function () {
        Data.role(function (json) {
            var str = '';
            if (json && 'resBody' in json && json.resBody instanceof Array) {
                var arr = json.resBody;
                if (arr.length > 0) {
                    for (var a in arr) {
                        if (arr.hasOwnProperty(a)) {
                            var d = arr[a];
                            var mark;
                            switch (d.roleId) {
                                case 1002://管理员
                                    mark = '除订单和财务之外的所有权限';
                                    break;
                                case 1004://操作
                                    mark = '订单操作、费用清单操作权限';
                                    break;
                                case 1005://财务
                                    mark = '对账单、开票操作权限';
                                    break;
                                case 1006://超级管理员
                                    mark = '所有操作和管理权限';
                                    break;
                                case 1007://操作主管
                                    mark = '订单操作、订单分配、费用清单操作权限';
                                    break;
                            }

                            str += '<tr>' +
                                    //'<td><input type="checkbox" data-id="' + d.roleId + '"/></td>' +
                                '<td>' + d.roleName + '</td><td>' + mark + '</td>' +
                                    //'<td><a href="javascript:void(0);">查看详情</a></td>+'
                                '</tr>'
                        }
                    }
                } else {
                    str = '<tr class="wrong-msg"><td colspan="4">暂无角色列表！</td></tr>';
                }
            } else {
                str = '<tr class="wrong-msg"><td colspan="4">获取列表失败，<a href="">请刷新重试</a>！</td></tr>';
            }
            $('tbody').html(str);
        });
    };
    var run = function () {
        listener();
        init();
    };
    return {
        run: run
    }
}());
module.exports.Listener = Listener;