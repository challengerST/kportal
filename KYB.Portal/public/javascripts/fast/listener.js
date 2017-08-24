/**
 * Created by Jeremy on 2016/11/22.
 */
"use strict";
require('../frame/burster');
var url = require('../frame/function').url;
var Modal = require('../frame/modal');
var Data = require('./data').Data;
var Listener = (function () {
  var listener = function () {
    $('#right-time').datetimepicker({
      format: 'yyyy-mm-dd',//日期的格式
      startDate: new Date(),//选择器的开始日期
      autoclose: true,//日期选择完成后是否关闭选择框
      bootcssVer: 3,//显示向左向右的箭头
      language: 'zh-CN',//语言
      minView: "month"//表示日期选择的最小范围，默认是hour
    }).on('changeDate', function (e) {
      var ele = $('#expect-time');
      ele.val('');
      ele.datetimepicker('setStartDate', new Date(new Date(e.date)));
      ele.datetimepicker('setInitialDate', new Date(e.date));
      airInit();
    });
    $('#expect-time').datetimepicker({
      format: 'yyyy-mm-dd',//日期的格式
      startDate: new Date(),//选择器的开始日期
      autoclose: true,//日期选择完成后是否关闭选择框
      bootcssVer: 3,//显示向左向右的箭头
      language: 'zh-CN',//语言
      minView: "month"//表示日期选择的最小范围，默认是hour
      , initialDate: new Date()
    });
    $(document).on('blur', '#name', function () {
      var val = $(this).val();
      if (val == '' || new RegExp("^[ ]+$").test(val)) {
        $(this).val('consol');
      }
    });
    $(document).on('click', '.close-btn', function () {
      $('.white-back').addClass('dp-n');
      $('.show-part').addClass('dp-n');
    });
    $(document).on('click', '.show-price', function () {
      $('.white-back').removeClass('dp-n');
      $('.price-list').removeClass('dp-n');
    });
    $(document).on('click', '.show-other', function () {
      var ele = $('.other-list');
      var height = 50;
      height += ele.find('tr').length * 30;
      ele.css('margin-top', '-' + parseInt(height / 2) + 'px');
      $('.white-back').removeClass('dp-n');
      ele.removeClass('dp-n');
    });
    $(document).on('click', '#submit', function () {
      var start = $('#right-start').val()
        , end = $('#right-end').val()
        , dt = $('#right-time').val()
        , size = $('#vol').val()
        , weight = $('#wei').val()
        , num = $('#num').val()
        , hope = $('#qwjg').val();
      if (start && end && dt && size && weight && num && hope) {
        $('input').removeClass('warm');
        var data = {
          "memberId": 0,
          "agentCompanyId": 10000,
          "deptCode": start,
          "destCode": end,
          "flightDate": dt,
          "arrivalDate": $('#expect-time').val(),
          "airCompanyCode": $('#right-com').val(),
          "cargoName": $('#name').val(),
          "cargoType": $('#danger').find('option:selected').val(),
          "cargoCount": $('#num').val(),
          "cargoWeight": $('#wei').val(),
          "cargoSize": $('#vol').val(),
          "customDeclare": $('#custom').find('option:selected').val() == 1,
          "contractPrice": hope
        };
        Data.order(data, function (json) {
          if (json && 'resCode' in json && json.resCode == 0) {
            location.href = '/order';
          } else if (json && 'resCode' in json && json.resCode == -100) {
            location.href = "/login";
          } else {
            Modal.setAlert(json.resMsg || '委托失败，请重试！');
          }
        });
      } else {
        if (!start) {
          $('#right-start').addClass('warm');
        } else {
          $('#right-start').removeClass('warm');
        }
        if (!end) {
          $('#right-end').addClass('warm');
        } else {
          $('#right-end').removeClass('warm');
        }
        if (!dt) {
          $('#right-time').addClass('warm');
        } else {
          $('#right-time').removeClass('warm');
        }
        if (!size) {
          $('#vol').addClass('warm');
        } else {
          $('#vol').removeClass('warm');
        }
        if (!weight) {
          $('#wei').addClass('warm');
        } else {
          $('#wei').removeClass('warm');
        }
        if (!num) {
          $('#num').addClass('warm');
        } else {
          $('#num').removeClass('warm');
        }
        if (!hope) {
          $('#qwjg').addClass('warm');
        } else {
          $('#qwjg').removeClass('warm');
        }
      }
    });
    $(document).on('blur', '.price-must', function () {
      priceInit();
    });
    $(document).on('click', '#custom', function () {
      priceInit();
    });
  };
  var calculate = function () {
    $(document).on('click', '.calculate-logo', function () {
      $(this).siblings('.add-part').removeClass('dp-n');
    });
    $(document).on('click', function (event) {
      var evt = event.srcElement ? event.srcElement : event.target;
      if ($(evt).hasClass('add-part') || $(evt).hasClass('calculate-logo') || $(evt).parents('.add-part').length > 0) {
        return '';
      } else {
        $('.add-part').addClass('dp-n');
      }
    });
    $(document).on('click', '.multi-calcu', function () {
      $('#vol').val(parseFloat($('#long').val() || 0) * parseFloat($('#width').val() || 0) * parseFloat($('#height').val() || 0) * parseFloat($('#sum-num').val() || 0));
      $('.add-part').addClass('dp-n');
    });
  };
  var airline = function () {
    $(document).on('blur', '#right-start,#right-end', function () {
      var _this = $(this)
        , ul = _this.siblings('.ajax-part');
      var data = ul.children('.active').data('val') || ul.find('li:first-child').data('val') || '';
      $(this).val(data);
      $(this).data('val', data);
      ul.hide();
      airInit();
    });
    $(document).on('keyup', '#right-start,#right-end', function (e) {
      var _this = $(this)
        , ul = _this.siblings('.ajax-part');
      var index = ul.find('.active').index() || 0
        , len = ul.children().length;
      if (e.keyCode == 13) {//回车键
        var data = ul.children('.active').data('val') || ul.find('li:first-child').data('val') || '';
        $(this).val(data);
        $(this).data('val', data);
        ul.hide();
        airInit();
      } else if (e.keyCode == 38) {//上键
        index = index == 0 ? len - 1 : index - 1;
        ul.find('li').removeClass('active');
        ul.find('li').eq(index).addClass('active');
      } else if (e.keyCode == 40) {//下键
        index = index == len - 1 ? 0 : index + 1;
        ul.find('li').removeClass('active');
        ul.find('li').eq(index).addClass('active');
      } else {//正常输入
        Data.airport({key: _this.val()}, function (json) {
          if (json && 'resBody' in json && json.resBody instanceof Array && json.resBody.length > 0) {
            var str = ''
              , body = json.resBody;
            for (var b in body) {
              if (body.hasOwnProperty(b)) {
                var d = body[b];
                str += '<li data-val="' + d.airportCode + '" class="' + (b == 0 ? 'active' : '') + '">' + d.displayName + '</li>'
              }
            }
            ul.html(str);
            ul.show();
          }
        });
      }
    });
    $(document).on('mouseover', '.ajax-part li', function () {
      $(this).addClass('active');
      $(this).siblings().removeClass('active');
    });
  };
  var getCompany = function () {
    //获取机场名称
    $(document).on('keyup', '#right-com', function (e) {
      var _this = $(this)
        , ul = _this.siblings('.ajax-part');
      var index = ul.find('.active').index() || 0
        , len = ul.children().length;
      if (e.keyCode == 13) {//回车键
        var data = ul.children('.active').data('val') || ul.find('li:first-child').data('val') || '';
        $(this).val(data);
        $(this).data('val', data);
        ul.hide();
        airInit();
        extraInit();
      } else if (e.keyCode == 38) {//上键
        index = index == 0 ? len - 1 : index - 1;
        ul.find('li').removeClass('active');
        ul.find('li').eq(index).addClass('active');
      } else if (e.keyCode == 40) {//下键
        index = index == len - 1 ? 0 : index + 1;
        ul.find('li').removeClass('active');
        ul.find('li').eq(index).addClass('active');
      } else {//正常输入
        Data.getCode({key: _this.val()}, function (json) {
          if (json && 'resBody' in json && json.resBody instanceof Array && json.resBody.length > 0) {
            var str = ''
              , body = json.resBody;
            for (var b in body) {
              if (body.hasOwnProperty(b)) {
                var d = body[b];
                str += '<li data-val="' + d.airlineCode + '" class="' + (b == 0 ? 'active' : '') + '">' + d.companyName + '</li>';
              }
            }
            ul.html(str);
            ul.show();
          }
        });
      }
    });
    //input失去焦点
    $(document).on('blur', '#right-com', function () {
      var ul = $(this).siblings('.ajax-part');
      var data = ul.children('.active').data('val') || ul.find('li:first-child').data('val') || '';
      $(this).val(data);
      $(this).data('val', data);
      ul.hide();
      airInit();
      extraInit();
    });
  };
  var airInit = function () {
    var pass = true;
    $('.must-input').each(function () {
      if (!$(this).val()) {
        $(this).addClass('warm');
        pass = false;
      } else {
        $(this).removeClass('warm');
      }
    });
    if (pass) {
      var data = {
        "deptCode": $('#right-start').val(),
        "destCode": $('#right-end').val(),
        "airCompanyCode": $('#right-com').val(),
        "flightDate": new Date($('#right-time').val()),
        "flightDay": 1
      };
      Data.fastSearch(data, function (json) {
        if (json && 'resBody' in json && typeof json.resBody == 'number' && json.resBody > 0) {
          $('.no-airline').addClass('dp-n');
        } else {
          $('.no-airline').removeClass('dp-n');
        }
      });
    }
  };
  var extraInit = function () {
    var data = {
      airCompanyCode: $('#right-com').val() || ''
    };
    Data.fastExtra(data, function (json) {
      if (json && 'resCode' in json && json.resCode == 0) {
        var arr = json.resBody || []
          , str = '';
        for (var a in arr) {
          if (arr.hasOwnProperty(a)) {
            var d = arr[a];
            str += '<tr><td>' + d.itemName + '</td><td>' + d.itemPrice + '</td><td>' + (d.itemRemark || '/') + '</td></tr>'
          }
        }
        $('.other-list').find('tbody').html(str);
      }
    });
  };
  var priceInit = function () {
    var pass = true;
    $('.price-must').each(function () {
      if (!$(this).val()) {
        $(this).addClass('warm');
        pass = false;
      } else {
        $(this).removeClass('warm');
      }
    });
    if (pass) {
      var data = {
        "cargoSize": $('#vol').val(),
        "cargoWeight": $('#wei').val(),
        "contractPrice": $('#qwjg').val(),
        "airCompanyCode": $('#right-com').val(),
        "customDeclare": $('#custom').find('option:selected').val() == 1
      };
      Data.fastPrice(data, function (json) {
        if (json && 'resCode' in json && json.resCode == 0 && json.resBody) {
          var data = json.resBody.airwayFee
            , sf = json.resBody.serviceFee
            , str = '';
          $('#ygzj').val(json.resBody.totalFee);

          $('.get-zj').html('CNY ' + json.resBody.totalFee);
          $('.get-kyf').html('CNY ' + data.chargingTotal);
          $('i.get-kyf').html(data.chargingTotal);
          $('.get-dj').html($('#qwjg').val());
          $('.get-zl').html(data.chargingWeight);

          for (var s in sf) {
            if (sf.hasOwnProperty(s)) {
              var d = sf[s];
              str += '<p><span class="title">' + d.itemName + '</span><span class="body">CNY ' + d.itemTotal + '</span></p>';
            }
          }
          $('.operate').find('.p-body').html(str);
          $('.price-pt').removeClass('dp-n');
        }
      });
    }
  };
  var run = function () {
    listener();
    calculate();
    airline();
    getCompany();
    extraInit();
  };
  return {
    run: run
  }
}());
module.exports = Listener;