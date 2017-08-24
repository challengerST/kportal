/**
 * Created by Jeremy on 2016/11/22.
 */
"use strict";
var url = require('../frame/function').url;
var Modal = require('../frame/modal');
var Data = require('./data').Data
    , Dom = require('./dom').Dom;
var Listener = (function () {
    var listener = function () {
        $(document).on('click', '.search-btn', function () {
            url.set('offset', 0);
            init();
        });
        $(document).on('click', '.tb-c', function () {
            var ele = $('#' + $(this).data('tar'));
            url.set('offset', 0);
            url.set('tb', $(this).data('tar'));
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
            ele.addClass('active');
            ele.siblings().removeClass('active');
            init();
        });
        $(document).on('click', '.delete-btn', function () {
            $('.white-back').removeClass('dp-n');
            $('.delete-part').removeClass('dp-n');
            $('#delete-ensure').data('id', $(this).data('id'));
        });
        $(document).on('click', '.close-btn', function () {
            $('.white-back').addClass('dp-n');
            $('.alert-part').addClass('dp-n');
            $('.ticket-modal').find('input').val('');
        });
        $(document).on('click', '.add', function () {
            $('.s-require').removeClass('warm');
            var ele = $('.ticket-modal');
            var str = $(this).data('nm') + '<span class="close-btn">X</span>';
            ele.find('.header').html(str);
            $('.white-back').removeClass('dp-n');
            ele.removeClass('dp-n');
            $('#submit').data('id', 0)
        });
        $(document).on('click', '.show-detail', function () {
            $('.s-require').removeClass('warm');
            var ele = $('.ticket-modal');
            var str = $(this).data('tp') == 'receive' ? '收货人详情' : '发货人详情';
            str += '<span class="close-btn">X</span>';
            ele.find('.header').html(str);
            var d = $(this).data('info').split(',');
            $('#name').val(d[0] || '-');
            $('#dz').val(d[1] || '-');
            $('#person').val(d[2] || '-');
            $('#dh').val(d[3] || '-');
            $('#mail').val(d[4] || '-');
            $('#cz').val(d[5] || '-');
            $('.white-back').removeClass('dp-n');
            ele.removeClass('dp-n');
            $('#submit').data('id', d[6]);
        });
        $(document).on('click', '#submit', function () {
            var tb = url.get('tb') || 'receive';
            var id = $(this).data('id');
            var pass = true;
            $('.s-require').each(function () {
                if ($(this).val()) {
                    $(this).removeClass('warm');
                } else {
                    $(this).addClass('warm');
                    pass = false;
                }
            });
            if (pass) {
                var data = {
                    "contactId": id == 0 ? null : id,
                    "contactType": tb == 'receive' ? 2 : 1,
                    "contactAlias": $('#mc').val(),
                    "contactName": $('#name').val(),
                    "contactAddress": $('#dz').val(),
                    "contactPerson": $('#person').val(),
                    "contactTel": $('#dh').val(),
                    "contactFax": $('#cz').val(),
                    "contactEmail": $('#mail').val(),
                    "contactState": 1,
                    "contactRemarks": '',
                    "createDt": new Date(),
                    "modifyDt": new Date()
                };
                if (id == 0) {//新增
                    Data.add(data, function (json) {
                        if (json && 'resCode' in json && json.resCode != 0) {
                            Modal.setAlert(json.resMsg);
                        } else {
                            Modal.setAlert(json.resMsg || '新增成功', null, function () {
                                location.reload();
                            });
                        }
                    })
                } else {//修改
                    Data.update(data, function (json) {
                        if (json && 'resCode' in json && json.resCode != 0) {
                            Modal.setAlert(json.resMsg);
                        } else {
                            Modal.setAlert(json.resMsg || '修改成功', null, function () {
                                location.reload();
                            });
                        }
                    });
                }
            }
        });
        $(document).on('click', '#delete-ensure', function () {
            Data.del({list: [$(this).data('id')]}, function (json) {
                if (json && 'resCode' in json && json.resCode != 0) {
                    Modal.setAlert(json.resMsg);
                } else {
                    Modal.setAlert(json.resMsg || '删除成功', null, function () {
                        location.reload();
                    });
                }
            });
        });
        $(document).on('click', '.pages', function () {
            url.set('offset', $(this).data('offset'));
            init();
        });
    };
    var init = function () {
        var tb = url.get('tb') || 'receive';
        var load = '<tr class="wrong-msg"><td colspan="9"><div class="loading-box"><div class="spinner"> <div class="rect1"></div> <div class="rect2"></div> <div class="rect3"></div><div class="rect4"></div><div class="rect5"></div> </div></div></td></tr>';
        $('#' + tb).find('tbody').html(load);
        var data = {
            tp: tb == 'send' ? 1 : 2
            , key: tb == 'send' ? $('#s-name').val() : $('#r-name').val()
            , offset: url.get('offset') || 0
            , limit: 20
        };
        Data.list(data, function (json) {
            Dom.list(json, $('#' + tb), data);
        });
    };
    var excel = function () {
        var excelData = [];
        $(document).on('click', '.multi-add', function () {
            $('.white-back').removeClass('dp-n');
            $('.batch-part').removeClass('dp-n');
        });
        $(document).on('change', '#multi-btn', function () {
            var arr = ['xls', 'xlsx'];
            var file = this.files[0]
                , size = this.files[0].size
                , name = this.files[0].name;
            var na = name.split('.');
            if (arr.indexOf(na[na.length - 1]) >= 0) {
                if (size < 512000) {
                    Data.up({"file": name}, function (json) {
                        var token;
                        if (json && 'resCode' in json && json.resCode == 0) {
                            token = json.resBody;
                        }
                        if (token) {
                            Data.ossUpload(token, file, function (data) {
                                if (data && 'status' in data && data.status > 0) {
                                    Data.excelReader({file: token.Keyname}, function (excel) {
                                        if (excel && 'resBody' in excel && excel.resBody instanceof Array) {
                                            excelData = excel.resBody || [];
                                            $('.excel-name').html(name);
                                            $('.square').html('xls').addClass('excel-al');
                                        } else {
                                            Modal.setAlert(excel.resMsg || '读取失败，请重试！');
                                        }
                                    });
                                }
                            });
                        }
                    });
                } else {
                    Modal.setAlert('您上传的文件超过500K！请重新选择。');
                }
            } else {
                Modal.setAlert('文件格式支持.xls/.xlsx/');
            }
        });
        $(document).on('click', '#batch-ensure', function () {
            var data = {
                "contacts": excelData,
                "memberId": 0,
                "companyId": 0,
                "RequiresValidationContext": true,
                "ErrorMessage": "string",
                "ErrorMessageResourceName": "string",
                "ErrorMessageResourceType": "string",
                "TypeId": {}
            };
            Data.multiAdd(data, function (add) {
                if (add && 'resCode' in add && add.resCode == 0) {
                    Modal.setAlert('成功导入 ' + add.resBody.SuccessCount + ' 条记录。', null, function () {
                        location.reload();
                    });
                } else {
                    Modal.setAlert(add.resMsg || '保存失败，请重试！');
                }
            });
        });
    };
    var run = function () {
        listener();
        init();
        excel();
    };
    return {
        run: run
    }
}());
module.exports = Listener;