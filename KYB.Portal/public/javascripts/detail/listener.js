/**
 * Created by Jeremy on 2016/11/22.
 */
"use strict";
var Data = require('./data').Data
    , Dom = require('./dom').Dom;
var Modal = require('../frame/modal');
var url = require('../frame/function').url
    ,myformat = require('../frame/function').format;
require('../frame/burster');
//报价单数据
var Listener = (function () {
    var opeSid = '';
    var oId = $('#up-file').data('id');
    //待删除的元素
    var removeEle;
    //缓存删除内容
    var removeFile = {
        "orderId": oId,
        "keyName": 0
    };
    //现有航线&改配航线
    var now = {}, change = {};
    var listener = function () {
        $(document).on('click', '.reload', function () {
            location.reload();
        });
        $(document).on('click', '.close-btn', function () {
            $('.white-back').addClass('dp-n');
            $('.alert-part').addClass('dp-n');
        });
        $(document).on('click', '.show-change', function () {
            var ele = $('.change-part');
            ele.find('.gp-search input').each(function () {
                var v = $(this).data('v');
                $(this).val(v);
            });
            ele.find('.change-tb').addClass('dp-n');
            $('.white-back').removeClass('dp-n');
            ele.removeClass('dp-n');
        });
        $(document).on('click', '.show-dprice', function () {
            $('.white-back').removeClass('dp-n');
            $('.price-list').removeClass('dp-n');
        });
        $(document).on('click', '.show-other', function () {
            extraInit();
            $('.white-back').removeClass('dp-n');
            $('.other-list').removeClass('dp-n');
        });
        $(document).on('click', '.show-refuse', function () {
            $('.white-back').removeClass('dp-n');
            $('.refuse-part').removeClass('dp-n');
        });
        $(document).on('click', '.ensure-enter', function () {
            $('.white-back').removeClass('dp-n');
            $('.ensure-data').removeClass('dp-n');
        });
        $(document).on('click', 'a.rm', function () {
            removeFile['keyName'] = $(this).data('key');
            removeEle = $(this).parents('.up-part');
            $('.white-back').removeClass('dp-n');
            $('.remove-part').removeClass('dp-n');
        });
        $(document).on('click', 'a.rm-type', function () {
            removeFile['keyName'] = $(this).data('key');
            removeEle = $(this).parents('.add-type');
            $('.white-back').removeClass('dp-n');
            $('.remove-type-part').removeClass('dp-n');
        });
        $(document).on('click', 'a.dl', function () {
            var file = $(this).data('key');
            Data.down({file: file}, function (json) {
                if (json && 'resBody' in json) {
                    window.open(json.resBody);
                }
            });
        });
        $(document).on('click', '.dl-file', function () {
            var file = $(this).data('key');
            if (file != 0) {
                Data.down({file: file}, function (json) {
                    if (json && 'resBody' in json) {
                        window.open(json.resBody);
                    }
                });
            }
            //} else {
            //    Modal.setAlert('暂无' + $(this).find('.txt').html());
            //}
        });
        $(document).on('click', '#gp-s-btn', function () {
            var pass = true;
            $('.s-require').each(function () {
                if (!$(this).val()) {
                    $(this).addClass('warm');
                    pass = false;
                } else {
                    $(this).removeClass('warm');
                }
            });
            if (pass) {
                var data = {
                    "deptCode": $('#gp-start').val(),
                    "destCode": $('#gp-end').val(),
                    "flightDate": new Date($('#gp-time').val()),
                    "airCompanyCode": $('#gp-com').val(),
                    "transCount": 1,
                    "offset": 0,
                    "limit": 20
                };
                Data.gpSearch(data, function (json) {
                    Dom.renderGp(json);
                    $('.change-tb').removeClass('dp-n');
                });
            }
        });
        $(document).on('click', '#change-ensure', function () {
            change = null;
            now = {
                s: $('#gp-start').data('v')
                , e: $('#gp-end').data('v')
                , c: $('#gp-com').data('v')
                , d: $('#gp-time').data('v')
                , l: $('.hxlj').data('v')
            };
            var ele = $('input[name="gp-sg"]:checked');
            if (ele.length > 0 && ele.data('id')) {
                var tr = ele.parents('tr');
                change = {
                    s: tr.find('.s').text()
                    , e: tr.find('.e').text()
                    , c: tr.find('.c').text()
                    , d: $('#gp-time').val()
                    , l: tr.find('.lg').text()
                    , aid: tr.find('input[name="gp-sg"]').data('id')
                };
            }
            if (change) {
                $('.change-part').addClass('dp-n');
                var part = $('.ensure-change-part');
                part.find('.b-s').html(now.s);
                part.find('.b-e').html(now.e);
                part.find('.b-c').html(now.c);
                part.find('.b-d').html(now.d);
                part.find('.b-l').html(now.l);
                part.find('.a-s').html(change.s);
                part.find('.a-e').html(change.e);
                part.find('.a-c').html(change.c);
                part.find('.a-d').html(change.d);
                part.find('.a-l').html(change.l);
                part.removeClass('dp-n');
            }
        });
        $(document).on('click', '.close-btn-this', function () {
            $('.change-part').removeClass('dp-n');
            $('.ensure-change-part').addClass('dp-n');
        });
        $(document).on('click', '#submit-change', function () {
            var data = {
                "orderId": $(this).data('id'),
                "memberId": 0,
                "airwayId": change.aid,
                "flightDate": change.d
            };
            Data.submitChange(data, function (json) {
                if (json && 'resCode' in json && json.resCode == 0) {
                    $('.ensure-change-part').addClass('dp-n');
                    $('.change-success').removeClass('dp-n');
                    var n = 3;
                    setInterval(function () {
                        if (n == 1) {
                            location.reload();
                        }
                        n--;
                        $('.left-seconds').html(n);
                    }, 1000);
                } else {
                    Modal.setAlert(json.resMsg || '改配失败，请重试！');
                }
            });
        });
        $(document).on('click', '.dl-price', function () {
            dlData['tzr'] = {
                name: fhr.contactName||''
                , address: fhr.contactAddress||''
                , tel: fhr.contactTel||''
            };
            dlData['btzr'] = {
                name: shr.contactName||''
                , address: shr.contactAddress||''
                , tel: shr.contactTel||''
            };
            //新添加通知人
            dlData['tzr'] = {
                name: tzr.contactName||''
                , address: tzr.contactAddress||''
                , tel: tzr.contactTel||''
            };
            $.ajax({
                url: '/api/down/bjd'
                , type: 'post'
                , data: {d: dlData, name: '报价单'}
                , dataType: 'json'
                , timeout: 100000
                , success: function (json) {
                    if ('status' in json && json.status == 1) {
                        window.open("/getImgCode/bjd");
                    }
                }
            });
        });
        $(document).on('click', '#dl-warehouse', function () {
            var code = '<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <title>Title</title> <style> * {margin: 0;padding: 0;}.container {width: 1200px;margin: 0 auto;padding: 20px 0;}.info {width: 50%;height: 30px;line-height: 30px;float: left;font-weight: 600;}.title {line-height: 50px;height: 50px;font-size: 20px;font-weight: 600;clear: both;}.time {height: 30px;line-height: 30px;text-align: right;}table {width: 100%;border-collapse: collapse;}td {height: 30px;text-align: center;border: 1px solid #ccc;}thead td {background: #666;color: #fff;} </style> </head> <body> <div class="container"> <p class="info">订单编号：' + $('.warehouse-tb').data('ddbh') + '<span></span></p> <p class="info">进仓编号：' + $('.warehouse-tb').data('jcbh') + '<span></span></p> <p class="info">客户名称：' + $('.warehouse-tb').data('khmc') + '<span></span></p> <p class="info">进仓状态：' + $('.warehouse-tb').data('jczt') + '<span></span></p> <p class="title">进仓明细</p> <table>' + $('.warehouse-tb').html() + '</table> <p class="time">导出时间：' + new Date().Format('yyyy-MM-dd') + '<span></span></p> </div> </body> </html>'
            $.ajax({
                url: '/api/down/pdf'
                , type: 'post'
                , data: {code: code, name: '进仓明细'}
                , dataType: 'json'
                , timeout: 100000
                , success: function (json) {
                    if ('status' in json && json.status == 1) {
                        window.open("/getImgCode/pdf");
                    }
                }
            });
        });
        $(document).on('click', '.dl-yld', function () {
            if (this.id =="main-yld") { //主单
                if ($('.yl-part').find('.dp-tb').find('.files').length == 0) {
                    $('.yl-part').find('.dp-tb').html('暂无预录单');
                }
            } else {
                if ($(this).find('.tmp').find('a').length == 0) {
                    $('.yl-part').find('.dp-tb').html('暂无预录单');
                } else {
                    $('.yl-part').find('.dp-tb').html($(this).find('.tmp').html());
                }
            }
            $('.white-back').removeClass('dp-n');
            $('.yl-part').removeClass('dp-n');
        });
    };

    //var extraInit = function () {
    //    var ele = $('.other-list');
    //    var data = {
    //        airCompanyCode: ele.data('id') || ''
    //    };
    //    Data.extra(data, function (json) {
    //        console.log(json);
    //        if (json && 'resCode' in json && json.resCode == 0) {
    //            var arr = json.resBody || []
    //                , str = '';
    //            for (var a in arr) {
    //                if (arr.hasOwnProperty(a)) {
    //                    var d = arr[a];
    //
    //                    str += '<tr><td>' + d.itemName + '</td><td>' + d.itemPrice + '</td><td>' + (d.itemRemark || '/') + '</td></tr>'
    //                }
    //            }
    //            ele.find('tbody').html(str);
    //        }
    //    });
    //};
    var submit = function () {
        $(document).on('click', '#refuse-ensure', function () {
            var ele = $(this);
            var id = $('input[name="reason"]:checked').prop('id');
            var txt = '';
            if (id == 'r5') {
                txt = $('#text-r4').val();
            } else {
                txt = $('#' + id).siblings('label').html();
            }
            var data = {
                "comment": txt,
                "orderId": ele.data('id')
            };
            Data.refuse(data, function (json) {
                if (json && 'resCode' in json && json.resCode == 0) {
                    Modal.setAlert('取消成功！', null, function () {
                        location.reload();
                    });
                } else {
                    Modal.setAlert('取消失败，请重试！');
                }
            });
        });
        $(document).on('click', '#entry-ensure', function () {
            var data = {
                "memberId": 0,
                "orderId": $(this).data('id')
            };
            Data.entry(data, function (json) {
                if (json && 'resCode' in json && json.resCode == 0) {
                    Modal.setAlert('确认成功！', null, function () {
                        location.reload();
                    });
                } else {
                    Modal.setAlert('确认失败，请重试！');
                }
            });
        });
        $(document).on('click', '#remove-ensure', function () {
            Data.removeFile(removeFile, function (json) {
                if (json && 'resCode' in json && json.resCode == 0) {
                    removeEle.remove();
                    $('.white-back').addClass('dp-n');
                    $('.remove-part').addClass('dp-n');
                } else {
                    Modal.setAlert('删除失败，请重试！');
                }
            });
        });
        $(document).on('click', '#remove-type-ensure', function () {
            Data.removeFile(removeFile, function (json) {
                if (json && 'resCode' in json && json.resCode == 0) {
                    removeEle.removeClass('active');
                    removeEle.find('.top').html('+');
                    var a = removeEle.find('.f-name');
                    a.html(a.data('name'));
                    removeEle.find('input').show();
                    $('.white-back').addClass('dp-n');
                    $('.remove-type-part').addClass('dp-n');
                } else {
                    Modal.setAlert('删除失败，请重试！');
                }
            });
        });
    };
    var upload = function () {
        $(document).on('change', '#up-file', function () {
            var arr = ['doc', 'docx', 'xls', 'xlsx', 'pdf', 'jpg', 'png', 'bmp'];
            var _this = $(this);
            var file = this.files[0]
                , size = this.files[0].size
                , name = this.files[0].name;
            var na = name.split('.');
            if (arr.indexOf(na[na.length - 1].toLowerCase()) >= 0) {
                if (size < 2097152) {
                    Data.up({"file": name}, function (json) {
                        var token;
                        if (json && 'resCode' in json && json.resCode == 0) {
                            token = json.resBody;
                        }
                        if (token) {
                            Data.ossUpload(token, file, function (data) {
                                if (data && 'status' in data && data.status > 0) {
                                    var d = {
                                        "orderId": _this.data('id'),
                                        "fileName": name,
                                        "fileComment": '',
                                        "keyName": token.Keyname
                                        , "fileType": 20
                                        , subNum: _this.data('sid') == 0 ? '' : _this.data('sid')
                                    };
                                    Data.addFile(d, function (json) {
                                        if (json && 'resCode' in json && json.resCode == 0 && json.resBody) {
                                            var d = json.resBody;
                                            var str = '<div class="up-part"> <div class="top">' + d.fileExtension.toUpperCase() + '<a href="javascript:void(0);" class="dl" data-key="' + d.keyName + '"></a> ' +
                                                '<a href="javascript:void(0);" class="rm" data-key="' + d.keyName + '"></a> ' +
                                                '</div> <a href="javascript:void(0);" class="dp-b">' + d.fileName + '</a> ' +
                                                '</div>';
                                            $('.upload').find('.add').before(str);
                                        } else {
                                            Modal.setAlert('上传失败！');
                                        }
                                    });
                                }
                            });
                        }
                    });
                } else {
                    Modal.setAlert('您上传的文件超过2M！请重新选择。');
                }
            } else {
                Modal.setAlert('文件格式支持.doc/.docx/.xls/.xlsx/.pdf/.jpg/.png/.bmp');
            }
        });
        $(document).on('change', '.up-type', function () {
            var arr = ['doc', 'docx', 'xls', 'xlsx', 'pdf', 'jpg', 'png', 'bmp'];
            var _this = $(this);
            var file = this.files[0]
                , size = this.files[0].size
                , name = this.files[0].name;
            var na = name.split('.');
            if (arr.indexOf(na[na.length - 1].toLowerCase()) >= 0) {
                if (size < 2097152) {
                    Data.up({"file": name}, function (json) {
                        var token;
                        if (json && 'resCode' in json && json.resCode == 0) {
                            token = json.resBody;
                        }
                        if (token) {
                            Data.ossUpload(token, file, function (data) {
                                if (data && 'status' in data && data.status > 0) {
                                    var d = {
                                        "orderId": _this.data('id'),
                                        "fileName": name,
                                        "fileComment": '',
                                        "keyName": token.Keyname
                                        , "fileType": _this.data('type')
                                    };
                                    Data.addFile(d, function (json) {
                                        if (json && 'resCode' in json && json.resCode == 0 && json.resBody) {
                                            var d = json.resBody;
                                            var ele = _this.parents('.add-type');
                                            var str = d.fileExtension.toUpperCase() + '<a href="javascript:void(0);" class="dl" data-key="' + d.keyName + '"></a> <a href="javascript:void(0);" class="rm-type" data-key="' + d.keyName + '"></a>'
                                            ele.addClass('active');
                                            ele.find('.top').html(str);
                                            ele.find('.f-name').html(d.fileName);
                                            ele.find('input').hide();
                                        } else {
                                            Modal.setAlert('上传失败！');
                                        }
                                    });
                                }
                            });
                        }
                    });
                } else {
                    Modal.setAlert('您上传的文件超过2M！请重新选择。');
                }
            } else {
                Modal.setAlert('文件格式支持.doc/.docx/.xls/.xlsx/.pdf/.jpg/.png/.bmp');
            }
        });
        $(document).on('change', '#up-file-fd', function () {
            var arr = ['doc', 'docx', 'xls', 'xlsx', 'pdf', 'jpg', 'png', 'bmp'];
            var _this = $(this);
            var file = this.files[0]
                , size = this.files[0].size
                , name = this.files[0].name;
            var na = name.split('.');
            if (arr.indexOf(na[na.length - 1].toLowerCase()) >= 0) {
                if (size < 2097152) {
                    Data.up({"file": name}, function (json) {
                        var token;
                        if (json && 'resCode' in json && json.resCode == 0) {
                            token = json.resBody;
                        }
                        if (token) {
                            Data.ossUpload(token, file, function (data) {
                                if (data && 'status' in data && data.status > 0) {
                                    var d = {
                                        "orderId": url.get('id'),
                                        "fileName": name,
                                        "fileComment": '',
                                        "keyName": token.Keyname
                                        , "fileType": 20
                                        , subNum: _this.data('sid') == 0 ? '' : _this.data('sid')
                                    };
                                    Data.addFile(d, function (json) {
                                        if (json && 'resCode' in json && json.resCode == 0 && json.resBody) {
                                            var d = json.resBody;
                                            var str = '<div class="up-part"> <div class="top">' + d.fileExtension.toUpperCase() + '<a href="javascript:void(0);" class="dl" data-key="' + d.keyName + '"></a> ' +
                                                '<a href="javascript:void(0);" class="rm" data-key="' + d.keyName + '"></a> ' +
                                                '</div> <a href="javascript:void(0);" class="dp-b">' + d.fileName + '</a> ' +
                                                '</div>';
                                            _this.parents('.ddfj-pub').find('.add').before(str);
                                        } else {
                                            Modal.setAlert('上传失败！');
                                        }
                                    });
                                }
                            });
                        }
                    });
                } else {
                    Modal.setAlert('您上传的文件超过2M！请重新选择。');
                }
            } else {
                Modal.setAlert('文件格式支持.doc/.docx/.xls/.xlsx/.pdf/.jpg/.png/.bmp');
            }
        });
    };
    var fileList = function () {
        Data.fileList({id: url.get('id'), sid: url.get('sid')}, function (json) {
            if (json && 'resCode' in json && json.resCode == 0 && json.resBody) {
                var str = '';
                var arr = json.resBody;
                var data22 = 0;
                for (var a in arr) {
                    if (arr.hasOwnProperty(a)) {
                        var d = arr[a];
                        if (d.fileType == 20) {
                            str += '<div class="up-part"> <div class="top">' + d.fileExtension.toUpperCase() + '<a href="javascript:void(0);" class="dl" data-key="' + d.keyName + '"></a> ' +
                                '<a href="javascript:void(0);" class="rm" data-key="' + d.keyName + '"></a> ' +
                                '</div> <a href="javascript:void(0);" class="dp-b">' + d.fileName + '</a> ' +
                                '</div>';
                        } else if (d.fileType == 22) {
                            data22 = 1;
                            $('.dl-file[data-type="' + d.fileType + '"]').data('key', d.keyName);
                        } else if (d.fileType == 21) {
                            var yld = '';
                            yld += '<div class="files"> <div class="top">' + arr[a].fileExtension.toUpperCase() + '<span class="glyphicon glyphicon-circle-arrow-down" data-key="' + arr[a].keyName + '"></span> </div> <a href="javascript:void(0);" class="dp-b">' + arr[a].fileName + '</a> </div>'
                            $('.yl-part').find('.dp-tb').append(yld);
                        } else {
                            var ele = $('.add-type[data-type=' + d.fileType + ']');
                            ele.addClass('active');
                            ele.find('input').hide();
                            ele.find('.top').html(d.fileExtension.toUpperCase() + '<a href="javascript:void(0);" class="dl" data-key="' + d.keyName + '"></a> <a href="javascript:void(0);" class="rm-type" data-key="' + d.keyName + '"></a> ');
                            ele.find('.f-name').html(d.fileName);
                        }
                    }
                }
                if (data22 == 0) {
                    $('.dl[data-type="22"]').addClass('none-f');
                }
                $('.upload').find('.add').before(str);
            }
        });
    };
    var changeLine = function () {
        $('#gp-time').datetimepicker({
            format: 'yyyy-mm-dd',//日期的格式
            startDate: new Date($('#gp-time').val()),//选择器的开始日期
            autoclose: true,//日期选择完成后是否关闭选择框
            bootcssVer: 3,//显示向左向右的箭头
            language: 'zh-CN',//语言
            minView: "month"//表示日期选择的最小范围，默认是hour
        });
    };
    var airline = function () {
        $(document).on('blur', '#gp-end', function () {
            if (!$(this).prop('readonly')) {
                if (!$(this).prop('readonly')) {
                    var _this = $(this)
                        , ul = _this.siblings('.ajax-part');
                    var data = ul.children('.active').data('val') || ul.find('li:first-child').data('val') || '';
                    $(this).val(data);
                    $(this).data('val', data);
                    ul.hide();
                }
            }
        });
        $(document).on('keyup', '#gp-end', function (e) {
            if (!$(this).prop('readonly')) {
                var _this = $(this)
                    , ul = _this.siblings('.ajax-part');
                var index = ul.find('.active').index() || 0
                    , len = ul.children().length;
                if (e.keyCode == 13) {//回车键
                    var data = ul.children('.active').data('val') || ul.find('li:first-child').data('val') || '';
                    $(this).val(data);
                    $(this).data('val', data);
                    ul.hide();
                } else if (e.keyCode == 38) {//上键
                    index = index == 0 ? len - 1 : index - 1;
                    ul.find('li').removeClass('active');
                    ul.find('li').eq(index).addClass('active');
                } else if (e.keyCode == 40) {//下键
                    index = index == len - 1 ? 0 : index + 1;
                    ul.find('li').removeClass('active');
                    ul.find('li').eq(index).addClass('active');
                } else {//正常输入
                    Data.airport({key: _this.val()}, function (json) {
                        if (json && 'resBody' in json && json.resBody instanceof Array && json.resBody.length > 0) {
                            var str = ''
                                , body = json.resBody;
                            for (var b in body) {
                                if (body.hasOwnProperty(b)) {
                                    var d = body[b];
                                    str += '<li data-val="' + d.airportCode + '" class="' + (b == 0 ? 'active' : '') + '">' + d.displayName + '</li>'
                                }
                            }
                            ul.html(str);
                            ul.show();
                        }
                    });
                }
            }
        });
        $(document).on('mouseover', '.ajax-part li', function () {
            if (!$(this).prop('readonly')) {
                $(this).addClass('active');
                $(this).siblings().removeClass('active');
            }
        });
    };
    var getCompany = function () {
        //获取机场名称
        $(document).on('keyup', '#gp-com', function (e) {
            if (!$(this).prop('readonly')) {
                var _this = $(this)
                    , ul = _this.siblings('.ajax-part');
                var index = ul.find('.active').index() || 0
                    , len = ul.children().length;
                if (e.keyCode == 13) {//回车键
                    var data = ul.children('.active').data('val') || ul.find('li:first-child').data('val') || '';
                    $(this).val(data);
                    $(this).data('val', data);
                    ul.hide();
                } else if (e.keyCode == 38) {//上键
                    index = index == 0 ? len - 1 : index - 1;
                    ul.find('li').removeClass('active');
                    ul.find('li').eq(index).addClass('active');
                } else if (e.keyCode == 40) {//下键
                    index = index == len - 1 ? 0 : index + 1;
                    ul.find('li').removeClass('active');
                    ul.find('li').eq(index).addClass('active');
                } else {//正常输入
                    Data.getCode({key: _this.val()}, function (json) {
                        if (json && 'resBody' in json && json.resBody instanceof Array && json.resBody.length > 0) {
                            var str = ''
                                , body = json.resBody;
                            for (var b in body) {
                                if (body.hasOwnProperty(b)) {
                                    var d = body[b];
                                    str += '<li data-val="' + d.airlineCode + '" class="' + (b == 0 ? 'active' : '') + '">' + d.companyName + '</li>';
                                }
                            }
                            ul.html(str);
                            ul.show();
                        }
                    });
                }
            }
        });
        //input失去焦点
        $(document).on('blur', '#gp-com', function () {
            if (!$(this).prop('readonly')) {
                var ul = $(this).siblings('.ajax-part');
                var data = ul.children('.active').data('val') || ul.find('li:first-child').data('val') || '';
                $(this).val(data);
                $(this).data('val', data);
                ul.hide();
            }
        });
    };
    var contact = function () {
        var pb = {
            type: 1  //1为发货人操作，2为收货人操作，3为通知人
            , operate: 1  //1为新建操作，2为搜索操作
            , offset: 0  //搜索分页偏移量
            , limit: 5    //分页限制条数
            , data: {}  //缓存请求数据
        };
        $(document).on('click', '.close-c', function () {
            pb.offset = 0;
            $('.contact-modal').addClass('dp-n');
            $('.white-back').addClass('dp-n');
        });
        //收发货人信息编辑
        var sNm,sNc,sNn,sNe;
        //var spanText=function(obj,i){
        //    $('#s-name').val('');
        //    $('#s-dz').val('');
        //    $('#s-dh').val('');
        //    $('#s-person').val('');
        //    $('#s-mail').val('');
        //    $('#s-cz').val('');
        //    var parent=$(obj).parent().parent().find('span').eq(i).parent().clone();
        //    parent.find('span').remove();
        //    return parent.text();
        //    parent.remove();
        //};
        $(document).on('click', '.show-contact', function () {
            pb.type = $(this).data('t') == '收货人' ? 2 : 1;
            switch($(this).data('t')){
                case '收货人':
                    pb.type=2;
                    break;
                case '发货人':
                    pb.type=1;
                    break;
                case '通知人':
                    pb.type=3;
                    break;
            }
            opeSid = $(this).data('sid') || null;
            var ele = $('.contact-modal');
            var d;
            //var d = pb.type == 1 ? fhr : shr;
            switch(pb.type){
                case 1:
                    d=fhr;
                    break;
                case 2:
                    d=shr;
                    break;
                case 3:
                    d=tzr;
                    break;
                default:
                    break;
            }
            ele.find('.contact-page').html('');
            $('.ct-require').removeClass('warm');
            ele.find('.new').show();
            ele.find('.search').hide();
            ele.find('#save-contact').show();
            ele.find('#ensure-contact').hide();
            ele.find('#s-name').val(d.contactName || '');
            ele.find('#s-dz').val(d.contactAddress || '');
            ele.find('#s-person').val(d.contactPerson || '');
            ele.find('#s-dh').val(d.contactTel || '');
            ele.find('#s-mail').val(d.contactEmail || '');
            ele.find('#s-cz').val(d.contactFax || '');
            ele.find('.header').html($(this).data('t') + '设置<span class="close-c">X</span>');
            ele.find('.show-name').html($(this).data('t'));
            $('#c-name').val('');
            ele.find('tbody').html('<tr class="wrong"> <td colspan="5">请搜索</td> </tr>');
            ele.removeClass('dp-n');
            $('.white-back').removeClass('dp-n');
        });
        //收发货人信息编辑
        var sNm,sNc,sNn,sNe;
            //pb.type = $(this).data('t') == '收货人' ? 2 : 1;
            //$('#s-name').val('');
            //$('#s-dh').val('');
            //$('#s-person').val('');
            //$('#s-mail').val('');
            opeSid = $(this).data('sid') || null;
            var ele = $('.contact-modal');
        $(document).on('click', '.fd-top .show-contact', function () {
            switch($(this).data('t')){
                case '收货人':
                    pb.type=2;
                    sNm=$(this).parent().parent().find('.ocName').html();
                    sNc=$(this).parent().parent().find('.occp').html();
                    sNn=$(this).parent().parent().find('.ocTel').html();
                    sNe=$(this).parent().parent().find('.ocEmail').html();
                    break;
                case '发货人':
                    pb.type=1;
                    sNm=$(this).parent().parent().find('.osName').html();
                    sNc=$(this).parent().parent().find('.oscp').html();
                    sNn=$(this).parent().parent().find('.osTel').html();
                    sNe=$(this).parent().parent().find('.osEmail').html();
                    break;
                case '通知人':
                    pb.type=3;
                    sNm=$(this).parent().parent().find('.otName').html();
                    sNc=$(this).parent().parent().find('.otcp').html();
                    sNn=$(this).parent().parent().find('.otTel').html();
                    sNe=sNe=$(this).parent().parent().find('.otEmail').html();
                    break;
            };
            var sdz=$(this).data('dz') || '';
            var scz=$(this).data('fax') || '';
            ele.find('.contact-page').html('');
            $('.ct-require').removeClass('warm');
            ele.find('.new').show();
            ele.find('.search').hide();
            ele.find('#save-contact').show();
            ele.find('#ensure-contact').hide();
            ele.find('#s-name').val(sNm || '') ;
            ele.find('#s-dz').val(sdz || '');
            ele.find('#s-person').val(sNc || '');
            ele.find('#s-dh').val(sNn || '');
            ele.find('#s-mail').val(sNe || '');
            ele.find('#s-cz').val(scz || '');
            ele.find('.header').html($(this).data('t') + '设置<span class="close-c">X</span>');
            ele.find('.show-name').html($(this).data('t'));
            $('#c-name').val('');
            ele.find('tbody').html('<tr class="wrong"> <td colspan="5">请搜索</td> </tr>');
            ele.removeClass('dp-n');
            $('.white-back').removeClass('dp-n');

        });
        $(document).on('click', '.sel-tp span', function () {
            var ele = $('.contact-modal');
            pb.operate = $(this).data('tp');
            if (pb.operate == 1) {
                ele.find('.new').show();
                ele.find('#save-contact').show();
                ele.find('.search').hide();
                ele.find('#ensure-contact').hide();
            } else {
                ele.find('.new').hide();
                ele.find('#save-contact').hide();
                ele.find('.search').show();
                ele.find('#ensure-contact').show();
            }
        });
        //主单添加收发货人信息
        $(document).on('click', '#save-contact', function () {
            var ele = $('.contact-modal');
            var pass = true;
            $('.ct-require').each(function () {
                if ($(this).val()) {
                    $(this).removeClass('warm');
                } else {
                    $(this).addClass('warm');
                    pass = false;
                }
            });
            if (pass) {
                var data = {
                    "orderId": $(this).data('id'),
                    "memberId": 0,
                    "subNum": opeSid,
                    "contactType": pb.type,
                    "contactName": ele.find('#s-name').val(),
                    "contactAddress": ele.find('#s-dz').val(),
                    "contactPerson": ele.find('#s-person').val(),
                    "contactTel": ele.find('#s-dh').val(),
                    "contactFax": ele.find('#s-cz').val(),
                    "contactEmail": ele.find('#s-mail').val(),
                    "isSave": $('#s-save').prop('checked')
                };
                Data.personAdd(data, function (json) {
                    console.log(json);
                    if (json && 'resCode' in json && json.resCode == 0) {
                        Modal.setAlert('设置成功！', null, function () {
                            location.reload();
                        });
                    } else {
                        Modal.setAlert(json.resMsg || '设置失败，请重试！');
                    }
                });
            }
        });
        $(document).on('click', '#ensure-contact', function () {
            var id = $('input[name="c-sg"]:checked').data('id');
            if (id) {
                var d = pb.data[id];
                var ele = $('.contact-modal');
                var data = {
                    "orderId": $(this).data('id'),
                    "contactType": pb.type,
                    "subNum": opeSid,
                    "contactName": d.contactName,
                    "contactAddress": d.contactAddress,
                    "contactPerson": d.contactPerson,
                    "contactTel": d.contactTel,
                    "contactFax": d.contactFax,
                    "contactEmail": d.contactEmail,
                    "isSave": $('#s-save').prop('checked')
                };
                Data.personAdd(data, function (json) {
                    console.log(json);
                    if (json && 'resCode' in json && json.resCode == 0) {
                        Modal.setAlert('设置成功！', null, function () {
                            location.reload();
                        });
                    } else {
                        Modal.setAlert(json.resMsg || '设置失败，请重试！');
                    }
                });
            } else {
                Modal.setAlert('请选择一个收发货人！');
            }
        });
        $(document).on('click', '#search-p', function () {
            pb.offset = 0;
            cInit();
        });
        $(document).on('click', '.contact-page .pages', function () {
            pb.offset = $(this).data('offset');
            cInit();
        });
        var cInit = function () {
            var data = {
                tp: pb.type
                , key: $('#c-name').val()
                , offset: pb.offset
                , limit: pb.limit
            };
            Data.contactList(data, function (json) {
                var str = '';
                pb.data = {};
                if (json && 'resCode' in json && json.resCode == 0) {
                    var arr = json.resBody.sList;
                    if (arr.length > 0) {
                        for (var a in arr) {
                            if (arr.hasOwnProperty(a)) {
                                var d = arr[a];
                                pb.data[d.contactId] = d;
                                str += ' <tr> <td><input data-id="' + d.contactId + '" type="radio" name="c-sg"/></td>' +
                                    ' <td>' + d.contactName + '</td> <td>' + d.contactAddress + '</td> <td>' + d.contactPerson + '</td>' +
                                    ' <td>' + d.contactTel + '</td> </tr>';
                            }
                        }
                        $.burster($('.contact-page'), pb.offset || 0, json.resBody.totalCount, 5, pb.limit || 5);
                    } else {
                        str += '<tr class="wrong"> <td colspan="5">暂无收发货人，请添加！</td> </tr>';
                        $('.contact-page').html('');
                    }
                } else {
                    str += '<tr class="wrong"> <td colspan="5">请求出错，请重试！</td> </tr>';
                    $('.contact-page').html('');
                }
                $('.contact-modal').find('tbody').html(str);
            });
        };
    };
    console.log(dlData);
    var dlMap = function () {
        $(document).on('click', '#open_map', function () {
            Data.warehouse({id: $(this).data('id')}, function (json) {
                if (json && 'resCode' in json && json.resCode == 0) {
                    var d = json.resBody || {};
                    $('.w-name').html(d.warehouseName || '/');
                    $('.w-address').html(d.warehouseAddress || '/');
                    $('.w-tel').html(d.warehouseContact || '/' + '(电话：' + d.warehouseTel || '/' + '，传真：' + d.warehouseFax || '/' + ')');
                    Data.down({"file": d.warehouseMap}, function (body) {
                        if (body && 'resCode' in body && body.resCode == 0 && body.resBody) {
                            var ele = '<img alt="进仓地图" src="' + body.resBody + '"/>';
                            $('.map-main').html(ele);
                        }
                        $('#dl-map').click();
                        //$('.white-back').removeClass('dp-n');
                        //$('.map').removeClass('dp-n');
                    });
                }
            });
        });
        $(document).on('click', '#dl-map', function () {
            var ele = $('.dl-part').html();
            var str = '<!DOCTYPE html> <html lang="zh-CN"> <head> <meta charset="UTF-8"> <meta name="Generator" content="Jeremy"> <meta name="Author" content="Jeremy"> <meta name="Keywords" content=""> <meta name="Description" content=""> <title> 下载进仓地图 </title> <style>.body{width:1200px;margin:0 auto;}p{height:30px;line-height:30px;}p span{display:block;float:left;height:30px;line-height:30px;}.title{width:100px;text-align:left;}.map-main{height:600px;width:100%}img{height:100%;width:100%;} </style> </head> <body> <div class="body"> ' + ele + '</div> </body> </html>';
            $.ajax({
                url: '/api/down/pdf'
                , type: 'post'
                , data: {code: str, name: '进仓地图'}
                , dataType: 'json'
                , timeout: 100000
                , success: function (json) {
                    if ('status' in json && json.status == 1) {
                        window.open("/getImgCode/pdf");
                    }
                }
            });
        });
    };
    var dlBh = function () {
        var data = {
            agentCompanyId: 10000
            , airCompanyCode: dlData.hkgs
            , airportCode: dlData.qyg
        };
        Data.companyDetail(data, function (json) {
            var str = '';
            if (json && 'resBody' in json && json.resBody instanceof Array) {
                var arr = json.resBody;
                for (var a in arr) {
                    if (arr.hasOwnProperty(a)) {
                        str += '<div class="files"> <div class="top">' + arr[a].fileExtension.toUpperCase() + '<span class="glyphicon glyphicon-circle-arrow-down" data-key="' + arr[a].keyName + '"></span> </div> <a href="javascript:void(0);" class="dp-b">' + arr[a].fileName + '</a> </div>'
                    }
                }
            } else {
                str = '<div class="no-file">暂无保函！</div>'
            }
            $('.bh-part').find('.dp-tb').html(str);
        });
        $(document).on('click', '.dl-bh', function () {
            $('.white-back').removeClass('dp-n');
            $('.bh-part').removeClass('dp-n');
        });
        $(document).on('click', '.glyphicon-circle-arrow-down', function () {
            if ($(this).data('type') == 'yld') {
                location.href = '/vip/order/detail/yld?id=' + $(this).data('key');
            } else if ($(this).data('type') == 'ckd') {
                location.href = '/vip/order/detail/ckd?id=' + $(this).data('key');
            } else {
                var file = $(this).data('key');
                Data.down({file: file}, function (json) {
                    if (json && 'resBody' in json) {
                        window.open(json.resBody);
                    }
                });
            }
        });
    };
    var trackInit = function () {
        var str = '';
        var id = $('#ydh').data('no');
        if (id != 0) {
            Data.track({id: id}, function (json) {
                if (json && 'resBody' in json && json.resBody) {
                    var b = json.resBody;
                    if ('trackList' in b && b.trackList instanceof Array && b.trackList.length > 0) {
                        var arr = b.trackList;
                        for (var a in arr) {
                            if (arr.hasOwnProperty(a)) {
                                var d = arr[a];
                                str += '<tr><td>' + d.itemDate + '</td><td>' + d.itemLocation + '</td>' +
                                    '<td>' + d.itemCode + '</td><td>' + d.itemDescription + '</td>' +
                                    '<td>' + d.cargoCount + '</td><td>' + d.cargoWeight + '</td></tr>'
                            }
                        }
                        $('.ydtb').find('tbody').html(str);
                        $('.ydtb').show();
                    }
                }
            });
        }
    };
    var declareData = function () {
        Data.declareData({id: url.get('id')}, function (json) {
            var str = '';
            if (json && 'resBody' in json && json.resBody) {
                str += '<div class="files"> <div class="top">PDF<span data-type="yld" class="glyphicon glyphicon-circle-arrow-down" data-key="' + url.get('id') + '"></span> </div> <a href="javascript:void(0);" class="dp-b">电子预录单</a> </div>' +
                    '<div class="files"> <div class="top">PDF<span data-type="ckd" class="glyphicon glyphicon-circle-arrow-down" data-key="' + url.get('id') + '"></span> </div> <a href="javascript:void(0);" class="dp-b">放行通知书</a> </div>';
            }
            $('.yl-part').find('.dp-tb').append(str);
        });
    };
    var subData = function () {
        $(document).on('change', '.td-sg,.fd-sg', function () {
            $(this).parents('tr').css('background-color', $(this).prop('checked') ? '#c7edff' : '#fff');
        });
        $(document).on('click', '#sel-td', function () {
            $('.td-sg').prop('checked', $(this).prop('checked')).trigger('change');
        });
        $(document).on('click', '#sel-fd-all', function () {
            var tb = $(this).parents('table');
            tb.find('.fd-sg').prop('checked', $(this).prop('checked')).trigger('change');
        });
        $(document).on('click', '.sg-tab', function () {
            $(this).addClass('active');
            $('#' + $(this).data('tar')).addClass('active');
            $(this).siblings().removeClass('active');
            $('#' + $(this).data('tar')).siblings().removeClass('active');
            $('#cdd').prop('disabled', $(this).data('tar') == 'wfdhw');
        });
        $(document).on('click', '.yfd-btn', function () {
            var _this = $(this);
            _this.find('.fl-r').html(_this.find('.fl-r').html() == '+展开' ? '-收起' : '+展开');
            var tar = $($(this).data('target'));
            if (_this.data('time') == 0) {
                $('.loading-part').show();
                Data.orderDetail({
                    orderId: url.get('id')
                    , subOrderNum: $(this).data('id')
                    , agentCompanyId: 10000
                }, function (json) {
                    if (json && 'resCode' in json && json.resCode == 0) {
                        _this.data('time', 1);
                        var str = '';
                        var body = json.resBody || {};
                        var o = 'order' in body && body.order || {};
                        //if(o.orderShipper && o.orderShipper in o && 'contactName' in o.orderShipper && o.orderShipper.contactName && o.orderShipper.contactName=='null'){
                        //
                        //}else{
                        //
                        //}
                        //发货人信息拼接
                        str += '<div class="fd-top fill">'
                        if (o.orderShipper && 'contactName' in o.orderShipper && o.orderShipper.contactName && o.orderShipper.contactName!='null' ) {
                            str += '<div class="fd-info"> <p class="title">发货人信息 <a href="javascript:void(0);" class="show-contact" data-t="发货人" data-sid="' + (o.subNum || 0) + '" data-dz="' + o.orderShipper.contactAddress + '" data-fax="' + o.orderShipper.contactFax + '">编辑</a> </p>';
                            str += '<p class="osName">' + o.orderShipper.contactName + '</p> <p class="oscp">' + o.orderShipper.contactPerson + '</p> <p class="osTel">' + o.orderShipper.contactTel + '</p> <p class="osEmail">' + o.orderShipper.contactEmail + '</p> </div>';
                        } else {
                            str += '<div class="fd-info"> <p class="title">发货人信息 <a href="javascript:void(0);" class="show-contact" data-t="发货人" data-sid="' + (o.subNum || 0) + '" data-dz="' + o.orderShipper.contactAddress + '" data-fax="' + o.orderShipper.contactFax + '">编辑</a>  </p>';
                            str += '<p class="no-sfhr">暂无发货人信息</p></div>'
                        }
                        //收货人信息拼接
                        if (o.orderConsignee && 'contactName' in o.orderConsignee && o.orderConsignee.contactName && o.orderConsignee.contactName!='null') {
                            str += '<div class="fd-info">' +
                                '<p class="title">收货人信息 ' +
                                '<a href="javascript:void(0);" class="show-contact" data-t="收货人" data-sid="' + (o.subNum || 0) + '" data-dz="' + o.orderConsignee.contactAddress  + '" data-fax="' + o.orderConsignee.contactFax + '">编辑</a>' +
                                '</p>';
                            str += '<p class="ocName">' + o.orderConsignee.contactName + '</p> ' +
                                '<p class="occp">' + o.orderConsignee.contactPerson + '</p> ' +
                                '<p class="ocTel">' + o.orderConsignee.contactTel + '</p>' +
                                ' <p class="ocEmail">' + o.orderConsignee.contactEmail + '</p>' +
                                ' </div>';
                        } else {
                            str += '<div class="fd-info"> ' +
                                '<p class="title">收货人信息 ' +
                                '<a href="javascript:void(0);" class="show-contact" data-t="收货人" data-sid="' + (o.subNum || 0) + '" data-dz="' + o.orderConsignee.contactAddress + '" data-fax="' + o.orderConsignee.contactFax + '">编辑</a>' +
                                ' </p>';
                            str += '<p class="no-sfhr">暂无收货人信息</p></div>'
                        }
                        //通知人信息拼接
                        if (o.orderNotifier && 'contactName' in o.orderNotifier && o.orderNotifier.contactName && o.orderNotifier.contactName!='null') {
                            str += '<div class="fd-info"> <p class="title">通知人信息 <a href="javascript:void(0);" class="show-contact" data-t="通知人" data-sid="' + (o.subNum || 0) + '" data-dz="' + o.orderNotifier.contactAddress + '" data-fax="' + o.orderNotifier.contactFax + '">编辑</a> </p>';
                            str += '<p class="otName">' + o.orderNotifier.contactName + '</p> <p class="otcp">' + o.orderNotifier.contactPerson + '</p> <p class="otTel">' + o.orderNotifier.contactTel + '</p> <p class="otEmail">' + o.orderNotifier.contactEmail + '</p> </div>';
                        } else {
                            str += '<div class="fd-info"> <p class="title">通知人信息 <a href="javascript:void(0);" class="show-contact" data-t="通知人" data-sid="' + (o.subNum || 0) + '" data-dz="" data-fax="">编辑</a> </p>';
                            str += '<p class="no-sfhr">暂无通知人信息</p></div>'
                        }
                        //品名拼
                        str += '<div class="fd-info"><p class="title">品名 <a href="javascript:void(0);" class="cg-name-btn" data-id="' + o.orderId + '" data-sid="' + o.subNum + '" data-name="' + o.subCargoName + '" data-mark="' + (o.cargo.packageMark || '') + '">编辑</a> </p> <p>' + o.subCargoName + '</p> </div>';
                        str += '<div class="fd-info"><p class="title">唛头 </p><p>' + (o.cargo.packageMark || '') + '</p> </div></div>';
//markName
                        //拼接table
                        str += '<div class="fd-middle"> <p class="title">分单货物信息 <a href="/vip/order/detail/ensure?id=' + o.orderId + '&sid=' + o.subNum + '" target="_blank" class="fl-r">查看分单</a> </p><table border="1" class="mg-b">' +
                            ' <thead> <tr>  <td>进仓编号</td> <td>长(CM)</td> <td>宽(CM)</td> <td>高(CM)</td> <td>件数(PCS)</td> <td>重量(KGS)</td> <td>体积(CBM)</td> <td>包装</td> <td>损毁</td> <td>变形</td> <td>受潮</td> <td>其他</td> <td>备注</td> </tr> </thead> <tbody>';
                        var storage = 'storage' in body && body.storage || {};
                        var entryList = 'entryList' in storage && storage.entryList || [];
                        var zjjs = 0, zjzl = 0, zjtj = 0, zjps = 0, zjbx = 0, zjsc = 0, zjqt = 0,xindan=0;
                        for (var e in entryList) {
                            if (entryList.hasOwnProperty(e)) {
                                var dt1 = entryList[e];
                                var dt = entryList[e].entryDetail;
                                var xjjs = 0, xjzl = 0, xjtj = 0, xjps = 0, xjbx = 0, xjsc = 0, xjqt = 0;
                                for (var d1 in dt) {
                                    if (dt.hasOwnProperty(d1)) {
                                        var d = dt[d1];
                                        xjjs += d.itemCount;
                                        zjjs += d.itemCount;
                                        xjtj += d.itemCount * d.itemHeight * d.itemLength * d.itemWidth / 1000000;
                                        zjtj += d.itemCount * d.itemHeight * d.itemLength * d.itemWidth / 1000000;
                                        str += '<tr> <td>' + dt1.entryNum + '</td> ' +
                                            '<td>' + d.itemLength + '</td> <td>' + d.itemWidth + '</td> <td>' + d.itemHeight + '</td>' +
                                            ' <td>' + d.itemCount + '</td> <td>-</td> <td>' + myformat.formatvolume(d.itemCount * d.itemHeight * d.itemLength * d.itemWidth / 1000000) + '</td> ' +
                                            '<td>' + dt1.packageType + '</td> <td>-</td> <td>-</td> <td>-</td> <td>-</td> <td>-</td> </tr>';
                                    }
                                }
                                zjzl = o.cargo.cargoWeight;
                                //xindan=
                                zjps += dt1.damageCount;
                                zjbx += dt1.transformCount;
                                zjsc += dt1.dampCount;
                                zjqt += dt1.otherCount;
                                str += '<tr class="tr-xj"> <td>小计</td> <td colspan="3" class="font-g">更新时间（' + dt1.storageTime + '）</td>' +
                                    ' <td>' + xjjs + '</td> <td>-</td> <td>' + myformat.formatvolume(xjtj) + '</td> <td></td>' +
                                    '<td>' + (dt1.damageCount || '-') + '</td> <td>' + (dt1.transformCount || '-') + '</td> <td>' + (dt1.dampCount || '-') + '</td> <td>' + (dt1.otherCount || '-') + '</td> <td>-</td> </tr>'
                            }
                        }
                        str += '<tr class="tr-zj"> <td>总计</td> <td colspan="3"></td> <td>' + zjjs + '</td> ' +
                            '<td>' + zjzl + '</td> <td>' + myformat.formatvolume(zjtj) + '</td> <td></td> <td>' + (zjps || '') + '</td>' +
                            ' <td>' + (zjbx || '') + '</td> <td>' + (zjsc || '') + '</td> <td>' + (zjqt || '') + '</td> <td></td> </tr></tbody></table></div>';
                        //订单附件拼接
                        str += '<div class="fd-bottom"><div class="ddfj-pub fill"><p class="title fill"><span class="one">分单相关文件</span> ' +
                            '<span class="two"><span class="wxts">温馨提示：</span>请尽快上传报关单、报关委托书、装箱单、发票等资料，文件格式支持.doc/.docx/.xls/.xlsx/.pdf/.jpg/.png/.bmp' +
                            '<br>请检查资料证件上传是否齐全，如果齐全，可向报关行</span></p><div class="add" data-sid="' + o.subNum + '"> <div class="top"> + </div> <a href="javascript:void(0);" class="dp-b">添加文件</a> <input type="file" id="up-file-fd" data-sid="' + o.subNum + '"> </div></div></div>';
                        //下载打印文件
                        str +='<div class="fd-fileDown"><p class="title">文件下载</p><div class="left">' +
                            '<p>下载/打印文件</p>'+
                                //<div class="dp-b fl-l dl" id="open_map" data-id="<%= o.warehouseId %>">
                                //<a href="javascript:void(0);">
                                //<span class="dp-b img">图</span>
                                //<span class="dp-b txt">进仓地图</span>
                                //</a>
                                //
                                //<div class="cover dp-n"></div>
                                //</div>
                                //<div class="dp-b fl-l dl dl-bh" data-id="<%= o.airwayId %>">
                                //<a href="javascript:void(0);">
                                //<span class="dp-b img">保</span>
                                //<span class="dp-b txt">货物保函</span>
                                //</a>
                                //
                                //<div class="cover dp-n"></div>
                                //</div>
                                //<div class="dp-b fl-l dl dl-price">
                                //<a href="javascript:void(0);">
                                //<span class="dp-b img">报</span>
                                //<span class="dp-b txt">导出报价单</span>
                                //</a>
                                //
                                //<div class="cover dp-n"></div>
                                //</div>
                            '<div class="dp-b fl-l dl dl-yld" data-type="21" data-key="0"><a href="javascript:void(0);"><span class="dp-b img">预</span><span class="dp-b txt">预录单</span></a><div class="cover dp-n"></div><div class="tmp dp-n"></div></div>'+
                            '<div class="dp-b fl-l dl dl-file" data-type="22" data-key="0"><a href="javascript:void(0);"><span class="dp-b img">查</span><span class="dp-b txt">查验费用单</span></a> <div class="cover dp-n"></div></div>'+
                            '</div></div>';
                        tar.html(str);
                        tar.collapse('toggle');
                        var data22=0;
                        Data.fileList({id: url.get('id'), sid: o.subNum || ''}, function (json) {
                            if (json && 'resCode' in json && json.resCode == 0 && json.resBody) {
                                var str = '';
                                var arr = json.resBody;
                                for (var a in arr) {
                                    if (arr.hasOwnProperty(a)) {
                                        var d = arr[a];
                                        if (d.fileType == 20) {
                                            str += '<div class="up-part"> <div class="top">' + d.fileExtension.toUpperCase() + '<a href="javascript:void(0);" class="dl" data-key="' + d.keyName + '"></a> ' +
                                                '<a href="javascript:void(0);" class="rm" data-key="' + d.keyName + '"></a> ' +
                                                '</div> <a href="javascript:void(0);" class="dp-b">' + d.fileName + '</a> ' +
                                                '</div>';
                                        } else if (d.fileType == 22) {
                                            data22=1;
                                           // $('.dl-file[data-type="' + d.fileType + '"]').data('key', d.keyName);
                                            _this.parent().find('.fd-info-body').find('.fd-fileDown').find(".dl-file").data('key', d.keyName);
                                        } else if (d.fileType == 21) {
                                            var yld = '';
                                            yld += '<div class="up-part"> <div class="top">' + arr[a].fileExtension.toUpperCase() + '<a href="javascript:void(0);" class="dl glyphicon glyphicon-circle-arrow-down" data-key="' + d.keyName + '"></a> </div> <a href="javascript:void(0);" class="dp-b">' + arr[a].fileName + '</a> </div>'
                                            //$('.fxtzs-fill').append(yld);
                                            _this.parent().find('.fd-info-body').find('.fd-fileDown').find('.tmp').append(yld);
                                            $('.fxtzs').show();
                                        } else {
                                            var ele = $('.add-type[data-type=' + d.fileType + ']');
                                            ele.addClass('active');
                                            ele.find('input').hide();
                                            ele.find('.top').html(d.fileExtension.toUpperCase() + '<a href="javascript:void(0);" class="dl" data-key="' + d.keyName + '"></a> <a href="javascript:void(0);" class="rm-type" data-key="' + d.keyName + '"></a> ');
                                            ele.find('.f-name').html(d.fileName);
                                        }
                                    }
                                }
                                if(data22==0){
                                    $('.dl[data-type="22"]').addClass('none-f');
                                }
                                $('.add[data-sid="' + o.subNum + '"]').before(str);
                            }
                        });
                    } else {
                        Modal.setAlert('获取分单详情失败，请重试！');
                    }
                    $('.loading-part').hide();
                });
            } else {
                tar.collapse('toggle');
            }
        });
        $(document).on('click', '.yfd-sg', function (event) {
            event.stopPropagation();
        });
    };
    var createSub = function () {
        var type = {
            cf: 0,     //0是未拆分过的，1是拆分过的
            n: 0,         //0是拆往新订单，1是拆往已有订单
            sid: ''    //已拆分过的分单号
            , tosdi: ''  //拆往哪个订单
            , oriwei: ''   //已拆分重量
            , arr: []   //转移的货物数据
        };
        var initModal = function () {
            $('.w-e').hide();
            $('.y-n').hide();
            $('.y-e').hide();
            $('.fd-alert-part').find('input[type="text"]').val('');
            $('#czxfd').triggle('click');
        };
        $(document).on('change', '#yyfd-fdh', function () {
            var opt = $(this).find('option:selected');
            var ele = $('.fd-alert-part');
            ele.find('.mbfd').html(opt.val());
            ele.find('.mb').find('.ori-wei').html(opt.data('wei'))
        });
        $(document).on('click', 'input[name="sel-fd-type"]', function () {
            $('.w-e').hide();
            $('.y-n').hide();
            $('.y-e').hide();
            $('.fd-alert-part').find('.f-pt').show();
            $('.fd-alert-part').find('.s-pt').hide();
            var ele = $('.alert-body');
            var n = ele.find('.new');
            var e = ele.find('.exist');
            if ($('input[name="sel-fd-type"]:checked').val() == 1) {
                type.n = 0;
                n.show();
                e.hide();
            } else {
                type.n = 1;
                n.hide();
                e.show();
            }
        });
        $(document).on('click', '#w-cfd', function () {
            type.cf = 0;
            type.sid = null;
            var arr = [];
            var table = $(this).parent().siblings('table');
            table.find('.td-sg:checked').each(function () {
                var d = JSON.parse($(this).data('dt').replace(/\'/g, "\""));
                d['warehouseEntryNum'] = $(this).data('enum');
                arr.push(d);
            });
            type.arr = arr;
            if (table.find('.td-sg:checked').length > 0) {
                Data.NewSubNum({orderId: url.get('id')}, function (json) {
                    var num = json && 'resBody' in json && json.resBody || '';
                    $('#nfd-fdh').val(num);
                    $('.white-back').removeClass('dp-n');
                    $('.fd-alert-part').removeClass('dp-n');
                });
            }
        });
        $(document).on('click', '.ycf-cfd', function () {
            type.cf = 1;
            type.sid = $(this).data('id');
            type.oriwei = $(this).data('wei');
            var arr = [];
            var table = $(this).parent().siblings('table');
            table.find('.fd-sg:checked').each(function () {
                var d = JSON.parse($(this).data('dt').replace(/\'/g, "\""));
                d['warehouseEntryNum'] = $(this).data('enum');
                arr.push(d);
            });
            type.arr = arr;
            if (table.find('.fd-sg:checked').length > 0) {
                Data.NewSubNum({orderId: url.get('id')}, function (json) {
                    var num = json && 'resBody' in json && json.resBody || '';
                    $('#nfd-fdh').val(num);
                    $('.white-back').removeClass('dp-n');
                    $('.fd-alert-part').removeClass('dp-n');
                });
            }
        });
        $(document).on('click', '#create-fd', function () {
            var _this = $(this);
            var pass = true;
            if (type.cf == 0 && type.n == 0) {//未拆分货物拆往新分单
                $('.nfd-required').each(function () {
                    if (!$(this).val()) {
                        pass = false;
                        $(this).addClass('warm');
                    } else {
                        $(this).removeClass('warm');
                    }
                });
                if (pass) {
                    var data = {
                        "orderId": url.get('id'),
                        "orderSubNum": $('#nfd-fdh').val(),
                        "cargoName": $('#nfd-pm').val(),
                        "weight": $('#nfd-zl').val(),
                        "entryItemList": type.arr
                    };
                    Data.newStorage(data, function (json) {
                        if (json && 'resCode' in json && json.resCode == 0) {
                            Modal.setAlert('分单创建成功!', null, function () {
                                location.reload();
                            });
                        } else {
                            Modal.setAlert(json.resMsg || '分单创建失败，请重试！');
                        }
                    });
                }
            }
            if (type.cf == 0 && type.n == 1) {//未拆分货物拆往已有分单
                if ($('#yyfd-fdh').find('option').length > 0) {
                    var we = $('.w-e');
                    var option = $('#yyfd-fdh').find('option:selected');
                    we.find('.mbfd').html(option.val());
                    we.find('.ori-wei').html(option.data('wei'));
                    we.siblings().hide();
                    we.show();
                    _this.parent().find('.f-pt').hide();
                    _this.parent().find('.s-pt').show();
                } else {
                    Modal.setAlert('暂无可选分单，请拆至新分单！');
                }
            }
            if (type.cf == 1 && type.n == 0) {
                $('.nfd-required').each(function () {
                    if (!$(this).val()) {
                        pass = false;
                        $(this).addClass('warm');
                    } else {
                        $(this).removeClass('warm');
                    }
                });
                if (pass) {
                    var yn = $('.y-n');
                    yn.siblings().hide();
                    yn.show();
                    yn.find('.body').html(type.oriwei + ' KG');
                    _this.parent().find('.f-pt').hide();
                    _this.parent().find('.s-pt').show();
                }
            }
            if (type.cf == 1 && type.n == 1) {
                if ($('#yyfd-fdh').find('option').length > 0) {
                    var ye = $('.y-e');
                    var option = $('#yyfd-fdh').find('option:selected');
                    ye.find('.mbfd').html(option.val());
                    ye.find('.bcfd').html(type.sid);
                    ye.find('.mb').find('.ori-wei').html(option.data('wei'));
                    ye.find('.bc').find('.ori-wei').html(option.data('wei'));
                    ye.siblings().hide();
                    ye.show();
                    _this.parent().find('.f-pt').hide();
                    _this.parent().find('.s-pt').show();
                } else {
                    Modal.setAlert('暂无可选分单，请拆至新分单！');
                }
            }
        });
        $(document).on('click', '#fd-tz', function () {
            if (type.cf == 0 && type.n == 1) {//未拆分货物拆往已有分单
                if ($('#w-e--n-w').val()) {
                    $('#w-e--n-w').removeClass('warm');
                    var data = {
                        "orderId": url.get('id'),
                        "subNum": $('#yyfd-fdh').find('option:selected').val(),
                        "cargoName": "",
                        "entryItemList": type.arr,
                        "weight": $('#w-e--n-w').val()
                    };
                    Data.addStorage(data, function (json) {
                        if (json && 'resCode' in json && json.resCode == 0) {
                            Modal.setAlert('分单操作成功!', null, function () {
                                location.reload();
                            });
                        } else {
                            Modal.setAlert(json.resMsg || '分单操作失败，请重试！');
                        }
                    });
                } else {
                    $('#w-e--n-w').addClass('warm');
                }
            }
            if (type.cf == 1 && type.n == 0) {
                if ($('#y-n-xzl').val()) {
                    $('#y-n-xzl').removeClass('warm');
                    var d1 = {
                        "orderId": url.get('id'),
                        "subNum": type.sid,
                        "subNumTo": $('#nfd-fdh').val(),
                        "cargoName": $('#nfd-pm').val(),
                        "entryItemList": type.arr,
                        "weight": $('#y-n-xzl').val(),
                        "weightTo": $('#nfd-zl').val()
                    };
                    Data.moveStorage(d1, function (json) {
                        if (json && 'resCode' in json && json.resCode == 0) {
                            Modal.setAlert('分单操作成功!', null, function () {
                                location.reload();
                            });
                        } else {
                            Modal.setAlert(json.resMsg || '分单操作失败，请重试！');
                        }
                    });
                } else {
                    $('#y-n-xzl').addClass('warm');
                }
            }
            if (type.cf == 1 && type.n == 1) {
                if ($('#y-e-b-zl').val() && $('#y-e-mb-zl').val()) {
                    $('#y-e-b-zl').removeClass('warm');
                    $('#y-e-mb-zl').removeClass('warm');
                    var d2 = {
                        "orderId": url.get('id'),
                        "subNum": type.sid,
                        "subNumTo": $('#yyfd-fdh').find('option:selected').val(),
                        "cargoName": '',
                        "entryItemList": type.arr,
                        "weight": $('#y-e-b-zl').val(),
                        "weightTo": $('#y-e-mb-zl').val()
                    };
                    Data.moveStorage(d2, function (json) {
                        if (json && 'resCode' in json && json.resCode == 0) {
                            Modal.setAlert('分单操作成功!', null, function () {
                                location.reload();
                            });
                        } else {
                            Modal.setAlert(json.resMsg || '分单操作失败，请重试！');
                        }
                    });

                } else {
                    if (!$('#y-e-b-zl').val()) {
                        $('#y-e-b-zl').addClass('warm');
                    } else {
                        $('#y-e-b-zl').removeClass('warm');
                    }
                    if (!$('#y-e-mb-zl').val()) {
                        $('#y-e-mb-zl').addClass('warm');
                    } else {
                        $('#y-e-mb-zl').removeClass('warm');
                    }
                }
            }
        });
        $(document).on('click', '#fd-btz', function () {
            if (type.cf == 0 && type.n == 1) {//未拆分货物拆往已有分单
                var data = {
                    "orderId": url.get('id'),
                    "subNum": $('#yyfd-fdh').find('option:selected').val(),
                    "cargoName": "",
                    "entryItemList": type.arr,
                    "weight": $('.w-e').find('.ori-wei').html()
                };
                Data.addStorage(data, function (json) {
                    if (json && 'resCode' in json && json.resCode == 0) {
                        Modal.setAlert('分单操作成功!', null, function () {
                            location.reload();
                        });
                    } else {
                        Modal.setAlert(json.resMsg || '分单操作失败，请重试！');
                    }
                });
            }
            if (type.cf == 1 && type.n == 0) {
                var d1 = {
                    "orderId": url.get('id'),
                    "subNum": type.sid,
                    "subNumTo": $('#nfd-fdh').val(),
                    "cargoName": $('#nfd-pm').val(),
                    "entryItemList": type.arr,
                    "weight": type.oriwei,
                    "weightTo": $('#nfd-zl').val()
                };
                Data.moveStorage(d1, function (json) {
                    if (json && 'resCode' in json && json.resCode == 0) {
                        Modal.setAlert('分单操作成功!', null, function () {
                            location.reload();
                        });
                    } else {
                        Modal.setAlert(json.resMsg || '分单操作失败，请重试！');
                    }
                });
            }
            if (type.cf == 1 && type.n == 1) {
                var d2 = {
                    "orderId": url.get('id'),
                    "subNum": type.sid,
                    "subNumTo": $('#yyfd-fdh').find('option:selected').val(),
                    "cargoName": '',
                    "entryItemList": type.arr,
                    "weight": type.oriwei,
                    "weightTo": $('#yyfd-fdh').find('option:selected').data('wei')
                };
                Data.moveStorage(d2, function (json) {
                    if (json && 'resCode' in json && json.resCode == 0) {
                        Modal.setAlert('分单操作成功!', null, function () {
                            location.reload();
                        });
                    } else {
                        Modal.setAlert(json.resMsg || '分单操作失败，请重试！');
                    }
                });
            }
        });
    };
    var changeName = function () {
        var cgid, cgsid,cgname,markname;
        $(document).on('click', '.cg-name-btn', function () {
            cgid = $(this).data('id');
            cgsid = $(this).data('sid');
            cgname= $(this).data('name');
            markname= $(this).data('mark');
            $('#cg-name').val(cgname);
            $('#mark-subname').val(markname);
            $('.name-part').removeClass('dp-n');
            $('.white-back').removeClass('dp-n');
        });
        $(document).on('click', '#name-ensure', function () {
            if ($('#cg-name').val()) {
                $('#cg-name').removeClass('warm');
                Data.changeName({
                    "orderId": cgid,
                    "subNum": cgsid,
                    "subCargoName": $('#cg-name').val(),
                    "markName": $('#mark-subname').val()
                }, function (json) {
                    if (json && 'resCode' in json && json.resCode == 0) {
                        Modal.setAlert('修改成功!', null, function () {
                            location.reload();
                        });
                    } else {
                        Modal.setAlert(json.resMsg || '修改失败，请重试！');
                    }
                });
            } else {
                $('#cg-name').addClass('warm');
            }
        });
    };
    //杂费费用的引入
    var extraInit = function () {
        var data = {
            airCompanyCode: $('#aIc').html() || '',
            agentCompanyId:$('#aId').html()
        };
        Data.zfexpenseTem(data, function (json) {
            var arr =[];
            var str ='';
            if (json && 'resCode' in json && json.resCode == 0) {
                if(json.resBody && 'expenseTemplate' in json.resBody ){
                    arr=json.resBody['expenseTemplate'];
                    //刚开始的时候是返回的是对象所以即使调用属性名还是无法识别，所以使用这种方法。
                }
                for (var a in arr) {
                    if (arr.hasOwnProperty(a)) {
                        var d = arr[a];
                        str += '<tr><td>' + d.itemName + '</td><td>' + d.itemPrice + '</td><td>' + (d.itemRemark || '/') + '</td></tr>'
                    }
                }
                $('.other-list').find('tbody').html(str);
            }
        });
    };
    var otherinit = function(){
        $(".jg-modal").tooltip();
        //小数点控制
        $('#entrysize').html(myformat.formatvolume($('#entrysize').data('size'))+' CBM');
        $('#declaresize').html(myformat.formatvolume($('#declaresize').data('size'))+' CBM');
        $('#entrysize2').find('font').html(myformat.formatvolume( $('#entrysize2').find('font').html()));
        $('.item-tj').html(myformat.formatvolume($('.item-tj').html()));
        $('.xj-tj').html(myformat.formatvolume($('.xj-tj').html()));
        $('.total-tj').html(myformat.formatvolume($('.total-tj').html()));
    }
    var run = function () {
        listener();
        submit();
        upload();
        fileList();
        declareData();
        changeLine();
        airline();
        getCompany();
        contact();
        dlMap();
        dlBh();
        trackInit();
        subData();
        changeName();
        createSub();
        //extraInit();
        otherinit();
    };
    return {
        run: run
    }
}());
module.exports = Listener;