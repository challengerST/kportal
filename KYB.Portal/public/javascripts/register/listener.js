/**
 * Created by Jeremy on 2016/11/22.
 */
"use strict";
var Modal = require('../frame/modal');
var Listener = (function () {
    var Data = require('./data').Data;
    var tel = false
        , pwd = false
        , repeat = false
        , msg = false
        , mail = false
        , next1 = false
        , next2 = false
        , companyName = false
        , realName = false;
    var mailUrl = '';
    var pass1, pass2;
    var listener = function () {
        //判断必选项是否填写
        pass1 = function () {
            var ele = $('.agr_next>.lg-btn');
            if (tel && msg) {
                ele.removeAttr('style').css({'backgroundColor': '#006bbc'});
                next1 = true;
            } else {
                ele.css({'pointer-events': 'none', 'backgroundColor': '#C6CEDE'});
                next1 = false;
            }
        };
        //输入电话
        $(document).on('click', '.tel .agr_wrong', function () {
            $(this).parent().find('.agr_wrong').hide();
            $('#tel').focus();
            $(this).css('border-color', '#c6cede');
        });
        $(document).on('focus', '#tel', function () {
            $(this).parent().find('.agr_wrong').hide();
            $(this).css('border-color', '#c6cede');
            $(this).parent().find('.info').hide();
        });
        $(document).on('blur', '#tel', function () {
            var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
                , value = $(this).val();
            if (value == '') {
                $(this).parent().find('.agr_wrong').show();
                $(this).css('border-color', 'red');
            } else {
                if (reg.test(value)) {
                    tel = true;
                    $(this).removeClass('wrong');
                    $(this).siblings('.info').hide();
                } else {
                    tel = false;
                    $(this).addClass('wrong');
                    $(this).siblings('.info').show();
                    $(this).css('border-color', 'red');
                }
            }
            pass1();
        });
        $('.p-msg').click(function () {
            sendPhone();
        });
        //输入短信验证码
        if ($('#tel') == '') {
            $('#p-msg').attr('disabled', true);
        } else {
            $(document).on('click', '.phone-msg .agr_wrong', function () {
                $(this).parent().find('.agr_wrong').hide();
                $('#p-msg').focus();
                $(this).css('border-color', '#c6cede');
            });
            $(document).on('focus', '#p-msg', function () {
                $(this).parent().find('.agr_wrong').hide();
                $(this).css('border-color', '#c6cede');
                $(this).parent().find('.info').hide();
            });
            $(document).on('blur', '#p-msg', function () {
                var value = $(this).val();
                if (value == '') {
                    $(this).parent().find('.agr_wrong').show();
                    $(this).css('border-color', 'red');
                } else {
                    if (value) {
                        msg = true;
                        $(this).removeClass('wrong');
                        $(this).siblings('.info').addClass('dp-n');
                    } else {
                        msg = false;
                        $(this).addClass('wrong');
                        $(this).siblings('.info').removeClass('dp-n');
                        $(this).css('border-color', '#red');
                    }
                }
                pass1();
            });
        }
        //注册下一步
        $(document).on('click', '.agr_next>.lg-btn', function () {
            console.log(next1);
            if (next1) {
                var data = {
                    mobile: $('#tel').val()
                    , smsCode: $('#p-msg').val()
                };
                Data.ckSms(data, function (data) {
                    if (data && 'resCode' in data && data.resCode == 0) {
                        $('.register-box').hide();
                        $('.data-box').show();
                        $('.agr_statusDetail').eq(1).addClass('active').siblings().removeClass('active');
                        $('.res_mobile').html(data.resMsg);
                    } else {
                        Modal.setAlert('请填写完整！');
                    }
                });
            } else {
                Modal.setAlert('请填写完整');
            }
        });
        //输入资料
        //vertify pwd
        $(document).on('click', '.passward .agr_wrong', function () {
            $(this).parent().find('.agr_wrong').hide();
            $('#password').focus();
            $(this).css('border-color', '#c6cede');
        });
        $(document).on('focus', '#password', function () {
            $(this).parent().find('.agr_wrong').hide();
            $(this).css('border-color', '#c6cede');
            $(this).parent().find('.info').hide();
        });
        $(document).on('blur', '#password', function () {
            var value = $(this).val()
                , reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
            if (value == '') {
                $(this).parent().find('.agr_wrong').show();
                $(this).css('border-color', 'red');
            } else {
                if (reg.test(value)) {
                    pwd = true;
                    $(this).removeClass('wrong');
                    $(this).siblings('.info').hide();
                } else {
                    pwd = false;
                    $(this).addClass('wrong');
                    $(this).siblings('.info').show();
                    $(this).css('border-color', 'red');
                }
            }
            pass2();
        });
        //vertify twice pwd
        $(document).on('click', '.ensurePwd .agr_wrong', function () {
            $(this).parent().find('.agr_wrong').hide();
            $('#ensure').focus();
            $(this).css('border-color', '#c6cede');
        });
        $(document).on('focus', '#ensure', function () {
            $(this).parent().find('.agr_wrong').hide();
            $(this).css('border-color', '#c6cede');
            $(this).parent().find('.info').hide();
        });
        $(document).on('blur', '#ensure', function () {
            var value = $(this).val()
                , reg = $('#password').val();
            if (value == '') {
                $(this).parent().find('.agr_wrong').show();
                $(this).css('border-color', 'red');
            } else {
                if (value === reg) {
                    repeat = true;
                    $(this).removeClass('wrong');
                    $(this).siblings('.info').hide();
                } else {
                    repeat = false;
                    $(this).addClass('wrong');
                    $(this).siblings('.info').show();
                    $(this).css('border-color', 'red');
                }
            }
            pass2();
        });
        //vertify name
        $(document).on('click', '.res_name .agr_wrong', function () {
            $(this).parent().find('.agr_wrong').hide();
            $('#agr_name').focus();
            $(this).css('border-color', '#c6cede');
        });
        $(document).on('focus', '#res_name', function () {
            $(this).parent().find('.agr_wrong').hide();
            $(this).parent().find('.info').hide();
            $(this).css('border-color', '#c6cede');
        });
        $(document).on('blur', '#res_name', function () {
            var reg1 = /^[a-zA-Z ]{1,20}$/,
                reg2 = /^[\u4e00-\u9fa5]{2,5}$/
                , value = $(this).val();
            if (value == '') {
                $(this).parent().find('.agr_wrong').show();
                $(this).css('border-color', 'red');
            } else {
                if (reg1.test(value) || reg2.test(value)) {
                    realName = true;
                    $(this).removeClass('wrong');
                    $(this).parent().find('.info').hide();
                }
                else {
                    realName = false;
                    $(this).addClass('wrong');
                    $(this).parent().find('.info').show();
                    $(this).css('border-color', 'red');
                }
            }
            pass2();
        });
        //vertify mail
        $(document).on('click', '.res_mail .agr_wrong', function () {
            $(this).parent().find('.agr_wrong').hide();
            $('#mail').focus();
            $(this).css('border-color', '#c6cede');
        });
        $(document).on('focus', '#mail', function () {
            $(this).parent().find('.agr_wrong').hide();
            $(this).css('border-color', '#c6cede');
            $(this).parent().find('.info').hide();
        });
        $(document).on('blur', '#mail', function () {
            var reg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]{2,4})+$/
                , value = $(this).val();
            if (value == '') {
                $(this).parent().find('.agr_wrong').show();
                $(this).css('border-color', 'red');
            } else {
                if (reg.test(value)) {
                    $(this).val();
                    mail = true;
                    $(this).removeClass('wrong');
                    $(this).siblings('.info').hide();
                } else {
                    mail = false;
                    $(this).addClass('wrong');
                    $(this).siblings('.info').show();
                    $(this).css('border-color', 'red');
                }
            }
            pass2();
        });

        //vertify company name
        $(document).on('click', '.companyName .agr_wrong', function () {
            $(this).parent().find('.agr_wrong').hide();
            $('#companyName').focus();
            $(this).css('border-color', '#c6cede');
        });
        $(document).on('focus', '#companyName', function () {
            $(this).parent().find('.agr_wrong').hide();
            $(this).css('border-color', '#c6cede');
            $(this).parent().find('.info').hide();
        });
        $(document).on('blur', '#companyName', function () {
            var value = $(this).val()
                , reg = $('#companyName').val();
            if (value == '') {
                $(this).parent().find('.agr_wrong').show();
                $(this).css('border-color', 'red');
                companyName = false;
            } else {
                companyName = true;
            }
            //if (value === reg) {
            //    companyName = true;
            //    $(this).removeClass('wrong');
            //    $(this).siblings('.info').hide();
            //} else {
            //    companyName = false;
            //    $(this).addClass('wrong');
            //    $(this).siblings('.info').show();
            //    $(this).css('border-color', 'red');
            //}
            pass2();
        });
        //图形验证
        //$(document).on('blur', '#code', function () {
        //    var value = $(this).val();
        //    if (value) {
        //        code = true;
        //        $(this).removeClass('wrong');
        //        $(this).siblings('.wrong-code').addClass('dp-n');
        //    } else {
        //        code = false;
        //        $(this).addClass('wrong');
        //        $(this).siblings('.wrong-code').html('请输入验证码');
        //        $(this).siblings('.wrong-code').removeClass('dp-n');
        //    }
        //    pass();
        //});
        //判断必选项是否填写
        var pass2 = function () {
            var ele = $('.res_next>a');
            if (pwd && repeat && realName && companyName && mail) {
                ele.removeAttr('style').css({'backgroundColor': '#006bbc'});
                next2 = true;
            } else {
                ele.css({'pointer-events': 'none', 'backgroundColor': '#C6CEDE'});
                next2 = false;
            }
        };

        //注册
        $(document).on('click', '.res_next>a', function () {
            if (next2) {
                var data = {
                    mobile: $('.res_mobile').html()
                    , password: $('#password').val()
                    , confirmPassword: $('#ensure').val()
                    , name: $('#res_name').val()
                    , email: $('#mail').val()
                    , companyName: $('#companyName').val()
                };
                Data.register(data, function (data) {
                    if (data && 'resCode' in data && data.resCode == 0) {
                        //var mail = $('#mail').val();
                        //$('#acc-id').html(data.resBody.member.mobile);
                        //$('#open-mail').html(mail);
                        //$('#open-mail').attr('href', gotomail(mail));
                        //$('.register-box').addClass('dp-n');
                        //$('.pass-box').removeClass('dp-n');
                        $('.data-box').hide();
                        $('.res_ok').show();
                    } else {
                        Modal.setAlert(data.resMsg);
                    }
                });
            } else {
                Modal.setAlert('请填写完整');
            }
        });
        //验证码切换
        $(document).on('click', '.validate-img', function () {
            getCode();
        });
    };
    //获取图形验证码
    //var getCode = function () {
    //    var src = '/getImgCode?';
    //    var getNum = function () {
    //        var num = '';
    //        for (var i = 0; i < 4; i++) {
    //            num = num + parseInt(10 * Math.random());
    //        }
    //        return num;
    //    };
    //    src += getNum();
    //    $('.validate-img').attr('src', src);
    //};
    //发送验证码
    var sendPhone = function () {
        var _this = $('.p-msg');
        if (tel) {
            Data.checkSms({mobile: $('#tel').val()}, function (json) {
                if (json && 'resCode' in json && json.resCode == 0) {
                    _this.prop('disabled', true);
                    _this.css({'background': '#e7ebf2', 'color': '#006bbd'});
                    //$('.agr_next').find('.lg-btn').removeAttribute("disabled");
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
                            _this.css('background', '#fff');
                        }
                    }, 1000)
                } else {
                    _this.prop('disabled', false);
                    Modal.setAlert(json.resMsg);
                }
            });
        }
    };

    //获取gt验证码
    //var getGt = function () {
    //    var handler2 = function (captchaObj) {
    //        $(".p-msg").click(function (e) {
    //            var result = captchaObj.getValidate();
    //            if (!result) {
    //                $("#notice").show();
    //                setTimeout(function () {
    //                    $("#notice").hide();
    //                }, 2000);
    //            } else {
    //                if (tel) {
    //                    sendPhone(result)
    //                } else {
    //                    $('.tel').find('.info').removeClass('dp-n');
    //                }
    //            }
    //            e.preventDefault();
    //        });
    //
    //        // 将验证码加到id为captcha的元素里，同时会有三个input的值用于表单提交
    //        captchaObj.appendTo("#captcha");
    //
    //        captchaObj.onReady(function () {
    //            $("#wait").hide();
    //        });
    //
    //        // 更多接口参考：http://www.geetest.com/install/sections/idx-client-sdk.html
    //    };
    //
    //
    //    $.ajax({
    //        url: "/login/sendGt3?t=" + (new Date()).getTime(), // 加随机数防止缓存
    //        type: "get",
    //        dataType: "json",
    //        success: function (data) {
    //
    //            // 调用 initGeetest 初始化参数
    //            // 参数1：配置参数
    //            // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它调用相应的接口
    //            initGeetest({
    //                gt: data.gt,
    //                challenge: data.challenge,
    //                new_captcha: data.new_captcha, // 用于宕机时表示是新验证码的宕机
    //                offline: !data.success, // 表示用户后台检测极验服务器是否宕机，一般不需要关注
    //                product: "popup", // 产品形式，包括：float，popup
    //                width: "100%"
    //
    //                // 更多配置参数请参见：http://www.geetest.com/install/sections/idx-client-sdk.html#config
    //            }, handler2);
    //        }
    //    });
    //};

    function gotomail($mail) {
        if ($mail) {
            var $t = $mail.split('@')[1];
            if ($t) {
                $t = $t.toLowerCase();
                if ($t == '163.com') {
                    return 'http://mail.163.com';
                } else if ($t == 'vip.163.com') {
                    return 'http://vip.163.com';
                } else if ($t == '126.com') {
                    return 'http://mail.126.com';
                } else if ($t == 'qq.com' || $t == 'vip.qq.com' || $t == 'foxmail.com') {
                    return 'http://mail.qq.com';
                } else if ($t == 'gmail.com') {
                    return 'http://mail.google.com';
                } else if ($t == 'sohu.com') {
                    return 'http://mail.sohu.com';
                } else if ($t == 'tom.com') {
                    return 'http://mail.tom.com';
                } else if ($t == 'vip.sina.com') {
                    return 'http://vip.sina.com';
                } else if ($t == 'sina.com.cn' || $t == 'sina.com') {
                    return 'http://mail.sina.com.cn';
                } else if ($t == 'tom.com') {
                    return 'http://mail.tom.com';
                } else if ($t == 'yahoo.com.cn' || $t == 'yahoo.cn') {
                    return 'http://mail.cn.yahoo.com';
                } else if ($t == 'tom.com') {
                    return 'http://mail.tom.com';
                } else if ($t == 'yeah.net') {
                    return 'http://www.yeah.net';
                } else if ($t == '21cn.com') {
                    return 'http://mail.21cn.com';
                } else if ($t == 'hotmail.com') {
                    return 'http://www.hotmail.com';
                } else if ($t == 'sogou.com') {
                    return 'http://mail.sogou.com';
                } else if ($t == '188.com') {
                    return 'http://www.188.com';
                } else if ($t == '139.com') {
                    return 'http://mail.10086.cn';
                } else if ($t == '189.cn') {
                    return 'http://webmail15.189.cn/webmail';
                } else if ($t == 'wo.com.cn') {
                    return 'http://mail.wo.com.cn/smsmail';
                } else if ($t == '139.com') {
                    return 'http://mail.10086.cn';
                } else {
                    return 'javascript:void(0);';
                }
            } else {
                return 'javascript:void(0);';
            }
        } else {
            return 'javascript:void(0);';
        }
    }

    var run = function () {
        $('.res_next>a').css({'pointer-events': 'none', 'backgroundColor': '#C6CEDE'});
        $('.agr_next>.lg-btn').css({'pointer-events': 'none', 'backgroundColor': '#C6CEDE'});
        listener();
        //getCode();
    };
    return {
        run: run
    }
}());
module.exports = Listener;