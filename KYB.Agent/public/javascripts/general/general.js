/**
 * Created by Jeremy on 2017/1/23.
 */
'use strict';
var Modal = require('./modal');
var general = (function () {
    var run = function () {
        //时间格式化
        Date.prototype.Format = function (fmt) { //author: Jeremyyy
            var o = {
                "M+": this.getMonth() + 1, //月份
                "d+": this.getDate(), //日
                "h+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        };

        //修改密码
        $(document).on('click', '#change-pwd', function () {
            $('.change-back').removeClass('dp-n');
            $('.change-pwd').removeClass('dp-n');
        });
        //关闭修改密码
        $(document).on('click', '.close-pwd', function () {
            $('.change-back').addClass('dp-n');
            $('.change-pwd').addClass('dp-n');
        });
        $(document).on('click', '#ensure-pwd', function () {
            if ($('#new-password').val() != $('#ensure-password').val()) {
                $('#ensure-password').addClass('warm');
            } else {
                $('#ensure-password').removeClass('warm');
                var data = {
                    "agentMemberId": 0,
                    "oldPwd": $('#password').val(),
                    "pwd": $('#new-password').val(),
                    "pwdConfirm": $('#ensure-password').val()
                };
                $.ajax({
                    url: '/api/account/changePwd'
                    , type: 'post'
                    , data: data
                    , dataType: 'json'
                    , timeout: 100000
                    , success: function (json) {
                        if (json && 'resCode' in json && json.resCode == 0) {
                            Modal.setAlert('修改成功！', null, function () {
                                $('.change-back').addClass('dp-n');
                                $('.change-pwd').addClass('dp-n');
                            });
                        } else {
                            Modal.setAlert(json.resMsg || '修改失败，请重试！');
                        }
                    }
                });
            }
        });
    };
    return {
        run: run
    }
}());
module.exports.general = general;