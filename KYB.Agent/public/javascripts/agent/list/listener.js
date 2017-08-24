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
        $(document).on('click', '.detail-info', function () {
            stateArr = [];
            stateArr.push($(this).data('id'));
            $('.white-back').removeClass('dp-n');
            $('.open-part').removeClass('dp-n');
        });

    };
    var init = function () {
        var data = {
            offset: url.get('offset') || 0
            , limit: url.get('limit') || 20
            , mobile: $('#mobile').val()
            ,state: $('#state').val()
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