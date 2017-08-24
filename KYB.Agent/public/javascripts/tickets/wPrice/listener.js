/**
 * Created by Jeremy on 2017/1/5.
 */
'use strict';
require('../../general/burster');
var Data = require('./data').Data
    , Dom = require('./dom').Dom;
var url = require('../../general/function').url
    , Modal = require('../../general/modal');
var LIST;
var Listener = (function () {
    var listener = function () {
        $('#search-time').datetimepicker({
            format: 'yyyy-mm-dd',//日期的格式
            //startDate: new Date(),//选择器的开始日期
            autoclose: true,//日期选择完成后是否关闭选择框
            bootcssVer: 3,//显示向左向右的箭头
            language: 'zh-CN',//语言
            minView: "month"//表示日期选择的最小范围，默认是hour
        });
        $('#search-end').datetimepicker({
            format: 'yyyy-mm-dd',//日期的格式
            //startDate: new Date(),//选择器的开始日期
            autoclose: true,//日期选择完成后是否关闭选择框
            bootcssVer: 3,//显示向左向右的箭头
            language: 'zh-CN',//语言
            minView: "month"//表示日期选择的最小范围，默认是hour
        });

        $(document).on('click', '#search', function () {
            url.set('offset', 0);
            init();
        });
        $(document).on('click', '.outer-pages .pages', function () {
            url.set('offset', $(this).data('offset'));
            init();
        });
        $(document).on('click', '#ept', function () {
            //请选择导出时间段
            if($('#search-time').val()== "" || $('#search-end').val() ==""){
                Modal.setAlert("请选择导出时间段!");
                return;
            }else{
                var dateStart = new Date($('#search-time').val())
                var dateEnd = new Date($('#search-end').val())
                var diff_day = parseInt((dateEnd-dateStart)/(1000*60*60*24));
                //最多选择60天!
                if(diff_day>60){
                    Modal.setAlert("最多选择60天!");
                    return;
                }
            }

            location.href = '/tickets/exportW?id=' + $('#search-sel').find('option:selected').val() + '&s=' + $('#search-time').val() + '&e=' + $('#search-end').val();
        });
    };
    var init = function () {
        var data = {
            "wareHoureId": $('#search-sel').find('option:selected').val(),
            "timeFrom": $('#search-time').val(),
            "timeTo": $('#search-end').val(),
            "offset": url.get('offset') || 0,
            "limit": url.get('limit') || 20
        };
        Data.list(data, function (json) {
            LIST = Dom.list(json, data);
        });
    };
    var wInit = function () {
        var data = {
            "keyword": '',
            "agentCompanyId": 0
        };
        Data.wlist(data, function (json) {
            var option = '';
            if (json && 'resCode' in json && json.resCode == 0) {
                var arr = json.resBody.sList || [];
                for (var i = 0; i < arr.length; i++) {
                    option += '<option value="' + arr[i].warehouseId + '">' + arr[i].warehouseName + '</option>'
                }
            }
            $('#search-sel').html(option);
            init();
        });
    };
    var run = function () {
        $('#search-end').val(new Date(new Date().getTime() + 86400000).Format('yyyy-MM-dd'));
        $('#search-time').val(new Date(new Date().getTime() - 2592000000).Format('yyyy-MM-dd'));
        listener();
        wInit();
    };
    return {
        run: run
    }
}());
module.exports.Listener = Listener;