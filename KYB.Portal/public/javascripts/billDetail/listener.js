/**
 * Created by Jeremy on 2016/11/22.
 */
"use strict";
var Modal = require('../frame/modal'),
    myformat = require('../frame/function').format;
var Listener = (function () {
    var Data = require('./data').Data;
    var listener = function () {
        $(document).on('click', '.ensure-price', function () {
            var data = {
                "orderId": $(this).data('id'),
                "chargeState": 1
            };
            Data.ensure(data, function (json) {
                if (json && 'resCode' in json && json.resCode != 0) {
                    Modal.setAlert(json.resMsg || '确认失败，请重试！');
                } else {
                    Modal.setAlert(json.resMsg || '确认成功！', null, function () {
                        location.reload();
                    });
                }
            });
        });
        $(document).on('click', '.dl-pdf', function () {
            var code = '<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><title> 对账单 </title><style>.info-box {width: 826px;margin: 0 auto;position: relative;background-color: #fff;border: 1px solid #eaeaea;padding: 10px 20px}.info-box .font-blue {line-height: 30px;font-size: 24px;text-align: center;color: #1868BD}.info-box .ty {height: 22px;line-height: 22px;font-size: 14px;margin-top: 20px}.info-box .ty span:first-child {float: left;color: black}.info-box .ty span:last-child {float: right;color: black}.info-box .warn {height: 22px;line-height: 22px;font-size: 14px;color: #999}.info-box .khgs {border: 1px solid #eaeaea;margin-top: 10px;padding: 10px}.info-box .khgs span {line-height: 25px;color: black}.info-box.shr{height: 45px;line-height:45px;color: black}.info-box table{border-collapse:collapse;width: 100%;border: 1px solid #eaeaea}.info-box table td{height: 25px;text-align:center;width: 8.3 %;font-size:12px;color: black;border: 1px solid #eaeaea;}.info-box table .bg-g{background-color: #f3f3f3}.info-box table .font-r{color: #d75177}.btn-part{display: table;margin: 10px auto}.btn-part button{margin-right:10px}.btn-part button:last-child{margin-right:0} </style></head><body>';
            code += $('.info-box')[0].outerHTML;
            code += '</body></html>';
            $.ajax({
                url: '/api/down/pdf'
                , type: 'post'
                , data: {code: code, name: '费用清单'}
                , dataType: 'json'
                , timeout: 100000
                , success: function (json) {
                    if ('status' in json && json.status == 1) {
                        window.open("/getImgCode/pdf");
                    }
                }
            });
        });
        $(document).on('click', '#appeal', function () {
            var p = $(this).parent();
            p.siblings().toggleClass('hide');
        });
        $(document).on('click', '#appeal-ensure', function () {
            var data = {
                orderId: $(this).data('id')
                , commment: $('#text-r4').val()
            };
            if (data.commment) {
                Data.appeal(data, function (json) {
                    if (json && 'resCode' in json && json.resCode == 0) {
                        Modal.setAlert('申诉提交成功，请耐心等待！', null, function () {
                            location.reload();
                        });
                    } else {
                        Modal.setAlert(json.resMsg || '申诉提交失败，请重试！');
                    }
                });
            } else {
                Modal.setAlert('请填写申诉原因！');
            }
        });
    };
    var otherinit = function(){
        //小数点控制

        $('.item-size').html(myformat.formatvolume($('.item-size').html()));
        $('.item-weight').html(myformat.formatweight($('.item-weight').html()));
    }
    var run = function () {
        listener();
        otherinit();
    };
    return {
        run: run
    }
}());
module.exports = Listener;