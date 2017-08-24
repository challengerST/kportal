/**
 * Created by Jeremy on 2016/11/22.
 */
"use strict";
var Modal = require('../frame/modal');
var Data = require('./data').Data;
var Listener = (function () {
  var listener = function () {
    $(document).on('click', '.submit', function () {
      var or = $('#original')
        , ch = $('#new')
        , rp = $('#repeat');
      var ori = or.val()
        , change = ch.val()
        , repeat = rp.val()
        , reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
      var st1 = false
        , st2 = false
        , st3 = false;
      //原密码非空
      if (!ori) {
        st1 = false;
        or.parents('.input').find('span').removeClass('hide').html('原密码不能为空');
      } else {
        st1 = true;
        or.parents('.input').find('span').addClass('hide')
      }
      //新密码非空&&匹配正则
      if (!change) {
        st2 = false;
        ch.parents('.input').find('span').removeClass('hide').html('新密码不能为空');
      } else {
        if (reg.test(change)) {
          st2 = true;
          ch.parents('.input').find('span').addClass('hide');
        } else {
          st2 = false;
          ch.parents('.input').find('span').removeClass('hide').html('6-20位的密码，必须由数字和英文组合');
        }
      }
      //确认密码相同
      if (repeat != change) {
        st3 = false;
        rp.parents('.input').find('span').removeClass('hide').html('两次输入不一样');
      } else {
        st3 = true;
        rp.parents('.input').find('span').addClass('hide')
      }
      //通过提交
      if (st1 && st2 && st3) {
        var data = {
          password: ori
          , newPassword: change
        };
        Data.reset(data, function (json) {
          Modal.setAlert(json.resMsg || (json.resCode == 0 ? '修改成功' : '修改失败，请重试'));
        });
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