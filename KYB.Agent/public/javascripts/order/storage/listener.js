/**
 * Created by Jeremy on 2017/1/5.
 */
'use strict';
require('../../general/burster');
var url = require('../../general/function').url
    ,myformat = require('../../general/function').format
    , Modal = require('../../general/modal');
var Data = require('./data').Data
    , Dom = require('./dom').Dom;
var Listener = (function () {
    var option = '';
    var listener = function () {
        $('.sel-time').datetimepicker({
            format: 'yyyy-mm-dd hh:ii',//日期的格式
            endDate: new Date(),//选择器的开始日期
            autoclose: true,//日期选择完成后是否关闭选择框
            bootcssVer: 3,//显示向左向右的箭头
            language: 'zh-CN',//语言
            minView: "month",//表示日期选择的最小范围，默认是hour
            initialDate: new Date(new Date().getTime() + (7 * 24 * 60 * 60 * 1000))//默认选中时间
        }).on('changeDate', function (e) {
            $(this).parents('tr').siblings().find('.time').html(new Date(e.date).Format('yyyy-MM-dd hh:mm'));
        });
        $(document).on('change', '.sel-bh', function () {
            $(this).parents('tr').siblings().find('.jcbh').html($(this).val());
        });
        $(document).on('blur', '.num', function () {
            $(this).val($(this).val().replace(/[^\-?\d.]/g, '') || 0);
            calculate();
        });
        $(document).on('click', '.remove-pc', function () {
            $(this).parents('tbody').remove();
            calculate();
        });
        $(document).on('click', '#add-pc', function () {
            var str = '<tbody data-each="1" data-res="0" data-id=""> <tr class="kb"> <td colspan="15"></td> </tr>' +
                ' <tr data-each="1"> <td class="long jcbh"><select class="sel-bh">' + option + '</select></td>' +
                ' <td><input type="text" class="num sg-js" value="0"></td> <td>/</td> <td><input type="text" class="num sg-tj" value="0" readonly></td>' +
                '<td><input type="text" class="num sg-c" value="0"></td> <td><input type="text" class="num sg-k" value="0"></td>' +
                ' <td><input type="text" class="num sg-g" value="0"></td> ' +
                '<td>/</td> <td class="small">/</td> <td class="small">/</td> <td class="small">/</td> <td class="small">/</td> <td class="long">/</td>' +
                ' <td class="long time"><input type="text" class="sel-time" value="' + (new Date().Format('yyyy-MM-dd hh:mm')) + '"></td> <td></td> ' +
                '</tr> <tr data-each="0"> <td class="long">小计</td> <td class="xj-js">0</td> <td><input type="text" class="xj-zl num" value="0"></td>' +
                ' <td class="xj-tj">0</td> <td>/</td> <td>/</td> <td>/</td> <td><input type="text" class="xj-bz" value=""></td> <td class="small"><input type="text" class="xj-ps num" value="0"></td> ' +
                '<td class="small"><input type="text" class="xj-bx num" value="0"></td> <td class="small"><input type="text" class="xj-sc num" value="0"></td>' +
                ' <td class="small"><input type="text" class="xj-qt num" value="0"></td> <td class="long">/</td> <td class="long">/</td> <td> ' +
                '    <a href="javascript:void(0);" class="add-sg">添加规格</a> <a href="javascript:void(0);" class="remove-pc">删除批次</a> </td> </tr></tbody>';
            $('tbody.total').before(str);
            $('.sel-time').datetimepicker({
                format: 'yyyy-mm-dd hh:ii',//日期的格式
                endDate: new Date(),//选择器的开始日期
                autoclose: true,//日期选择完成后是否关闭选择框
                bootcssVer: 3,//显示向左向右的箭头
                language: 'zh-CN',//语言
                minView: "month",//表示日期选择的最小范围，默认是hour
                initialDate: new Date(new Date().getTime() + (7 * 24 * 60 * 60 * 1000))//默认选中时间
            }).on('changeDate', function (e) {
                $(this).parents('tr').siblings().find('.time').html(new Date(e.date).Format('yyyy-MM-dd hh:mm'));
            });
        });
        $(document).on('click', '.add-sg', function () {
            var ele = $(this).parents('tbody');
            var str = ' <tr data-each="1"> <td class="long jcbh"></td>' +
                ' <td><input type="text" class="num sg-js" value="0"></td> <td>/</td> <td><input type="text" class="num sg-tj" value="0" readonly></td>' +
                '<td><input type="text" class="num sg-c" value="0"></td> <td><input type="text" class="num sg-k" value="0"></td>' +
                ' <td><input type="text" class="num sg-g" value="0"></td> ' +
                '<td>/</td> <td class="small">/</td> <td class="small">/</td> <td class="small">/</td> <td class="small">/</td> <td class="long">/</td>' +
                ' <td class="long time"></td> <td><a href="javascript:void(0);" class="remove-sg">删除规格</a></td> ' +
                '</tr>';
            $(this).parents('tr').before(str);
        });
        $(document).on('click', '.remove-sg', function () {
            $(this).parents('tr').remove();
            calculate();
        });
        $(document).on('click', '#add', function () {
            var arr = [];
            var id = url.get('id');
            $('tbody[data-each="1"]').each(function () {
                var sid = $(this).data('id') || ''
                    , num = $(this).find('.sel-bh').find('option:selected').val()
                    , tm = $(this).find('.sel-time').val();
                var inner = [];
                $(this).find('tr[data-each="1"]').each(function () {
                    inner.push({
                        "orderId": id,
                        "storageTime": tm,
                        "packageType": "string",
                        "packageMark": "string",
                        "storageCount": $(this).find('.sg-js').val(),
                        "storageWeight": 0,
                        "storageLength": $(this).find('.sg-c').val(),
                        "storageWidth": $(this).find('.sg-k').val(),
                        "storageHeight": $(this).find('.sg-g').val(),
                        "storageSize": 0,
                        "damageCount": 0,
                        "transformCount": 0,
                        "dampCount": 0,
                        "otherCount": 0,
                        "warehousEntryNum": num,
                        "storageRemark": "string"
                    });
                });
                inner.push({
                    "orderId": id,
                    "storageTime": tm,
                    "packageType": $(this).find('.xj-bz').val(),
                    "packageMark": "string",
                    "storageCount": 0,
                    "storageWeight": $(this).find('.xj-zl').val(),
                    "storageLength": 0,
                    "storageWidth": 0,
                    "storageHeight": 0,
                    "storageSize": 0,
                    "damageCount": $(this).find('.xj-ps').val(),
                    "transformCount": $(this).find('.xj-bx').val(),
                    "dampCount": $(this).find('.xj-sc').val(),
                    "otherCount": $(this).find('.xj-qt').val(),
                    "warehousEntryNum": num,
                    "storageRemark": "string"
                });
                arr.push({
                    "orderId": id,
                    "storageId": sid,
                    "entryNum": num,
                    "entryList": inner
                });
            });
            Data.update({data: arr, orderId: id}, function (json) {
                if (json && 'resCode' in json && json.resCode == 0) {
                    Modal.setAlert('保存成功！', null, function () {
                        location.reload();
                    });
                } else {
                    Modal.setAlert(json.resMsg || '保存失败，请重试！');
                }
            });
        });
        $(document).on('click', '#ensure', function () {
            var arr = [];
            var id = url.get('id');
            $('tbody[data-each="1"]').each(function () {
                var sid = $(this).data('id') || ''
                    , num = $(this).find('.sel-bh').find('option:selected').val()
                    , tm = $(this).find('.sel-time').val();
                var inner = [];
                $(this).find('tr[data-each="1"]').each(function () {
                    inner.push({
                        "orderId": id,
                        "storageTime": tm,
                        "packageType": "string",
                        "packageMark": "string",
                        "storageCount": $(this).find('.sg-js').val(),
                        "storageWeight": 0,
                        "storageLength": $(this).find('.sg-c').val(),
                        "storageWidth": $(this).find('.sg-k').val(),
                        "storageHeight": $(this).find('.sg-g').val(),
                        "storageSize": 0,
                        "damageCount": 0,
                        "transformCount": 0,
                        "dampCount": 0,
                        "otherCount": 0,
                        "warehousEntryNum": num,
                        "storageRemark": "string"
                    });
                });
                inner.push({
                    "orderId": id,
                    "storageTime": tm,
                    "packageType": $(this).find('.xj-bz').val(),
                    "packageMark": "string",
                    "storageCount": 0,
                    "storageWeight": $(this).find('.xj-zl').val(),
                    "storageLength": 0,
                    "storageWidth": 0,
                    "storageHeight": 0,
                    "storageSize": 0,
                    "damageCount": $(this).find('.xj-ps').val(),
                    "transformCount": $(this).find('.xj-bx').val(),
                    "dampCount": $(this).find('.xj-sc').val(),
                    "otherCount": $(this).find('.xj-qt').val(),
                    "warehousEntryNum": num,
                    "storageRemark": "string"
                });
                arr.push({
                    "orderId": id,
                    "storageId": sid,
                    "entryNum": num,
                    "entryList": inner
                });
            });
            Data.update({data: arr, orderId: id}, function (json) {
                if (json && 'resCode' in json && json.resCode == 0) {
                    Data.ensureData({orderId: url.get('id')}, function (res) {
                        if (res && 'resCode' in res && res.resCode == 0) {
                            Modal.setAlert(res.resMsg || '确认成功！', null, function () {
                                location.reload();
                            });
                        } else {
                            Modal.setAlert(res.resMsg || '确认失败！');
                        }
                    });
                } else {
                    Modal.setAlert(json.resMsg || '保存失败，请重试！');
                }
            });
        });
    };
    var calculate = function () {
        var tjs = 0, tzl = 0, ttj = 0, tps = 0, tbx = 0, tsc = 0, tqt = 0;
        $('tbody[data-each="1"]').each(function () {
            var xjjs = 0, xjtj = 0;
            $(this).find('tr[data-each="1"]').each(function () {
                var js = parseFloat($(this).find('.sg-js').val())
                    , c = parseFloat($(this).find('.sg-c').val())
                    , k = parseFloat($(this).find('.sg-k').val())
                    , g = parseFloat($(this).find('.sg-g').val());
                var tj = c * k * g * js / 1000000;
                xjjs += js;
                tjs += js;
                xjtj += tj;
                ttj += tj;
                $(this).find('.sg-tj').val(myformat.formatvolume(tj));
            });
            $(this).find('.xj-js').html(xjjs);
            $(this).find('.xj-tj').html(myformat.formatvolume(xjtj));
            tzl += parseFloat($(this).find('.xj-zl').val());
            tps += parseFloat($(this).find('.xj-ps').val());
            tbx += parseFloat($(this).find('.xj-bx').val());
            tsc += parseFloat($(this).find('.xj-sc').val());
            tqt += parseFloat($(this).find('.xj-qt').val());
        });
        $('.zj-js').html(tjs);
        $('.zj-zl').html(tzl);
        $('.zj-tj').html(myformat.formatvolume(ttj));
        $('.zj-ps').html(tps);
        $('.zj-bx').html(tbx);
        $('.zj-sc').html(tsc);
        $('.zj-qt').html(tqt);
    };
    var getDetail = function () {
        var data = {
            orderId: url.get('id')
            , memberId: ''
        };
        Data.detail(data, function (json) {
            var str = '';
            if (json && 'resCode' in json && json.resCode == 0) {
                var arr = json.resBody.order.warehouseEntryNumList || [];
                for (var a in arr) {
                    if (arr.hasOwnProperty(a)) {
                        var d = arr[a];
                        str += '<option value="' + d + '">' + d + '</option>'
                    }
                }
            }
            option = str;
            $('.sel-bh').html(str);
            $('.sel-bh').each(function () {
                var num = $(this).parent().data('num');
                $(this).find('option[value="' + num + '"]').prop('selected', true);
            });
        });
        //小数点控制

        $('.sg-tj').each(function(){
            $(this).html(myformat.formatvolume($(this).html()));
        })
        $('.xj-tj').each(function(){
            $(this).html(myformat.formatvolume($(this).html()));
        })

        if( $('.zj-tj').html()!="0") $('.zj-tj').html(myformat.formatvolume($('.zj-tj').html()));
    };
    var run = function () {
        listener();
        getDetail();
    };
    return {
        run: run
    }
}());
module.exports.Listener = Listener;