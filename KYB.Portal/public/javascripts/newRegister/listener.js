/**
 * Created by Jeremy on 2016/11/22.
 */
"use strict";
var Modal = require('../frame/modal');
var Listener = (function () {
    var Data = require('./data').Data;
    var tel = false
    //, pwd = false
    //, repeat = false
    //, code = true
        , msg = false
        , mail = false
        , check = true
        , next = false
        , newRegName = false;
    var mailUrl = '';
    var listener = function () {
        //输入姓名
        $(document).on('click', '.agr_name .agr_wrong', function () {
            $(this).parent().find('.agr_wrong').hide();
            $('#agr_name').focus();
            $(this).css('border-color','#c6cede');
        });
        $(document).on('focus', '#agr_name', function () {
            $(this).parent().find('.agr_wrong').hide();
            $(this).parent().find('.info').hide();
            $(this).css('border-color','#c6cede');
        });
        $(document).on('blur', '#agr_name', function () {
            var reg1 = /^[a-zA-Z ]{1,20}$/,
                reg2 = /^[\u4e00-\u9fa5]{2,5}$/
                , value = $(this).val();
            if (value=='') {
                $(this).parent().find('.agr_wrong').show();
                $(this).css('border-color','red');
            } else {
                if (reg1.test(value) || reg2.test(value)) {
                    newRegName = true;
                    $(this).removeClass('wrong');
                    $(this).parent().find('.info').hide();
                }
                else {
                    newRegName = false;
                    $(this).addClass('wrong');
                    $(this).parent().find('.info').show();
                    $(this).css('border-color','red');
                }
            }
            pass();
        });
        //输入邮箱
        $(document).on('click', '.ensure .agr_wrong', function () {
            $(this).parent().find('.agr_wrong').hide();
            $('#mail').focus();
            $(this).css('border-color','#c6cede');
        });
        $(document).on('focus', '#mail', function () {
            $(this).parent().find('.agr_wrong').hide();
            $(this).css('border-color','#c6cede');
            $(this).parent().find('.info').hide();
        });
        $(document).on('blur', '#mail', function () {
            var reg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]{2,4})+$/
                , value = $(this).val();
            if (value=='') {
                $(this).parent().find('.agr_wrong').show();
                $(this).css('border-color','red');
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
                    $(this).css('border-color','red');
                }
            }
            pass();
        });
        //输入电话
        $(document).on('click', '.tel .agr_wrong', function () {
            $(this).parent().find('.agr_wrong').hide();
            $('#tel').focus();
            $(this).css('border-color','#c6cede');
        });
        $(document).on('focus', '#tel', function () {
            $(this).parent().find('.agr_wrong').hide();
            $(this).css('border-color','#c6cede');
            $(this).parent().find('.info').hide();
        });
        $(document).on('blur', '#tel', function () {
            var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
                , value = $(this).val();
            if (value=='') {
                $(this).parent().find('.agr_wrong').show();
                $(this).css('border-color','red');
            } else {
                if (reg.test(value)) {
                    tel = true;
                    $(this).removeClass('wrong');
                    $(this).siblings('.info').hide();
                } else {
                    tel = false;
                    $(this).addClass('wrong');
                    $(this).siblings('.info').show();
                    $(this).css('border-color','red');
                }
            }
            pass();
        });
        //输入短信验证码
        if($('#tel')==''){
            $('#p-msg').attr('disabled', true);
        }else{
            $(document).on('click', '.phone-msg .agr_wrong', function () {
                $(this).parent().find('.agr_wrong').hide();
                $('#mail').focus();
                $(this).css('border-color','#c6cede');
            });
            $(document).on('focus', '#p-msg', function () {
                $(this).parent().find('.agr_wrong').hide();
                $(this).css('border-color','#c6cede');
                $(this).parent().find('.info').hide();
            });
            $(document).on('blur', '#p-msg', function () {
                var value = $(this).val();
                if (value=='') {
                    $(this).parent().find('.agr_wrong').show();
                    $(this).css('border-color','red');
                } else {
                    if (value) {
                        msg = true;
                        $(this).removeClass('wrong');
                        $(this).siblings('.info').addClass('dp-n');
                    } else {
                        msg = false;
                        $(this).addClass('wrong');
                        $(this).siblings('.info').removeClass('dp-n');
                        $(this).css('border-color','#red');
                    }
                }
                pass();
            });
        }
        //同意协议勾选
        $(document).on('click', '#check', function () {
            check = $(this).prop('checked');
            pass();
        });
        //判断必选项是否填写
        var pass = function () {
            var ele = $('#register');
            if (tel && msg && check && mail && newRegName) {
                //ele.attr('disabled', false);
                next = true;
            } else {
                //ele.attr('disabled', true);
                next = false;
            }
        };
        $('.p-msg').click(function () {
            sendPhone();
        });
        //注册
        $(document).on('click', '.agr_next .lg-btn', function () {
            if (next) {
                var data = {
                    mobile: $('#tel').val()
                    , smsCode: $('#p-msg').val()
                    , email: $('#mail').val()
                    , name: $('#agr_name').val()
                };
                Data.nextStep(data, function (data) {
                    if (data && 'resCode' in data && data.resCode == 0) {
                        window.location.href = "./Certification?id="+ data.resBody.applyId;
                    } else {
                        Modal.setAlert(data.resMsg);
                    }
                });
            } else {
                Modal.setAlert('请填写完整');
            }
        });
        //验证码切换
    };

    //获取图形验证码
    //发送验证码
    var sendPhone = function () {
        var _this = $('.p-msg');
        if (tel) {
            Data.checkSms({mobile: $('#tel').val()}, function (json) {
                if (json && 'resCode' in json && json.resCode == 0) {
                    _this.prop('disabled', true);
                    _this.css({'background':'#e7ebf2','color':'#006bbd'});
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
                            _this.css('background','#fff');
                        }
                    }, 1000)
                } else {
                    _this.prop('disabled', false);
                    Modal.setAlert(json.resMsg);
                }
            });
        }
    };

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
        listener();
        //getGt();
        //getCode();
        sendPhone();
    };
    return {
        run: run
    }
}());
module.exports = Listener;