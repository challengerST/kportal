/**
 * Created by Jeremy on 2017/1/5.
 */
'use strict';
var Data = require('./data').Data
  , Dom = require('./dom').Dom
  , url = require('../../general/function').url
  , Modal = require('../../general/modal');
var Listener = (function () {
  var listener = function () {
    $(document).on('click', '.close-btn', function () {
      $('.alert-part').addClass('dp-n');
      $('.white-back').addClass('dp-n');
    });
    $(document).on('focus', 'input', function () {
      $(this).select();
    });
    $(document).on('blur', '.ip-price', function () {
      var value = $(this).val() || '0';
      value = value.replace(/[^\d.]/g, '');
      $(this).val('CNY ' + parseFloat(value).toFixed(2));
    });
    $(document).on('keyup', '.ip-price', function () {
      $(this).val($(this).val().replace(/[^\d.]/g, ""));
    });
    $(document).on('click', '.ip-unit,.sg-must', function () {
      $('.show-unit').addClass('dp-n');
      $(this).siblings('ul').removeClass('dp-n');
    });
    $(document).on('click', '.show-unit li', function () {
      $(this).parent().siblings('input').val($(this).text());
      $(this).parent().addClass('dp-n');
    });
    $(document).on('click', function (e) {
      var target = $(e.target);
      if (target.closest('.show-unit,.ip-unit,.sg-must').length == 0) {
        $('.show-unit').addClass('dp-n');
      }
    });
    $(document).on('click', '#add', function () {
      var str = '<tr> <td></td> <td><input type="text" class="ip-name" value="报关费" readonly/></td> ' +
        '<td><input type="text" class="ip-price" value="CNY 0.00" /></td>' +
        ' <td><input type="text" class="sg-must" readonly value="费用"/></td> <td> ' +
        '<input type="text" class="ip-unit" readonly value="/票"/></td> <td><input type="text" class="ip-remark"/></td> </tr>';
      $('#name').val('');
      $('.add-modal').find('tbody').html(str);
      $('.add-modal').removeClass('dp-n');
      $('.white-back').removeClass('dp-n');
    });
    $(document).on('click', '.inner-add', function () {
      var str = '<tr> <td><input type="checkbox" class="inner-sg"/></td> <td><input type="text" class="ip-name"/></td> ' +
        '<td><input type="text" class="ip-price" value="CNY 0.00" /></td>' +
        ' <td><input type="text" class="sg-must" readonly/><ul class="fill show-unit dp-n"><li>费用</li><li>杂费</li></ul></td> <td> ' +
        '<input type="text" class="ip-unit" readonly value="/票"/> <ul class="fill show-unit dp-n"> ' +
        '<li>/票</li> <li>/KG</li> <li>/m³</li> <li>/件</li> </ul> </td> <td><input type="text" class="ip-remark"/></td> </tr>';
      $(this).parents('.alert-part').find('tbody').append(str);
    });
    $(document).on('click', '.inner-remove', function () {
      $(this).parents('.alert-part').find('.inner-sg').each(function () {
        if ($(this).prop('checked')) {
          $(this).parents('tr').remove();
        }
      });
    });
    $(document).on('click', '#add-ensure', function () {
      var pass = true;
      if ($('#a-name').val()) {
        $('#a-name').removeClass('warm');
      } else {
        $('#a-name').addClass('warm');
        pass = false;
      }
      $('.add-modal').find('.ip-name').each(function () {
        if (!$(this).val()) {
          $(this).addClass('warm');
          pass = false;
        } else {
          $(this).removeClass('warm');
        }
      });
      $('.add-modal').find('.ip-price').each(function () {
        var value = $(this).val().replace(/[^\d.]/g, '');
        if (parseFloat(value) <= 0) {
          $(this).addClass('warm');
          pass = false;
        } else {
          $(this).removeClass('warm');
        }
      });
      if (pass) {
        var data = {
          "expenseName": $('#a-name').val(),
          "expenseTemplate": [],
          "companyId": 0
        };
        var ele = $('.add-modal').find('tbody').find('tr');
        ele.each(function () {
          var unit
            , price = $(this).find('.ip-price').val().replace(/[^\d.]/g, '');
          switch ($(this).find('.ip-unit').val()) {
            case '/票':
              unit = 1;
              break;
            case '/KG':
              unit = 2;
              break;
            case '/m³':
              unit = 3;
              break;
            case '/件':
              unit = 4;
              break;
            default:
              unit = 1;
              break;
          }
          var d = {
            "itemName": $(this).find('.ip-name').val(),
            "itemPrice": price,
            "itemUnit": unit,
            "itemOption": $(this).find('.sg-must').val() == '费用',
            "itemRemark": $(this).find('.ip-remark').val()
          };
          data['expenseTemplate'].push(d);
        });
        Data.add(data, function (json) {
          if (json && 'resCode' in json && json.resCode == 0) {
            Modal.setAlert(json.resMsg || '添加成功！', null, function () {
              location.reload();
            });
          } else {
            Modal.setAlert(json.resMsg || '添加失败，请重试！');
          }
        });
      }
    });
    $(document).on('click', '.set-remove', function () {
      $('#delete-ensure').data('id', $(this).data('id'));
      $('.white-back').removeClass('dp-n');
      $('.delete-part').removeClass('dp-n');
    });
    $(document).on('click', '.set-default', function () {
      $('#default-ensure').data('id', $(this).data('id'));
      $('.white-back').removeClass('dp-n');
      $('.default-part').removeClass('dp-n');
    });
    $(document).on('click', '.set-editor', function () {
      Data.detail({id: $(this).data('id')}, function (json) {
        if (json && 'resCode' in json && json.resCode == 0) {
          Dom.setDetail(json);
        } else {
          Modal.setAlert(json.resMsg || '获取详情失败，请重试！');
        }
      });
    });
    $(document).on('click', '#delete-ensure', function () {
      Data.del({templateId: $(this).data('id')}, function (json) {
        if (json && 'resCode' in json && json.resCode == 0) {
          Modal.setAlert(json.resMsg || '删除成功！', null, function () {
            location.reload();
          });
        } else {
          Modal.setAlert(json.resMsg || '删除失败，请重试！');
        }
      });
    });
    $(document).on('click', '#default-ensure', function () {
      Data.def({templateId: $(this).data('id')}, function (json) {
        if (json && 'resCode' in json && json.resCode == 0) {
          Modal.setAlert(json.resMsg || '设置成功！', null, function () {
            location.reload();
          });
        } else {
          Modal.setAlert(json.resMsg || '设置失败，请重试！');
        }
      });
    });
    $(document).on('click', '#editor-ensure', function () {
      var pass = true;
      if ($('#e-name').val()) {
        $('#e-name').removeClass('warm');
      } else {
        $('#e-name').addClass('warm');
        pass = false;
      }
      $('.editor-modal').find('.ip-name').each(function () {
        if (!$(this).val()) {
          $(this).addClass('warm');
          pass = false;
        } else {
          $(this).removeClass('warm');
        }
      });
      $('.editor-modal').find('.ip-price').each(function () {
        var value = $(this).val().replace(/[^\d.]/g, '');
        if (parseFloat(value) <= 0) {
          $(this).addClass('warm');
          pass = false;
        } else {
          $(this).removeClass('warm');
        }
      });
      if (pass) {
        var data = {
          "expenseName": $('#e-name').val(),
          "expenseTemplate": [],
          "companyId": 0,
          "templateId": $(this).data('id'),
          "expenseState": 1
        };
        var ele = $('.editor-modal').find('tbody').find('tr');
        ele.each(function () {
          var unit
            , price = $(this).find('.ip-price').val().replace(/[^\d.]/g, '');
          switch ($(this).find('.ip-unit').val()) {
            case '/票':
              unit = 1;
              break;
            case '/KG':
              unit = 2;
              break;
            case '/m³':
              unit = 3;
              break;
            case '/件':
              unit = 4;
              break;
            default:
              unit = 1;
              break;
          }
          var d = {
            "itemName": $(this).find('.ip-name').val(),
            "itemPrice": price,
            "itemUnit": unit,
            "itemOption": $(this).find('.sg-must').val() == '费用',
            "itemRemark": $(this).find('.ip-remark').val()
          };
          data['expenseTemplate'].push(d);
        });
        Data.update(data, function (json) {
          if (json && 'resCode' in json && json.resCode == 0) {
            Modal.setAlert(json.resMsg || '编辑成功！', null, function () {
              location.reload();
            });
          } else {
            Modal.setAlert(json.resMsg || '编辑失败，请重试！');
          }
        });
      }
    });
    $(document).on('click', '#refresh', function () {
      init();
    });
  };
  var init = function () {
    Data.list(function (json) {
      Dom.list(json);
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