/**
 * Created by Jeremy on 2017/1/5.
 */
'use strict';
var Data = require('./data').Data
    , Dom = require('./dom').Dom
    , Modal = require('../../general/modal');
var List = {};
var Listener = (function () {
    var operateId;//操作id
    var listener = function () {
        $(document).on('click', '.close-btn', function () {
            $('.white-back').addClass('dp-n');
            $('.alert-part').addClass('dp-n');
        });
        $(document).on('click', '.remove', function () {
            operateId = $(this).data('id');
            $('.white-back').removeClass('dp-n');
            $('.delete-part').removeClass('dp-n');
        });
        $(document).on('click', '#delete-ensure', function () {
            var id = operateId;
            if (id) {
                Data.del({id: id}, function (json) {
                    if (json && 'resCode' in json && json.resCode == 0) {
                        Modal.setAlert(json.resMsg || '删除成功！', null, function () {
                            location.reload();
                        });
                    } else {
                        Modal.setAlert(json.resMsg || '删除失败，请重试！');
                    }
                });
            }
        });
        $(document).on('click', '#default', function () {
            var ele = $('input[name="sg"]:checked');
            if (ele.length > 0) {
                $('.white-back').removeClass('dp-n');
                $('.default-part').removeClass('dp-n');
            }
        });
        $(document).on('click', '#default-ensure', function () {
            var id = $('input[name="sg"]:checked').data('id');
            if (id) {
                Data.def({warehouseId: id}, function (json) {
                    if (json && 'resCode' in json && json.resCode == 0) {
                        Modal.setAlert(json.resMsg || '设置成功！', null, function () {
                            location.reload();
                        });
                    } else {
                        Modal.setAlert(json.resMsg || '设置失败，请重试！');
                    }
                });
            }
        });
        $(document).on('click', '#add', function () {
            var ele = $('.ticket-modal');
            $('.white-back').removeClass('dp-n');
            ele.find('.header').html('新增仓库 <span class="close-btn">X</span>');
            ele.find('input').val('');
            ele.find('.up-img').addClass('dp-n');
            ele.find('select').val('1');
            $('#alert-city').prop('disabled', false);
            $('#alert-code').prop('readonly', false);
            $('#submit').data('id', 0);//0为新增，1为修改
            ele.removeClass('dp-n');
        });
        $(document).on('click', '.update', function () {
            var tarEle = $('.ticket-modal')
                , d = List[$(this).data('id')],
                num;
            switch (d.warehouseCityCode) {
                case 'SH':
                    num = 1;
                    break;
                case 'NB':
                    num = 2;
                    break;
                case 'NJ':
                    num = 3;
                    break;
                case 'HZ':
                    num = 4;
                    break;
                default:
                    num = 1;
                    break;
            }
            $('.white-back').removeClass('dp-n');
            $('#alert-city').prop('disabled', true);
            $('#alert-code').prop('readonly', true);
            tarEle.find('#alert-num').val(d.warehouseId);
            tarEle.find('#alert-name').val(d.warehouseName);
            tarEle.find('#alert-type').find('option[value="' + d.warehouseType + '"]').prop('selected', true);
            tarEle.find('#alert-address').val(d.warehouseAddress);
            tarEle.find('#alert-map').val(d.warehouseMap);
            tarEle.find('#alert-map').data('key', d.warehouseMap);
            tarEle.find('.up-img').data('key', d.warehouseMap);
            tarEle.find('.up-img').removeClass('dp-n');
            tarEle.find('#alert-city').find('option[value="' + num + '"]').prop('selected', true);
            tarEle.find('#alert-code').val('');
            tarEle.find('#alert-person').val(d.warehouseContact);
            tarEle.find('#alert-connect').val(d.warehouseTel);
            tarEle.find('#alert-remark').val(d.warehouseRemark);
            tarEle.find('#jddz').val(d.emsAddress || '');
            tarEle.find('#jd-lxr').val(d.emsContact || '');
            tarEle.find('#jd-lxfs').val(d.emsTel || '');
            tarEle.find('.header').html('修改仓库信息 <span class="close-btn">X</span>');
            $('#submit').data('id', 1);//0为新增，1为修改
            tarEle.removeClass('dp-n');

        });
        $(document).on('click', '#submit', function () {
            var pass = true;
            $('input.require').each(function () {
                if ($(this).val()) {
                    $(this).removeClass('warm');
                } else {
                    pass = false;
                    $(this).addClass('warm');
                }
            });
            if (pass) {
                var id = $(this).data('id');
                var city;
                switch ($('#alert-city').find('option:selected').val()) {
                    case '1':
                        city = 'SH';
                        break;
                    case '2':
                        city = 'NB';
                        break;
                    case '3':
                        city = 'NJ';
                        break;
                    case '4':
                        city = 'HZ';
                        break;
                    default:
                        city = 'SH';
                        break;
                }
                var data = {
                    "companyId": 0,
                    "warehouseId": $('#alert-num').val(),
                    "warehouseName": $('#alert-name').val(),
                    "warehouseCode": $('#alert-code').val(),
                    "warehouseCityCode": city,
                    "warehouseType": $('#alert-type').find('option:selected').val(),
                    "warehouseAddress": $('#alert-address').val(),
                    "warehouseTel": $('#alert-connect').val(),
                    "warehouseFax": "",
                    "warehouseContact": $('#alert-person').val(),
                    "warehouseRemark": $('#alert-remark').val(),
                    "warehouseMap": $('#alert-map').data('key') == 0 ? '' : $('#alert-map').data('key'),
                    "warehouseState": 1,
                    "emsAddress": $('#jddz').val(),
                    "emsContact": $('#jd-lxr').val(),
                    "emsTel": $('#jd-lxfs').val()
                };
                if (id == 0) {
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
                    Data.update(data, function (json) {
                        if (json && 'resCode' in json && json.resCode == 0) {
                            Modal.setAlert(json.resMsg || '更新成功！', null, function () {
                                location.reload();
                            });
                        } else {
                            Modal.setAlert(json.resMsg || '更新失败，请重试！');
                        }
                    });
                }
            }
        });
        $(document).on('change', '#upImg', function () {
            var file = this.files[0]
                , size = this.files[0].size
                , name = this.files[0].name;
            var arr = ['jpg', 'png', 'bmp'];
            var na = name.split('.');
            if (arr.indexOf(na[na.length - 1]) >= 0) {
                if (size < 5120000) {
                    Data.up({"file": name}, function (json) {
                        var token;
                        if (json && 'resCode' in json && json.resCode == 0) {
                            token = json.resBody;
                        }
                        if (token) {
                            Data.ossUpload(token, file, function (data) {
                                if (data && 'status' in data && data.status > 0) {
                                    $('#alert-map').val(name);
                                    $('#alert-map').data('key', token.Keyname);
                                    $('.ticket-body').find('.up-img').data('key', token.Keyname);
                                    $('.ticket-body').find('.up-img').removeClass('dp-n');
                                    Modal.setAlert('上传成功！');
                                }
                            });
                        }
                    });
                } else {
                    Modal.setAlert('您上传的文件超过5M！请重新选择。');
                }
            } else {
                Modal.setAlert('文件格式支持.jpg/.png/.bmp');
            }
        });
        $(document).on('click', '.up-img', function () {
            if ($(this).data('key') != -1) {
                Data.down({"file": $(this).data('key')}, function (json) {
                    if (json && 'resCode' in json && json.resCode == 0 && json.resBody) {
                        $('#over-limit-a').attr('href', json.resBody);
                        $('#over-limit-hot').trigger('click');
                    }
                });
            } else {
                Modal.setAlert('该仓库没有上传地图');
            }
        });
        $(document).on('click', '#search', function () {
            init();
        });
    };
    var init = function () {
        var data = {
            "keyword": $('#name').val(),
            "agentCompanyId": 0
        };
        Data.list(data, function (json) {
            List = Dom.list(json);
        });
    };
    //获取图片路径
    function getObjectURL(file) {
        var url = null;
        if (window.createObjectURL != undefined) { // basic
            url = window.createObjectURL(file);
        } else if (window.URL != undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
    }

    var run = function () {
        listener();
        init();
    };
    return {
        run: run
    }
}());
module.exports.Listener = Listener;