/**
 * Created by Jeremy on 2017/1/5.
 */

'use strict';

require('../../general/burster');
var url = require('../../general/function').url
    , myformat = require('../../general/function').format
    , Modal = require('../../general/modal');
var Data = require('./data').Data
    , Dom = require('./dom').Dom;
var Listener = (function () {
    //待提交的分单号
    var subOrderNum;
    var opeSid='';
    var oId = $('#up-file').data('id');
    //待删除的元素
    var removeEle;
    //缓存删除内容
    var removeFile = {
        "orderId": oId,
        "keyName": 0
    };
    //报关&&预审
    var sendType = {
        type: 0
        , id: 0
        , sid: 0
    };
    var listener = function () {
        $('#ip-qfsj').datetimepicker({
            format: 'hh:ii',//日期的格式
            startView: 0,//选择器的开始日期
            startDate: new Date().Format('yyyy-MM-dd'),
            autoclose: true,//日期选择完成后是否关闭选择框
            bootcssVer: 3,//显示向左向右的箭头
            language: 'zh-CN',//语言
            minView: 0,//表示日期选择的最小范围，默认是hour
            minuteStep: 5
            //format: 'hh:ii',
            //autoclose: true,
            //startView: 'hour',
            //minView: 0,
            //minuteStep: 1
        });
        $(document).on('click', '.close-btn', function () {
            $('.white-back').addClass('dp-n');
            $('.alert-part').addClass('dp-n');
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
        $(document).on('click', '.send-bg', function () {
            var ele = $('.bg-part');
            sendType.type = parseInt($(this).data('param'));
            sendType.id = $(this).data('id');
            sendType.sid = $(this).data('sid') || null;
            ele.find('.header').html('<p class="header">确认' + $(this).text() + ' <span class="close-btn">X</span></p>');
            $('.white-back').removeClass('dp-n');
            ele.removeClass('dp-n');
        });
        $(document).on('click', '#bg-ensure', function () {
            var data = {
                "orderId": sendType.id,
                "agentId": 0,
                "state": sendType.type
                , "subNum": sendType.sid
            };
            Data.changeState(data, function (json) {
                if (json && 'resCode' in json && json.resCode == 0) {
                    Modal.setAlert(json.resMsg || '发送成功！', null, function () {
                        location.reload();
                    });
                } else {
                    Modal.setAlert(json.resMsg || '发送失败，请重试！');
                }
            });
        });
        $(document).on('click', '#bjjcsj-btn', function () {
            location.href = '/order/storage?id=' + $(this).data('id') + '&n=' + ($(this).data('n') || '/') + '&c=' + ($(this).data('c') || '/');
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
                                            $('.ddfj').find('.add').before(str);
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
                var data22=0;
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
                            $('.dl-file[data-type="' + d.fileType + '"]').data('key', d.keyName);
                        } else if (d.fileType == 21) {
                            var yld = '';
                            yld += '<div class="files"> <div class="top">' + arr[a].fileExtension.toUpperCase() + '<span class="glyphicon glyphicon-circle-arrow-down" data-key="' + arr[a].keyName + '"></span> </div> <a href="javascript:void(0);" class="dp-b">' + arr[a].fileName + '</a> </div>'

                            $('.yl-part').find('.dp-tb').append(yld);
                            $('#yldmain').show();
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
                $('.ddfj').find('.add').before(str);
            }
        });
    };
    var submit = function () {
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
        $(document).on('click', '#save-info', function () {
            var pass = true;
            var info = $('#ip-hbxx').val();
            var tm = $('#ip-qfsj').val();
            var xx=$('#pn-hbxx').val();
            if (!tm || !info) {
                pass = false;
            }
            if (pass) {
                var data = {
                    "airlineInfo": info,
                    "airlineTime": $('#upd-time').html() + ' ' + tm + ':00',
                    "orderId": $(this).data('id'),
                    "memberId": 0
                };
                Data.update(data, function (json) {
                    console.log(json);
                    if (json && 'resCode' in json && json.resCode == 0) {
                        Modal.setAlert(json.resMsg || '更新成功！', null, function () {
                            //仅仅更新航班，不需要重载信息
                            //location.reload();
                        });
                    } else {
                        Modal.setAlert(json.resMsg || '更新失败，请重试！');
                    }
                });
            } else {
                Modal.setAlert('请填写航班信息和起飞时间！');
            }
        });
        $(document).on('click', '#pm-info', function () {
            var pass = true;
            var xx=$('#pn-name').val();
            if (pass) {
                var data = {
                    "cargoName": xx,
                    "markName":$('#mark-name').val(),
                    "orderId": $(this).data('id'),
                    "memberId": 0
                };
                Data.pmxg(data, function (json) {
                    if (json && 'resCode' in json && json.resCode == 0) {
                        Modal.setAlert(json.resMsg || '更新成功！', null, function () {
                            location.reload();
                        });
                    } else {
                        Modal.setAlert(json.resMsg || '更新失败，请重试！');
                    }
                });
            } else {
                Modal.setAlert('请填写品名！');
            }
        });
    };
    var warehouseDetail = function () {
        Data.warehouseDetail({id: $('.ckmc').data('id')}, function (json) {
            var name = '/';
            if (json && 'resBody' in json && json.resBody) {
                var d = json.resBody;
                name = d.warehouseName;
            }
            $('.ckmc').html(name);
            //$('#zdck').value=$('.ckmc').data('id');
            var ckmId=$('.ckmc').data('id');
        });
    };
    var company = function () {
        Data.company({id: $('.khxx').data('id')}, function (json) {
            var mc = '/', dj = '/', lxr = '/', lxfs = '/', qq = '/';
            if (json && 'resBody' in json && json.resBody) {
                var m = json.resBody.member
                    , c = json.resBody.company;
                mc = c.companyName;
                lxr = m.name || '/';
                lxfs = m.mobile || '/';
                qq = m.QQ || '/';
                switch (c.applyLevel) {
                    case 0:
                        dj = 'D';
                        break;
                    case 1:
                        dj = 'C';
                        break;
                    case 2:
                        dj = 'B';
                        break;
                    case 3:
                        dj = 'A';
                        break;
                    case 4:
                        dj = 'AA';
                        break;
                }
            }
            $('.kh-mc').html(mc);
            $('.kh-dj').html(dj);
            $('.kh-lxr').html(lxr);
            $('.kh-lxfs').html(lxfs);
            $('.kh-qq').html(qq);
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
                str += '<div class="up-part"> <div class="top">PDF<span data-type="yld" class="span-a" data-key="' + url.get('id') + '"></span> </div> <a href="javascript:void(0);" class="dp-b">电子预录单</a> </div>' +
                    '<div class="up-part"> <div class="top">PDF<span data-type="ckd" class="span-a" data-key="' + url.get('id') + '"></span> </div> <a href="javascript:void(0);" class="dp-b">放行通知书</a> </div>';
                $('.fxtzs-fill').append(str);
                $('.fxtzs').show();
            }
        });
        $(document).on('click', '.span-a', function () {
            location.href = '/order/detail/' + $(this).data('type') + '?id=' + $(this).data('key');
        });
    };
    var contact = function () {
        var pb = {
            type: 1  //1为发货人操作，2为收货人操作
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
        $(document).on('click', '.show-contact', function () {
            subOrderNum = $(this).data('sid') == 0 ? null : $(this).data('sid');
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
            var ele = $('.contact-modal');
            opeSid = $(this).data('sid') || null;
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
        opeSid = $(this).data('sid') || null;
        $(document).on('click', '.fd-top .show-contact', function () {
            subOrderNum = $(this).data('sid') == 0 ? null : $(this).data('sid');
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

            var ele = $('.contact-modal');
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
        $(document).on('click', '#save-contact', function () {
            var ele = $('.contact-modal');
            var pass = true;
            $('.ct-require').each(function () {
                //通知人不需要验证
                if ($(this).val() || pb.type ==3) {
                    $(this).removeClass('warm');
                } else {
                    $(this).addClass('warm');
                    pass = false;
                }
            });
            if (pass) {
                var data = {
                    "orderId": $(this).data('id'),
                    "subNum": subOrderNum,
                    "memberId": $(this).data('mid'),
                    "contactType": pb.type,
                    "contactName": ele.find('#s-name').val(),
                    "contactAddress": ele.find('#s-dz').val(),
                    "contactPerson": ele.find('#s-person').val(),
                    "contactTel": ele.find('#s-dh').val(),
                    "contactFax": ele.find('#s-cz').val(),
                    "contactEmail": ele.find('#s-mail').val(),
                    "isSave": false
                };
                Data.personAdd(data, function (json) {
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
                    "subNum": subOrderNum,
                    "contactType": pb.type,
                    "contactName": d.contactName,
                    "contactAddress": d.contactAddress,
                    "contactPerson": d.contactPerson,
                    "contactTel": d.contactTel,
                    "contactFax": d.contactFax,
                    "contactEmail": d.contactEmail,
                    "isSave": false,
                    "memberId": $(this).data('mid')
                };
                Data.personAdd(data, function (json) {
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
                type: pb.type
                , key: $('#c-name').val()
                , companyId: $('#search-p').data('cid')
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
        $(document).on('click', '.dl-yld', function () {
            if (this.id =="dlyldmain") { //主单
                if ($('.yl-part').find('.dp-tb').find('.files').length == 0) {
                    $('.yl-part').find('.dp-tb').html('暂无预录单');
                }
            } else {

                if ($(this).find(".temp").find("a").length == 0) {
                    $('.yl-part').find('.dp-tb').html('暂无预录单');
                } else {
                    $('.yl-part').find('.dp-tb').html($(this).find(".temp").html());
                }
            }
            $('.white-back').removeClass('dp-n');
            $('.yl-part').removeClass('dp-n');
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
        $(document).on('click', '.glyphicon-circle-arrow-down', function () {

            var file = $(this).data('key');
            Data.down({file: file}, function (json) {
                if (json && 'resBody' in json) {
                    window.open(json.resBody);
                }
            });

        });
        $(document).on('click', '.yfd-btn', function () {
            var _this = $(this);
            _this.find('.fl-r').html(_this.find('.fl-r').html() == '+展开' ? '-收起' : '+展开');
            url.set('click', _this.find('.fl-r').html() == '+展开' ? '' : _this.data('id'));
            var tar = $($(this).data('target'));
            if (_this.data('time') == 0) {
                $('.loading-part').show();
                Data.detail({
                    orderId: url.get('id')
                    , subOrderNum: $(this).data('id')
                    , agentCompanyId: 10000
                }, function (json) {
                    if (json && 'resCode' in json && json.resCode == 0) {
                        _this.data('time', 1);
                        var str = '';
                        var body = json.resBody || {};
                        var o = 'order' in body && body.order || {};
                        var storage = 'storage' in body && body.storage || {};
                        var entryList = 'entryList' in storage && storage.entryList || [];
                        var zjjs = 0, zjzl = 0, zjtj = 0, zjps = 0, zjbx = 0, zjsc = 0, zjqt = 0;

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
                                '<a href="javascript:void(0);" class="show-contact" data-t="收货人" data-sid="' + (o.subNum || 0) + '" data-dz="' + (o.orderConsignee.contactAddress || '') + '" data-fax="' + o.orderConsignee.contactFax + '">编辑</a>' +
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
                        if (o.orderNotifier && 'contactName' in o.orderNotifier && o.orderNotifier.contactName && o.orderNotifier.contactName!=null) {
                            str += '<div class="fd-info"> <p class="title">通知人 <a href="javascript:void(0);" class="show-contact" data-t="通知人" data-sid="' + (o.subNum || 0) + '" data-dz="' + (o.orderNotifier.contactAddress || '') + '" data-fax="' + o.orderNotifier.contactFax + '">编辑</a> </p>';
                            str += '<p class="otName">' + o.orderNotifier.contactName + '</p> <p class="otcp">' + o.orderNotifier.contactPerson + '</p> <p class="otTel">' + o.orderNotifier.contactTel + '</p> <p class="otEmail">' + o.orderNotifier.contactEmail + '</p> </div>';
                        } else {
                            str += '<div class="fd-info"> <p class="title">通知人 <a href="javascript:void(0);" class="show-contact" data-t="通知人" data-sid="' + (o.subNum || 0) + '" data-fax="" data-dz="">编辑</a> </p>';
                            str += '<p class="no-sfhr">暂无通知人信息</p></div>'
                        }
                        //品名拼
                        str += '<div class="fd-info"> <p class="title">品名 <a href="javascript:void(0);" class="cg-name-btn" data-id="' + o.orderId + '" data-sid="' + o.subNum + '" data-name="' + o.subCargoName + '" data-mark="' + (o.cargo.packageMark || '') + '" data-dz="' + (o.orderNotifier && o.orderNotifier.contactAddress || '') + '" >编辑</a> </p> <p>' + o.subCargoName + '</p> </div>' +
                            '<div class="fd-info"><p class="title">唛头 </p><p>' + (o.cargo.packageMark || '') + '</p> </div></div>';
                        //拼接table
                        str += '<div class="fd-middle"> <p class="title">分单货物信息 ';
                        //拆分单必须至少2个以上规格
                        if (entryList.length>1 || (entryList.length == 1 && entryList[0].entryDetail.length>1)) {
                            str += '<button class="dp-b fl-r ycf-cfd" data-id="' + o.subNum + '" data-wei="' + body.storage.totalWeight + '">拆分单</button>'
                        }
                        str +=' <a href="/order/detail/ensure?id=' + o.orderId + '&sid=' + o.subNum + '" target="_blank" class="fl-r">查看分单</a> </p><table class="mg-b">' +
                            ' <thead> <tr> <td><input type="checkbox" id="sel-fd-all"></td> <td>进仓编号</td> <td>长(CM)</td> <td>宽(CM)</td> <td>高(CM)</td> <td>件数(PCS)</td> <td>重量(KGS)</td> <td>体积(CBM)</td> <td>包装</td> <td>损毁</td> <td>变形</td> <td>受潮</td> <td>其他</td> <td>备注</td> </tr> </thead> <tbody>';

                        for (var e in entryList) {
                            if (entryList.hasOwnProperty(e)) {
                                var dt1 = entryList[e];
                                var dt = entryList[e].entryDetail;
                                var xjjs = 0, xjzl = 0, xjtj = 0, xjps = 0, xjbx = 0, xjsc = 0, xjqt = 0;
                                for (var d1 in dt) {
                                    if (dt.hasOwnProperty(d1)) {
                                        var d = dt[d1];
                                        if (d.subNum == _this.data('id')) {
                                            xjjs += d.itemCount;
                                            zjjs += d.itemCount;
                                            xjtj += d.itemCount * d.itemHeight * d.itemLength * d.itemWidth / 1000000;
                                            zjtj += d.itemCount * d.itemHeight * d.itemLength * d.itemWidth / 1000000;
                                            str += '<tr> <td><input data-enum="' + dt1.entryNum + '" type="checkbox" class="fd-sg" data-dt="' + JSON.stringify(d).replace(/\"/g, "'") + '"></td> <td>' + dt1.entryNum + '</td> ' +
                                                '<td>' + d.itemLength + '</td> <td>' + d.itemWidth + '</td> <td>' + d.itemHeight + '</td>' +
                                                ' <td>' + d.itemCount + '</td> <td>-</td> <td>' + myformat.formatvolume(d.itemCount * d.itemHeight * d.itemLength * d.itemWidth / 1000000) + '</td> ' +
                                                '<td>' + dt1.packageType + '</td> <td>-</td> <td>-</td> <td>-</td> <td>-</td> <td>-</td> </tr>';
                                        }
                                    }
                                }
                                zjzl += dt1.storageWeight;
                                zjps += dt1.damageCount;
                                zjbx += dt1.transformCount;
                                zjsc += dt1.dampCount;
                                zjqt += dt1.otherCount;
                                str += '<tr class="tr-xj"> <td>小计</td> <td colspan="4" class="font-g">更新时间（' + dt1.storageTime + '）</td>' +
                                    ' <td>' + xjjs + '</td> <td>-</td> <td>' + myformat.formatvolume(xjtj) + '</td> <td></td>' +
                                    '<td>' + (dt1.damageCount || '-') + '</td> <td>' + (dt1.transformCount || '-') + '</td> <td>' + (dt1.dampCount || '-') + '</td> <td>' + (dt1.otherCount || '-') + '</td> <td>-</td> </tr>'
                            }
                        }
                        str += '<tr class="tr-zj"> <td>总计</td> <td colspan="4"></td> <td>' + zjjs + '</td> ' +
                            '<td>' + o.cargo.cargoWeight + '</td> <td>' + myformat.formatvolume(zjtj) + '</td> <td></td> <td>' + (zjps || '') + '</td>' +
                            ' <td>' + (zjbx || '') + '</td> <td>' + (zjsc || '') + '</td> <td>' + (zjqt || '') + '</td> <td></td> </tr></tbody></table></div>';
                        //订单附件拼接
                        str += '<div class="fd-bottom"><div class="ddfj-pub fill"><p class="title fill"><span class="one">分单相关文件</span> ' +
                            '<span class="two"><span class="wxts">温馨提示：</span>请尽快上传报关单、报关委托书、装箱单、发票等资料，文件格式支持.doc/.docx/.xls/.xlsx/.pdf/.jpg/.png/.bmp' +
                            '<br>请检查资料证件上传是否齐全，如果齐全，可向报关行' + (o.allowCustomDeclare ? '<button class="send-bg fsbgzt" id="send-bg" data-param="3" data-id="' + o.orderId + '" data-sid="' + o.subNum + '">发送报关通知</button>' : '') + (o.allowPreCheck ? '<button class="send-bg fsyszt" id="send-bg" data-param="1" data-id="' + o.orderId + '" data-sid="' + o.subNum + '">发送预审通知</button>' : '') + '</span></p><div class="add" data-sid="' + o.subNum + '"> <div class="top"> + </div> <a href="javascript:void(0);" class="dp-b">添加文件</a> <input type="file" id="up-file-fd" data-sid="' + o.subNum + '"> </div></div></div>';
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
                            '<div class="dp-b fl-l dl dl-yld" data-type="21" data-key="0"><a href="javascript:void(0);"><span class="dp-b img">预</span><span class="dp-b txt">预录单</span></a><div class="cover dp-n"></div><div class="temp dp-n"></div></div>'+
                            '<div class="dp-b fl-l dl dl-file" data-type="22" data-key="0"><a href="javascript:void(0);"><span class="dp-b img">查</span><span class="dp-b txt">查验费用单</span></a> <div class="cover dp-n"></div></div>'+
                            '</div></div>';
                        tar.html(str);
                        tar.collapse('toggle');

                        Data.fileList({id: url.get('id'), sid: o.subNum || ''}, function (json) {

                            if (json && 'resCode' in json && json.resCode == 0 && json.resBody) {
                                var str = '';
                                var arr = json.resBody;

                                var data22=0;
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
                                            _this.parent().find(".fd-info-body").find(".fd-fileDown").find(".dl-file").data('key', d.keyName);
                                           // $('.dl-file[data-type="' + d.fileType + '"]').data('key', d.keyName);
                                        } else if (d.fileType == 21) {
                                            var yld = '';
                                            yld += '<div class="up-part"> <div class="top">' + arr[a].fileExtension.toUpperCase() + '<a href="javascript:void(0);" class="dl glyphicon glyphicon-circle-arrow-down" data-key="' + d.keyName + '"></a> </div> <a href="javascript:void(0);" class="dp-b">' + arr[a].fileName + '</a> </div>';
                                            _this.parent().find(".fd-info-body").find(".fd-fileDown").find(".dl-yld").find(".temp").append(yld);
                                            //$('.fxtzs-fill').append(yld);
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
            }else{
                //提示必须选中一个
                Modal.setAlert('拆分单需要至少选中一个规格！');
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
            //已拆分单拆分单，至少该分单应该保留一个规格。
            var selectedLength = table.find('.fd-sg:checked').length
            var itemsLength = table.find('.fd-sg').length;
            if ( selectedLength> 0) {
                if (itemsLength-selectedLength > 0) {
                    Data.NewSubNum({orderId: url.get('id')}, function (json) {
                        var num = json && 'resBody' in json && json.resBody || '';
                        $('#nfd-fdh').val(num);
                        $('.white-back').removeClass('dp-n');
                        $('.fd-alert-part').removeClass('dp-n');
                        //带入已拆分单分单号
                        $('#origin-fdh').val(type.sid);
                    });
                }else{
                    //提示必须选中一个
                    Modal.setAlert('已拆分单需要预留一个规格！');
                }
            }else{
                //提示必须选中一个
                Modal.setAlert('拆分单需要至少选中一个规格！');
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
                    if(parseFloat($('#nfd-zl').val())<=0){
                        Modal.setAlert('分单重量必须大于0！');
                        return;
                    }
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
            if (type.cf == 1 && type.n == 1) {//已拆分货物拆往已有分单
                if ($('#yyfd-fdh').find('option').length > 0) {
                    var ye = $('.y-e');
                    var option = $('#yyfd-fdh').find('option:selected');
                    ye.find('.mbfd').html(option.val());
                    ye.find('.bcfd').html(type.sid);
                    $('#yyfd-fdh option').each(function() {
                        if ($(this).val() == type.sid) {
                            ye.find('.bc').find('.ori-wei').html($(this).data('wei'));
                        }
                    });

                    ye.find('.mb').find('.ori-wei').html(option.data('wei'));

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
                    console.log(json);
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

    var otherinit = function(){
        if (url.get('click')) {
            $('.yfd-btn[data-id="' + url.get('click') + '"]').click();
        }
        //小数点控制
        $('#entrysize').html(myformat.formatvolume($('#entrysize').data('size'))+' CBM');

        $('.item-tj').each(function(){
            $(this).html(myformat.formatvolume($(this).html()));
        })
        $('.xj-tj').each(function(){
            $(this).html(myformat.formatvolume($(this).html()));
        })
        $('.total-tj').html(myformat.formatvolume($('.total-tj').html()));
    }
    var run = function () {
        listener();
        upload();
        fileList();
        submit();
        warehouseDetail();
        //company();
        trackInit();
        declareData();
        contact();
        subData();
        changeName();
        createSub();

        otherinit();
    };
    return {
        run: run
    }
}());
module.exports.Listener = Listener;