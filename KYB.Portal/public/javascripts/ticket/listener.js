/**
 * Created by Jeremy on 2016/11/22.
 */
"use strict";
var Modal = require('../frame/modal');
var Data = require('./data').Data
    , Dom = require('./dom').Dom;
var List = {};
var coach = null;
var Listener = (function () {
    var listener = function () {
        $(document).on('click', '.edt-btn', function () {
            var ele = $('.ticket-modal');
            ele.find('.header').html('新增开票信息 <span class="close-btn">X</span>');
            $('#change-ensure').hide();
            $('#submit').show();
            $('.white-back').removeClass('dp-n');
            ele.removeClass('dp-n');
        });
        $(document).on('click', '.change-btn', function () {
            var ele = $('.ticket-modal');
            var d = List[$(this).data('id')];
            coach = d;
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
        $(document).on('click', '.close-btn', function () {
            $('.white-back').addClass('dp-n');
            $('.alert-part').addClass('dp-n');
            $('#pp').click();
        });
        $(document).on('click', 'input[name="type"]', function () {
            var type = $(this).val();
            var ele = $('.clear-input');
            if (type == '1') {
                ele.attr('readonly', true);
                ele.val('');
            } else {
                ele.attr('readonly', false);
                ele.val('');
            }
        });
        $(document).on('click', '#submit', function () {
            var tp = parseInt($('input[name="type"]:checked').val());
            var data = {
                "invoiceId": null,
                "invoiceType": tp,
                "invoiceTitle": $('#tt').val(),
                "invoiceTaxNum": tp == 1 ? '' : $('#sh').val(),
                "invoiceBank": tp == 1 ? '' : $('#kh').val(),
                "invoiceAddress": tp == 1 ? '' : $('#dz').val(),
                "invoiceTel": tp == 1 ? '' : $('#dh').val(),
                "invoiceState": 1,
                "invoiceRemarks": "",
                "createDt": new Date(),
                "modifyDt": new Date()
            };
            Data.add(data, function (json) {
                if (json && 'resCode' in json && json.resCode != 0) {
                    Modal.setAlert(json.resMsg);
                } else {
                    Modal.setAlert(json.resMsg || '新增成功', null, function () {
                        location.reload();
                    });
                }
            })
        });
        $(document).on('click', '#change-ensure', function () {
            var tp = parseInt($('input[name="type"]:checked').val());
            var data = {
                "invoiceId": coach.invoiceId,
                "invoiceType": tp,
                "invoiceTitle": $('#tt').val(),
                "invoiceTaxNum": tp == 1 ? '' : $('#sh').val(),
                "invoiceBank": tp == 1 ? '' : $('#kh').val(),
                "invoiceAddress": tp == 1 ? '' : $('#dz').val(),
                "invoiceTel": tp == 1 ? '' : $('#dh').val(),
                "invoiceState": 1,
                "invoiceRemarks": "",
                "createDt": new Date(),
                "modifyDt": new Date()
            };
            Data.update(data, function (json) {
                if (json && 'resCode' in json && json.resCode != 0) {
                    Modal.setAlert(json.resMsg);
                } else {
                    Modal.setAlert(json.resMsg || '更新成功', null, function () {
                        location.reload();
                    });
                }
            });
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
    var init = function () {
        Data.list(function (json) {
            List = Dom.list(json);
        })
    };
    var run = function () {
        listener();
        init();
    };
    return {
        run: run
    }
}());
module.exports = Listener;