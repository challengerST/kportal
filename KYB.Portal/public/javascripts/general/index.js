/**
 * Created by Jeremy on 2016/11/22.
 */
"use strict";
var listener = (function () {
    var run = function () {
        //头部点击事件
        require('./head').head();
    };
    return {
        run: run
    }
}());
module.exports = listener;