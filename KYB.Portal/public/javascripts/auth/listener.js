/**
 * Created by Jeremy on 2016/11/22.
 */
"use strict";
var Data = require('./data').Data;
var Modal = require('../frame/modal');
var Listener = (function () {
    var imgList = {};
    var imgNum = 1;
    var lv = 'B';
    var picBox=[];
    var listener = function () {
        $(document).on('change', '.upImg', function (e) {
            var arr = ['doc', 'docx', 'xls', 'xlsx', 'pdf', 'jpg', 'png', 'bmp'];
            var objUrl = getObjectURL(this.files[0]);
            var _this = $(this).parent();
            var file = this.files[0]
                , size = this.files[0].size
                , name = this.files[0].name;
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
                                    var d = {
                                        "companyId": 0,
                                        "fileName": name,
                                        "fileComment": '',
                                        "keyName": token.Keyname
                                    };
                                    Data.addFile(d, function (json) {
                                        if (json && 'resCode' in json && json.resCode == 0 && json.resBody) {
                                            var d = json.resBody;
                                            var e = '<a href="javascript:void(0);" class="dp-b fl-l up-data"> <span class="show-img dp-b"' +
                                                '">' + d.fileExtension.toUpperCase() + '</span> <span class="dp-b add-txt">' + d.fileName + '</span> <span data-id="' + token.Keyname + '" class="delete-icon"></span><img src="/images/loading.gif" alt="" class="hide"> </a>';
                                            _this.before(e);
                                            if ($('.up-data').length >= 3) {
                                                _this.hide();
                                            }
                                        } else {
                                            Modal.setAlert('上传失败！');
                                        }
                                    });
                                }
                            });
                        }
                    });
                } else {
                    Modal.setAlert('您上传的文件超过5M！请重新选择。')
                }
            } else {
                Modal.setAlert('文件格式支持.doc/.docx/.xls/.xlsx/.pdf/.jpg/.png/.bmp');
            }
        });
        $(document).on('blur', '#ch-name,#tel,#add', function () {
            if ($(this).val()) {
                $(this).siblings('span').addClass('hide');
            } else {
                $(this).siblings('span').removeClass('hide');
            }
        });
        $(document).on('click', '.submit', function () {
            var pass = true;
            $('.s-check').each(function () {
                if (!$(this).val()) {
                    pass = false;
                    $(this).siblings('span').removeClass('hide');
                } else {
                    $(this).siblings('span').addClass('hide');
                }
            });
            if (pass) {

                var data = {
                    "memberId": 0,
                    "companyName": $('#s-name').val(),
                    "companyType": $('#s-type').find('option:selected').val(),
                    "companyAddress": $('#s-add').val(),
                    "companyContact": $('#s-lxr').val(),
                    "companyTel": $('#s-tel').val(),
                    "companyFax": $('#s-fax').val(),
                    "registerCode": $('#s-bm').val(),
                    "applyLevel": lv,
                    "xx":picBox
                };
                Data.auth(data, function (json) {
                    console.log(data);
                    if (json && 'resCode' in json && json.resCode == 0) {
                        Modal.setAlert('认证成功！', null, function () {
                            location.reload();
                        });
                    } else {
                        Modal.setAlert('认证失败！');
                    }
                });
            }
        });
        $(document).on('click', '.new-btn', function () {
            if (!$(this).hasClass('disable-btn')) {
                lv = $(this).data('lv');
                $('.check-has').addClass('dp-n');
                $('.auth-box').removeClass('dp-n');
            }
        });
        $(document).on('click', '.delete-icon', function () {
            var _this = $(this);
            var data = {
                "companyId": 0,
                "keyName": $(this).data('id')
            };
            Data.removeFile(data, function (json) {
                if (json && 'resCode' in json && json.resCode == 0) {
                    _this.parents('.up-data').remove();
                    $('#sg-add').show();
                } else {
                    Modal.setAlert(json.resMsg || '删除失败，请重试');
                }
            });
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
    };
    return {
        run: run
    }
}());
module.exports = Listener;