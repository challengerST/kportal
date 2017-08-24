/**
 * Created by Jeremy on 2016/11/22.
 */
"use strict";
var Listener = (function () {

    var Data = require('./data').Data;
    var ndc;
    var listener = function () {
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            //nextButton: '.swiper-button-next',
            //prevButton: '.swiper-button-prev',
            //parallax: true,
            autoplay: 3000,//可选选项，自动滑动
            grabCursor : true,
            speed: 600
        });
        $(document).on('click', '#code', function () {
            getCode();
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
    var auto_go = function () {
        //激活页面自动登陆
        if ($('.auto-login-active').length > 0) {
            var n = 2;
            setInterval(function () {
                if (n == 0) {
                    location.href = "/login";
                } else {
                    var str = n + '秒后系统会自动跳转，也可点击本处';
                    $('.auto-login-active').html(str);
                    n--;
                }
            }, 1000)
        }
    };
    //获取gt验证码
    var getGt = function () {
        var handler2 = function (captchaObj) {
            $("#submit").click(function (e) {
                $('.wrong-text').html('');
                var tel = $('#tel').val()
                    , pwd = $('#pwd').val();
                if (!tel) {
                    $('.prompt-name').html('请输入登陆账号');
                    return false;
                }else {
                    $('.prompt-name').html('');
                    if (!pwd) {
                        $('.prompt-pwd').html('请输入密码');
                        return false;
                    } else {
                        $('.prompt-pwd').html('');
                        var result = captchaObj.getValidate();
                        if (!result) {
                            $(".prompt-code").html('请完成验证');
                            setTimeout(function () {
                                $(".prompt-code").html('');
                            }, 2000);
                        } else {
                            $('.prompt-name').html('');
                            $('.prompt-pwd').html('');
                            $('.prompt-code').html('');
                            var data = {
                                    Account: tel
                                    , Pwd: pwd
                                    , keepL: $('#auto').prop('checked') ? 1 : 0,
                                    geetest_challenge: result.geetest_challenge,
                                    geetest_validate: result.geetest_validate,
                                    geetest_seccode: result.geetest_seccode
                                }
                                ;
                            Data.login(data, function (json) {
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
                                    $('.wrong-text').html(json.resMsg).removeClass('dp-n');
                                }
                            });
                        }
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
        //getCode();
        auto_go();
        getGt();
    };
    return {
        run: run
    }
}());
module.exports = Listener;