/**
 * Created by zrz on 2016/2/26.
 * @version 1.0.0 created 通用性功能方法
 */

'use strict';

var Fun = (function () {
    var _timeOut = 100000;//请求超时时间为10s
    /**
     * 封装ajax
     * @param option
     * {
     *      url:"请求的地址"
     *      ,method:"请求的方法"
     *      ,async:"是否并发"
     *      ,data:"发送的数据"
     *      ,success:"成功时回调"
     *      ,error:"失败/超时时回调"
     *      ,timeout:"超时时间"
     *      ,complete:"完成后的回调"
     * }
     */
    var ajax = function (option) {
        //ajax开始时应显示“加载信息框”
        Modal.showLoading();
        $.ajax({
            url: option.url
            , type: "type" in option && option.type || "GET"
            , timeout: option.timeout || _timeOut
            , data: "data" in option && option.data || {}
            , dataType: "json"
            , async: ("async" in option && option.async) ? true : false
            , success: function (json) {
                if ("status" in json && json.status > 0 && "data" in json) {
                    if ("success" in option) {
                        option.success(json.data);
                    } else {
                        Modal.setAlert("无success方法!");
                    }
                } else if ("error" in option && option.error instanceof Function) {
                    option.error(json);
                } else {
                    Modal.setAlert('操作失败!');
                }
            }, error: function (xhr) {//404或者超时
                if ("error" in option && option.error instanceof Function) {
                    //提示用户错误信息
                    Modal.showLoading(false);
                    Modal.setAlert("连接服务器失败，状态：" + (xhr.status || -1) + ",信息：" + (xhr.statusText || "-"));
                    option.error(xhr.status, xhr.statusText);//回调请求的状态和错误信息
                }
            }, complete: function (xhr, type) {
                //关闭“加载信息框”
                Modal.showLoading(false);
                if ("complete" in option && option.complete instanceof Function) {
                    option.complete(xhr, type);//回调请求的xhr信息和类型
                }
            }
        });
    };
    //全选和单选的绑定
    var setCheckboxListener = function (allCheck, radioChecks) {
        //筛选单选按钮组
        var radioValueEles = $(radioChecks);
        //点击全选时，同组按钮被同步
        $(document).delegate(allCheck, "click", function () {
            if (radioValueEles && radioValueEles.length > 0) {
                for (var _r = 0; _r < radioValueEles.length; _r++) {
                    radioValueEles[_r].checked = $(this).is(":checked");
                }
            }
        });
        //点击单选按钮时，
        $(document).delegate(radioChecks, "click", function () {
            $(allCheck)[0].checked = $(radioChecks + ":checked").length == $(radioChecks).length;
        });
    };
    var url = (function () {
        var get = function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURI(r[2]);
            return null;
        };
        /**
         * 根据参数列表长度进行判断，兼容IE9
         * @returns {string}
         */
        var set = function () {
            if (arguments.length === 1 && typeof arguments[0] === 'object') {//一个对象，使用key标记value
                var obj = arguments[0]
                    , search = location.search;
                for (var o in obj) {
                    if (obj.hasOwnProperty(o)) {
                        search = changeURLKeyValue(search, o, obj[o]);
                    }
                }
                if ('pushState' in history) {
                    history.pushState(null, document.title, search);
                } else if ('pushState' in History) {//ie9 不支持pushState方法,javascript.ejs中添加history.js完成html4对pushState的支持
                    History.pushState(null, null, search);//返回重新构造后search串
                }
            } else if (arguments.length === 2) {//key+value
                var key = arguments[0]
                    , value = arguments[1];
                if ('pushState' in history) {
                    history.pushState(null, document.title, changeURLKeyValue(location.toString(), key, value));
                } else if ('pushState' in History) {//ie9 不支持pushState方法,javascript.ejs中添加history.js完成html4对pushState的支持
                    History.pushState(null, null, changeURLKeyValue(location.search, key, value));//返回重新构造后search串
                }
            }
            function changeURLKeyValue(url, arg, arg_val) {
                var pattern = arg + '=([^&]*)';
                var replaceText = arg + '=' + arg_val;
                if (url.match(pattern)) {
                    var tmp = '/(' + arg + '=)([^&]*)/gi';
                    tmp = url.replace(eval(tmp), replaceText);
                    return tmp;
                } else {
                    if (url.match('[\?]')) {
                        return url + '&' + replaceText;
                    } else {
                        return url + '?' + replaceText;
                    }
                }
            }
        };
        return {
            get: get
            , set: set
        }
    }());
    var formatImage=function (path, size, ele) {
        if(path instanceof  Array && path.length>0){
            path = path[0];
        }
        var IMAGE_SIZE = {
            original: {
                path: "",
                size: ""
            },
            xlarge: {
                path: "_xlarge",
                size: "660*660"
            },
            large: {
                path: "_large",
                size: "420*420"
            },
            middle: {
                path: "_middle",
                size: "300*300"
            },
            small: {
                path: "_small",
                size: "240*240"
            },
            little: {
                path: "_little",
                size: "120*120"
            },
            micro: {
                path: "_micro",
                size: "60*60"
            }
        };
        size = IMAGE_SIZE[size || "middle"] || IMAGE_SIZE.middle;
        var pathTemp = /\.\w+?$/.exec(path);
        if (!pathTemp) {
            path += size.path;
        } else {
            path = (path.substr(0, pathTemp.index || path.length)) + size.path + pathTemp[0];
        }
        if (ele && ele.attr) {
            ele.attr("src", path);
        }
        return path;
    };
    return {
        ajax: ajax
        , getTimtout: _timeOut
        , setCheckboxListener: setCheckboxListener
        , url: url
        , formatImage: formatImage
    }
}());

exports.ajax = Fun.ajax;
exports.getTimeout = Fun.getTimtout;
exports.setCheckboxListener = Fun.setCheckboxListener;
exports.url = Fun.url;
exports.formatImage = Fun.formatImage;
