/**
 * Created by jeremy on 2016/2/24.
 * @version 1.0.0 created
 */

'use strict';

//构造信息框主体
var Modal = (function () {
    //构造原始类
    function M(m) {
        this.s = m.s;//是否显示
        this.id = m.id;
    }

    //构造标准show方法，用于继承
    M.prototype.show = function () {
        var ele = document.getElementById(this.id);
        if (ele) {
            if (this.s && !isShow()) {//显示当前隐藏
                ele.className = ele.className.replace("dp-n", "");
            } else if (!this.s && isShow()) {//隐藏当前显示
                ele.className += " dp-n";
            }
            //去除两边的空格
            ele.className = String(ele.className).trim();
        }
        function isShow() {//是否已显示，无class时显示
            return ele.className.split("dp-n").length == 1;
        }
    };

    //加载信息框
    var loading = (function () {
        //初始化生成加载信息框
        var init = function () {
            if (!document.getElementById("loading_modal_element")) {
                $('body').append('<div id="loading_modal_element" class="loading-modal-body dp-n"><div class="cover_modal_element"></div>' +
                    '<div class="loading-modal-image"></div>' +
                    '<div class="loading-modal-text">' +
                    '<h2>玩命加载中……</h2>' +
                    '</div></div>');
            }
            return false;
        };
        //显示、隐藏信息框
        var show = function (s) {
            s = typeof s == "undefined" ? true : s;//无参数显示信息框
            var m = new M({id: "loading_modal_element", s: s});
            m.show();
        };
        return {
            init: init
            , show: show
        }
    }());
    //弹出信息框
    var alert = (function () {
        var init = function () {
            if (!document.getElementById("alert_modal_element")) {
                $('body').append('<div id="alert_modal_element" class="alert-modal-element dp-n"><div class="cover_modal_element"></div>' +
                    '<div class="alert-modal-content">' +
                    '<div class="alert-modal-body"><span class="alert-modal-text"></span></div>' +
                    '<div class="alert-modal-footer"><button id="alert_modal_close" class="alert-modal-button">关闭</button></div>' +
                    '</div></div>');
            }
            return false;
        };
        var show = function (s) {
            s = typeof s == "undefined" ? true : s;
            var m = new M({id: "alert_modal_element", s: s});
            m.show();
        };
        /**
         * 设置弹出信息框
         * @param msg       显示的信息，支持html
         * @param sed       倒计时关闭时间，单位：second
         * @param callback  关闭触发回调函数
         */
        var set = function (msg, sed, callback) {
            var ele = document.getElementById("alert_modal_element");
            if (msg) {
                if (typeof msg === 'object') {//应对后端返回提示时使用Object封装
                    msg = JSON.stringify(msg);
                }
                if(ele){
                    ele.getElementsByClassName("alert-modal-text")[0].innerHTML = msg;
                }else{
                    init();
                    ele.getElementsByClassName("alert-modal-text")[0].innerHTML = msg;
                }
                show();
            }
            if (sed > 0) {
                setTimeout(function () {
                    show(false);
                }, 1000 * sed);
            }//无关闭时间或者关闭时间为0，不自动关闭
            //fixme 事件监听的ie兼容性
            //关闭按钮的事件侦听
            $("#alert_modal_close").on("click", function () {
                if (callback && callback instanceof Function) {
                    callback();
                }
                show(false);
                //阻止事件继续传递
                return false;
            });
        };
        return {
            init: init
            , show: show
            , set: set
        }
    }());
    //选择信息框
    var confirm = (function () {
        var init = function () {
            if (!document.getElementById("confirm_modal_element")) {
                $('body').append('<div id="confirm_modal_element" class="confirm-modal-element dp-n"><div class="cover_modal_element"></div>' +
                    '<div class="confirm-modal-content">' +
                    '<div id="confirm_modal_header" class="confirm-modal-header dp-n"></div>' +
                    '<div class="confirm-modal-body"><span id="confirm_modal_text" class="confirm-modal-text"></span></div>' +
                    '<div class="confirm-modal-footer">' +
                    '<div class="footer-button-success"><button class="confirm-modal-button  modal-success" data-confirm="success">确认</button></div>' +
                    '<div class="footer-button-false"><button class="confirm-modal-button" data-confirm="error">取消</button></div>' +
                    '</div></div></div>');
            }
            return false;
        };
        var show = function (s) {
            s = typeof s == "undefined" ? true : s;
            var m = new M({id: "confirm_modal_element", s: s});
            m.show();
        };
        /**
         * 设置选择信息框的内容
         * @param option    配置
         * {
         *      title:"头部显示的信息"
         *      ,text:"显示的提示信息"
         *      ,success:"点击成功后的回调"
         *      ,error:"点击失败后的回调"
         *      ,complete:"点击按钮后的整体回调"
         * }
         */
        var bar = 0;
        var set = function (option) {
            if (!option) {
                return false;
            }
            if ("title" in option && option.title.length > 0) {//有头部，则显示头部
                document.getElementById("confirm_modal_header").innerHTML = option.title;
            }
            if ("text" in option && option.text.length > 0) {//有内容，则显示整个选择信息框
                document.getElementById("confirm_modal_text").innerHTML = option.text;
            }
            //fixme 事件监听的ie兼容性
            //关闭按钮的事件侦听
            $("#confirm_modal_element").find(".confirm-modal-button").off("click").on("click", function () {
                //fixme .off("click")用于防止多次触发<--很玄学，我也不知道为什么，但是请不要修改。
                var atr = $(this).attr("data-confirm");//选择的按钮
                bar++;
                if (option && atr in option && option[atr] instanceof Function) {
                    option[atr]();
                }
                if (option && "complete" in option && option.complete instanceof Function) {
                    option.complete();//若有完成函数，则执行
                } else {//否则，关闭选择框
                    show(false);
                }
                //阻止事件继续传递
                //return false;
            });
        };
        return {
            init: init
            , show: show
            , set: set
        }
    }());
    //覆盖层
    var cover = (function () {
        var init = function () {
            if (!document.getElementById("cover_modal_element")) {
                $('body').append('<div id="cover_modal_element" class="cover-modal-element dp-n"></div>');
            }
            return false;
        };
        var hide = function () {
            document.getElementById("cover_modal_element").style.display = "none";
        };
        var show = function () {
            document.getElementById("cover_modal_element").style.display = "block";
        };
        return {
            init: init
            , show: show
            , hide: hide
        }
    }());
    return {
        initLoading: loading.init
        , showLoading: loading.show

        , initAlert: alert.init
        , showAlert: alert.show
        , setAlert: alert.set

        , initConfirm: confirm.init
        , setConfirm: confirm.set
        , showConfirm: confirm.show
        , initCover: cover.init
    }
}());

//页面加载完毕后生成四个自定义模态框
setTimeout(function () {
    //页面加载时生成一个覆盖层
    Modal.initCover();
    //页面加载时生成一个加载信息框
    Modal.initLoading();
    //页面加载时生成一个弹出信息框
    Modal.initAlert();
    //页面加载时生成一个选择信息框
    Modal.initConfirm();
}, 100);


//抛出上层调用
exports.showLoading = Modal.showLoading;
exports.setAlert = Modal.setAlert;
exports.showAlert = Modal.showAlert;
exports.setConfirm = Modal.setConfirm;
exports.showConfirm = Modal.showConfirm;