/**
 * Created by Jeremy on 2016/11/22.
 */
"use strict";
require('../../frame/burster');
var url = require('../../frame/function').url;
var Listener = (function () {
    var Data = require('./data').Data
        , Dom = require('./dom').Dom;
    var listener = function () {
        $(document).on('click', '.pages', function () {
            url.set('offset', $(this).data('offset'));
            init();
        });
    };
    var init = function () {
        var type = $('.border').data('type') || 20;
        var subType = $('.panel-body .active').data('type') || 0;
        if (type) {
            var data = {
                type: type
                ,subType:subType
                , offset: url.get('offset') || 0
                , limit: url.get('limit') || 10
            };
            Data.list(data, function (json) {
                Dom.list(json, data);
            });
        }
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