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
    var modalPage = {
        offset: 0
        , limit: 5
    };
    //选择的客户
    var memberId;
    var cancelId, jdId, ydId;
    //缓存待处理列表数据
    var pendingList = {};
    //临时存放数据
    var stopgap = {};
    //存放默认费用模板
    var defaultPrice = {};
    //存放运单列表
    var ydList = {};
    var listener = function () {
        $(document).on('click', '#save-ydh', function () {
           // $('#jd-jcbh').prop('readonly', $(this).prop('checked'));
            $('#set-jcbh').toggle();
            if ($(this).prop('checked')) {
                $('#jd-jcbh').val('');
            }
        });
        $(document).on('click', '#set-jcbh', function () {
            $('.set-part').addClass('dp-b');
            $('.yd-part').addClass('dp-n');
        });

        $(document).on('click', '#set-ensure', function () {
            var arr = $('#multi-set').val().split('\n');
            $('#jd-jcbh').val(arr.join(','));
            $('.set-part').addClass('dp-n');
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
        $('#add-date').datetimepicker({
            format: 'yyyy-mm-dd',//日期的格式
            startDate: new Date(),//选择器的开始日期
            autoclose: true,//日期选择完成后是否关闭选择框
            bootcssVer: 3,//显示向左向右的箭头
            language: 'zh-CN',//语言
            minView: "month"//表示日期选择的最小范围，默认是hour
        });
        $(document).on('click', '.glyphicon-calendar', function () {
            $('#add-date').focus();
        });
        $(document).on('click', '.outer-page .pages', function () {
            url.set('offset', $(this).data('offset'));
            init();
        });
        $(document).on('click', '#search', function () {
            url.set('offset', 0);
            init();
        });
        //$(document).on('click', '.close-btn', function () {
        //    $('.alert-part').addClass('dp-n');
        //    $('.white-back').addClass('dp-n');
        //});
        $(document).on('click', '.accept', function () {
            $('.white-back').removeClass('dp-n');
            $('.accept-part').removeClass('dp-n');
        });
        $(document).on('click', '.refuse', function () {
            cancelId = $(this).data('id');
            $('.white-back').removeClass('dp-n');
            $('.refuse-part').removeClass('dp-n');
        });
        $(document).on('click', '#add', function () {
            modalPage['offset'] = 0;
            $('.white-back').removeClass('dp-n');
            $('.add-part').removeClass('dp-n');
        });
        $(document).on('click', '.add-data', function () {
            var ele = $(this).parent();
            $('.jcbh').html(ele.data('jcbh'));
            $('.khmc').html(ele.data('khmc'));
            $('.lxr').html(ele.data('lxr'));
            $('.add-data-part').find('.tbd').html(' <div class="ttr fill data"> ' +
                '<div class="big"><input type="text" class="a-date" id="first-date"></div> ' +
                '<div><input type="text" class="a-num kup-num" value="0"> </div> <div><input type="text" class="a-long  kup-fnum" value="0"> ' +
                '</div> <div><input type="text" class="a-width  kup-fnum" value="0"> </div> <div><input type="text" class="a-height  kup-fnum" value="0"> ' +
                '</div> <div class="a-size">0</div> <div><input type="text" class="a-wei kup-fnum" value="0"> ' +
                '</div> <div> <select class="a-package"> <option value="1">纸箱</option> <option value="2">木箱</option> <option value="3">卷</option> <option value="4">托盘</option> </select> </div> ' +
                '<div><input type="text" class="a-ps kup-num" value="0"> </div> <div><input type="text" class="a-sc kup-num" value="0"> ' +
                '</div> <div><input type="text" class="a-bx kup-num" value="0"> </div> <div><input type="text" class="a-qt kup-num" value="0"> </div>' +
                ' <div><input type="text" class="a-bz"> </div> <div></div> </div> ');

            $('.add-data-part').find('.tft').html(' <div class="big">总计</div> <div class="t-js">0</div> <div class="t-c"></div> <div class="t-k"></div> <div class="t-g"></div> <div class="t-s">0</div> <div class="t-w">0</div> <div></div> <div class="t-ps">0</div> <div class="t-sc">0</div> <div class="t-bx">0</div> <div class="t-qt">0</div> <div></div> <div></div>');
            $('#add-data').data('id', $(this).data('id'));
            $('#first-date').datetimepicker({
                format: 'yyyy-mm-dd hh:ii:ss',//日期的格式
                endDate: new Date(),//选择器的开始日期
                autoclose: true,//日期选择完成后是否关闭选择框
                bootcssVer: 3,//显示向左向右的箭头
                language: 'zh-CN',//语言
                minView: "month"//表示日期选择的最小范围，默认是hour
            }).on('changeDate', function (e) {
                $('.copy-date').html(new Date(e.date).Format('yyyy-MM-dd hh:mm:ss'));
            });
            $('.white-back').removeClass('dp-n');
            $('.add-data-part').removeClass('dp-n');
        });
        $(document).on('click', '.add-data-part .glyphicon-plus', function () {
            if ($('.add-data-part').find('.ttr.data').length >= 6) {
                $('.add-data-part').find('.tbd').css('padding-right', '3px');
            }
            $('.add-data-part').find('.tbd').append(' <div class="ttr fill data"> ' +
                '<div class="big copy-date">' + $('#first-date').val() + '</div>' +
                '<div><input type="text" class="a-num kup-num" value="0"> </div> <div><input type="text" class="a-long  kup-fnum" value="0"> ' +
                '</div> <div><input type="text" class="a-width  kup-fnum" value="0"> </div> <div><input type="text" class="a-height  kup-fnum" value="0"> ' +
                '</div> <div class="a-size">0</div> <div><input type="text" class="a-wei kup-fnum" value="0"> ' +
                '</div> <div> <select class="a-package"> <option value="1">纸箱</option> <option value="2">木箱</option> <option value="3">卷</option> <option value="4">托盘</option> </select> </div> ' +
                '<div><input type="text" class="a-ps kup-num" value="0"> </div> <div><input type="text" class="a-sc kup-num" value="0"> ' +
                '</div> <div><input type="text" class="a-bx kup-num" value="0"> </div> <div><input type="text" class="a-qt kup-num" value="0"> </div>' +
                ' <div><input type="text" class="a-bz"> </div> <div><span class="glyphicon glyphicon-remove"></span></div></div> ');
        });
        $(document).on('click', '.add-data-part .glyphicon-remove', function () {
            $(this).parents('.ttr').remove();
            getTotal();
        });
        $(document).on('keyup', '.add-data-part .kup-num', function () {
            $(this).val($(this).val().replace(/[^\-?\d]/g, ''));
        });
        $(document).on('blur', '.add-data-part .kup-num', function () {
            if (!$(this).val()) {
                $(this).val(0);
            } else {
                $(this).val(parseInt($(this).val()));
            }
            var ele = $(this).parents('.ttr.data');
            var c = parseFloat(ele.find('.a-long').val())
                , k = parseFloat(ele.find('.a-width').val())
                , g = parseFloat(ele.find('.a-height').val())
                , js = parseFloat(ele.find('.a-num').val());
            ele.find('.a-size').html(myformat.formatvolume(c * k * g * js));
            getTotal();
            getTotal();
        });
        $(document).on('keyup', '.add-data-part .kup-fnum', function () {
            $(this).val($(this).val().replace(/[^\-?\d.]/g, ''));
        });
        $(document).on('blur', '.add-data-part .kup-fnum', function () {
            $(this).val($(this).val().replace(/[^\-?\d.]/g, ''));
            if (!$(this).val()) {
                $(this).val(0);
            } else {
                $(this).val(parseFloat($(this).val()));
            }
            var ele = $(this).parents('.ttr.data');
            var c = parseFloat(ele.find('.a-long').val())
                , k = parseFloat(ele.find('.a-width').val())
                , g = parseFloat(ele.find('.a-height').val())
                , js = parseFloat(ele.find('.a-num').val());
            ele.find('.a-size').html(myformat.formatvolume(c * k * g * js));
            getTotal();
        });
        $(document).on('click', '.ensure-data', function () {
            var ele = $(this).parent();
            $('.jcbh').html(ele.data('jcbh'));
            $('.khmc').html(ele.data('khmc'));
            $('.lxr').html(ele.data('lxr'));
            $('#ensure-data').data('id', $(this).data('id'));
            Data.storage({id: $(this).data('id')}, function (json) {
                if (json && 'resCode' in json && json.resCode == 0) {
                    Dom.renderTr(json.resBody || {});
                    $('.white-back').removeClass('dp-n');
                    $('.ensure-data-part').removeClass('dp-n');
                } else {
                    Modal.setAlert(json.resMsg || '添加失败，请重试！');
                }
            });
        });
        $(document).on('click', '.show-bg', function () {
            var id = $(this).data('id');
            $('#bg-ensure').data('id', id);
            var d = pendingList[id];
            $('.ddh').html(id);
            $('.qsg').html(d.order.deptCode || '/');
            $('.mdg').html(d.order.destCode || '/');
            $('.hkgs').html(d.order.airCompanyCode || '/');
            $('.qfrq').html(d.order.flightDate ? new Date(d.order.flightDate).Format('yyyy-MM-dd') : '/');
            var jczt, dczt;
            switch (d.order.entryState) {
                case 0:
                    jczt = '待进仓';
                    break;
                case 1:
                    jczt = '已进仓（未确认）';
                    break;
                case 2:
                    jczt = '已确认';
                    break;
                default:
                    jczt = '待进仓';
                    break;
            }
            switch (d.order.bookingState) {
                case 0:
                    dczt = '未订舱';
                    break;
                case 1:
                    dczt = '已订舱';
                    break;
                case -1:
                    dczt = '订舱失败';
                    break;
                case 2:
                    dczt = '已改配';
                    break;
                default:
                    dczt = '未订舱';
                    break;
            }
            $('.jczt').html(jczt);
            $('.dczt').html(dczt);
            $('.white-back').removeClass('dp-n');
            $('.bg-part').removeClass('dp-n');
        });
        $(document).on('blur', '#info-name', function () {
            var val = $(this).val();
            if (val == '' || new RegExp("^[ ]+$").test(val)) {
                $(this).val('consol');
            }
        });
        $(document).on('click', '.show-zd', function () {
            stopgap = pendingList[$(this).data('id')] || null;
            if (stopgap) {
                var ele = $('.zd-part')
                    , c = stopgap.company
                    , o = stopgap.order;
                var type = '', str = '';
                switch (o.cargo.cargoType) {
                    case 1:
                        type = '普货';
                        break;
                    case 2:
                        type = '木箱';
                        break;
                    case 3:
                        type = '卷';
                        break;
                    case 4:
                        type = '托盘';
                        break;
                }
                $('.ddh').html(o.orderNum || '/');
                $('.kh').html(c.companyName || '/');
                $('.qsg').html(o.deptCode || '/');
                $('.mdg').html(o.destCode || '/');
                $('.hkgs').html(o.airCompanyCode || '/');
                $('.qfrq').html(o.flightDate ? new Date(o.flightDate).Format('yyyy-MM-dd') : '/');
                $('.hbh').html(o.airlineInfo || '/');
                $('.pm').html(o.cargo.cargoName || '/');
                $('.pm').attr("title",o.cargo.cargoName);
                $('.lx').html(type || '/');
                $('.wtbg').html(o.cargo.isBulkyCargo ? '是' : '否');
                $('.js').html(o.cargo.cargoCount + 'PCS');
                $('.tj').html(myformat.formatvolume(o.cargo.cargoSize) + 'CBM');
                $('.zl').html(o.cargo.cargoWeight + 'KGS（计费重量：' + o.cargo.chargingWeight + 'KGS）');
                str += '<tr class="data"> <td><input type="text" class="fymt" readonly value="空运费"/>' +
                    '</td> <td><input type="text" class="ip-dj" value="' + o.chargingPrice + '"/>' +
                    '</td> <td><input type="text" class="ip-zl" value="' + o.chargingWeight + '"/>' +
                    '</td> <td><input type="text" class="ttp" readonly value="' + o.declareAirwayFee + '"/>' +
                    '</td> <td><span class="glyphicon glyphicon-remove"></span></td></tr>';
                for (var s in o.serviceFeeList) {
                    if (o.serviceFeeList.hasOwnProperty(s)) {
                        var d = o.serviceFeeList[s];
                        str += '<tr class="data"> <td><input type="text" class="fymt" readonly value="' + d.itemName + '"/>' +
                            '</td> <td><input type="text" class="ip-dj" value="' + d.itemPrice + '"/>' +
                            '</td> <td><input type="text" class="ip-zl" value="' + d.itemUnit + '"/>' +
                            '</td> <td><input type="text" class="ttp" readonly value="' + d.itemTotal + '"/>' +
                            '</td> <td><span class="glyphicon glyphicon-remove"></span></td></tr>';
                    }
                }
                str += '<tr class="tr-add"> <td></td> <td></td> <td></td> <td></td> <td><span class="glyphicon glyphicon-plus"></span></td> </tr>';
                ele.find('.zd-tb').find('tbody').html(str);
                ele.removeClass('dp-n');
                $('.white-back').removeClass('dp-n');
            }
        });
        //确认订单
        $(document).on('click', '.show-jd', function () {

            modalPage['offset'] = 0;
            var id = $(this).data('id');
            var d = pendingList[id];
            var ele = $('.jd-part');
            var str = '';
            if (d.order.airwayInfo) {
                for (var i in d.order.airwayInfo.transPort) {
                    if (d.order.airwayInfo.transPort.hasOwnProperty(i)) {
                        var dt = d.order.airwayInfo.transPort[i];
                        str += dt.portCode + (i == d.order.airwayInfo.transPort.length - 1 ? '' : ' -> ');
                    }
                }
            }
            jdId = id;
            ele.find('.ddh').html(d.order.orderNum);
            ele.find('.kh').html(d.company.companyName);
            ele.find('.ddqd').html(d.order.orderChannel == 1 ? '自助订舱' : '快速订舱');
            ele.find('.pm').html(d.order.cargo.cargoName);
            ele.find('.pm').attr("title",d.order.cargo.cargoName);

            ele.find('.lx').html(d.order.cargo.cargoType == 1 ? '普货' : '转关');
            ele.find('.wtbg').html(d.order.customDeclare ? '是' : '否');
            ele.find('.js').html(d.order.cargo.cargoCount + 'PCS');
            ele.find('.tj').html(myformat.formatvolume(d.order.cargo.cargoSize) + 'CBM');
            ele.find('.zl').html(d.order.cargo.cargoWeight + 'KGS （计费重量：' + d.order.cargo.chargingWeight + 'KGS）');
            ele.find('.qsg').html(d.order.deptCode);
            ele.find('.mdg').html(d.order.destCode);
            ele.find('.hkgs').html(d.order.airCompanyCode);
            ele.find('.hxlg').html(d.order.airwayInfo ? str : '/');
            ele.find('.qfrq').html(new Date(d.order.flightDate).Format('yyyy-MM-dd'));
            ele.find('#jd-price').val(d.order.chargingPrice);
            ele.find('#fixed-jcbh').prop('checked', true);
            ele.find('#jd-jcbh').prop('readonly', true);
            ele.find('#zdck').val(d.order.warehouseId);
            if (!d.order.airwayInfo) {
                jdInit(ele);
                $('.result-part').show();
                $('#jd-ensure').data('tp', 0);
                $('#jd-ensure').data('aid', 0);
            } else {
                $('.result-part').hide();
                $('#jd-ensure').data('tp', 1);
                $('#jd-ensure').data('aid', d.order.airwayInfo.airwayId);
            }
            console.log(ele.html());
            ele.removeClass('dp-n');
            $('.white-back').removeClass('dp-n');

            //如果之前有设置进仓编号，保持复选框不选中
            if($("#jd-jcbh").val() !=""){
                $("#fixed-jcbh").attr("checked",false);
                $('#set-jcbh').show();
            }
        });
        $(document).on('click', '.jd-part .pages', function () {
            modalPage.offset = $(this).data('offset');
            jdInit($('.jd-part'));
        });
        $(document).on('change', '#save-ydh', function () {
            var c = $(this).prop('checked');
            $('#yd-ydh').prop('readonly', c);
            if (c) {
                $('#yd-ydh').val('');
            }
        });
        //关联运单
        $(document).on('click', '.show-yd', function () {

            var id = $(this).data('id');
            ydId = id;
            var dd = pendingList[id];
            var c = dd.company || {}
                , o = dd.order || {};
            var ele = $('.yd-part');
            ele.find('#save-ydh').prop('checked', true);
            ele.find('#yd-ydh').val('').prop('readonly', true);
            ele.find('.ddh').html(o.orderNum);
            ele.find('.qsg').html(o.deptCode);
            ele.find('.mdg').html(o.destCode);
            ele.find('.hkgs').html(o.airCompanyCode);
            ele.find('.qfrq').html(new Date(o.flightDate).Format('yyyy-MM-dd'));
            ele.find('.js').html(o.cargo.cargoCount + 'PCS');
            ele.find('.tj').html(myformat.formatvolume(o.cargo.cargoSize) + 'CBM');
            ele.find('.zl').html(o.cargo.cargoWeight + 'KGS （计费重量：' + dd.order.cargo.chargingWeight + 'KGS）');
            ele.find('.jczt').html(o.entryState == 0 ? '待进仓' : (o.entryState == 1 ? '已进仓，未确认' : '已确认'));
            ele.find('#yd-c').val(o.cargo.cargoCount);
            ele.find('#yd-s').val(o.cargo.cargoSize);
            ele.find('#yd-w').val(o.cargo.cargoWeight);
            var data = {
                "agentCompanyId": 10000,
                "airwayId": o.airwayInfo.airwayId,
                "flightDate": new Date(o.flightDate)
            };
            Data.ydSearch(data, function (json) {
                var str = '';
                ydList = {};
                if (json && 'resBody' in json && json.resBody instanceof Array && json.resBody.length > 0 && false) {//本次判断取消，故而最后加了false
                    for (var b in json.resBody) {
                        if (json.resBody.hasOwnProperty(b)) {
                            var dt = json.resBody[b];
                            ydList[dt.billInfo.billId] = dt;
                        }
                    }
                    for (var y in ydList) {
                        if (ydList.hasOwnProperty(y)) {
                            str += '<p class="yd-rd"> <input type="radio" name="s-yd" data-id="' + y + '">' + y + '</p>';
                        }
                    }
                    ele.find('.left').html(str);
                    ele.find('.result-part').removeClass('dp-n');
                    ele.find('.add-yd').addClass('dp-n');
                    $('#gl-ensure').data('tp', 1);
                } else {
                    ele.find('.result-part').addClass('dp-n');
                    ele.find('.add-yd').removeClass('dp-n');
                    $('#gl-ensure').data('tp', 2);
                }
                ele.removeClass('dp-n');
                $('.white-back').removeClass('dp-n');
                console.log('关联运单');

            });
        });
        $(document).on('click', '#set-jcbh', function () {
            $('.set-part').removeClass('dp-n');

        });
        $(document).on('click', '.close-btn', function () {
            if($(this).hasClass('setJc')){
                $('.set-part').addClass('dp-n');
                //$('.jd-part').addClass('dp-b');
            }else{
                $('.alert-part').addClass('dp-n');
                $('.white-back').addClass('dp-n');

            }
        });
        $(document).on('click', '#set-ensure', function () {
            var arr = $('#multi-set').val().split('\n');
            $('#ip-jcbh').val(arr.join(','));
            if($(this).hasClass('setJc')){
                $('.set-part').addClass('dp-n');
                $('.jd-part').addClass('dp-b');
            }else{
                $('.white-back').addClass('dp-n');
                $('.alert-back').addClass('dp-n');
            }
        });
        $(document).on('click', '#fixed-jcbh', function () {
            $('#set-jcbh').toggle();
            if ($(this).prop('checked')) {
                $('#ip-jcbh').val('');
            }
        });
        $(document).on('click', 'input[name="s-yd"]', function () {
            var arr = ydList[$(this).data('id')].orderList;
            var str = '';
            for (var a in arr) {
                if (arr.hasOwnProperty(a)) {
                    var d = arr[a];
                    str += '<tr><td>' + d.orderId + '</td>' +
                        '<td>' + d.cargo.cargoCount + 'PCS</td>' +
                        '<td>' + d.cargo.cargoSize + 'CBM</td>' +
                        '<td>' + d.cargo.cargoWeight + 'KGS</td>' +
                        '<td>' + (d.entryState == 0 ? '待进仓' : (d.entryState == 1 ? '已进仓，未确认' : '已结束')) + '</td></tr>';
                }
            }
            $('.yd-tb').find('tbody').html(str);
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
    };
    var airports = function () {
        //获取机场名称
        $(document).on('keyup', 'input.name', function (e) {
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
        $(document).on('blur', 'input.name', function () {
            var ul = $(this).siblings('.get-name');
            var data = ul.children('.active').data('val') || ul.find('li:first-child').data('val') || '';
            $(this).val(data);
            $(this).data('val', data);
            ul.hide();
        });
        //li元素悬浮获得焦点
        $(document).on('mouseenter ', '.get-name li', function () {
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
        });
    };
    var company = function () {
//获取机场名称
        $(document).on('keyup', 'input.get-company', function (e) {
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
        $(document).on('blur', 'input.get-company', function () {
            var ul = $(this).siblings('.get-name');
            var data = ul.children('.active').data('val') || ul.find('li:first-child').data('val') || '';
            $(this).val(data);
            $(this).data('val', data);
            ul.hide();
        });
    };
    var customer = function () {
        //获取客户名称
        $(document).on('keyup', '#info-member', function (e) {
            var _this = $(this)
                , ul = _this.siblings('.get-name');
            var index = ul.find('.active').index() || 0
                , len = ul.children().length;
            if (e.keyCode == 13) {//回车键
                var mID = ul.children('.active').data('val') || ul.find('li:first-child').data('val') || '';
                var data = ul.children('.active').html() || ul.find('li:first-child').html() || '';
                memberId = mID;
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
                Data.customer({"agentCompanyId": 10000, "keyword": $(this).val()}, function (json) {
                    if (json && 'resBody' in json && json.resBody instanceof Array && json.resBody.length > 0) {
                        var str = ''
                            , body = json.resBody;
                        for (var b in body) {
                            if (body.hasOwnProperty(b)) {
                                var d = body[b];
                                str += '<li data-val="' + d.companyId + '" class="' + (b == 0 ? 'active' : '') + '">' + d.companyName + '</li>';
                            }
                        }
                        ul.html(str);
                        ul.show();
                    }
                });
            }
        });
        //input失去焦点
        $(document).on('blur', '#info-member', function () {
            var ul = $(this).siblings('.get-name');
            var mID = ul.children('.active').data('val') || ul.find('li:first-child').data('val') || '';
            var data = ul.children('.active').html() || ul.find('li:first-child').html() || '';
            memberId = mID;
            $(this).val(data);
            $(this).data('val', data);
            ul.hide();
        });
    };
    var init = function () {
        var data = {
            offset: url.get('offset') || 0,
            limit: url.get('limit') || 10,
            "deptCode": $('#start').val(),
            "destCode": $('#end').val(),
            "number": $('#order-num').val()
        };
        Data.list(data, function (json) {
            Dom.list(json, data);
            var dt = {};
            if (json && 'resCode' in json && json.resCode == 0 && json.resBody && json.resBody.sList.length > 0) {
                var list = json.resBody.sList;
                for (var l in list) {
                    if (list.hasOwnProperty(l)) {
                        var d = list[l];
                        dt[d.order.orderId] = d;
                    }
                }
            }
            pendingList = dt;
        });
    };
    var submit = function () {
        $(document).on('click', '#add-data', function () {
            var _this = $(this), arr = [];
            if ($('#first-date').val()) {
                $('.add-data-part').find('.ttr.data').each(function () {
                    var d = {
                        "storageTime": $('#first-date').val(),
                        "packageType": $(this).find('.a-package').find('option:selected').val(),
                        "packageMark": 'string',
                        "storageCount": $(this).find('.a-num').val(),
                        "storageWeight": $(this).find('.a-wei').val(),
                        "storageSize": $(this).find('.a-size').html(),
                        "damageCount": $(this).find('.a-ps').val(),
                        "dampCount": $(this).find('.a-sc').val(),
                        "transformCount": $(this).find('.a-bx').val(),
                        "otherCount": $(this).find('.a-qt').val(),
                        "storageRemark": $(this).find('.a-bz').val(),
                        "storageLength": $(this).find('.a-long').val(),
                        "storageWidth": $(this).find('.a-width').val(),
                        "storageHeight": $(this).find('.a-height').val()
                    };
                    arr.push(d);
                });
                var data = {
                    orderId: _this.data('id')
                    , entryList: arr
                };
                Data.addData(data, function (json) {
                    if (json && 'resCode' in json && json.resCode == 0) {
                        Modal.setAlert(json.resMsg || '添加成功！', null, function () {
                            location.reload();
                        });
                    } else {
                        Modal.setAlert(json.resMsg || '添加失败，请重试！');
                    }
                });
            } else {
                Modal.setAlert('请录入进仓时间！');
            }
        });
        $(document).on('click', '#ensure-data', function () {
            var data = {
                orderId: $(this).data('id')
            };
            Data.ensureData(data, function (json) {
                if (json && 'resCode' in json && json.resCode == 0) {
                    Modal.setAlert(json.resMsg || '确认成功！', null, function () {
                        location.reload();
                    });
                } else {
                    Modal.setAlert(json.resMsg || '确认失败！');
                }
            });
        });
        $(document).on('click', '#bg-ensure', function () {
            var data = {
                orderId: $(this).data('id')
                , state: $('#c-jczt').find('option:selected').val()
            };
            Data.bgUpdate(data, function (json) {
                if (json && 'resCode' in json && json.resCode == 0) {
                    Modal.setAlert(json.resMsg || '确认成功！', null, function () {
                        location.reload();
                    });
                } else {
                    Modal.setAlert(json.resMsg || '确认失败！');
                }
            });
        });
        $(document).on('click', '#add-ensure', function () {
            var pass = true;
            var id = $('.add-part').find('input[name="i-sg"]:checked').data('id') || null;
            if (!id) {
                pass = false;
            }
            $('.a-require').each(function () {
                if (!$(this).val()) {
                    $(this).addClass('warm');
                    pass = false;
                } else {
                    $(this).removeClass('warm');
                }
            });
            if (pass) {
                var data = {
                    "companyId": memberId,
                    "agentCompanyId": 10000,
                    "fixedPrice": $('#gddj').prop('checked'),
                    "orderPrice": $('#send-price').val(),
                    "airwayId": id,
                    "flightDate": $('#add-date').val() + ' 00:00:00',
                    "warehouseId": $('#warehouse').find('option:selected').val(),
                    "cargoName": $('#info-name').val(),
                    "cargoType": $('#info-type').find('option:selected').val(),
                    "cargoCount": $('#info-num').val(),
                    "cargoWeight": $('#info-wei').val(),
                    "cargoSize": $('#info-size').val(),
                    "bulkyRate": $('#fpbl').find('option:selected').val(),
                    "customDeclare": $('#info-custom').find('option:selected').val() == 1
                };
                Data.order(data, function (json) {
                    if (json && 'resCode' in json && json.resCode == 0) {
                        Modal.setAlert(json.resMsg || '添加成功！', null, function () {
                            location.reload();
                        });
                    } else {
                        Modal.setAlert(json.resMsg || '添加失败，请重试！');
                    }
                });
            }
        });
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
                "orderId": cancelId
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
        $(document).on('click', '#zd-ensure', function () {
            var arr = [], total = 0;
            $('.zd-tb').find('tr.data').each(function () {
                var data = {
                    "itemName": $(this).find('.fymt').val(),
                    "itemPrice": parseFloat($(this).find('.ip-dj').val()),
                    "itemUnit": 1,
                    "itemCount": parseFloat($(this).find('.ip-zl').val()),
                    "itemTotal": parseFloat($(this).find('.ttp').val())
                };
                arr.push(data);
                total += parseFloat($(this).find('.ttp').val());
            });
            if (arr.length > 0) {
                var data = {
                    "orderId": stopgap.order.orderId,
                    "serviceFeeList": arr,
                    "orderChargingTotal": total,
                    "chargeState": 0
                };
                Data.createCharge(data, function (json) {
                    if (json && 'resCode' in json && json.resCode == 0) {
                        Modal.setAlert(json.resMsg || '制单成功！', null, function () {
                            location.reload();
                        });
                    } else {
                        Modal.setAlert(json.resMsg || '制单失败，请重试！');
                    }
                });
            }
        });
        $(document).on('click', '#jd-ensure', function () {
            var tp = $(this).data('tp');
            var aid = $(this).data('aid') != 0 ? $(this).data('aid') : ($('.jd-part').find('input[name="i-sg"]:checked').data('id') || null);
            if (aid) {
                var data = {
                    "orderId": jdId,
                    "airwayId": aid,
                    "fixedPrice": $('#fixed-price').prop('checked'),
                    "orderPrice": $('#jd-price').val(),
                    "warehouseId": $('#zdck').find('option:selected').val(),
                    "autoEntryNum": $('#fixed-jcbh').prop('checked'),
                    "entryNum": $('#jd-jcbh').val()
                };
                Data.confirm(data, function (json) {
                    if (json && 'resCode' in json && json.resCode == 0) {
                        Modal.setAlert(json.resMsg || '接单成功！', null, function () {
                            location.reload();
                        });
                    } else {
                        Modal.setAlert(json.resMsg || '接单失败,请重试！');
                    }
                });
            } else {
                Modal.setAlert('请选择一条航线！');
            }
        });
        $(document).on('click', '#gl-ensure', function () {
            if ($(this).data('tp') == 2) {
                var newPass = true;
                $('.yd-ip').each(function () {
                    if (!$(this).val()) {
                        $(this).addClass('warm');
                        newPass = false;
                    } else {
                        $(this).removeClass('warm');
                    }
                });
                if (!$('#save-ydh').prop('checked')) {
                    if (!/^\d{11}$/.test($('#yd-ydh').val())) {
                        Modal.setAlert('运单号必须为11位数字！');
                        return false;
                    }
                }
                if (newPass) {
                    var data = {
                        "bookingCount": $('#yd-c').val(),
                        "autoAssign": $('#save-ydh').prop('checked'),
                        "billNum": $('#yd-ydh').val(),
                        "bookingSize": $('#yd-s').val(),
                        "bookingWeight": $('#yd-w').val(),
                        "orderId": ydId,
                        "billId": 0
                    };
                    Data.ydNew(data, function (json) {
                        if (json && 'resCode' in json && json.resCode == 0) {
                            Modal.setAlert(json.resMsg || '关联成功！', null, function () {
                                location.reload();
                            });
                        } else {
                            Modal.setAlert(json.resMsg || '关联失败,请重试！');
                        }
                    });
                }
            } else {
                if ($('.yd-body').find('input[name="s-yd"]:checked').length > 0) {
                    var dt = {
                        "orderId": ydId,
                        "billId": $('.yd-body').find('input[name="s-yd"]:checked').data('id')
                    };
                    Data.ydExist(dt, function (json) {
                        if (json && 'resCode' in json && json.resCode == 0) {
                            Modal.setAlert(json.resMsg || '关联成功！', null, function () {
                                location.reload();
                            });
                        } else {
                            Modal.setAlert(json.resMsg || '关联失败,请重试！');
                        }
                    });
                } else {
                    Modal.setAlert('请选择一条航线关联！');
                }
            }
        });
    };
    var warehouseInit = function () {
        Data.warehouse(function (json) {
            var str = '';
            var body = json.resBody || {};
            var o = 'order' in body && body.order || {};
            if (json && 'resCode' in json && json.resCode == 0 && 'sList' in json.resBody && json.resBody.sList) {
                var arr = json.resBody.sList;
                for (var a in arr) {
                    if (arr.hasOwnProperty(a)) {
                        var d = arr[a];
                        str += '<option value="' + d.warehouseId + '">' + d.warehouseName + '</option>';
                    }
                }
                $('#warehouse').html(str);
                $('#zdck').html(str);

            }
        });
    };
    var priceInit = function () {
        Data.priceList(function (json) {
            if (json && 'resCode' in json && json.resCode == 0 && json.resBody && json.resBody.sList) {
                var arr = json.resBody.sList;
                for (var a in arr) {
                    if (arr.hasOwnProperty(a)) {
                        var d = arr[a];
                        if (d.expenseDefault) {
                            for (var e in d.expenseTemplate) {
                                if (d.expenseTemplate.hasOwnProperty(e)) {
                                    var dt = d.expenseTemplate[e];
                                    defaultPrice[dt.itemName] = dt;
                                }
                            }
                            break;
                        }
                    }
                }
            }
        });
    };
    var changeType = function () {
        $(document).on('click', '#gddj', function () {
            $('#send-price').prop('readonly', !$(this).prop('checked'));
        });
    };
    var zdTable = function () {
        $(document).on('click', '.fymt.choose', function () {
            $('.se-part').addClass('dp-n');
            $(this).siblings('.se-part').removeClass('dp-n');
        });
        $(document).on('click', '.se-part li', function () {
            var dj = parseFloat($(this).data('dj'))
                , zl = parseFloat($(this).data('zl'))
                , ele = $(this).parents('tr.data');
            ele.find('.ip-dj').val(dj);
            ele.find('.ip-zl').val(zl);
            ele.find('.ttp').val(dj * zl);
            $(this).parents('ul').siblings('input').val($(this).html());
            $(this).parents('ul').addClass('dp-n');
            ele.find('.fymt').removeClass('choose');
            ele.find('.se-part').remove();
        });
        $(document).on('click', function (e) {
            var target = $(e.target);
            if (target.closest('.fymt.choose,.se-part li').length == 0) {
                $('.se-part').addClass('dp-n');
            }
        });
        $(document).on('keyup', '.ip-zl,.ip-dj', function () {
            $(this).val($(this).val().replace(/[^\d.]/g, ""))
        });
        $(document).on('blur', '.ip-zl,.ip-dj', function () {
            var v = $(this).val() || 0;
            $(this).val(parseFloat(v));
            var ele = $(this).parents('tr.data');
            var dj = parseFloat(ele.find('.ip-dj').val())
                , zl = parseFloat(ele.find('.ip-zl').val());
            ele.find('.ttp').val(dj * zl);
        });
        $(document).on('click', '.glyphicon-remove', function () {
            $(this).parents('tr.data').remove();
        });
        $(document).on('click', '.glyphicon-plus', function () {
            var exist = [], arr = [], str = '', ul = '';
            //获取已存在的项目
            $('.zd-tb').find('.fymt').each(function () {
                exist.push($(this).val());
            });
            //计算可添加的项目
            for (var d in defaultPrice) {
                if (defaultPrice.hasOwnProperty(d)) {
                    if (exist.indexOf(d) < 0) {
                        arr.push(defaultPrice[d]);
                    }
                }
            }
            if (arr.length > 0) {
                for (var a in arr) {
                    if (arr.hasOwnProperty(a)) {
                        var sg = arr[a];
                        ul += '<li data-dj="' + sg.itemPrice + '" data-zl="' + sg.itemUnit + '">' + sg.itemName + '</li>';
                    }
                }
                str += '<tr class="data"> <td><input type="text" class="fymt choose" readonly value="请选择费用名称"/> ' +
                    '<ul class="se-part dp-n">' + ul + '</ul> ' +
                    '</td> <td><input type="text" class="ip-dj" value="0"/>' +
                    '</td> <td><input type="text" class="ip-zl" value="0"/></td> ' +
                    '<td><input type="text" class="ttp" readonly value="0"/></td> <td><span class="glyphicon glyphicon-remove"></span></td> </tr>';
                $('.zd-tb').find('.tr-add').before(str);
            }
        });
    };
    var searchLine = function () {
        var innerInit = function () {
            var pass = true;
            $('.s-require').each(function () {
                if (!$(this).val()) {
                    $(this).addClass('warm');
                    pass = false;
                } else {
                    $(this).removeClass('warm');
                }
            });
            if (pass) {
                var data = {
                    "deptCode": $('#add-start').val(),
                    "destCode": $('#add-end').val(),
                    "flightDate": new Date($('#add-date').val()),
                    "airCompanyCode": $('#add-com').val(),
                    "transCount": 1,
                    "offset": modalPage.offset || 0,
                    "limit": modalPage.limit || 5
                };
                Data.search(data, function (json) {
                    Dom.innerList(json, data)
                });
            }
        };
        var cPrice = function () {
            var pass = true
                , id = $('input[name="i-sg"]:checked').data('id') || null;
            if (!id) {
                pass = false;
            }
            $('.p-require').each(function () {
                if (!$(this).val()) {
                    $(this).addClass('warm');
                    pass = false;
                } else {
                    $(this).removeClass('warm');
                }
            });
            if (pass) {
                var data = {
                    "cargoCount": $('#info-num').val(),
                    "cargoSize": $('#info-size').val(),
                    "cargoWeight": $('#info-wei').val(),
                    "airwayId": id,
                    "customDeclare": $('#info-custom').find('option:selected').val() == 1
                };
                Data.calculate(data, function (json) {
                    if (json && 'resCode' in json && json.resCode == 0 && json.resBody) {
                        var d = json.resBody;
                        var data = json.resBody.airwayFee;
                        $('.yg-price').html(d.totalFee);
                        $('.right-price').find('td').removeClass('active');
                        $('.c-' + data.chargingLevel).addClass('active');
                        $('#send-price').val(data.chargingUnitPrice);
                        $('.c-price').find('.c-45').html(data['policy']['policy']['45']);
                        $('.c-price').find('.c-100').html(data['policy']['policy']['100']);
                        $('.c-price').find('.c-300').html(data['policy']['policy']['300']);
                        $('.c-price').find('.c-500').html(data['policy']['policy']['500']);
                        $('.c-price').find('.c-1000').html(data['policy']['policy']['1000']);
                    }
                });
            }
        };
        $(document).on('click', '#inner-search', function () {
            innerInit();
        });
        $(document).on('click', '.add-part .pages', function () {
            modalPage.offset = $(this).data('offset');
            innerInit();
        });
        $(document).on('blur', '.p-require', function () {
            cPrice();
        });
        $(document).on('change', '#info-custom', function () {
            cPrice();
        });
        $(document).on('click', 'input[name="i-sg"]', function () {
            cPrice();
        });
    };
    var jdInit = function (ele) {
        var data = {
            "deptCode": ele.find('.qsg').html(),
            "destCode": ele.find('.mdg').html(),
            "flightDate": new Date(ele.find('.qfsj').html()),
            "airCompanyCode": ele.find('.hkgs').html(),
            "transCount": 1,
            "offset": modalPage.offset || 0,
            "limit": modalPage.limit || 5
        };
        Data.search(data, function (json) {
            Dom.innerList(json, data);
        });
    };
    var getTotal = function () {
        var js = 0, c = 0, k = 0, g = 0, tj = 0, zl = 0, ps = 0, sc = 0, bx = 0, qt = 0;
        var ele = $('.add-data-part');
        ele.find('.a-num').each(function () {
            js += parseInt($(this).val());
        });
        ele.find('.a-size').each(function () {
            tj += parseFloat($(this).html());
        });
        ele.find('.a-wei').each(function () {
            zl += parseFloat($(this).val());
        });
        ele.find('.a-ps').each(function () {
            ps += parseInt($(this).val());
        });
        ele.find('.a-sc').each(function () {
            sc += parseInt($(this).val());
        });
        ele.find('.a-bx').each(function () {
            bx += parseInt($(this).val());
        });
        ele.find('.a-qt').each(function () {
            qt += parseInt($(this).val());
        });
        ele.find('.t-js').html(js).end()
            .find('.t-s').html(tj).end()
            .find('.t-w').html(zl).end()
            .find('.t-ps').html(ps).end()
            .find('.t-sc').html(sc).end()
            .find('.t-bx').html(bx).end()
            .find('.t-qt').html(qt).end();
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
        airports();
        listener();
        init();
        company();
        submit();
        warehouseInit();
        changeType();
        zdTable();
        priceInit();
        searchLine();
        customer();
        opInit();
    };
    return {
        run: run
    }
}());
module.exports.Listener = Listener;