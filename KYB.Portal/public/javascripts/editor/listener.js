/**
 * Created by Jeremy on 2016/11/22.
 */
"use strict";
var Data = require('./data').Data;
var Modal = require('../frame/modal');
var Listener = (function () {
    var listener = function () {
        $(document).on('blur', '#name,#tel,#QQ', function () {
            if ($(this).val() != $(this).data('value')) {
                $('.submit').prop('disabled', false);
            }
        });
        $(document).on('click', '.submit', function () {
            if (mail && tel) {
                var data = {
                    "memberName": $('#name').val(),
                    "memberTel": $('#tel').val(),
                    "memberQQ": $('#QQ').val(),
                    "memberMail": $('#mail').val()
                };
                Data.editor(data, function (json) {
                    Modal.setAlert(json.resMsg || (json.resCode == 0 ? '修改成功' : '修改失败，请重试'), null, function () {
                        location.reload();
                    });
                });
            }
        });
        $(document).on('click', '.operate-mail', function () {
            var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
                , value = $('#mail').val();
            if (reg.test(value)) {
                var data = {
                    email: value
                };
                Data.sendMail(data, function (json) {
                    Modal.setAlert(json && json.resCode == 0 ? '发送成功，请前往邮箱激活！' : (json.resMsg || '发送失败，请重试'));
                });
            } else {
                Modal.setAlert('邮箱格式错误！');
            }
        });
    };

    var run = function () {
        listener();
    };
    return {
        run: run
    }
}());
module.exports = Listener;