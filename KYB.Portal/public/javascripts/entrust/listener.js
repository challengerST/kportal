/**
 * Created by Jeremy on 2016/11/22.
 */
"use strict";
var url = require('../frame/function').url;
var Modal = require('../frame/modal');
var Listener = (function () {
    var Data = require('./data').Data
        , Dom = require('./dom').Dom;
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
            var vol = $('#size').val()
                , wei = $('#weight').val()
                , id = url.get('id') || ''
                , sum = $('#sum').val();
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
                        var af = json.resBody.airwayFee
                            , sf = json.resBody.serviceFee
                            , str = '';
                        dlData['zj'] = json.resBody.totalFee;
                        dlData['dj'] = af.chargingUnitPrice;
                        $('.dEstFreightFee').html(af.chargingTotal);
                        $('.dChargingPrice').html(af.chargingUnitPrice);
                        $('.dChargingWeight').html(af.chargingWeight);
                        $('.dEstTotalFee').html(json.resBody.totalFee);
                        for (var s in sf) {
                            if (sf.hasOwnProperty(s)) {
                                var d = sf[s];
                                str += '<p class="detail-price"> ' +
                                    '<span class="dp-b fl-l title">' + d.itemName + '</span> ' +
                                    '<span class="dp-b fl-l content">CNY &nbsp; <span class="ArrivalFee">' + d.itemTotal + '</span> ' +
                                    '</span> </p>';
                            }
                        }
                        $('.p-body').html(str);
                    }
                });
            }
        });
        $(document).on('blur', '#size,#weight,#sum', function () {
            var vol = $('#size').val()
                , wei = $('#weight').val()
                , id = url.get('id') || ''
                , sum = $('#sum').val();
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
                        var af = json.resBody.airwayFee
                            , sf = json.resBody.serviceFee
                            , str = '';
                        dlData['zj'] = json.resBody.totalFee;
                        dlData['dj'] = af.chargingUnitPrice;
                        $('.dEstFreightFee').html(af.chargingTotal);
                        $('.dChargingPrice').html(af.chargingUnitPrice);
                        $('.dChargingWeight').html(af.chargingWeight);
                        $('.dEstTotalFee').html(json.resBody.totalFee);
                        for (var s in sf) {
                            if (sf.hasOwnProperty(s)) {
                                var d = sf[s];
                                str += '<p class="detail-price"> ' +
                                    '<span class="dp-b fl-l title">' + d.itemName + '</span> ' +
                                    '<span class="dp-b fl-l content">CNY &nbsp; <span class="ArrivalFee">' + d.itemTotal + '</span> ' +
                                    '</span> </p>';
                            }
                        }
                        $('.p-body').html(str);
                    }
                });
            }
        });
        $(document).on('click', '#submit', function () {
            var code = $('#company').val()
                , start = $('#start').val()
                , end = $('#end').val()
                , dt = $('#f-time').val() + ' 00:00:00'
                , size = $('#size').val()
                , weight = $('#weight').val()
                , num = $('#sum').val();
            if (code && start && end && dt && size && weight && num) {
                $('input').removeClass('warm');
                var data = {
                    "memberId": 0,
                    "agentCompanyId": 10000,
                    "airwayId": url.get('id'),
                    "deptCode": start,
                    "destCode": end,
                    "flightDate": dt,
                    "arrivalDate": "",
                    "airCompanyCode": code,
                    "cargoName": $('#name').val(),
                    "cargoType": 1,
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
                    $('#company').addClass('warm');
                } else {
                    $('#company').removeClass('warm');
                }
                if (!start) {
                    $('#start').addClass('warm');
                } else {
                    $('#start').removeClass('warm');
                }
                if (!end) {
                    $('#end').addClass('warm');
                } else {
                    $('#end').removeClass('warm');
                }
                if (!dt) {
                    $('#f-time').addClass('warm');
                } else {
                    $('#f-time').removeClass('warm');
                }
                if (!size) {
                    $('#size').addClass('warm');
                } else {
                    $('#size').removeClass('warm');
                }
                if (!weight) {
                    $('#weight').addClass('warm');
                } else {
                    $('#weight').removeClass('warm');
                }
                if (!num) {
                    $('#sum').addClass('warm');
                } else {
                    $('#sum').removeClass('warm');
                }
            }
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
            $('#size').val(parseFloat($('#long').val() || 0) * parseFloat($('#width').val() || 0) * parseFloat($('#height').val() || 0) * parseFloat($('#sum-num').val() || 0));
            $('.add-part').addClass('dp-n');
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
    var init = function () {
        Data.fhDetail({id: url.get('id')}, function (json) {
            if (json && 'resCode' in json && json.resCode == 0 && json.resBody) {
                var d = json.resBody;
                dlData['qyg'] = d.deptPortCode;
                $('#start').val(d.deptPortCode);
                dlData['mdg'] = d.destPortCode;
                $('#end').val(d.destPortCode);
                dlData['hkgs'] = d.airCompanyCode;
                $('#company').val(d.airCompanyCode);
                //分泡比例
                var fp=d.bulkyRate;
                console.log(fp);
                var newFp=(fp*10)+'/'+(10-(fp*10));
                $('#fpbl').val(newFp);
                var str = '';
                for (var i in d.transPort) {
                    if (d.transPort.hasOwnProperty(i)) {
                        var data = d.transPort[i];
                        str += data.portCode + (i == d.transPort.length - 1 ? '' : ' -> ');
                    }
                }
                dlData['hc'] = str;
                $('#hxlj').val(str);
                //时间初始化
                var dt = d.flightDay, arr = [];
                for (var x = 0; x < 7; x++) {
                    if (dt.indexOf(x == 0 ? 7 : x) < 0) {
                        arr.push(x);
                    }
                }
                $('#f-time').datetimepicker({
                    format: 'yyyy-mm-dd',//日期的格式
                    startDate: new Date(),//选择器的开始日期
                    endDate: new Date(d.validEnd),
                    autoclose: true,//日期选择完成后是否关闭选择框
                    bootcssVer: 3,//显示向左向右的箭头
                    language: 'zh-CN',//语言
                    minView: "month",//表示日期选择的最小范围，默认是hour
                    daysOfWeekDisabled: arr
                }).on('changeDate', function (e) {
                    dlData['qfrq'] = new Date(e.date).Format('yyyy-MM-dd');
                });
            }
        });
    };
    var run = function () {
        listener();
        calculate();
        download();
        init();
    };
    return {
        run: run
    }
}());
module.exports = Listener;