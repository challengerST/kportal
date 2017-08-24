/**
 * Created by Jeremy on 2017/1/5.
 */
'use strict';
require('../../general/burster');
var Data = require('./data').Data
    , Dom = require('./dom').Dom;
var url = require('../../general/function').url
    , Modal = require('../../general/modal');
var Listener = (function () {
    var operateArr = [];
    var listener = function () {
        $(document).on('click', '#sel-all', function () {
            $('input[name="sg"]').prop('checked', $(this).prop('checked'));
        });
        $(document).on('click', '.pages', function () {
            url.set('offset', $(this).data('offset'));
            init();
        });
        $(document).on('click', '.close-btn', function () {
            $('.white-back').addClass('dp-n');
            $('.alert-part').addClass('dp-n');
        });
        $(document).on('click', '.add', function () {
            var ele = $('.add-modal');
            ele.find('input').val('');
            ele.find('.warm').addClass('dp-n');
            $('.white-back').removeClass('dp-n');
            ele.removeClass('dp-n');
        });
        $(document).on('click', '.enable', function () {
            operateArr = [];
            $('input[type="checkbox"][name="sg"]:checked').each(function () {
                operateArr.push($(this).data('id'));
            });
            if (operateArr.length > 0) {
                $('.white-back').removeClass('dp-n');
                $('.enable-part').removeClass('dp-n');
            }
        });
        $(document).on('click', '.disable', function () {
            operateArr = [];
            $('input[type="checkbox"][name="sg"]:checked').each(function () {
                operateArr.push($(this).data('id'));
            });
            if (operateArr.length > 0) {
                $('.white-back').removeClass('dp-n');
                $('.disable-part').removeClass('dp-n');
            }
        });
        $(document).on('click', '.delete', function () {
            operateArr = [];
            $('input[type="checkbox"][name="sg"]:checked').each(function () {
                operateArr.push($(this).data('id'));
            });
            if (operateArr.length > 0) {
                $('.white-back').removeClass('dp-n');
                $('.delete-part').removeClass('dp-n');
            }
        });
        $(document).on('click', '.reset', function () {
            operateArr = [];
            $('input[type="checkbox"][name="sg"]:checked').each(function () {
                operateArr.push($(this).data('id'));
            });
            if (operateArr.length > 0) {
                $('.white-back').removeClass('dp-n');
                $('.reset-part').removeClass('dp-n');
            }
        });
    };
    var submit = function () {
        $(document).on('click', '#add-ensure', function () {
            var pass = true;
            $('.a-require').each(function () {
                if (!$(this).val()) {
                    $(this).addClass('b-red');
                    pass = false;
                } else {
                    $(this).removeClass('b-red');
                }
            });
            //验证手机号
            var tel = $('#a-tel')
                , telReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
            if (tel.val()) {
                if (telReg.test(tel.val())) {
                    Data.checkMobile({mobile: tel.val()}, function (json) {
                        if (json && 'resCode' in json && json.resCode == 0) {
                            tel.siblings('.warm').addClass('dp-n');
                            tel.removeClass('b-red');
                        } else {
                            pass = false;
                            tel.siblings('.warm').html('该手机号已注册').removeClass('dp-n');
                            tel.addClass('b-red');
                        }
                    });
                } else {
                    pass = false;
                    tel.siblings('.warm').html('手机号格式错误').removeClass('dp-n');
                    tel.addClass('b-red');
                }
            }
            //验证邮箱
            var mail = $('#a-mail')
                , mailReg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
            if (mail.val()) {
                if (!mailReg.test(mail.val())) {
                    pass = false;
                    mail.siblings('.warm').html('邮箱格式错误').removeClass('dp-n');
                    mail.addClass('b-red');
                } else {
                    mail.siblings('.warm').addClass('dp-n');
                    mail.removeClass('b-red');
                }
            }
            if (pass) {
                var data = {
                    "agentMemberId": 0,
                    "companyId": 0,
                    "roleId": $('#a-role').find('option:selected').val(),
                    "mobile": $('#a-tel').val(),
                    "QQ": $('#a-qq').val(),
                    "name": $('#a-name').val(),
                    "email": $('#a-mail').val(),
                    "password": 'kyb' + $('#a-tel').val(),
                    "passwordConfirm": 'kyb' + $('#a-tel').val()
                };
                Data.add(data, function (json) {
                    if (json && 'resCode' in json && json.resCode == 0) {
                        Modal.setAlert('新增成功！', null, function () {
                            location.reload();
                        });
                    } else {
                        Modal.setAlert(json.resMsg || '新增失败，请重试！');
                    }
                });
            }
        });
        $(document).on('click', '#disable-ensure', function () {
            var data = {
                "isEnabled": false,
                "agentMembersId": operateArr,
                "requestAgentMemberId": 0
            };
            Data.multiStates(data, function (json) {
                if (json && 'resCode' in json && json.resCode == 0) {
                    Modal.setAlert('禁用成功！', null, function () {
                        location.reload();
                    });
                } else {
                    Modal.setAlert(json.resMsg || '禁用失败，请重试！');
                }
            });
        });
        $(document).on('click', '#enable-ensure', function () {
            var data = {
                "isEnabled": true,
                "agentMembersId": operateArr,
                "requestAgentMemberId": 0
            };
            Data.multiStates(data, function (json) {
                if (json && 'resCode' in json && json.resCode == 0) {
                    Modal.setAlert('启用成功！', null, function () {
                        location.reload();
                    });
                } else {
                    Modal.setAlert(json.resMsg || '启用失败，请重试！');
                }
            });
        });
        $(document).on('click', '#enable-delete', function () {
            var data = {
                "agentIds": operateArr,
                "operatorId": 0
            };
            Data.del(data, function (json) {
                if (json && 'resCode' in json && json.resCode == 0) {
                    Modal.setAlert('删除成功！', null, function () {
                        location.reload();
                    });
                } else {
                    Modal.setAlert(json.resMsg || '删除失败，请重试！');
                }
            });
        });
        $(document).on('click', '#enable-reset', function () {
            var data = {
                "agentMemberIds": operateArr,
                "operatorId": 0
            };
            Data.reset(data, function (json) {
                if (json && 'resCode' in json && json.resCode == 0) {
                    Modal.setAlert('重置成功！', null, function () {
                        location.reload();
                    });
                } else {
                    Modal.setAlert(json.resMsg || '重置失败，请重试！');
                }
            });
        });
    };
    var init = function () {
        var data = {
            "companyId": 0,
            "roleId": 99,
            "memberId": 0,
            "state": 99,
            "requireMeberId": 0,
            "offset": url.get('offset') || 0,
            "limit": url.get('limit') || 20
        };
        Data.list(data, function (json) {
            Dom.list(json, data);
        });
    };
    var roleInit = function () {
        Data.role(function (json) {
            var str = '';
            if (json && 'resBody' in json && json.resBody instanceof Array) {
                var arr = json.resBody;
                for (var a in arr) {
                    if (arr.hasOwnProperty(a)) {
                        var d = arr[a];
                        str += '<option value="' + d.roleId + '">' + d.roleName + '</option>';
                    }
                }
            }
            $('#a-role').html(str);
        });
    };
    var run = function () {
        listener();
        init();
        submit();
        roleInit();
    };
    return {
        run: run
    }
}());
module.exports.Listener = Listener;