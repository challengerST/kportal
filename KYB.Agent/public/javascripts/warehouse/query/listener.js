/**
 * Created by Jeremy on 2017/1/5.
 */
'use strict';
require('../../general/burster');
var url = require('../../general/function').url
    , Modal = require('../../general/modal');
var Data = require('./data').Data
    , Dom = require('./dom').Dom;
var Listener = (function () {
    var listener = function () {
        $('#jcrqStart').datetimepicker({
            format: 'yyyy-mm-dd',//日期的格式
            endDate: new Date(),//选择器的开始日期
            autoclose: true,//日期选择完成后是否关闭选择框
            bootcssVer: 3,//显示向左向右的箭头
            language: 'zh-CN',//语言
            minView: "month"//表示日期选择的最小范围，默认是hour
        })
        $('#jcrqEnd').datetimepicker({
            format: 'yyyy-mm-dd',//日期的格式
            endDate: new Date(),//选择器的开始日期
            autoclose: true,//日期选择完成后是否关闭选择框
            bootcssVer: 3,//显示向左向右的箭头
            language: 'zh-CN',//语言
            minView: "month"//表示日期选择的最小范围，默认是hour
        });
        $(document).on('click', '.pages', function () {
            url.set('offset', $(this).data('offset'));
            init();
        });
        $(document).on('click', '#search', function () {
            url.set('offset', 0);
            init();
        });
    };
    var init = function () {
        var data = {
            "agentCompanyId": 10000,
            "keyword": $('#jcbh').val(),
            "storageDateStart": $('#jcrqStart').val() ? $('#jcrqStart').val() + ' 00:00:00' : '',
            "storageDateEnd": $('#jcrqEnd').val() ? $('#jcrqEnd').val() + ' 00:00:00' : '',
            "offset": url.get('offset') || 0,
            "limit": url.get('limit') || 20
        };
        Data.list(data, function (json) {
            Dom.list(json, data);
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