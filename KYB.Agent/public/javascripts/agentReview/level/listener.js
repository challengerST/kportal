/**
 * Created by Jeremy on 2017/1/5.
 */
'use strict';
require('../../general/burster');

var url = require('../../general/function').url
  , Modal = require('../../general/modal');
var Data = require('./data').Data;
var Listener = (function () {
    var listener = function () {
      $(document).on('focus', 'input', function () {
        $(this).select();
      });
      $(document).on('click', '#cancel', function () {
        $('input').each(function () {
          $(this).val($(this).data('init'));
        });
      });
      $(document).on('blur', '.percentage', function () {
        var value = $(this).val() || 100;
        value = parseInt(value);
        if (value > 150) {
          value = 150;
        }
        if (value < 100) {
          value = 100;
        }
        $(this).val(value + '%');
      });
      $(document).on('click', '#submit', function () {
          var data = {
            "Id": $(this).data('id'),
            "agentCompanyId": 0,
            "config": {
              "D": {
                "accountLevelDesc": "黑名单客户",
                "creditDefault": $('.D-cs').val(),
                "creditRate": parseInt($('.D-bl').val()) / 100,
                "creditSettlement": $('.D-zq').val(),
                "orderLimit": $('.D-xe').val(),
                "creditIncrement": 1,
                "creditDecrement": 1,
                "debtRate": 1,
                "riskRate": 1
              },
              "C": {
                "accountLevelDesc": "未认证用户",
                "creditDefault": $('.C-cs').val(),
                "creditRate": parseInt($('.C-bl').val()) / 100,
                "creditSettlement": $('.C-zq').val(),
                "orderLimit": $('.C-xe').val(),
                "creditIncrement": 1,
                "creditDecrement": 1,
                "debtRate": 1,
                "riskRate": 1
              },
              "B": {
                "accountLevelDesc": "普通客户",
                "creditDefault": $('.B-cs').val(),
                "creditRate": parseInt($('.B-bl').val()) / 100,
                "creditSettlement": $('.B-zq').val(),
                "orderLimit": $('.B-xe').val(),
                "creditIncrement": 1,
                "creditDecrement": 1,
                "debtRate": 1,
                "riskRate": 1
              },
              "A": {
                "accountLevelDesc": "普通月结客户",
                "creditDefault": $('.A-cs').val(),
                "creditRate": parseInt($('.A-bl').val()) / 100,
                "creditSettlement": $('.A-zq').val(),
                "orderLimit": $('.A-xe').val(),
                "creditIncrement": 1,
                "creditDecrement": 1,
                "debtRate": 1,
                "riskRate": 1
              },
              "AA": {
                "accountLevelDesc": "VIP月结客户",
                "creditDefault": $('.AA-cs').val(),
                "creditRate": parseInt($('.AA-bl').val()) / 100,
                "creditSettlement": $('.AA-zq').val(),
                "orderLimit": $('.AA-xe').val(),
                "creditIncrement": 1,
                "creditDecrement": 1,
                "debtRate": 1,
                "riskRate": 1
              }
            }
          };
          Data.update(data, function (json) {
            Modal.setAlert(json && 'resCode' in json && json.resCode == 0 ? '保存成功！' : '保存失败！');
          });
        }
      )
      ;
      $(document).on('blur', '.zq', function () {
        var value = $(this).val() || 0;
        $(this).val(parseInt(value) > 90 ? '90' : value);
      });
      $(document).on('blur', '.xe', function () {
        var value = $(this).val() || 0;
        $(this).val(parseInt(value) > 10000 ? '10000' : value);
      });
    };

    var run = function () {
      listener();
    };
    return {
      run: run
    }
  }
  ()
  )
  ;
module.exports.Listener = Listener;