/**
 * Created by Jeremy on 2017/1/5.
 */
'use strict';
require('../../general/burster');
var Data = require('./data').Data
    , Dom = require('./dom').Dom;
var url = require('../../general/function').url
    , Modal = require('../../general/modal');
var LIST;
var operateId;
var Listener = (function () {
    var listener = function () {
        $(document).on('click', '#search', function () {
            url.set('offset', 0);
            init();
        });
        $(document).on('click', '.outer-pages .pages', function () {
            url.set('offset', $(this).data('offset'));
            init();
        });
        $(document).on('click', '.close-btn', function () {
            $('.white-back').addClass('dp-n');
            $('.alert-part').addClass('dp-n');
        });
        $(document).on('click', '.accept', function () {
            operateId = $(this).data('id');
            $('.white-back').removeClass('dp-n');
            $('.accept-part').removeClass('dp-n');
        });
        $(document).on('click', '.refuse', function () {
            operateId = $(this).data('id');
            $('.white-back').removeClass('dp-n');
            $('.refuse-part').removeClass('dp-n');
        });
        $(document).on('click', '#accept-ensure', function () {
            confirm(1);
        });
        $(document).on('click', '#refuse-ensure', function () {
            confirm(-1);
        });
    };
    var init = function () {
        var data = {
            "companyName": $('#search-name').val(),
            "confirmState": $('#search-state').find('option:selected').val(),
            "offset": url.get('offset') || 0,
            "limit": url.get('limit') || 20
        };
        Data.list(data, function (json) {
            LIST = Dom.list(json, data);
        });
    };
    var confirm = function (state) {
        var data = {
            "logId": operateId,
            "operatorId": 0,
            "confirmState": state
        };
        Data.state(data, function (json) {
            if (json && 'resCode' in json && json.resCode == 0) {
                Modal.setAlert('审核成功！', null, function () {
                    location.reload();
                });
            } else {
                Modal.setAlert(json.resMsg || '审核失败，请重试！');
            }
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