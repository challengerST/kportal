/**
 * Created by Jeremy on 2017/1/5.
 */
'use strict';
require('../../general/burster');

var url = require('../../general/function').url
  , Modal = require('../../general/modal');
var Data = require('./data').Data
  , Dom = require('./dom').Dom;
var Listener = (function () {
  var stateArr = [];
  var listener = function () {
    $(document).on('click', '#search-btn', function () {
      url.set('offset', 0);
      init();
    });
    $(document).on('click', '.pages', function () {
      url.set('offset', $(this).data('offset'));
      init();
    });
    $(document).on('click', '.close-btn', function () {
      $('.alert-part').addClass('dp-n');
      $('.white-back').addClass('dp-n');
    });
    $(document).on('focus', 'input', function () {
      $(this).select();
    });
    $(document).on('click', '.sel-all', function () {
      $('.sg').prop('checked', $(this).prop('checked'));
    });
    $(document).on('click', '.pass', function () {
      stateArr = [];
      stateArr.push($(this).data('id'));
      $('.white-back').removeClass('dp-n');
      $('.open-part').removeClass('dp-n');
    });
    $(document).on('click', '.refuse', function () {
      stateArr = [];
      stateArr.push($(this).data('id'));
      $('.white-back').removeClass('dp-n');
      $('.close-part').removeClass('dp-n');
    });
    $(document).on('click', '#multi-refuse', function () {
      stateArr = [];
      $('input[name="sg"]').each(function () {
        if ($(this).prop('checked')) {
          stateArr.push($(this).data('id'));
        }
      });
      if (stateArr.length > 0) {
        $('.white-back').removeClass('dp-n');
        $('.multi-close-part').removeClass('dp-n');
      }
    });
    $(document).on('click', '#multi-pass', function () {
      stateArr = [];
      $('input[name="sg"]').each(function () {
        if ($(this).prop('checked')) {
          stateArr.push($(this).data('id'));
        }
      });
      if (stateArr.length > 0) {
        $('.white-back').removeClass('dp-n');
        $('.multi-open-part').removeClass('dp-n');
      }
    });
    $(document).on('click', '#close-ensure,#multi-close-ensure', function () {
      var data = {
        "companyIds": stateArr,
        "enable": false
      };
      Data.verify(data, function (json) {
        if (json && 'resCode' in json && json.resCode == 0) {
          Modal.setAlert(json.resMsg || '拒绝成功！', null, function () {
            location.reload();
          });
        } else {
          Modal.setAlert(json.resMsg || '设置失败，请重试！')
        }
      })
    });
    $(document).on('click', '#open-ensure,#multi-open-ensure', function () {
      var data = {
        "companyIds": stateArr,
        "enable": true
      };
      Data.verify(data, function (json) {
        if (json && 'resCode' in json && json.resCode == 0) {
          Modal.setAlert(json.resMsg || '审核成功！', null, function () {
            location.reload();
          });
        } else {
          Modal.setAlert(json.resMsg || '设置失败，请重试！')
        }
      })
    });
  };
  var init = function () {
    var data = {
      offset: url.get('offset') || 0
      , limit: url.get('limit') || 20
      , type: $('#type').find('option:selected').val()
      , keyword: $('#num').val()
    };
    Data.list(data, function (json) {
      Dom.list(json, data);
    });
  };
  var run = function () {
    listener();
    init();
  };
  return {
    run: run
  }
}());
module.exports.Listener = Listener;