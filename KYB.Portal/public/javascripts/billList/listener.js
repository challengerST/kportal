/**
 * Created by Auser on 2016/12/13.
 */
require('../frame/burster');
var url = require('../frame/function').url;
var Listener = (function () {
    var Data = require('./data').Data
        , Dom = require('./dom').Dom;
    var listener = function () {
        $(document).on('click', '.search-btn', function () {
            url.set('offset', 0);
            init();
        });
        $(document).on('click', '.pages', function () {
            url.set('offset', $(this).data('offset'));
            init();
        });
        $('#time').datetimepicker({
            format: 'yyyy-mm-dd',//日期的格式
            startDate: '1900-01-01',//选择器的开始日期
            autoclose: true,//日期选择完成后是否关闭选择框
            bootcssVer: 3,//显示向左向右的箭头
            language: 'zh-CN',//语言
            minView: "month"//表示日期选择的最小范围，默认是hour
        });
    };
    var init = function () {
        var load = '<tr class="wrong-msg"><td colspan="9"><div class="loading-box"><div class="spinner"> <div class="rect1"></div> <div class="rect2"></div> <div class="rect3"></div><div class="rect4"></div><div class="rect5"></div> </div></div></td></tr>';
        $('tbody').html(load);
        var data = {
            "memberId": 0,
            "orderNum": $('#id').val(),
            "chargeState": $('#state').find('option:selected').val(),
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
module.exports = Listener;