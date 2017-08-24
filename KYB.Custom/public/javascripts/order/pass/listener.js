/**
 * Created by Jeremy on 2017/1/5.
 */
'use strict';
require('../../general/burster');
var url = require('../../general/function').url
    , Modal = require('../../general/modal');
var Data = require('./data').Data
    , Dom = require('./dom').Dom;
var List = {}
    , operateId, subNumber;
var Listener = (function () {
    var listener = function () {
        $(document).on('click', '.close-btn', function () {
            $('.white-back').addClass('dp-n');
            $('.alert-part').addClass('dp-n');
        });
        $(document).on('click', '.outer-page .pages', function () {
            url.set('offset', $(this).data('offset'));
            init();
        });
        $(document).on('click', '#search', function () {
            url.set('offset', 0);
            init();
        });
        $(document).on('click', '.show-bg', function () {
            operateId = $(this).data('id');
            subNumber = $(this).data('subnum');
            var d = List[operateId];
            var ele = $('.bg-part');
            var jczt = '', dczt = '';
            switch (d.order.bookingState) {
                case 0:
                    dczt = '未订舱';
                    break;
                case 1:
                    dczt = '已订舱';
                    break;
                case -1:
                    dczt = '订舱失败';
                    break;
                case 2:
                    dczt = '已改配';
                    break;
            }
            switch (d.order.entryState) {
                case 0:
                    jczt = '待进仓';
                    break;
                case 1:
                    jczt = '已进仓';
                    break;
                case 2:
                    jczt = '已确认';
                    break;
            }
            ele.find('.ddh').html(d.order.orderNum);
            ele.find('.fdh').html(d.order.subNum);
            ele.find('.qsg').html(d.order.deptCode);
            ele.find('.mdg').html(d.order.destCode);
            ele.find('.hkgs').html(d.order.airCompanyCode);
            ele.find('.qfrq').html(new Date(d.order.flightDate).Format('yyyy-MM-dd'));
            ele.find('.jczt').html(jczt);
            ele.find('.dczt').html(dczt);
            $('.white-back').removeClass('dp-n');
            ele.removeClass('dp-n');
        });
        $(document).on('click', '#bg-ensure', function () {
            var data = {
                "orderId":operateId,
                "subNum": subNumber,
                "agentId": 0,
                "state": $('#c-bgzt').find('option:selected').val()
            };
            Data.changeState(data, function (json) {
                if (json && 'resCode' in json && json.resCode == 0) {
                    Modal.setAlert(json.resMsg || '更新成功！', null, function () {
                        location.reload();
                    });
                } else {
                    Modal.setAlert(json.resMsg || '更新失败，请重试！');
                }
            });
        });
    };
    var fileList = function () {
        //待删除的元素
        var removeEle;
        //缓存删除内容
        var removeFile = {
            "orderId": '',
            "keyName": 0
        };
        $(document).on('click', '.close-this', function () {
            $(this).parents('.alert-part').addClass('dp-n');
        });
        $(document).on('click', 'a.rm-type', function () {
            removeFile['orderId'] = operateId;
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
        $(document).on('click', '.d-files', function () {
            Data.orderFile({id: $(this).data('id'),subId :$(this).data('subid')}, function (json) {
                if (json && 'resCode' in json && json.resCode == 0 && json.resBody) {
                    var str = '';
                    var arr = json.resBody;
                    for (var a in arr) {
                        if (arr.hasOwnProperty(a)) {
                            var d = arr[a];
                            if ( d.fileType != 21 && d.fileType != 22) {
                                var name = '';
                                switch (d.fileType) {
                                    case 11:
                                        name = '报关单';
                                        break;
                                    case 12:
                                        name = '申报要素';
                                        break;
                                    case 13:
                                        name = '报关发票';
                                        break;
                                    case 14:
                                        name = '装箱单';
                                        break;
                                    case 15:
                                        name = '报关委托书';
                                        break;
                                }
                                str += '<div class="up-part"><p class="main-name">' + name + '</p><div class="top">' + d.fileExtension.toUpperCase() + '<a href="javascript:void(0);" class="dl" data-key="' + d.keyName + '"></a> ' +
                                    '</div> <a href="javascript:void(0);" class="dp-b">' + d.fileName + '</a> ' +
                                    '</div>';
                            }
                        }
                    }
                    $('.bh-part .file-body .dp-tb').html(str);
                    $('.white-back').removeClass('dp-n');
                    $('.bh-part').removeClass('dp-n');
                }
            });
        });
        $(document).on('click', '.u-files', function () {
            var str = ' <div class="add-type" data-type="21"> <div class="top"> + </div> <a href="javascript:void(0);" class="dp-b f-name" data-name="预录单">预录单</a> <input type="file" class="up-type" data-type="21"/> </div> <div class="add-type" data-type="22"> <div class="top"> + </div> <a href="javascript:void(0);" class="dp-b f-name" data-name="查验费用清单">查验费用清单</a> <input type="file" class="up-type" data-type="22"/> </div>';
            $('.upFile-part .file-body').find('.dp-tb').html(str);
            operateId = $(this).data('id'),
            subNumber = $(this).data('subid');
            Data.orderFile({id: $(this).data('id'),subId :$(this).data('subid')}, function (json) {
                if (json && 'resCode' in json && json.resCode == 0 && json.resBody) {
                    var str = '';
                    var arr = json.resBody;
                    for (var a in arr) {
                        if (arr.hasOwnProperty(a)) {
                            var d = arr[a];
                            if (d.fileType == 21 || d.fileType == 22) {
                                var ele = $('.add-type[data-type=' + d.fileType + ']');
                                ele.addClass('active');
                                ele.find('input').hide();
                                ele.find('.top').html(d.fileExtension.toUpperCase() + '<a href="javascript:void(0);" class="dl" data-key="' + d.keyName + '"></a> <a href="javascript:void(0);" class="rm-type" data-key="' + d.keyName + '"></a> ');
                                ele.find('.f-name').html(d.fileName);
                            }
                        }
                    }
                    $('.white-back').removeClass('dp-n');
                    $('.upFile-part').removeClass('dp-n');
                }
            });
        });
        $(document).on('change', '.up-type', function () {
            var arr = ['doc', 'docx', 'xls', 'xlsx', 'pdf', 'jpg', 'png', 'bmp'];
            var _this = $(this);
            var file = this.files[0]
                , size = this.files[0].size
                , name = this.files[0].name;
            var na = name.split('.');
            if (arr.indexOf(na[na.length - 1]) >= 0) {
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
                                        "orderId": operateId,
                                        "subNum": subNumber,
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
        $(document).on('click', '#remove-type-ensure', function () {
            Data.removeFile(removeFile, function (json) {
                if (json && 'resCode' in json && json.resCode == 0) {
                    removeEle.removeClass('active');
                    removeEle.find('.top').html('+');
                    var a = removeEle.find('.f-name');
                    a.html(a.data('name'));
                    removeEle.find('input').show();
                    $('.remove-type-part').addClass('dp-n');
                } else {
                    Modal.setAlert('删除失败，请重试！');
                }
            });
        });
    };
    var init = function () {
        var data = {
            offset: url.get('offset') || 0
            , limit: url.get('limit') || 20
            , agentCompanyId: 0
            , number: $('#order-num').val()
        };
        Data.list(data, function (json) {
            Dom.list(json, data);
            var dt = {};
            if (json && 'resCode' in json && json.resCode == 0 && json.resBody && json.resBody.sList.length > 0) {
                var list = json.resBody.sList;
                for (var l in list) {
                    if (list.hasOwnProperty(l)) {
                        var d = list[l];
                        dt[d.order.orderId] = d;
                    }
                }
            }
            List = dt;
        });
    };
    var run = function () {
        listener();
        init();
        fileList();
    };
    return {
        run: run
    }
}());
module.exports.Listener = Listener;