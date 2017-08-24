/**
 * Created by Jeremy on 2016/11/22.
 */
"use strict";
require('../frame/burster');
var url = require('../frame/function').url;
var Modal = require('../frame/modal');
var country = require('../../../utils/country/country').country;
var tempId;
var countryObj = {};
for (var c in country) {
    if (country.hasOwnProperty(c)) {
        countryObj[country[c].Code] = country[c];
    }
}
var Listener = (function () {
    var Data = require('./data').Data
        , Dom = require('./dom').Dom;
    var lines = {};
    var order = {};
    //报价单数据
    var dlData = {
        dchy: ''
        , qyg: ''
        , mdg: ''
        , hkgs: ''
        , qfrq: ''
        , hc: ''
        , pm: ''
        , ygzl: ''
        , ygtj: ''
        , ygjs: ''
        , dj: ''
        , zj: ''
        , tzr: {}
        , btzr: {}
    };
    var listener = function () {
        $('#datetimepicker').datetimepicker({
            format: 'yyyy-mm-dd',//日期的格式
            startDate: new Date(),//选择器的开始日期
            autoclose: true,//日期选择完成后是否关闭选择框
            bootcssVer: 3,//显示向左向右的箭头
            language: 'zh-CN',//语言
            minView: "month"//表示日期选择的最小范围，默认是hour
        }).on('changeDate', function (e) {
            dlData['qfrq'] = new Date(e.date).Format('yyyy-MM-dd');
            $('#right-time').val(e.date.Format('yyyy-MM-dd'));
            var week = new Date(e.date).getDay();
            week = week == 0 ? '7' : week + '';
            $('.sg-end').each(function () {
                var arr = $(this).data('limit').split(',');
                if (arr.indexOf(week) >= 0) {
                    $(this).removeClass('disabled');
                    $(this).show();
                    $(this).removeClass('active');
                    $('#right-end').val('');
                    $('#trans-line').val('');
                } else {
                    $(this).removeClass('active');
                    $('#right-end').val('');
                    $(this).addClass('disabled');
                    $(this).hide();
                }
            });
            $('.step4').find('.bd').removeClass('dp-n');
            $('.step5').find('.bd').addClass('dp-n');
        });
        $(document).on('click', '.sel-c', function () {
            dlData['hkgs'] = $(this).data('val');
            if (!$(this).hasClass('active')) {
                $(this).addClass('active');
                $(this).siblings().removeClass('active');
                $('#right-com').val($(this).text());
                $('#right-start').val('');
                $('#right-end').val('');
                $('#trans-line').val('');
                $('#right-time').val('');
                var str = ''
                    , arr = lines[$(this).data('val')].airwayGroup;
                //分泡比例
                var fp=lines[$(this).data('val')].bulkyRate;
                console.log($(this).data('val'));
                console.log(fp);
                var newFp=(fp*10)+'/'+(10-(fp*10));
                $('#fp').val(newFp);
                tempId=lines[$(this).data('val')].templateId;
                for (var a in arr) {
                    if (arr.hasOwnProperty(a)) {
                        var d = arr[a];
                        str += '<span class="sel-s" data-original-title="' + d.deptPortName + (d.domesticPort ? '(' + d.domesticPortName + '中转)' : '') + '" data-expire="' + d.expireDate + '" data-dept="' + d.deptPort + '" data-domestic="' + d.domesticPort + '">' + d.deptPort + (d.domesticPort ? ' （' + d.domesticPort + '中转）' : '') + '</span>';
                    }
                }
                $('.step2').find('.bd').html(str).removeClass('dp-n');
                $('.step3').find('.bd').addClass('dp-n');
                $('.step4').find('.bd').addClass('dp-n');
                $('.step5').find('.bd').addClass('dp-n');
                $(".sel-s").tooltip();
            }
        });
        $(document).on('click', '.sel-s', function () {
            dlData['qyg'] = $(this).data('dept');
            if (!$(this).hasClass('active')) {
                $(this).addClass('active');
                $(this).siblings().removeClass('active');
                $('#right-start').val($(this).text());
                $('#right-end').val('');
                $('#trans-line').val('');
                $('#right-time').val('');
                var expire = $(this).data('expire');
                var ele = $('#datetimepicker');
                ele.datetimepicker('setEndDate', new Date(expire.replace(/-/g, "/")));
                ele.datetimepicker('setInitialDate', new Date());
                ele.find('.day.active').removeClass('active');
                var data = {
                    "companyId": 0,
                    "airCompanyCode": $('#right-com').val(),
                    "deptCode": $(this).data('dept'),
                    "domesticPort": $(this).data('domestic')
                };
                Data.getArea(data, function (json) {
                    if (json && 'resCode' in json && json.resCode == 0 && json.resBody) {
                        Dom.renderTr(json.resBody, countryObj);
                        $('.step3').find('.bd').removeClass('dp-n');
                        $('.step4').find('.bd').addClass('dp-n');
                        $('.step5').find('.bd').addClass('dp-n');
                    }
                });
            }
        });
        $(document).on('click', '.sg-end', function () {
            dlData['mdg'] = $(this).html();
            if (!$(this).hasClass('active')) {
                if (!$(this).hasClass('disabled')) {
                    $('.step4').find('.sg-end').removeClass('active');
                    $(this).addClass('active');
                    $('#right-end').val($(this).text());
                    Data.detail({id: $(this).data('val')}, function (json) {
                        if (json && 'resCode' in json && json.resCode == 0 && json.resBody) {
                            order = json.resBody;
                            var data = json.resBody.airwayPrice && json.resBody.airwayPrice.rate || [];
                            var str = '';
                            var tb = '';
                            for (var d in data) {
                                if (data.hasOwnProperty(d)) {
                                    var x = data[d];
                                    str += '<a href="javascript:void(0);">1:' + x.proportion + '</a>';
                                }
                            }
                            var transport = '';
                            if (order.transPort) {
                                var arr = order.transPort;
                                for (var i = 0; i < arr.length; i++) {
                                    transport += arr[i].portCode + (i == arr.length - 1 ? '' : ' -> ');
                                }
                            }
                            dlData['hc'] = transport;
                            $('#trans-line').val(transport);
                            $('.info-top').find('.weight').html(str);

                            for (var a = 0; a < data.length; a++) {
                                var dt = data[a];
                                var p = dt.policy || {};
                                var temp = '';
                                if (a == 0) {
                                    temp = '<a class="show-history" href="javascript:void(0);">查看历史报价</a>';
                                }
                                tb += '<tr><td>' + (dt.proportion == 1 ? '/' : '1:' + dt.proportion) + '</td><td>' + dt.min + '</td>' +
                                    '<td class="ta-r">' + (p['45'].toFixed(2) || '/') + '</td><td class="ta-r">' + (p['100'].toFixed(2) || '/') + '</td>' +
                                    '<td class="ta-r">' + (p['300'].toFixed(2) || '/') + '</td><td class="ta-r">' + (p['500'].toFixed(2) || '/') + '</td><td class="ta-r">' + (p['1000'].toFixed(2) || '/') + '</td><td>' + temp + '</td></tr>';
                            }
                            $('.left-tb-price').find('tbody').html(tb);
                            $('.detail-bz').find('.body').html(order.remarks || '/');
                            $('.limit-remark').html(order.limtRemark);
                            if (order.limtRemark) {
                                $('.limit-remark').removeClass('dp-n');
                            } else {
                                $('.limit-remark').addClass('dp-n');
                            }

                            //$('.tbmin').html(data[0]['min'] || 0);
                            //$('.tb-bz').html(order.remarks || '/');
                            //$('.tb45').html((data.length > 0 && data[0]['policy']['45']) || 0);
                            //$('.tb100').html((data.length > 0 && data[0]['policy']['100']) || 0);
                            //$('.tb300').html((data.length > 0 && data[0]['policy']['300']) || 0);
                            //$('.tb500').html((data.length > 0 && data[0]['policy']['500']) || 0);
                            //$('.tb1000').html((data.length > 0 && data[0]['policy']['1000']) || 0);
                            $('.step5').find('.bd').removeClass('dp-n');
                        }
                    });
                }
            }
        });
        $(document).on('blur', '#vol,#wei,#num', function () {
            var vol = $('#vol').val()
                , wei = $('#wei').val()
                , id = $('.sg-end.active').data('val')
                , sum = $('#num').val();
            dlData['ygzl'] = (wei || 0);
            dlData['ygtj'] = (vol || 0);
            dlData['ygjs'] = (sum || 0);
            if (vol && wei && id) {
                var data = {
                    "cargoSize": vol,
                    "cargoWeight": wei,
                    "airwayId": id,
                    "cargoCount": sum,
                    "customDeclare": $('#custom').find('option:selected').val() == 1
                };
                Data.calculate(data, function (json) {
                    if (json && 'resCode' in json && json.resCode == 0 && json.resBody) {
                        var data = json.resBody.airwayFee
                            , sf = json.resBody.serviceFee
                            , str = '';
                        dlData['zj'] = json.resBody.totalFee;
                        dlData['dj'] = data.chargingUnitPrice;
                        $('.right-price').find('td').removeClass('active');

                        if (data.minCharge) {
                            $('.c-min').addClass('active');
                        } else {
                            $('.c-' + data.chargingLevel).addClass('active');
                        }

                        $('.c-price').find('.c-bz').html(data['policy']['proportion'] == 1 ? '/' : '1:' + data['policy']['proportion']);
                        $('.c-price').find('.c-min').html(data['policy']['min']);
                        $('.c-price').find('.c-45').html(data['policy']['policy']['45']);
                        $('.c-price').find('.c-100').html(data['policy']['policy']['100']);
                        $('.c-price').find('.c-300').html(data['policy']['policy']['300']);
                        $('.c-price').find('.c-500').html(data['policy']['policy']['500']);
                        $('.c-price').find('.c-1000').html(data['policy']['policy']['1000']);

                        $('.get-price').html(json.resBody.totalFee);
                        $('.single-fee').html(data.chargingUnitPrice);
                        $('.price-wei').html(data.chargingWeight);
                        $('.get-zj').html('CNY ' + json.resBody.totalFee);
                        $('.get-kyf').html('CNY ' + data.chargingTotal);
                        $('i.get-kyf').html('空运费');
                        $('i.get-dj').html(data.chargingUnitPrice);
                        $('.get-zl').html(data.chargingWeight + (data.chargingWeight == data.cargo.chargingWeight ? '' : '（自动靠级）') + (data.minCharge ? '（最低运费 ' + data['policy']['min'] + ' ）' : ''));

                        for (var s in sf) {
                            if (sf.hasOwnProperty(s)) {
                                var d = sf[s];
                                str += '<p><span class="title">' + d.itemName + '</span><span class="body">CNY ' + d.itemTotal + '</span></p>';
                            }
                        }
                        $('.operate').find('.p-body').html(str);
                        $('.price-pt').removeClass('dp-n');
                    }
                });
            }
        });
        $(document).on('change', '#custom', function () {
            var vol = $('#vol').val()
                , wei = $('#wei').val()
                , id = $('.sg-end.active').data('val');
            if (vol && wei && id) {
                var data = {
                    "cargoSize": vol,
                    "cargoWeight": wei,
                    "airwayId": id,
                    "cargoCount": $('#num').val(),
                    "customDeclare": $('#custom').find('option:selected').val() == 1
                };
                Data.calculate(data, function (json) {
                    if (json && 'resCode' in json && json.resCode == 0 && json.resBody) {
                        var data = json.resBody.airwayFee
                            , sf = json.resBody.serviceFee
                            , str = '';
                        dlData['zj'] = json.resBody.totalFee;
                        dlData['dj'] = data.chargingUnitPrice;
                        $('#ygzj').val(data.chargingTotal);
                        $('.right-price').find('td').removeClass('active');
                        $('.c-' + data.chargingLevel).addClass('active');
                        $('.c-price').find('.c-45').html(data['policy']['policy']['45']);
                        $('.c-price').find('.c-100').html(data['policy']['policy']['100']);
                        $('.c-price').find('.c-300').html(data['policy']['policy']['300']);
                        $('.c-price').find('.c-500').html(data['policy']['policy']['500']);
                        $('.c-price').find('.c-1000').html(data['policy']['policy']['1000']);

                        $('.get-zj').html('CNY ' + json.resBody.totalFee);
                        $('.get-kyf').html('CNY ' + data.chargingTotal);
                        $('i.get-kyf').html('空运费');


                        $('i.get-dj').html(data.chargingUnitPrice);

                        $('.get-zl').html(data.chargingWeight + (data.chargingWeight == data.cargo.chargingWeight ? '' : '（自动靠级）'));

                        for (var s in sf) {
                            if (sf.hasOwnProperty(s)) {
                                var d = sf[s];
                                str += '<p><span class="title">' + d.itemName + '</span><span class="body">CNY ' + d.itemTotal + '</span></p>';
                            }
                        }
                        $('.operate').find('.p-body').html(str);
                        $('.price-pt').removeClass('dp-n');
                    }
                });
            }
        });
        $(document).on('focus', '#vol,#wei,#num', function () {
            $('.top-img').find('.step4').addClass('doing');
        });
        $(document).on('blur', '#name', function () {
            var val = $(this).val();
            if (val == '' || new RegExp("^[ ]+$").test(val)) {
                $(this).val('consol');
            }
            dlData.pm = $(this).val();
        });
        $(document).on('click', '.close-btn', function () {
            $('.white-back').addClass('dp-n');
            $('.show-part').addClass('dp-n');
        });
        $(document).on('click', '.show-price', function () {
            $('.white-back').removeClass('dp-n');
            $('.price-list').removeClass('dp-n');
        });
        $(document).on('click', '.show-other', function () {
             extraInit();
             //提前加載是為了提升性能，數據加载不出来的时候不会出现空白的情况，先加载数据在显示表格。
            var ele = $('.other-list');
            var height = 50;
            height += ele.find('tr').length * 30;
            ele.css('margin-top', '-' + parseInt(height / 2) + 'px');
            $('.white-back').removeClass('dp-n');
            ele.removeClass('dp-n');
        });
        $(document).on('click', '#submit', function () {
            var code = $('#right-com').val()
                , start = $('#right-start').val()
                , end = $('#right-end').val()
                , dt = $('#right-time').val() + ' 00:00:00'
                , size = $('#vol').val()
                , weight = $('#wei').val()
                , num = $('#num').val();
            if (code && start && end && dt && size && weight && num) {
                $('input').removeClass('warm');
                var data = {
                    "memberId": 0,
                    "agentCompanyId": order.companyId,
                    "airwayId": order.airwayId,
                    "deptCode": order.deptPortCode,
                    "destCode": order.destPortCode,
                    "flightDate": dt,
                    "arrivalDate": "",
                    "airCompanyCode": code,
                    "cargoName": $('#name').val(),
                    "cargoType": $('#danger').find('option:selected').val(),
                    "cargoCount": num,
                    "cargoWeight": weight,
                    "cargoSize": size,
                    "customDeclare": $('#custom').find('option:selected').val() == 1
                };
                Data.order(data, function (json) {
                    if (json && 'resCode' in json && json.resCode == 0) {
                        location.href = '/order';
                    } else if (json && 'resCode' in json && json.resCode == -100) {
                        location.href = "/login";
                    } else {
                        Modal.setAlert(json.resMsg || '委托失败，请重试！');
                    }
                });
            } else {
                if (!code) {
                    $('#right-com').addClass('warm');
                    return false;
                } else {
                    $('#right-com').removeClass('warm');
                }
                if (!start) {
                    $('#right-start').addClass('warm');
                    return false;
                } else {
                    $('#right-start').removeClass('warm');
                }
                if (dt == ' 00:00:00') {
                    $('#right-time').addClass('warm');
                    return false;
                } else {
                    $('#right-time').removeClass('warm');
                }
                if (!end) {
                    $('#right-end').addClass('warm');
                    return false;
                } else {
                    $('#right-end').removeClass('warm');
                }
                if (!num) {
                    $('#num').addClass('warm');
                    return false;
                } else {
                    $('#num').removeClass('warm');
                }
                if (!weight) {
                    $('#wei').addClass('warm');
                    return false;
                } else {
                    $('#wei').removeClass('warm');
                }
                if (!size) {
                    $('#vol').addClass('warm');
                    return false;
                } else {
                    $('#vol').removeClass('warm');
                }
            }
        });
        $(document).on('click', '.show-history', function () {
            var ele = $('.sg-end.active');
            if (ele.length > 0 && ele.data('val')) {
                var show = $('.history-part');
                show.find('.h-qsg').html($('#right-start').val());
                show.find('.h-mdg').html($('#right-end').val());
                show.find('.h-hkgs').html($('#right-com').val());
                show.find('.h-hxlg').html($('#trans-line').val());
                Data.history({id: ele.data('val')}, function (json) {
                    var str = '';
                    if (json && 'resBody' in json && json.resBody instanceof Array && json.resBody.length > 0) {
                        var arr = json.resBody;
                        for (var a in arr) {
                            if (arr.hasOwnProperty(a)) {
                                var d = arr[a];
                                str += ' <tr> <td>' + (d.airwayPrice.rate[0].policy['45'] || '/') + '</td> <td>' + (d.airwayPrice.rate[0].policy['100'] || '/') + '</td>' +
                                    ' <td>' + (d.airwayPrice.rate[0].policy['300'] || '/') + '</td> <td>' + (d.airwayPrice.rate[0].policy['500'] || '/') + '</td>' +
                                    ' <td>' + (d.airwayPrice.rate[0].policy['1000'] || '/') + '</td> <td>' + new Date(d.modifyDt).Format('yyyy-MM-dd hh:mm') + '</td></tr>';
                            }
                        }
                    } else {
                        str = ' <tr><td colspan="6">暂无历史报价</td></tr>';
                    }
                    show.find('tbody').html(str);
                    $('.white-back').removeClass('dp-n');
                    show.removeClass('dp-n');
                });
            }
        });
        $(document).on('click', '.collapse-btn', function () {
            $('#' + $(this).data('target')).collapse('toggle');
            var ele = $(this).find('.open');
            ele.html(ele.html() == '+展开' ? '-折叠' : '+展开');
        });
    };
    var calculate = function () {
        $(document).on('click', '.calculate-logo', function () {
            $(this).siblings('.add-part').removeClass('dp-n');
        });
        $(document).on('click', function (event) {
            var evt = event.srcElement ? event.srcElement : event.target;
            if ($(evt).hasClass('add-part') || $(evt).hasClass('calculate-logo') || $(evt).parents('.add-part').length > 0) {
                return '';
            } else {
                $('.add-part').addClass('dp-n');
            }
        });
        $(document).on('click', '.multi-calcu', function () {
            $('#vol').val(parseFloat($('#long').val() || 0) * parseFloat($('#width').val() || 0) * parseFloat($('#height').val() || 0) * parseFloat($('#sum-num').val() || 0));
            $('.add-part').addClass('dp-n');
        });
    };
    var init = function () {
        Data.company('', function (json) {
            var str = '';
            if (json && 'resCode' in json && json.resCode == 0 && json.resBody) {
                lines = json.resBody;
            }
            for (var l in lines) {
                if (lines.hasOwnProperty(l)) {
                    var d = lines[l];
                    str += '<span class="sel-c" data-original-title="' + d.airCompanyName + '" data-val="' + l + '">' + d.airCompanyCode + '</span>';
                }
            }
            $('.step1').find('.bd').html(str).removeClass('dp-n');
            $(".sel-c").tooltip();
        });
    };
    //费用的引入
    var extraInit = function () {
        var data = {
            templ:tempId
        };
        Data.expenseTex(data, function (json) {
            var arr =[];
            var str ='';
            if (json && 'resCode' in json && json.resCode == 0) {
                if(json.resBody && 'expenseTemplate' in json.resBody ){
                   arr=json.resBody['expenseTemplate'];
                   //刚开始的时候是返回的是对象所以即使调用属性名还是无法识别，所以使用这种方法。
                }
                for (var a in arr) {
                    if (arr.hasOwnProperty(a)) {
                        var d = arr[a];
                        str += '<tr><td>' + d.itemName + '</td><td>' + d.itemPrice + '</td><td>' + (d.itemRemark || '/') + '</td></tr>'
                    }
                }
                $('.other-list').find('tbody').html(str);
            }
        });
    };
    var download = function () {
        $(document).on('click', '.dl-pdf', function () {
            dlData.pm = $('#name').val();
            $.ajax({
                url: '/api/down/bjd'
                , type: 'post'
                , data: {d: dlData, name: '报价单'}
                , dataType: 'json'
                , timeout: 100000
                , success: function (json) {
                    if ('status' in json && json.status == 1) {
                        window.open("/getImgCode/bjd");
                    }
                }
            });
        });
    };
    //右侧始终显示
    var scl = function () {
        function scrollUnique(ele) {
            return $(ele).each(function () {
                var eventType = 'mousewheel';
                // 火狐是DOMMouseScroll事件
                if (document.mozHidden !== undefined) {
                    eventType = 'DOMMouseScroll';
                }
                $(ele).on(eventType, function (event) {
                    // 一些数据
                    var scrollTop = this.scrollTop,
                        scrollHeight = this.scrollHeight,
                        height = this.clientHeight;

                    var delta = (event.originalEvent.wheelDelta) ? event.originalEvent.wheelDelta : -(event.originalEvent.detail || 0);
                    if ((delta > 0 && scrollTop <= delta) || (delta < 0 && scrollHeight - height - scrollTop <= -1 * delta)) {
                        // IE浏览器下滚动会跨越边界直接影响父级滚动，因此，临界时候手动边界滚动定位
                        this.scrollTop = delta > 0 ? 0 : scrollHeight;
                        // 向上滚 || 向下滚
                        event.preventDefault();
                    }
                });
            });
        }

        $(document).on('scroll', function () {
            var ele = $("#scroll-right");
            var lEle = $("#scroll-left");
            var oTop = lEle.offset().top;
            var sTop = $(document).scrollTop();
            if (oTop - sTop < 5) {
                if (ele.css('position') != 'fixed') {
                    ele.addClass('fixed-ele');
                }
            } else {
                if (ele.css('position') != 'absolute') {
                    ele.removeClass('fixed-ele');
                }
            }
        });
        scrollUnique("#scroll-right");
    };

    var run = function () {
        listener();
        calculate();
        init();
        download();
        scl();
    };
    return {
        run: run
    }
}());
module.exports = Listener;