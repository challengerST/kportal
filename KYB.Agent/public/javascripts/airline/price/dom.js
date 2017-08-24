/**
 * Created by Jeremy on 2017/2/6.
 */
'use strict';
var Dom = (function () {
  var list = function (json) {
    var str = '';
    var dStr = '<div class="sg-modal add-modal"> <p class="add-p"> <a href="javascript:void(0);" id="add">+添加新模板</a> </p> </div>';
    if (json && json.resCode == 0 && 'resBody' in json && json.resBody && 'sList' in json.resBody && json.resBody.sList instanceof Array) {
      if (json.resBody.sList.length > 0) {
        var arr = json.resBody.sList;
        for (var a in arr) {
          if (arr.hasOwnProperty(a)) {
            var d = arr[a];
            if (d.expenseDefault) {
              dStr += render(d);
            } else {
              str += render(d);
            }
          }
        }
        $('.list-cout').html('<strong>费用模板</strong>现有 ' + (arr.length ) + ' 个费用模板');
      } else {
        str = '<div class="wrong">暂无模板，请添加！</div>';
        $('.list-cout').html('<strong>费用模板</strong>现有 0 个费用模板');
      }
    } else {
      str = '<div class="wrong">请求出错，<a href="">请重试</a>！</div>';
      $('.list-cout').html('<strong>费用模板</strong>现有 0 个费用模板');
    }
    function render(d) {
      var str = '';
      for (var e in d.expenseTemplate) {
        if (d.expenseTemplate.hasOwnProperty(e)) {
          var dt = d.expenseTemplate[e];
          str += '<div class="price-info"> <span class="title">' + dt.itemName + '：</span> <span class="info">CNY ' + dt.itemPrice.toFixed(2) + '</span> </div>';
        }
      }
      return '<div class="sg-modal' + (d.expenseDefault ? ' active' : '') + '"> <p class="sg-header">' + d.expenseName + '</p> ' +
        '<div class="sg-body">' + str + '</div> <div class="sg-foot"> <div class="dp-tb">' +
        ' <a href="javascript:void(0);" class="set-editor" data-id="' + d.templateId + '">编辑</a> ' +
        '<a href="javascript:void(0);" class="set-remove" data-id="' + d.templateId + '">删除</a> ' +
        (d.expenseDefault ? '' : '<a href="javascript:void(0);" class="set-default" data-id="' + d.templateId + '">设为默认</a>' ) +
        '</div> </div> </div>'
    }

    $('.not-default').html(str);
    $('.default').html(dStr);
  };
  var setDetail = function (json) {
    var d = json.resBody, str = '';
    $('#e-name').val(d.expenseName);
    $('#editor-ensure').data('id', d.templateId);
    for (var e in d.expenseTemplate) {
      if (d.expenseTemplate.hasOwnProperty(e)) {
        var dt = d.expenseTemplate[e], unit;
        switch (dt.itemUnit) {
          case 1:
            unit = '/票';
            break;
          case 2:
            unit = '/KG';
            break;
          case 3:
            unit = '/m³';
            break;
          case 4:
            unit = '/件';
            break;
          default:
            unit = '/票';
            break;
        }
        str += '<tr> <td>' + (dt.itemName == '报关费' ? '' : '<input type="checkbox" class="inner-sg"/>') + '</td> <td><input ' + (dt.itemName == '报关费' ? 'readonly' : '') + ' type="text" class="ip-name" value="' + dt.itemName + '"/></td> ' +
        '<td><input type="text" class="ip-price" value="CNY ' + dt.itemPrice.toFixed(2) + '" /></td>' +
        ' <td><input type="text" class="sg-must" readonly value="' + (dt.itemOption ? '费用' : '杂费') + '">' + (dt.itemName == '报关费' ? '' : '<ul class="fill show-unit dp-n"><li>费用</li><li>杂费</li></ul>') + '</td> <td> ' +
        '<input type="text" class="ip-unit" readonly value="' + unit + '"/> ' +
        (dt.itemName == '报关费' ? '' : '<ul class="fill show-unit dp-n"><li>/票</li> <li>/KG</li> <li>/m³</li> <li>/件</li> </ul>') +
        '</td> <td><input type="text" class="ip-remark" value="' + dt.itemRemark + '"/></td> </tr>';
      }
    }
    $('.editor-modal').find('tbody').html(str);
    $('.white-back').removeClass('dp-n');
    $('.editor-modal').removeClass('dp-n');
  };
  return {
    list: list
    , setDetail: setDetail
  }
}());
module.exports.Dom = Dom;