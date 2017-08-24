/**
 * Created by Jeremy on 2017/1/5.
 */
'use strict';
require('../../general/burster');

var url = require('../../general/function').url
  , Modal = require('../../general/modal'),
  Dom = require('./dom').Dom;
var List = {};
var Data = require('./data').Data;
var Listener = (function () {
  var listener = function () {
    var removeData = {};
    $(document).on('focus', 'input', function () {
      $(this).select();
    });
    $(document).on('click', '#editor', function () {
      $('#lxr,#gsyx,#gscz,#gsdz,#gsdh').removeAttr('readonly');
      $('#lxr,#gsyx,#gscz,#gsdz,#gsdh').addClass('border');
      $(this).siblings('a').show();
    });
    $(document).on('click', '#cancel-company', function () {
      $('#lxr,#gsyx,#gscz,#gsdz,#gsdh').each(function () {
        $(this).val($(this).data('val'));
        $(this).prop('readonly', true);
      });
      $('#lxr,#gsyx,#gscz,#gsdz,#gsdh').attr('readonly', true);
      $('#lxr,#gsyx,#gscz,#gsdz,#gsdh').removeClass('border');
      $(this).hide();
      $('#save-company').hide();
    });
    $(document).on('click', '#save-company', function () {
      $('#lxr,#gsyx,#gscz,#gsdz,#gsdh').each(function () {
        $(this).prop('readonly', true);
      });
      var data = {
        "companyId": $(this).data('id'),
        "companyAddress": $('#gsdz').val(),
        "companyTel": $('#gsdh').val(),
        "companyContact": $('#lxr').val(),
        "companyFax": $('#gscz').val(),
        "companyEmail": $('#gsyx').val()
      };
      Data.update(data, function (json) {
        if (json && 'resCode' in json && json.resCode === 0) {
          Modal.setAlert(json.resMsg || '设置成功', null, function () {
            location.reload();
          });
        } else {
          Modal.setAlert(json.resMsg || '设置失败，请重试！');
        }
      });
    });
    $(document).on('click', '.close-btn', function () {
      $('.white-back').addClass('dp-n');
      $('.alert-part').addClass('dp-n');
    });
    $(document).on('click', '#change-xy', function () {
      $('.white-back').removeClass('dp-n');
      $('.xy-part').removeClass('dp-n');
    });
    $(document).on('click', '#change-level', function () {
      $('.white-back').removeClass('dp-n');
      $('.hy-part').removeClass('dp-n');
    });
    $(document).on('blur', '#i-xy', function () {
      var limit = $(this).data('val').split(',');
      if (limit instanceof Array && limit.length == 2) {
        var s = parseInt(limit[1])
          , x = parseInt(limit[0])
          , v = parseInt($(this).val()) || 0;
        if (v > s) {
          $(this).val(s);
        }
        if (v < x) {
          $(this).val(x);
        }
      } else {
        $(this).val('0');
      }
    });
    $(document).on('click', '#xy-ensure', function () {
      var data = {
        "companyId": $(this).data('id'),
        "accountCredit": $('#i-xy').val(),
        "accountCreditRate": parseInt($('#i-bl').val()) / 100
      };
      Data.credit(data, function (json) {
        if (json && 'resCode' in json && json.resCode === 0) {
          Modal.setAlert(json.resMsg || '设置成功', null, function () {
            location.reload();
          });
        } else {
          Modal.setAlert(json.resMsg || '设置失败，请重试！');
        }
      });
    });
    $(document).on('click', '#hy-ensure', function () {
      var data = {
        "companyId": $(this).data('id'),
        "applyLevel": $('#c-level').find('option:selected').val()
      };
      Data.setLevel(data, function (json) {
        if (json && 'resCode' in json && json.resCode === 0) {
          Modal.setAlert(json.resMsg || '设置成功', null, function () {
            location.reload();
          });
        } else {
          Modal.setAlert(json.resMsg || '设置失败，请重试！');
        }
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
    $(document).on('change', '#c-level', function () {
      var ele = $(this).find('option:selected');
      $('.level-xy').html(ele.data('ed'));
      $('.level-zq').html(ele.data('zq') + '天');
    });
    $(document).on('click', '.rm', function () {
      removeData = {};
      removeData.companyId = $(this).data('id');
      removeData.keyName = $(this).data('key');
      $('.white-back').removeClass('dp-n');
      $('.remove-part').removeClass('dp-n');
    });
    $(document).on('click', '#remove-ensure', function () {
      Data.removeImg(removeData, function (json) {
        if (json && 'resCode' in json && json.resCode == 0) {
          var ele = $('.rm[data-key="' + removeData.keyName + '"]').parents('.up-part');
          ele.remove();
          $('.white-back').addClass('dp-n');
          $('.remove-part').addClass('dp-n');
        } else {
          Modal.setAlert('删除失败，请重试！');
        }
      });
    });
    $(document).on('click', 'a.dl', function () {
      var file = $(this).data('key');
      Data.down({file: file}, function (json) {
        if (json && 'resBody' in json) {
          window.open(json.resBody);
        }
      });
    });
  };
  var levelInit = function () {
    Data.level(function (json) {
      if (json && 'resCode' in json && json.resCode == 0) {
        var str = '';
        var lvl = $('#editor').data('level');
        var config = json.resBody.config;
        var dt = {AA: {xy: '', ls: ''}, A: {xy: '', ls: ''}, B: {xy: '', ls: ''}, C: {xy: '', ls: ''}};
        dt['AA']['xy'] = config['AA'].creditDefault + ',1000000';
        dt['A']['xy'] = config['A'].creditDefault + ',' + (config['AA'].creditDefault - 1);
        dt['B']['xy'] = config['B'].creditDefault + ',' + (config['A'].creditDefault - 1);
        dt['C']['xy'] = config['C'].creditDefault + ',' + (config['B'].creditDefault - 1);

        for (var c in config) {
          if (config.hasOwnProperty(c)) {
            var d = config[c];
            str += '<option value="' + c + '" data-ed="' + (d.creditDefault || 0) + '" data-zq="' + (d.creditSettlement || 0) + '"' + (c == lvl ? ' selected' : '') + '>' + c + '</option>';
          }
        }
        $('#c-level').html(str);
        $('.xyfw').html('调整范围：' + dt[lvl]['xy'].split(',').join('-'));
        $('#i-xy').data('val', dt[lvl]['xy']);
        $('.level-xy').html(config[lvl].creditDefault);
        $('.level-zq').html(config[lvl].creditSettlement + '天');
      }
    });
  };
  var companyFile = function () {
    var data = $('#gszl').data('id');
    Data.img({id: data}, function (json) {
      if (json && 'resCode' in json && json.resCode == 0 && json.resBody) {
        var str = '';
        var arr = json.resBody;
        if (arr.length > 0) {
          for (var a in arr) {
            if (arr.hasOwnProperty(a)) {
              var d = arr[a];
              str += '<div class="up-part"> <div class="top">' + d.fileExtension.toUpperCase() + '<a href="javascript:void(0);" class="dl" data-key="' + d.keyName + '"></a> ' +
              '<a href="javascript:void(0);" class="rm" data-id="' + data + '" data-key="' + d.keyName + '"></a> ' +
              '</div> <a href="javascript:void(0);" class="dp-b">' + d.fileName + '</a> ' +
              '</div>';
            }
          }
        } else {
          str='<p style="width: 100%;height: 100px;line-height: 100px;text-align: center;margin: 0;font-size: 20px;">暂无文件</p>'
        }
        $('.img-body').html(str);
      }
    });
  };
  var initInvoice = function () {
    var data = $('#zhzl').data('id');

    Data.invoiceList({id: data},function (json) {
      List = Dom.list(json);
    })
    $(document).on('click', '.change-btn', function () {
      var ele = $('.ticket-modal');
      var d = List[$(this).data('id')];
      var coach = d;
      ele.find('.header').html('修改开票信息 <span class="close-btn">X</span>');
      $('input[name="type"][value="' + d.invoiceType + '"]').click();
      ele.find('#tt').val(d.invoiceTitle);
      ele.find('#sh').val(d.invoiceTaxNum);
      ele.find('#kh').val(d.invoiceBank);
      ele.find('#dz').val(d.invoiceAddress);
      ele.find('#dh').val(d.invoiceTel);
      $('#change-ensure').show();
      $('#submit').hide();
      $('.white-back').removeClass('dp-n');
      ele.removeClass('dp-n');
    });
    $(document).on('click', '.delete-btn', function () {
      var ele = $('#delete-ensure');
      ele.data('id', $(this).data('id'));
      ele.data('gid', $(this).data('gid'));
      $('.white-back').removeClass('dp-n');
      $('.delete-part').removeClass('dp-n');
    });
    $(document).on('click', '#delete-ensure', function () {
      var data = {
        "list": [parseInt($(this).data('id'))]
      };
      Data.del(data, function (json) {
        if (json && 'resCode' in json && json.resCode != 0) {
          Modal.setAlert(json.resMsg);
        } else {
          Modal.setAlert(json.resMsg || '删除成功', null, function () {
            location.reload();
          });
        }
      });
    });
  };
  var run = function () {
    listener();
    levelInit();
    companyFile();
    initInvoice();
  };
  return {
    run: run
  }
}());
module.exports.Listener = Listener;