/**
 * Created by Jeremy on 2017/1/5.
 */
'use strict';
require('../../general/burster');
var url = require('../../general/function').url
    , myformat = require('../../general/function').format
    ,Modal = require('../../general/modal');
var Data = require('./data').Data
    , Dom = require('./dom').Dom;
var Listener = (function () {
    //存放默认费用模板
    var defaultPrice = {};
    var stopgap = {};
    var process = {};
    var operateId, ydId;
    //存放运单列表
    var ydList = {};
    var listener = function () {
        $(document).on('click', '.show-log', function () {
            Data.log({id: $(this).data('id')}, function (json) {
                if (json && 'resBody' in json && json.resBody instanceof Array) {
                    var str = '';
                    var arr = json.resBody;
                    if (arr.length > 0) {
                        for (var a in arr) {
                            if (arr.hasOwnProperty(a)) {
                                var type = '';
                                var d = arr[a];
                                switch (d.operatorType) {
                                    case 1:
                                        type = '客户';
                                        break;
                                    case 2:
                                        type = '货代';
                                        break;
                                    case 3:
                                        type = '报关行';
                                        break;
                                }
                                str += '<tr><td>' + (new Date(d.createDt).Format('yyyy-MM-dd hh:mm')) + '</td><td>' + d.orderNum + '</td>' +
                                    '<td>' + type + '</td><td>' + d.operatorId + '</td><td class="long">' + d.remark + '</td></tr>'
                            }
                        }
                    } else {
                        str = '<tr><td colspan="5">暂无操作日志</td></tr>'
                    }
                    $('.log-part').find('tbody').html(str);
                    $('.log-part').removeClass('dp-n');
                    $('.white-back').removeClass('dp-n');
                } else {
                    Modal.setAlert(json.resMsg || '获取失败，请重试');
                }
            });
        });
        $(document).on('click', '#check-all', function () {
            $('input[type="checkbox"][name="list-sg"]').prop('checked', $(this).prop('checked'));
        });
        $(document).on('mouseenter', '.opt-td', function () {
            $(this).children('.opt-part').fadeIn(200);
        });
        $(document).on('mouseleave', '.opt-td', function () {
            $(this).children('.opt-part').fadeOut(200);
        });
        $(document).on('click', '.outer-pages .pages', function () {
            url.set('offset', $(this).data('offset'));
            init();
        });
        $(document).on('click', '#search', function () {
            url.set('offset', 0);
            init();
        });
        $(document).on('click', '.close-btn', function () {
            $('.alert-part').addClass('dp-n');
            $('.white-back').addClass('dp-n');
        });
        $(document).on('click', '.refuse', function () {
            operateId = $(this).data('id');
            $('.white-back').removeClass('dp-n');
            $('.refuse-part').removeClass('dp-n');
        });
        $(document).on('click', '#transfer', function () {
            var arr = [];
            $('input[name="list-sg"]:checked').each(function () {
                arr.push($(this).data('id'));
            });
            if (arr.length > 0) {
                $('.white-back').removeClass('dp-n');
                $('.transfer-part').removeClass('dp-n');
            }
        });
        $(document).on('click', '#accept-transfer', function () {
            var arr = [];
            var mId;
            $('input[name="list-sg"]:checked').each(function () {
                arr.push($(this).data('id'));
            });
            mId = $('#czy').find('option:selected').val();
            if (arr.length > 0 && mId) {
                var data = {
                    "orderIds": arr,
                    "companyId": 0,
                    "memberFrom": 0,
                    "memberTo": mId,
                    "requireMeberId": 0
                };
                Data.transfer(data, function (json) {
                    if (json && 'resCode' in json && json.resCode == 0) {
                        Modal.setAlert('转移成功！', null, function () {
                            location.reload();
                        });
                    } else {
                        Modal.setAlert(json.resMsg || '转移失败，请重试！');
                    }
                });
            }
        });
    };
    var init = function () {
        var data = {
            "agentCompanyId": 10000
            , "state": -2
            , offset: url.get('offset') || 0
            , limit: url.get('limit') || 10,
            "deptCode": $('#start').val(),
            "destCode": $('#end').val(),
            "number": $('#order-num').val()
        };
        Data.list(data, function (json) {
            process = Dom.list(json, data);
        });
    };
    var submit = function () {
        $(document).on('click', '#refuse-ensure', function () {
            var id = $('input[name="reason"]:checked').prop('id');
            var txt = '';
            if (id == 'r5') {
                txt = $('#text-r4').val();
            } else {
                txt = $('#' + id).siblings('label').html();
            }
            var data = {
                "agentCompanyId": 10000,
                "serviceFee": $('#r6').prop('checked'),
                "comment": txt,
                "orderId": operateId
            };
            Data.cancel(data, function (json) {
                if (json && 'resCode' in json && json.resCode == 0) {
                    Modal.setAlert(json.resMsg || '取消成功！', null, function () {
                        location.reload();
                    });
                } else {
                    Modal.setAlert(json.resMsg || '取消失败，请重试！');
                }
            });
        });
    };
    //改配
    var gp = function () {
        var gData = {
            offset: 0
            , limit: 5
        };
        $(document).on('click', '.show-change', function () {
            gData.offset = 0;
            var d = process[$(this).data('id')];
            stopgap = process[$(this).data('id')];
            var c = d.company || {}
                , o = d.order || {};
            var qd = '', dc = '', jc = '', lj = '';
            var ele = $('.change-part');
            ele.find('.gp-ydh').html(o.airwayBillNum || '/');
            ele.find('.gp-kh').html(c.companyName || '/');
            switch (o.orderChannel) {
                case 1:
                    qd = '自助订舱';
                    break;
                case 2:
                    qd = '快速订舱';
                    break;
                case 3:
                    qd = '后台下单';
                    break;
                default:
                    qd = '自助订舱';
                    break;
            }
            ele.find('.gp-qd').html(qd || '/');
            ele.find('.gp-pm').html(o.cargo.cargoName || '/');
            ele.find('.gp-lx').html(o.cargo.cargoType == 1 ? '普货' : '转关');
            ele.find('.gp-bg').html(o.cargo.isBulkyCargo ? '是' : '否');
            ele.find('.gp-pm').html(o.cargo.cargoName || '/');
            ele.find('.gp-js').html((o.cargo.cargoCount || 0) + 'PCS');
            ele.find('.gp-tj').html((myformat.formatvolume(o.cargo.cargoSize) || 0) + 'CBM');
            ele.find('.gp-zl').html((o.cargo.cargoWeight || 0) + 'KGS(计费重量：' + o.cargo.chargingWeight + 'KGS)');
            switch (o.bookingState) {
                case 0:
                    dc = '未订舱';
                    break;
                case 1:
                    dc = '已订舱';
                    break;
                case -1:
                    dc = '订舱失败';
                    break;
                case 2:
                    dc = '已改配';
                    break;
            }
            ele.find('.gp-dc').html(dc || '/');
            switch (o.entryState) {
                case 0:
                    jc = '待进仓';
                    break;
                case 1:
                    jc = '已进仓';
                    break;
                case 2:
                    jc = '已确认';
                    break;
            }
            ele.find('.gp-jc').html(jc || '/');
            ele.find('.gp-s').html(o.deptCode || '/');
            ele.find('#gp-e').val(o.destCode || '/');
            ele.find('#gp-c').val(o.airCompanyCode || '/');
            ele.find('#gp-d').val(new Date(o.flightDate.replace(/-/g, "/")).Format('yyyy-MM-dd'));
            if (o.airwayInfo) {
                var arr = o.airwayInfo.transPort;
                for (var i = 0; i < arr.length; i++) {
                    lj += arr[i].portCode + (i == arr.length - 1 ? '' : ' -> ')
                }
            }
            $('#gp-d').datetimepicker({
                format: 'yyyy-mm-dd',//日期的格式
                startDate: new Date(o.flightDate.replace(/-/g, "/")),//选择器的开始日期
                autoclose: true,//日期选择完成后是否关闭选择框
                bootcssVer: 3,//显示向左向右的箭头
                language: 'zh-CN',//语言
                minView: "month"//表示日期选择的最小范围，默认是hour
            });
            ele.find('.gp-l').html(lj || '/');
            ele.find('.bg-ip').each(function () {
                $(this).prop('readonly', Boolean(o.declareState));
            });
            $('#gp-dj').val(o.declareChargingPrice);
            $('.hxlb').addClass('dp-n');
            $('.white-back').removeClass('dp-n');
            ele.removeClass('dp-n');
        });
        $(document).on('click', '.gp-pages .pages', function () {
            gData.offset = $(this).data('offset');
            inti();
        });
        $(document).on('click', '#gp-search', function () {
            gData.offset = 0;
            inti();
        });
        $(document).on('click', '#change-ensure', function () {
            var ele = $('input[name="i-sg"]:checked');
            var pass = true;
            var fix = $('#gp-fix').prop('checked');
            var price = $('#gp-dj').val();
            if (fix && !price) {
                pass = false;
                $('#gp-dj').css('border-color', 'red');
            } else {
                $('#gp-dj').css('border-color', '#d4d4d4');
            }
            if (pass) {
                var data = {
                    "orderId": stopgap.order.orderId,
                    "agentCompanyId": 10000,
                    "agentId": 1,
                    "airwayId": ele.length > 0 ? ele.data('id') : stopgap.order.airwayId,
                    "flightDate": $('#gp-d').val(),
                    "Price": price,
                    "fixPrice": fix
                };
                Data.gp(data, function (json) {
                    if (json && 'resCode' in json && json.resCode == 0) {
                        Modal.setAlert('改配成功！', null, function () {
                            location.reload();
                        });
                    } else {
                        Modal.setAlert(json.resMsg || '改配失败，请重试！');
                    }
                });
            }
        });
        var inti = function () {
            var pass = true;
            $('.s-req').each(function () {
                if (!$(this).val()) {
                    $(this).addClass('warm');
                    pass = false;
                } else {
                    $(this).removeClass('warm');
                }
            });
            if (pass) {
                var data = {
                    "deptCode": $('#gp-s').html(),
                    "destCode": $('#gp-e').val(),
                    "flightDate": new Date($('#gp-d').val().replace(/-/g, "/")),
                    "airCompanyCode": $('#gp-c').val(),
                    "transCount": 1,
                    "offset": gData.offset || 0,
                    "limit": gData.limit || 5
                };
                Data.search(data, function (json) {
                    Dom.innerList(json, data);
                    $('.hxlb').removeClass('dp-n');
                });
            }
        };
    };
    var airports = function () {
        //获取机场名称
        $(document).on('keyup', '#gp-e', function (e) {
            var _this = $(this)
                , ul = _this.siblings('.get-name');
            var index = ul.find('.active').index() || 0
                , len = ul.children().length;
            if (e.keyCode == 13) {//回车键
                var data = ul.children('.active').data('val') || ul.find('li:first-child').data('val') || '';
                $(this).val(data);
                $(this).data('val', data);
                ul.hide();
            } else if (e.keyCode == 38) {//上键
                index = index == 0 ? len - 1 : index - 1;
                ul.find('li').removeClass('active');
                ul.find('li').eq(index).addClass('active');
            } else if (e.keyCode == 40) {//下键
                index = index == len - 1 ? 0 : index + 1;
                ul.find('li').removeClass('active');
                ul.find('li').eq(index).addClass('active');
            } else {//正常输入
                Data.getName({key: _this.val()}, function (json) {
                    if (json && 'resBody' in json && json.resBody instanceof Array && json.resBody.length > 0) {
                        var str = ''
                            , body = json.resBody;
                        for (var b in body) {
                            if (body.hasOwnProperty(b)) {
                                var d = body[b];
                                str += '<li data-val="' + d.airportCode + '" class="' + (b == 0 ? 'active' : '') + '">' + d.displayName + '</li>'
                            }
                        }
                        ul.html(str);
                        ul.show();
                    }
                });
            }
        });
        //input失去焦点
        $(document).on('blur', '#gp-e', function () {
            if (!$(this).prop('readonly')) {
                var ul = $(this).siblings('.get-name');
                var data = ul.children('.active').data('val') || ul.find('li:first-child').data('val') || '';
                $(this).val(data);
                $(this).data('val', data);
                ul.hide();
            }
        });
        //li元素悬浮获得焦点
        $(document).on('mouseenter ', '.get-name li', function () {
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
        });
    };
    var company = function () {
//获取机场名称
        $(document).on('keyup', '#gp-c', function (e) {
            var _this = $(this)
                , ul = _this.siblings('.get-name');
            var index = ul.find('.active').index() || 0
                , len = ul.children().length;
            if (e.keyCode == 13) {//回车键
                var data = ul.children('.active').data('val') || ul.find('li:first-child').data('val') || '';
                $(this).val(data);
                $(this).data('val', data);
                ul.hide();
            } else if (e.keyCode == 38) {//上键
                index = index == 0 ? len - 1 : index - 1;
                ul.find('li').removeClass('active');
                ul.find('li').eq(index).addClass('active');
            } else if (e.keyCode == 40) {//下键
                index = index == len - 1 ? 0 : index + 1;
                ul.find('li').removeClass('active');
                ul.find('li').eq(index).addClass('active');
            } else {//正常输入
                Data.getCode({key: _this.val()}, function (json) {
                    if (json && 'resBody' in json && json.resBody instanceof Array && json.resBody.length > 0) {
                        var str = ''
                            , body = json.resBody;
                        for (var b in body) {
                            if (body.hasOwnProperty(b)) {
                                var d = body[b];
                                str += '<li data-val="' + d.airlineCode + '" class="' + (b == 0 ? 'active' : '') + '">' + d.companyName + '</li>';
                            }
                        }
                        ul.html(str);
                        ul.show();
                    }
                });
            }
        });
        //input失去焦点
        $(document).on('blur', '#gp-c', function () {
            if (!$(this).prop('readonly')) {
                var ul = $(this).siblings('.get-name');
                var data = ul.children('.active').data('val') || ul.find('li:first-child').data('val') || '';
                $(this).val(data);
                $(this).data('val', data);
                ul.hide();
            }
        });
    };
    var opInit = function () {
        Data.opList(function (json) {
            var option = '';
            if (json && 'resCode' in json && json.resCode == 0 && json.resBody.length > 0) {
                var arr = json.resBody || [];
                for (var a = 0; a < arr.length; a++) {
                    option += '<option value="' + arr[a].memberId + '">' + arr[a].name + '</option>'
                }
                $('#czy').html(option);
            } else {
                option = '暂无操作员，请添加！';
                $('.transfer-part').find('.dp-tb').html(option);
            }
        });
    };
    var run = function () {
        listener();
        init();
        submit();
        gp();
        airports();
        company();
        opInit();
    };
    return {
        run: run
    }
}());
module.exports.Listener = Listener;