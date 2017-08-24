/**
 * Created by Jeremy on 2016/11/22.
 */
"use strict";
var Modal = require('../frame/modal');
var url = require('../frame/function').url;
var Listener = (function () {
    var Data = require('./data').Data;
    var tel = false
        , msg = false
        , mail = false
        , check = true
        , next = false;
    var mailUrl = '';
    var rows1, rows2, rows3, rows4, rows;
    var listener = function () {
        $(document).on('change', '.upImg', function (e) {
            var arr = ['jpg', 'png', 'jpeg'];
            var objUrl = getObjectURL(this.files[0]);
            var _this = $(this).parent();
            var file = this.files[0]
                , size = file.size
                , name = file.name;
            var na = name.split('.');
            var cId = url.get('id');
            if (arr.indexOf(na[na.length - 1]) >= 0) {
                if (size < 5120000) {
                    Data.up({"file": name}, function (json) {
                        var token;

                        if (json && 'resCode' in json && json.resCode == 0) {
                            token = json.resBody;
                        }
                        console.log(token);
                        if (token) {
                            Data.ossUpload(token, file, function (data) {
                                if (data && 'status' in data && data.status > 0) {
                                    var d = {
                                        "companyId": cId,
                                        "fileName": name,
                                        "fileComment": '',
                                        "keyName": token.Keyname
                                    };
                                    console.log(data);
                                    Data.addFile(d, function (json) {
                                        if (json && 'resCode' in json && json.resCode == 0 && json.resBody) {
                                            console.log(json);
                                            var addJson = json.resBody;
                                            var imgStr = '<a href="javascript:void(0);" class="dp-b fl-l up-data"> <span class="show-img dp-b agc_upd" data-id="' + token.Keyname + '"' +
                                                '">' + addJson.fileExtension.toUpperCase() + '</span> <span class="dp-b add-txt">' + name + '</span> <span data-id="' + token.Keyname + '" class="delete-icon"></span>' +
                                                '<img src="/images/loading.gif" alt="" class="hide">' +
                                                '<span class="acf_delete"></span>' +
                                                '<em data-id="' + token.Keyname + '" class="iconfont icon-105"></em>' +
                                                '</a>';
                                            console.log(_this);
                                            _this.before(imgStr);
                                            _this.hide();
                                            _this.find('.upImg').remove();
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
                Modal.setAlert('文件格式支持.jpg/.png/.jpeg');
            }
        });
        rows = 0;
        $(document).on('click', '#subCheck', function () {
            $('.out a').find('span:eq(0)').each(function () {
                if ($(this).html() == '+') {
                    $(this).css('borderColor', 'red');
                } else {
                    $(this).css('borderColor', '#c6cede');
                }
            });
            if ($('.agc_upd').length == 4) {
                var dd = url.get('id');
                var d = {
                    "applyId": dd,
                    "imageFiles": [
                        {
                            "fileType": 1,
                            "fileId": $('.delete-icon').eq(0).data('id')
                        },
                        {
                            "fileType": 2,
                            "fileId": $('.delete-icon').eq(1).data('id')
                        },
                        {
                            "fileType": 3,
                            "fileId": $('.delete-icon').eq(2).data('id')
                        },
                        {
                            "fileType": 4,
                            "fileId": $('.delete-icon').eq(3).data('id')
                        }
                    ]
                };
                Data.uploadQy(d, function (data) {
                    if (data && 'resCode' in data && data.resCode == 0) {
                        $('.agr_statusDetail').removeClass('active');
                        $('.agr_statusDetail').eq(2).addClass('active');
                        $('.agr-ok').removeClass('dp-n');
                        $('.register-box').hide();
                        $('.agr_status').hide();
                    } else {
                        Modal.setAlert(data.resMsg);
                        $('.agr-sorry').removeClass('dp-n');
                        $('.register-box').hide();
                        $('.agr_status').hide();
                    }
                })
            } else {
                Modal.setAlert('请上传完整资料');
            }
        });
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
        $(document).on('click', '.up-data em', function () {
            var _this = $(this);
            var data = {
                "companyId": 0,
                "keyName": $(this).data('id')
            };
            Data.removeFile(data, function (json) {
                if (json && 'resCode' in json && json.resCode == 0) {
                    _this.parents('.up-data').next().show();
                    var newTag=_this.parents('.up-data').next().find('img');
                    $('<input type="file" class="upImg" data-gid="0">').insertBefore(newTag);
                    _this.parents('.up-data').remove();
                } else {
                    Modal.setAlert(json.resMsg || '删除失败，请重试');
                }
            });
        });
        //注册
    };

    var run = function () {
        listener();
    };
    return {
        run: run
    }
}());
module.exports = Listener;