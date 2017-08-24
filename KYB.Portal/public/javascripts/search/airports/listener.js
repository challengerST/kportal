/**
 * Created by Jeremy on 2016/11/22.
 */
"use strict";
require('../../frame/burster');
var Data = require('./data').Data
  , Dom = require('./dom').Dom;
var url = require('../../frame/function').url;
var Listener = (function () {
  var listener = function () {
    $(document).on('click', '.pages', function () {
      url.set('offset', $(this).data('offset'));
      init();
    });
    $(document).on('click', '#search-airports', function () {
      url.set('offset', 0);
      init();
    });
  };
  var init = function () {
    var data = {
      "keyword": $('#id').val(),
      "offset": url.get('offset') || 0,
      "limit": url.get('limit') || 20
    };
    Data.airports(data, function (json) {
      Dom.list(json, data);
    });
  };
  var run = function () {
    listener();
  };
  return {
    run: run
  }
}());
module.exports = Listener;