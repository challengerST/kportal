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
        $(document).on('blur', '#info-name', function () {
            var val = $(this).val();
            if (val == '' || new RegExp("^[ ]+$").test(val)) {
                $(this).val('consol');
            }
        });
        $(document).on('click', '#gddj', function () {
            $('#send-price').prop('readonly', !$(this).prop('checked'));
        });
        $(document).on('click', '#add-ensure', function () {
            var pass = true;
            var id = $(document).find('input[name="i-sg"]:checked').data('id') || null;
            if (!id) {
                pass = false;
                Modal.setAlert('请选择一条航线！');
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
                    "memberId": $('#info-yg').find('option:selected').val() || 0,  //指派的业务员
                    "agentCompanyId": 0,
                    "agentId": 0,
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
                    , "entryBatch": $('#pc').find('option:selected').val()
                    , "autoEntryNum": $('#zdjcbh').prop('checked')
                    , "entryNum": $('#ip-jcbh').val()
                };
                if (data.memberId) {
                    $('.loading-part').show();
                    Data.order(data, function (json) {
                        $('.loading-part').hide();
                        if (json && 'resCode' in json && json.resCode == 0) {
                            Modal.setAlert(json.resMsg || '添加成功！', null, function () {
                                window.close();
                            });
                        } else {
                            Modal.setAlert(json.resMsg || '添加失败，请重试！');
                        }
                    });
                } else {
                    Modal.setAlert('请选择客户，然后选择指定员工');
                }
            }
        });
        $(document).on('click', '#set-jcbh', function () {
            $('.white-back').removeClass('dp-n');
            $('.set-part').removeClass('dp-n');
        });
        $(document).on('click', '.close-btn', function () {
            $('.white-back').addClass('dp-n');
            $('.alert-back').addClass('dp-n');
        });
        $(document).on('click', '#set-ensure', function () {
            var arr = $('#multi-set').val().split('\n');
            $('#ip-jcbh').val(arr.join(','));
            $('.white-back').addClass('dp-n');
            $('.set-part').addClass('dp-n');
        });
        $(document).on('click', '#zdjcbh', function () {
            $('#set-jcbh').toggle();
            if ($(this).prop('checked')) {
                $('#ip-jcbh').val('');
            }
        });
    };
    var timeInit = function () {
        $('#add-date').datetimepicker({
            format: 'yyyy-mm-dd',//日期的格式
            startDate: new Date(),//选择器的开始日期
            autoclose: true,//日期选择完成后是否关闭选择框
            bootcssVer: 3,//显示向左向右的箭头
            language: 'zh-CN',//语言
            minView: "month"//表示日期选择的最小范围，默认是hour
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
                    var str = '';
                    if (json && 'resBody' in json && json.resBody instanceof Array && json.resBody.length > 0) {
                        var body = json.resBody;
                        for (var b in body) {
                            if (body.hasOwnProperty(b)) {
                                var d = body[b];
                                str += '<li data-val="' + d.airportCode + '" class="' + (b == 0 ? 'active' : '') + '">' + d.displayName + '</li>'
                            }
                        }
                    }
                    ul.html(str);
                    ul.show();
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
    var customer = function () {
        var getMember = function (id) {
            var data = {"companyId": id, "roleId": "99", "state": "99", "pageSize": "20", "pageIndex": "1"};
            var str = '';
            Data.member(data, function (json) {
                if (json && 'resCode' in json && json.resCode == 0) {
                    var arr = json.resBody.sList || [];
                    for (var a in arr) {
                        if (arr.hasOwnProperty(a)) {
                            var d = arr[a];
                            if (d.role.roleId != 3) {
                                str += '<option value="' + d.member.memberId + '">' + (d.member.name || '-') + '（' + d.member.mobile + '）</option>';
                            }
                        }
                    }
                }
                $('#info-yg').html(str);
            });
        };
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
                getMember(memberId);
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
            getMember(memberId);
        });
        $(document).on('focus', '#info-member', function () {
            var ul = $(this).siblings('.get-name');
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
                    var str = '';
                    if (json && 'resBody' in json && json.resBody instanceof Array && json.resBody.length > 0) {
                        var body = json.resBody;
                        for (var b in body) {
                            if (body.hasOwnProperty(b)) {
                                var d = body[b];
                                str += '<li data-val="' + d.airlineCode + '" class="' + (b == 0 ? 'active' : '') + '">' + d.companyName + '</li>';
                            }
                        }
                    }
                    ul.html(str);
                    ul.show();
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
    var warehouseInit = function () {
        Data.warehouse(function (json) {
            var str = '';
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

                        //加载配置的仓库信息
                        $('#fpbl').val(data.cargo.bulkyRate)
                        $('#warehouse').val(d.warehouseId);
                    }
                });
            }
        };
        $(document).on('click', '#inner-search', function () {
            modalPage.offset = 0;
            innerInit();
        });
        $(document).on('click', '.inner-page .pages', function () {
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
    var run = function () {
        listener();
        customer();
        airports();
        company();
        timeInit();
        warehouseInit();
        searchLine();
    };
    return {
        run: run
    }
}());
module.exports.Listener = Listener;