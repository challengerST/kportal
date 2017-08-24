/**
 * Created by Jeremy on 2016/11/22.
 */
"use strict";
require('../frame/burster');
var Data = require('./data').Data;
var url = require('../frame/function').url;
var Modal = require('../frame/modal');
var Listener = (function () {
    var listener = function () {
        $(document).on('click', '#code', function () {
            getCode();
        });
        $(document).on('blur', '#mail', function () {
            var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
                , value = $(this).val();
            if (reg.test(value)) {
                $(this).siblings('.wrong').addClass('hide');
            } else {
                $(this).siblings('.wrong').removeClass('hide');
            }
        });
        //验证密码强度
        $(document).on('blur', '#new-pwd', function () {
            var value = $(this).val()
                , reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
            if (reg.test(value)) {
                $(this).siblings('.wrong').addClass('hide');
            } else {
                $(this).siblings('.wrong').removeClass('hide');
            }

        });
        $(document).on('click', '.send-mail', function () {
            var data = {
                "mobile": $('#mail').val(),
                "smsCode": $('#tel-pwd').val(),
                "password": $('#new-pwd').val()
            };
            if (data.mobile && data.smsCode && data.password) {
                Data.reset(data, function (json) {
                    if (json && 'resCode' in json && json.resCode == 0) {
                        Modal.setAlert('重置成功！', null, function () {
                            window.href = '/login';
                        });
                    } else {
                        Modal.setAlert(json.resMsg || '重置失败，请重试！');
                    }
                });
            }
        });
    };
    var getCode = function () {
        var src = '/getImgCode?';
        var getNum = function () {
            var num = '';
            for (var i = 0; i < 4; i++) {
                num = num + parseInt(10 * Math.random());
            }
            return num;
        };
        src += getNum();
        $('#code').attr('src', src);
    };
    //发送验证码
    var sendPhone = function (result) {
        var _this = $('#send-pwd');
        var tel = $('#mail').val();
        if (tel) {
            _this.prop('disabled', true);
            var data = {
                mobile: $('#mail').val(),
                geetest_challenge: result.geetest_challenge,
                geetest_validate: result.geetest_validate,
                geetest_seccode: result.geetest_seccode
            };
            Data.forgetCode(data, function (json) {
                if (json && 'resCode' in json && json.resCode == 0) {
                    var time = 120;
                    var timer = setInterval(function () {
                        if (time != 0) {
                            var str = '短信已发送（' + time + '）';
                            _this.html(str);
                            time--;
                        } else {
                            clearInterval(timer);
                            _this.html('点击发送验证码');
                            _this.prop('disabled', false);
                        }
                    }, 1000)
                } else if (json.resCode == 10) {
                    _this.prop('disabled', false);
                    $('.wrong-code').html('验证码错误').removeClass('dp-n');
                } else {
                    _this.prop('disabled', false);
                    Modal.setAlert(json.resMsg);
                }
            });
        } else {
            if (!tel) {
                $('#mail').siblings('.wrong').removeClass('hide');
            }
        }
    };
    //获取gt验证码
    var getGt = function () {
        var handler2 = function (captchaObj) {
            $("#send-pwd").click(function (e) {
                var result = captchaObj.getValidate();
                if (!result) {
                    $("#notice").show();
                    setTimeout(function () {
                        $("#notice").hide();
                    }, 2000);
                } else {
                    if ($('#mail').val()) {
                        sendPhone(result);
                    } else {
                        $('.tel').find('.wrong').removeClass('hide');
                    }
                }
                e.preventDefault();
            });

            // 将验证码加到id为captcha的元素里，同时会有三个input的值用于表单提交
            captchaObj.appendTo("#captcha");

            captchaObj.onReady(function () {
                $("#wait").hide();
            });

            // 更多接口参考：http://www.geetest.com/install/sections/idx-client-sdk.html
        };


        $.ajax({
            url: "/login/sendGt3?t=" + (new Date()).getTime(), // 加随机数防止缓存
            type: "get",
            dataType: "json",
            success: function (data) {

                // 调用 initGeetest 初始化参数
                // 参数1：配置参数
                // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它调用相应的接口
                initGeetest({
                    gt: data.gt,
                    challenge: data.challenge,
                    new_captcha: data.new_captcha, // 用于宕机时表示是新验证码的宕机
                    offline: !data.success, // 表示用户后台检测极验服务器是否宕机，一般不需要关注
                    product: "popup", // 产品形式，包括：float，popup
                    width: "100%"

                    // 更多配置参数请参见：http://www.geetest.com/install/sections/idx-client-sdk.html#config
                }, handler2);
            }
        });
    };
    var run = function () {
        listener();
        getGt();
        //getCode();
    };
    return {
        run: run
    }
}());
module.exports = Listener;