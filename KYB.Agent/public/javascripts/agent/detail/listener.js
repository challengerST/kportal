/**
 * Created by Jeremy on 2017/1/5.
 */
'use strict';
require('../../general/burster');

var url = require('../../general/function').url
    , Modal = require('../../general/modal');
var List = {};
var Data = require('./data').Data;
var Listener = (function () {
    var listener = function () {
        $(document).on('click', '#btnCheck', function () {
            if ($('#companyName').val() == '') {
                $('#companyName').css('borderColor', 'red');
                $('#checkMsg').show();
                $('#checkMsg').html('公司名称不能为空！').css('color', 'red');
                $('#btnCheck').css({'borderColor': '#666', 'background': '#666'});
            } else {
                console.log(1);
                var data = {
                    "applyId": $('#applyInfo').data('id'),
                    "companyName": $('#companyName').val()
                };
                Data.check(data, function (json) {
                    console.log(json);
                    if (json && 'resCode' in json && json.resCode === 0) {
                        $('#btnCheck').data("name", $('#companyName').val());
                        $('#btnApprove').removeAttr("disabled");
                        $('#showReject').removeAttr("disabled");
                        //图标变更
                        $("#checkMsg").html('公司名称可用');
                    } else {
                        $("#checkMsg").html(json.resMsg || '该公司名字已经被使用');
                    }
                });
            }
        });
        $(document).on('blur', '#companyName', function () {
            if ($(this).val() == '') {
            } else {
                if ($('#btnCheck').data("name") != $('#companyName').val()) {
                    $('#btnApprove').attr("disabled", "disabled");
                    $('#showReject').attr("disabled", "disabled");
                    //图标变更
                }
            }
        });
        $(document).on('focus', '#companyName', function () {
            $(this).css('border-color', '#888');
            $('#checkMsg').html('');
            $('#btnCheck').css({'borderColor': '#666', 'background': '#006bbd'});
            if ($(this).val() == '') {
            } else {
                if ($('#btnCheck').data("name") != $('#companyName').val()) {
                    $('#btnApprove').attr("disabled", "disabled");
                    $('#showReject').attr("disabled", "disabled");
                    //图标变更
                }
            }
        });
        //审核通过
        $(document).on('click', '#btnApprove', function () {
            var data = {
                "applyId": $('#applyInfo').data('id'),
                "companyName": $('#companyName').val(),
                "applyState": 2
            };
            Data.verify(data, function (json) {
                if (json && 'resCode' in json && json.resCode === 0) {
                    Modal.setAlert(json.resMsg || '审核通过成功', null, function () {
                        window.location.href = "./review";
                    });
                } else {
                    Modal.setAlert(json.resMsg || '审核通过失败，请重试！');
                }
            });
        });

        //审核不通过
        $(document).on('click', '#btnReject', function () {
            var data = {
                "applyId": $('#applyInfo').data('id'),
                "companyName": $('#companyName').val(),
                "failureReason": $('#reason').val(),
                "applyState": 3
            };
            Data.verify(data, function (json) {
                if (json && 'resCode' in json && json.resCode === 0) {
                    Modal.setAlert(json.resMsg || '审核不通过成功', null, function () {
                        window.location.href = "./review";
                    });
                } else {
                    Modal.setAlert(json.resMsg || '审核不通过失败，请重试！');
                }
            });
        });

        $(document).on('click', '.close-btn', function () {
            $('.alert-part').addClass('dp-n');
            $('.white-back').addClass('dp-n');
        });


        $(document).on('click', '#showReject', function () {
            $('.white-back').removeClass('dp-n');
            $('.reject-part').removeClass('dp-n');
        });

        $(document).on('click', '.downfile', function () {
            var keys = $(this).data('key');
            var files = keys.split(',');
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                if (file != "") {
                    Data.down({file: file}, function (json) {
                        if (json && 'resBody' in json) {
                            window.open(json.resBody);
                        }
                    });
                }
            }

        });

    };

    var initInfo = function () {
        var data = $('#gszl').data('id');
        $(".oss-image").each(function () {
            var file = $(this).data('key');
            var _this = this;
            Data.imageUrl({file: file}, function (json) {
                if (json && 'resBody' in json) {
                    $(_this).attr("src", json.resBody);
                }
            });

        })
    };

    var run = function () {
        listener();
        initInfo();
    };
    return {
        run: run
    }
}());
module.exports.Listener = Listener;