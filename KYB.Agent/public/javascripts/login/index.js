/**
 * Created by Jeremy on 2016/12/27.
 */
'use strict';
var Modal = require('../general/modal');
//ajax
var editor = function (data, callback) {
    var _data = {};
    $.ajax({
        url: '/api/account/login'
        , type: 'post'
        , data: data
        , dataType: 'json'
        , timeout: 100000
        , success: function (json) {

            if (json && "resCode" in json) {
                _data = json;
            } else {
                _data = {};
            }
        }, complete: function () {
            if (callback && callback instanceof Function) {
                callback(_data);
            }
        }
    });
};
//获取gt验证码
var getGt = function () {
    var handler2 = function (captchaObj) {
        $("#submit").click(function (e) {
            var result = captchaObj.getValidate();
            if (!result) {
                $("#captcha-warm").show();
                setTimeout(function () {
                    $("#captcha-warm").hide();
                }, 2000);
            } else {
                var id = $('#account')
                    , pwd = $('#pwd');
                if (!id.val()) {//验证用户名
                    id.siblings('.warm').show();
                    return false;
                } else {
                    id.siblings('.warm').hide();
                }
                if (!pwd.val()) {//验证密码
                    pwd.siblings('.warm').show();
                    return false;
                } else {
                    pwd.siblings('.warm').hide();
                }
                if (id.val() && pwd.val()) {
                    var d = {
                        id: id.val()
                        , pwd: pwd.val(),
                        geetest_challenge: result.geetest_challenge,
                        geetest_validate: result.geetest_validate,
                        geetest_seccode: result.geetest_seccode
                    };
                    editor(d, function (json) {
                        if (json && 'resCode' in json && json.resCode == 0) {
                            if ('Redirect' in json.resBody) {
                                location.href = json.resBody.Redirect;
                            } else {
                                if ('url' in json && json.url) {
                                    location.href = json.url;
                                } else {
                                    location.href = '/home';
                                }
                            }
                        } else {

                            captchaObj.reset();
                            Modal.setAlert(json.resMsg || '登录失败，请重试！');
                        }
                    });
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


getGt();