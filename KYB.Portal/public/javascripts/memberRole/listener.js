/**
 * Created by Jeremy on 2016/11/22.
 */
"use strict";
var Modal = require('../frame/modal');
var Data = require('./data').Data;
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
                            switch (d.roleName) {
                                case '管理员':
                                    mark = '查看所有订单，账单，可进行员工管理';
                                    break;
                                case '操作':
                                    mark = '查看指派的订单，进行订单操作';
                                    break;
                                case '财务':
                                    mark = '查看所有的账单';
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
module.exports = Listener;