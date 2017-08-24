/**
 * Created by Jeremy on 2016/11/22.
 */
"use strict";
require('../frame/burster');
var Modal = require('../frame/modal');
var url = require('../frame/function').url;
var Data = require('./data').Data
    , Dom = require('./dom').Dom;
var Listener = (function () {
    var operateId;
    var operateArr = [];
    var listener = function () {
        $(document).on('change', '#a-role', function () {
            var role = $(this).find('option:selected').text()
                , name = $(this).data('v');
            if (role == name) {
                $('#submit').addClass('hide');
            } else {
                $('#submit').removeClass('hide');
            }
        });
        $(document).on('click', '.close-btn', function () {
            $('.white-back').addClass('dp-n');
            $('.alert-part').addClass('dp-n');
        });
        $(document).on('click', '#transfer', function () {
            operateArr = [];
            $('input[type="checkbox"][name="sg"]:checked').each(function () {
                operateArr.push($(this).data('id'));
            });
            if (operateArr.length > 0) {
                $('.white-back').removeClass('dp-n');
                $('.add-modal').removeClass('dp-n');
            }
        });
        $(document).on('change', '#m-list', function () {
            var ele = $(this).find('option:selected');
            var tel = ele.data('tel')
                , mail = ele.data('mail');
            $('.add-modal').find('.js-mobile').html(tel);
            $('.add-modal').find('.js-mail').html(mail);
        });
        $(document).on('click', '#add-ensure', function () {
            var mid = $('#m-list').find('option:selected').val() || '';
            if (mid) {
                var data = {
                    "orderIds": operateArr,
                    "companyId": 0,
                    "memberFrom": $(this).data('id'),
                    "memberTo": mid,
                    "requireMeberId": 0
                };
                Data.transfer(data, function (json) {
                    if (json && 'resCode' in json && json.resCode == 0) {
                        Modal.setAlert('转移成功！', null, function () {
                            location.reload();
                        });
                    } else {
                        Modal.setAlert(json.Msg || '转移失败，请重试！');
                    }
                });
            }
        });
        $(document).on('click', '#submit', function () {
            var txt = $('#a-role').find('option:selected').text();
            operateId = $('#a-role').find('option:selected').val();
            if (txt) {
                $('.u-role').html(txt);
                $('.white-back').removeClass('dp-n');
                $('.update-part').removeClass('dp-n');
            }
        });
        $(document).on('click', '#update-ensure', function () {
            var data = {
                "memberId": $(this).data('id'),
                "requestMemberId": 0,
                "roleId": operateId
            };
            Data.update(data, function (json) {
                if (json && 'resCode' in json && json.resCode == 0) {
                    Modal.setAlert('修改成功！', null, function () {
                        location.reload();
                    });
                } else {
                    Modal.setAlert('修改失败，请重试！');
                }
            });
        });
    };
    var roleInit = function () {
        Data.role(function (json) {
            var str = '';
            var name = $('#a-role').data('v');
            if (json && 'resBody' in json && json.resBody instanceof Array) {
                var arr = json.resBody;
                for (var a in arr) {
                    if (arr.hasOwnProperty(a)) {
                        var d = arr[a];
                        str += '<option value="' + d.roleId + '"' + (name == d.roleName ? ' selected' : '') + '>' + d.roleName + '</option>';
                    }
                }
            }
            $('#a-role').html(str);
        });
    };
    var init = function () {
        var data = {
            "memberId": $('.outer-tb').data('id'),
            "offset": url.get('offset') || 0,
            "limit": url.get('limit') || 20
        };
        Data.orders(data, function (json) {
            Dom.list(json, data);
        });
    };
    var memberInit = function () {
        var data = {
            "companyId": 0,
            "roleId": 99,
            "state": 99,
            "offset": 0,
            "limit": 20
        };
        Data.list(data, function (json) {
            var str = '';
            var tel = '/', mail = '/';
            if (json && 'resBody' in json && json.resBody && 'sList' in json.resBody && json.resBody.sList && json.resBody.sList instanceof Array && json.resBody.sList.length > 0) {
                var arr = json.resBody.sList;
                for (var a in arr) {
                    if (arr.hasOwnProperty(a)) {
                        var d = arr[a];
                        if (a == 0) {
                            tel = d.member.mobile;
                            mail = d.member.email;
                        }
                        str += '<option value="' + d.member.memberId + '" data-tel="' + d.member.mobile + '" data-mail="' + d.member.email + '">' + (d.member.name || '/') + '</option>'
                    }
                }
            }
            $('.add-modal').find('.js-mobile').html(tel);
            $('.add-modal').find('.js-mail').html(mail);
            $('#m-list').html(str);
        });
    };
    var run = function () {
        listener();
        roleInit();
        init();
        memberInit();
    };
    return {
        run: run
    }
}());
module.exports = Listener;