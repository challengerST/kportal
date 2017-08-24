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
    var stateArr = [];
    var excelData = [];
    var listener = function () {
        $(document).on('click', '#search-btn', function () {
            url.set('offset', 0);
            init();
        });
        $(document).on('click', '.pages', function () {
            url.set('offset', $(this).data('offset'));
            init();
        });
        $(document).on('click', '.close-btn', function () {
            $('.alert-part').addClass('dp-n');
            $('.white-back').addClass('dp-n');
        });
        $(document).on('focus', 'input', function () {
            $(this).select();
        });
        $(document).on('click', '.sel-all', function () {
            $('.sg').prop('checked', $(this).prop('checked'));
        });
        $(document).on('blur', '#add-tel', function () {
            var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
                , value = $(this).val()
                , ele = $('.add-warm')
                , _this = $(this);
            if (reg.test(value)) {
                Data.checkTel({tel: value}, function (json) {
                    if (json && 'resCode' in json && json.resCode == 0) {
                        _this.removeClass('wrong');
                        ele.addClass('dp-n');
                    } else {
                        ele.html('手机号重复！').removeClass('dp-n');
                        _this.addClass('wrong');
                    }
                });
            } else {
                ele.html('手机号格式错误！').removeClass('dp-n');
                _this.addClass('wrong');
            }
        });
        $(document).on('blur', '#add-company', function () {
            var value = $(this).val()
                , ele = $('.add-warm')
                , _this = $(this);
            Data.checkName({companyName: value}, function (json) {
                if (json && 'resCode' in json && json.resCode == 0) {
                    _this.removeClass('wrong');
                    ele.addClass('dp-n');
                } else {
                    ele.html('公司名称重复！').removeClass('dp-n');
                    _this.addClass('wrong');
                }
            });
        });
        $(document).on('change', '#add-level', function () {
            var ele = $(this).find('option:selected');
            $('#add-ed').val(ele.data('ed') || 0);
            $('#add-zq').val(ele.data('zq') || 0);
        });
        $(document).on('click', '#sg-add', function () {
            $('.white-back').removeClass('dp-n');
            $('.add-part').removeClass('dp-n');
        });
        $(document).on('click', '.submit', function () {
            stateArr = [];
            stateArr.push($(this).data('id'));
            $('.white-back').removeClass('dp-n');
            $('.open-part').removeClass('dp-n');
        });
        $(document).on('click', '.cancel', function () {
            stateArr = [];
            stateArr.push($(this).data('id'));
            $('.white-back').removeClass('dp-n');
            $('.close-part').removeClass('dp-n');
        });
        $(document).on('click', '#multi-close', function () {
            stateArr = [];
            $('input[name="sg"]').each(function () {
                if ($(this).prop('checked')) {
                    stateArr.push($(this).data('id'));
                }
            });
            if (stateArr.length > 0) {
                $('.white-back').removeClass('dp-n');
                $('.multi-close-part').removeClass('dp-n');
            }
        });
        $(document).on('click', '#multi-open', function () {
            stateArr = [];
            $('input[name="sg"]').each(function () {
                if ($(this).prop('checked')) {
                    stateArr.push($(this).data('id'));
                }
            });
            if (stateArr.length > 0) {
                $('.white-back').removeClass('dp-n');
                $('.multi-open-part').removeClass('dp-n');
            }
        });
        $(document).on('click', '#close-ensure,#multi-close-ensure', function () {
            var data = {
                "companyIds": stateArr,
                "enable": false
            };
            Data.state(data, function (json) {
                if (json && 'resCode' in json && json.resCode == 0) {
                    Modal.setAlert(json.resMsg || '停用成功！', null, function () {
                        location.reload();
                    });
                } else {
                    Modal.setAlert(json.resMsg || '设置失败，请重试！')
                }
            })
        });
        $(document).on('click', '#open-ensure,#multi-open-ensure', function () {
            var data = {
                "companyIds": stateArr,
                "enable": true
            };
            Data.state(data, function (json) {
                if (json && 'resCode' in json && json.resCode == 0) {
                    Modal.setAlert(json.resMsg || '启用成功！', null, function () {
                        location.reload();
                    });
                } else {
                    Modal.setAlert(json.resMsg || '设置失败，请重试！')
                }
            })
        });
        $(document).on('click', '#accept-ensure', function () {
            var tel = $('#add-tel').val()
                , person = $('#add-person').val()
                , name = $('#add-company').val()
                , type = $('#add-type').find('option:selected').val()
                , address = $('#add-address').val()
                , dh = $('#add-dh').val();
            if (tel && person && name && type && address && dh) {
                var data = {
                    "memberMobile": tel,
                    "memberName": person,
                    "memberQQ": $('#add-qq').val(),
                    "memberEmail": $('#add-mail').val(),
                    "companyName": name,
                    "companyType": type,
                    "companyAddress": address,
                    "companyTel": dh,
                    "accountLevel": $('#add-level').find('option:selected').val(),
                    "accountCredit": $('#add-ed').val(),
                    "accountSettlement": $('#add-zq').val(),
                    "registerCode": $('#add-hg').val()
                };
                if (!data.registerCode || data.registerCode.length == 10) {
                    $('#add-hg').removeClass('wrong');
                    $('.add-warm').addClass('dp-n');
                    Data.add(data, function (json) {
                        if (json && 'resCode' in json && json.resCode == 0) {
                            Modal.setAlert(json.resMsg || '添加成功！', null, function () {
                                location.reload();
                            });
                        } else {
                            Modal.setAlert(json.resMsg || '添加失败，请重试！')
                        }
                    });
                } else {
                    $('#add-hg').addClass('wrong');
                    $('.add-warm').html('海关注册编码必须为10位（可不填）').removeClass('dp-n');
                }
            } else {
                if (!tel) {
                    $('#add-tel').addClass('wrong');
                }
                if (!person) {
                    $('#add-person').addClass('wrong');
                }
                if (!name) {
                    $('#add-company').addClass('wrong');
                }
                if (!type) {
                    $('#add-type').addClass('wrong');
                }
                if (!address) {
                    $('#add-address').addClass('wrong');
                }
                if (!dh) {
                    $('#add-dh').addClass('wrong');
                }
            }
        });
    };
    var levelInit = function () {
        Data.level(function (json) {
            if (json && 'resCode' in json && json.resCode == 0 && json.resBody && 'config' in json.resBody && json.resBody.config) {
                var dt = json.resBody.config
                    , str = '';
                var lv;
                for (var i in dt) {
                    if (dt.hasOwnProperty(i)) {
                        var d = dt[i];
                        switch (i) {
                            case 'D':
                                lv = 0;
                                break;
                            case 'C':
                                lv = 1;
                                break;
                            case 'B':
                                lv = 2;
                                break;
                            case 'A':
                                lv = 3;
                                break;
                            case 'AA':
                                lv = 4;
                                break;

                        }
                        if (lv != 0 && lv != 1) {
                            str += '<option value="' + lv + '" data-ed="' + (d.creditDefault || 0) + '" data-zq="' + (d.creditSettlement || 0) + '"' + (i == 'B' ? ' selected' : '') + '>' + i + '</option>';
                        }
                        if (i == 'B') {
                            $('#add-ed').val(d.creditDefault || 0);
                            $('#add-zq').val(d.creditSettlement || 0);
                        }
                    }
                }
                $('#add-level').html(str);
            }
        });
    };
    var init = function () {
        var data = {
            offset: url.get('offset') || 0
            , limit: url.get('limit') || 20
            , type: $('#type').find('option:selected').val()
            , keyword: $('#num').val()
        };
        Data.list(data, function (json) {
            Dom.list(json, data);
        });
    };
    var excel = function () {
        $(document).on('click', '#multi-add', function () {
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
                                            Modal.setAlert('读取失败，请重试！');
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
                Users: excelData
            };
            Data.multiAdd(data, function (add) {
                if (add && 'resBody' in add && add.resBody) {
                    Modal.setAlert('成功导入 ' + add.resBody.SuccessCount + ' 条会员<br/>' + add.resBody.errorList.length + '条失败');
                } else {
                    Modal.setAlert('保存失败，请重试！');
                }
            });
        });
    };
    var run = function () {
        listener();
        levelInit();
        init();
        excel();
    };
    return {
        run: run
    }
}());
module.exports.Listener = Listener;