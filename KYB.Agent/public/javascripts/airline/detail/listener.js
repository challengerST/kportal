/**
 * Created by Jeremy on 2017/1/5.
 */
'use strict';
var Data = require('./data').Data
    , Dom = require('./dom').Dom
    , url = require('../../general/function').url
    , Modal = require('../../general/modal');
var Listener = (function () {
    var ports, company;
    //var save = {};
    var save = JSON.parse(oriSave.replace(/&#34;/g, '\"').replace(/\\/g, '').replace(/&#39;/g, "\'")) || {};

    var listener = function () {
        //最小输入200
        $(document).on('blur', '#min-price', function () {
            var val = parseInt($(this).val()) || 0;
            if (val < 200) {
                $(this).val(200);
                Modal.setAlert('最低价格不能低于200！');
            }
        });
        //删除
        $(document).on('click', '.remove-tr', function () {
            var key = $(this).data('key');
            $(this).parents('tr').remove();
            delete save[key];
        });
        //提交
        $(document).on('click', '#editor-ensure', function () {
            var data = {
                "companyId": 0,
                "airCompanyCode": $('#inner-name').data('code'),
                "airCompanyName": $('#inner-name').val(),
                "airCompanyCountry": $('#country').val(),
                "airwayBillCode": $('#o-header').val(),
                "officeAddress": $('#bscdz').val(),
                "AWC_Fee": parseInt($('#AWC-price').val()),
                "CGC_Fee": parseInt($('#CGC-price').val()),
                "minPrice": $('#min-price').val(),
                "bulkyRate": $('#percentage').find('option:selected').val(),
                "warehouseId": $('#warehouse').find('option:selected').val(),
                "templateId": $('#price').find('option:selected').val(),
                "deptAirports": [],
                "configState": 1
            };
            var deptAirports = [];
            var ele = $('.inner-tb').find('tbody').find('tr');
            ele.each(function () {
                deptAirports.push(save[$(this).data('key')]);
            });
            data['deptAirports'] = deptAirports;
            if ($(this).data('type') == 1) {
                Data.add(data, function (json) {
                    if (json && 'resCode' in json && json.resCode == 0) {
                        Modal.setAlert(json.resMsg || '添加成功！', null, function () {
                            location.reload();
                        });
                    } else {
                        Modal.setAlert(json.resMsg || '添加失败，请重试！');
                    }
                });
            } else {
                data['Id'] = $(this).data('id');
                Data.update(data, function (json) {
                    if (json && 'resCode' in json && json.resCode == 0) {
                        Modal.setAlert(json.resMsg || '修改成功！', null, function () {
                            location.reload();
                        });
                    } else {
                        Modal.setAlert(json.resMsg || '修改失败，请重试！');
                    }
                });
            }
        });
    };
    var airports = function () {
        //获取机场名称
        $(document).on('keyup', 'input#start', function (e) {
            var cd = $('#inner-name').data('code');
            if (cd != 0) {
                $('#code').removeClass('warm');
                var _this = $(this)
                    , ul = _this.siblings('.get-name');
                var index = ul.find('.active').index() || 0
                    , len = ul.children().length;
                var str = '';
                if (e.keyCode == 13) {//回车键
                    var data = ul.children('.active').data('val') || ul.find('li:first-child').data('val') || '';
                    $(this).val('');
                    $(this).data('val', data);
                    if (ports && data) {
                        if ($('.add-tr[data-key="' + data + '"]').length == 0) {
                            save[data] = ports[data];
                            str = '<tr class="add-tr" data-key="' + data + '"> <td>' + data + '</td> <td>' + ports[data].displayName + '</td> ' +
                                '<td class="big"> <div class="dp-tb"> ' +
                                ' <div class="add"> <div class="top"> + </div> <a href="javascript:void(0);" class="dp-b">添加文件</a> ' +
                                '<input type="file" class="up-file" data-p="' + data + '" data-c="' + $('#inner-name').data('code') + '"></div> </div> </td>' +
                                '<td><a href="javascript:void(0);" class="remove-tr" data-key="' + data + '">删除</a></td> </tr>';
                        }
                    }
                    $('.inner-tb').find('tbody').append(str);
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
                            var dt = {};
                            for (var b in body) {
                                if (body.hasOwnProperty(b)) {
                                    var d = body[b];
                                    str += '<li data-val="' + d.airportCode + '" class="' + (b == 0 ? 'active' : '') + '">' + d.displayName + '</li>';
                                    dt[d.airportCode] = d;
                                }
                            }
                            ports = dt;
                            ul.html(str);
                            ul.show();
                        }
                    });
                }
            } else {
                $('#code').addClass('warm');
            }
        });
        //input失去焦点
        $(document).on('blur', 'input#start', function () {
            var cd = $('#inner-name').data('code');
            if (cd != 0) {
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
    var companys = function () {
        //获取航空公司
        $(document).on('keyup', 'input#code', function (e) {
            var _this = $(this)
                , ul = _this.siblings('.get-name');
            var index = ul.find('.active').index() || 0
                , len = ul.children().length;
            if (e.keyCode == 13) {//回车键
                var data = ul.children('.active').data('val') || ul.find('li:first-child').data('val') || '';
                $(this).val(data);
                $('#inner-name').data('code', data);
                if (company && data) {
                    $('#inner-name').val(company[data].companyName || '');
                    $('#country').val(company[data].companyCountry || '');
                    $('#o-header').val(company[data].airwayBillCode || '');
                }
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
                        var dt = {};
                        for (var b in body) {
                            if (body.hasOwnProperty(b)) {
                                var d = body[b];
                                str += '<li data-val="' + d.airlineCode + '" class="' + (b == 0 ? 'active' : '') + '">' + d.companyName + '</li>';
                                dt[d.airlineCode] = d;
                            }
                        }
                        company = dt;
                        ul.html(str);
                        ul.show();
                    } else {
                        ul.html('');
                    }
                });
            }
        });
        //input失去焦点
        $(document).on('blur', 'input#code', function () {
            var ul = $(this).siblings('.get-name');
            if (ul.children().length > 0) {
                var data = ul.children('.active').data('val') || ul.find('li:first-child').data('val') || '';
                $(this).val(data);
                $('#inner-name').data('code', data);
                $('#inner-name').val(company[data].companyName || '');
                $('#country').val(company[data].companyCountry || '');
                $('#o-header').val(company[data].airwayBillCode || '');
                ul.hide();
            }
        });
    };
    var priceInit = function () {
        Data.priceList(function (json) {
            var str = '';
            var id = $('#price').data('id');
            if (json && 'resCode' in json && json.resCode == 0 && 'sList' in json.resBody && json.resBody.sList) {
                var arr = json.resBody.sList;
                for (var a in arr) {
                    if (arr.hasOwnProperty(a)) {
                        var d = arr[a];
                        str += '<option value="' + d.templateId + '"' + (d.templateId == id ? ' selected' : '') + '>' + d.expenseName + '</option>';
                    }
                }
                $('#price').html(str);
            }
        });
    };
    var warehouseInit = function () {
        Data.warehouse(function (json) {
            var str = '';
            var id = $('#warehouse').data('id');
            if (json && 'resCode' in json && json.resCode == 0 && 'sList' in json.resBody && json.resBody.sList) {
                var arr = json.resBody.sList;
                for (var a in arr) {
                    if (arr.hasOwnProperty(a)) {
                        var d = arr[a];
                        str += '<option value="' + d.warehouseId + '"' + (d.warehouseId == id ? ' selected' : '') + '>' + d.warehouseName + '</option>';
                    }
                }
                $('#warehouse').html(str);
            }
        });
    };
    var files = function () {
        $(document).on('change', '.up-file', function () {
            var cd = $('#inner-name').data('code');
            if (cd != 0) {
                var arr = ['doc', 'docx', 'pdf', 'xlsx', 'xls'];
                var _this = $(this);
                var file = this.files[0]
                    , size = this.files[0].size
                    , name = this.files[0].name;
                var na = name.split('.');
                if (arr.indexOf(na[na.length - 1]) >= 0) {
                    if (size < 2097152) {
                        Data.up({"file": name}, function (json) {
                            var token;
                            if (json && 'resCode' in json && json.resCode == 0) {
                                token = json.resBody;
                            }
                            if (token) {
                                Data.ossUpload(token, file, function (data) {
                                    if (data && 'status' in data && data.status > 0) {
                                        var d = {
                                            "fileName": name,
                                            "fileComment": '',
                                            "keyName": token.Keyname,
                                            "agentCompanyId": 0,
                                            "airCompanyCode": $('#inner-name').data('code'),
                                            "airportCode": _this.data('p')
                                        };
                                        Data.addFile(d, function (json) {
                                            if (json && 'resCode' in json && json.resCode == 0 && json.resBody) {
                                                var d = json.resBody;
                                                var str = '<div class="files"> <div class="top">' + d.fileExtension.toUpperCase() + '<span class="glyphicon glyphicon-trash" data-key="' + d.keyName + '"></span> </div> <a href="javascript:void(0);" class="dp-b">' + d.fileName + '</a> </div>';
                                                _this.parents('.add').before(str);
                                                if (_this.parents('.add').siblings('.files').length == 3) {
                                                    _this.parents('.add').hide();
                                                }
                                            } else {
                                                Modal.setAlert(json.resMsg || '上传失败！');
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    } else {
                        Modal.setAlert('您上传的文件超过2M！请重新选择。');
                    }
                } else {
                    Modal.setAlert('文件格式支持.doc/.docx/.xls/.xlsx/.pdf/');
                }
            } else {
                Modal.setAlert('请先选择航空公司！');
            }
        });
        $(document).on('click', '.glyphicon-trash', function () {
            var _this = $(this);
            var data = {
                "agentCompanyId": 0,
                "keyName": $(this).data('key')
            };
            Data.delFile(data, function (json) {
                if (json && 'resCode' in json && json.resCode == 0) {
                    if (_this.parents('.files').siblings('.files').length == 2) {
                        _this.parents('.files').siblings('.add').show();
                    }
                    _this.parents('.files').remove();
                } else {
                    Modal.setAlert('删除失败！');
                }
            });
        });
    };
    var run = function () {
        listener();
        priceInit();
        warehouseInit();
        files();
        companys();
        airports();
    };
    return {
        run: run
    }
}());
module.exports.Listener = Listener;