/**
 * Created by Jeremy on 2016/11/22.
 */
"use strict";
require('../frame/burster');
var url = require('../frame/function').url;
var Modal = require('../frame/modal');
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
        $(document).on('click', '.sel-c', function () {
            var _this = $(this);
            dlData['hkgs'] = $(this).data('val');
            if (!$(this).hasClass('active')) {
                $(this).addClass('active');
                $(this).siblings().removeClass('active');
                $('#right-com').val($(this).text());
                $('#right-start').val('');
                $('#right-end').val('');
                $('#trans-line').val('');
                $('#right-time').val('');
                var str = '';
                var data = {
                    "airCompanyCode": _this.data('val'),
                    "enableState": 1,
                    "pageIndex": 1,
                    "pageSize": 999
                };
                Data.search(data, function (json) {
                    if (json && 'resCode' in json && json.resCode == 0) {
                        var arr = json.resBody.sList || [];
                        for (var a in arr) {
                            if (arr.hasOwnProperty(a)) {
                                var d = arr[a];
                                var lj = '';
                                var zzg = '';
                                for (var l in d.transPort) {
                                    if (d.transPort.hasOwnProperty(l)) {
                                        var lgA = d.transPort[l];
                                        lj += lgA.portCode + (l == d.transPort.length - 1 ? '' : ' -> ');
                                    }
                                }
                                switch (d.transPort.length) {
                                    case 2:
                                        zzg = '直达';
                                        break;
                                    case 3:
                                        zzg = d.transPort[1].portCode + ' 中转';
                                        break;
                                    case 4:
                                        zzg = d.transPort[1].portCode + ',' + d.transPort[2].portCode + ' 中转';
                                        break;
                                }
                                var th = '', tb = '';
                                for (var p in d.airwayPrice.policy) {
                                    if (d.airwayPrice.policy.hasOwnProperty(p)) {
                                        var dt = d.airwayPrice.policy[p];
                                        th += '<td>' + p + 'KG</td>';
                                        tb += '<td>' + dt + '</td>';
                                    }
                                }

                                str += '<div class="sg-mix fill"> ' +
                                    '<a href="javascript:void(0);" class="sel-sg" data-info="' + d.limtRemark + '" data-lj="' + lj + '" data-time="' + new Date(d.flightDate).Format('yyyy-MM-dd') + '" data-s="' + d.deptCode + '" data-e="' + d.destCode + '" data-aid="' + d.airwayId + '" data-lid="' + d.lclId + '">选择</a> ' +
                                    '<div class="info fill"> <p class="big">' + d.deptCode + '</p>' +
                                    ' <p class="zz"> <span class="time">航班日期：' + new Date(d.flightDate).Format('yyyy-MM-dd') + '</span> ' +
                                    '<span class="zd circle">' + zzg + '</span> </p> <p class="big">' + d.destCode + '</p>' +
                                    ' </div> <p class="jzj">基准价：' + d.airwayPrice.basicPrice + '/KG（拼货失败时，每公斤价格）</p> ' +
                                    '<p class="jtj">阶梯价格：（拼货成功时，每公斤价格参考表）</p> <table> ' +
                                    '<thead> <tr> ' + th + '</tr> ' +
                                    '</thead> <tbody> <tr> ' + tb +
                                    ' </tr> </tbody> </table></div>';
                            }
                        }
                    }
                    $('.step2').find('.bd').html(str).removeClass('dp-n');
                });
            }
            extraInit();
        });
        $(document).on('click', '.sel-sg', function () {
            $(this).addClass('active');
            var ele = $(this).parents('.sg-mix');
            ele.siblings().find('.sel-sg').removeClass('active');
            $('#right-start').val($(this).data('s'));
            dlData.qyg = $(this).data('s');
            $('#right-end').val($(this).data('e'));
            dlData.mdg = $(this).data('e');
            $('#trans-line').val($(this).data('lj'));
            dlData.hc = $(this).data('lj');
            $('#right-time').val($(this).data('time'));
            dlData.qfrq = $(this).data('time');
            $('.limit-remark').html($(this).data('info')).removeClass('dp-n');
        });

        $(document).on('change', '#custom', function () {
            var vol = $('#vol').val()
                , wei = $('#wei').val()
                , aid = $('.sel-sg.active').data('aid')
                , lid = $('.sel-sg.active').data('lid');
            if (vol && wei && aid && lid) {
                var data = {
                    "cargoSize": vol,
                    "cargoWeight": wei,
                    "airwayId": aid,
                    "cargoCount": $('#num').val(),
                    "customDeclare": $('#custom').find('option:selected').val() == 1,
                    "lclId": lid
                };
                Data.calculate(data, function (json) {
                    if (json && 'resCode' in json && json.resCode == 0 && json.resBody) {
                        var data = json.resBody.airwayFee
                            , sf = json.resBody.serviceFee
                            , str = '';
                        $('#ygzj').val(data.chargingTotal);
                        $('.get-zj').html('CNY ' + json.resBody.totalFee);
                        $('.get-kyf').html('CNY ' + data.chargingTotal);
                        $('i.get-kyf').html('空运费');
                        dlData['zj'] = json.resBody.totalFee;
                        dlData['dj'] = data.chargingUnitPrice;

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
        $(document).on('blur', '#vol,#wei,#num', function () {
            var vol = $('#vol').val()
                , wei = $('#wei').val()
                , aid = $('.sel-sg.active').data('aid')
                , lid = $('.sel-sg.active').data('lid')
                , sum = $('#num').val();
            dlData['ygzl'] = (wei || 0);
            dlData['ygtj'] = (vol || 0);
            dlData['ygjs'] = (sum || 0);
            if (vol && wei && aid && lid) {
                var data = {
                    "cargoSize": vol,
                    "cargoWeight": wei,
                    "airwayId": aid,
                    "cargoCount": sum,
                    "customDeclare": $('#custom').find('option:selected').val() == 1,
                    "lclId": lid

                };
                Data.calculate(data, function (json) {
                    if (json && 'resCode' in json && json.resCode == 0 && json.resBody) {
                        var data = json.resBody.airwayFee
                            , sf = json.resBody.serviceFee
                            , str = '';
                        dlData['zj'] = json.resBody.totalFee;
                        dlData['dj'] = data.chargingUnitPrice;
                        $('.right-price').find('td').removeClass('active');


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
        $(document).on('focus', '#vol,#wei,#num', function () {
            $('.top-img').find('.step4').addClass('doing');
        });
        $(document).on('blur', '#name', function () {
            var val = $(this).val();
            if (val == '' || new RegExp("^[ ]+$").test(val)) {
                $(this).val('consol');
            }
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
                    "companyId": 0,
                    "agentCompanyId": 10000,
                    "memberId": 0,
                    "airCompanyCode": code,
                    "airwayLclId": $('.sel-sg.active').data('lid'),
                    "flightDate": dt,
                    "cargoName": $('#name').val(),
                    "cargoType": 1,
                    "cargoCount": num,
                    "cargoWeight": weight,
                    "cargoSize": size,
                    "bulkyRate": 0.2,
                    "customDeclare": $('#custom').find('option:selected').val() == 1
                };
                if (data.airwayLclId) {
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
                    Modal.setAlert('请选择一条航线');
                }
            } else {
                if (!code) {
                    $('#right-com').addClass('warm');
                } else {
                    $('#right-com').removeClass('warm');
                }
                if (!start) {
                    $('#right-start').addClass('warm');
                } else {
                    $('#right-start').removeClass('warm');
                }
                if (!end) {
                    $('#right-end').addClass('warm');
                } else {
                    $('#right-end').removeClass('warm');
                }
                if (!dt) {
                    $('#right-time').addClass('warm');
                } else {
                    $('#right-time').removeClass('warm');
                }
                if (!size) {
                    $('#vol').addClass('warm');
                } else {
                    $('#vol').removeClass('warm');
                }
                if (!weight) {
                    $('#wei').addClass('warm');
                } else {
                    $('#wei').removeClass('warm');
                }
                if (!num) {
                    $('#num').addClass('warm');
                } else {
                    $('#num').removeClass('warm');
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
        var data = {
            "companyId": 0,
            "enableState": 1
        };
        Data.company(data, function (json) {
            var str = '';
            if (json && 'resCode' in json && json.resCode == 0 && json.resBody) {
                lines = json.resBody;
            }
            for (var l in lines) {
                if (lines.hasOwnProperty(l)) {
                    str += '<span class="sel-c" data-val="' + lines[l] + '">' + lines[l] + '</span>';
                }
            }
            $('.step1').find('.bd').html(str).removeClass('dp-n');
        });
    };
    var extraInit = function () {
        var data = {
            airCompanyCode: $('.sel-line').find('.active').data('val') || ''
        };
        Data.extra(data, function (json) {
            if (json && 'resCode' in json && json.resCode == 0) {
                var arr = json.resBody || []
                    , str = '';
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
    var run = function () {
        listener();
        calculate();
        init();
        extraInit();
        download();
    };
    return {
        run: run
    }
}());
module.exports = Listener;