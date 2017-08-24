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
        console.log(1)
    };
    var init = function () {
        var data = {
            "deptCode": $('#start').val(),
            "destCode": $('#end').val(),
            "airCompanyCode": $('#code').val(),
            "enableState": 99,
            "offset": url.get('offset') || 0,
            "limit": url.get('limit') || 20
        };
        Data.list(data, function (json) {
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