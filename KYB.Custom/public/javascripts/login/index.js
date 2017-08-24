/**
 * Created by Jeremy on 2016/12/27.
 */
'use strict';
var Modal = require('../general/modal');
var ndc = needCode;

$(document).on('click', '#submit', function () {
    var id = $('#account')
        , pwd = $('#pwd')
        , code = $('#verify');
    if (!id.val()) {//验证用户名
        id.siblings('.warm').show();
    } else {
        id.siblings('.warm').hide();
    }
    if (!pwd.val()) {//验证密码
        pwd.siblings('.warm').show();
    } else {
        pwd.siblings('.warm').hide();
    }
    if (ndc == 1) {
        if (!code.val()) {//验证码
            code.siblings('.warm').show();
        } else {
            code.siblings('.warm').hide();
        }
    }
    if (ndc == 1 && !code.val()) {
        code.siblings('.warm').show();
    } else {
        var data = {
            id: id.val()
            , pwd: pwd.val()
            , Code: code.val()
        };
        if (data.id && data.pwd) {
            editor(data, function (json) {
                if (json && 'resCode' in json && json.resCode == 0) {
                    if ('Redirect' in json.resBody) {
                        location.href = json.resBody.Redirect;
                    } else {
                        if ('url' in json && json.url) {
                            location.href = json.url;
                        } else {
                            location.href = '/order/pre';
                        }
                    }
                } else {
                    Modal.setAlert(json.resMsg || '登录失败，请重试！');
                    ndc = json.needCode;
                    if (ndc == 1) {
                        $('.verify').show();
                        $('.login-box').addClass('big-box');
                    }
                    getCode();
                }
            });
        }
    }
});
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
var getCode = function () {
    var src = '/login/captcha?';
    var getNum = function () {
        var num = '';
        for (var i = 0; i < 4; i++) {
            num = num + parseInt(10 * Math.random());
        }
        return num;
    };
    src += getNum();
    $('#yzm').attr('src', src);
};
getCode();

$(document).on('click', '#yzm', function () {
    getCode();
});