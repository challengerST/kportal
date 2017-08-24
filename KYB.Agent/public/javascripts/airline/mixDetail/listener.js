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
        $(document).on('click', '.delete', function () {
            $(this).parents('tr').remove();
        });
        $(document).on('click', '.add', function () {
            var str = '<tr><td><input type="text" class="weight s-require"></td><td><input type="text" class="price s-require"></td><td><a href="javascript:void(0);" class="delete">-删除</a></td></tr>'
            $(this).parents('table').find('tbody').append(str);
        });
        $(document).on('click', '.close-btn', function () {
            $('.white-back').addClass('dp-n');
            $('.alert-part').addClass('dp-n');
        });
        $(document).on('click', '.xghx a', function () {
            $('.white-back').removeClass('dp-n');
            $('.editor-modal').removeClass('dp-n');
        });
        $(document).on('click', '#search', function () {
            var pass = true;
            $('.search-body').find('.name').each(function () {
                if ($(this).val()) {
                    $(this).removeClass('warm');
                } else {
                    $(this).addClass('warm');
                    pass = false;
                }
            });
            if (pass) {
                var data = {
                    "deptCode": $('#search-start').val(),
                    "destCode": $('#search-end').val(),
                    "flightDate": '',
                    "airCompanyCode": $('#search-code').val(),
                    "transCount": 0,
                    "pageIndex": 1,
                    "pageSize": 9999
                };
                Data.search(data, function (json) {
                    var str = '';
                    if (json && 'resCode' in json && json.resCode == 0 && json.resBody.sList.length > 0) {
                        var arr = json.resBody.sList;
                        for (var a in arr) {
                            if (arr.hasOwnProperty(a)) {
                                var d = arr[a];
                                var ts = '', cls = '';
                                switch (d.transPort.length) {
                                    case 2:
                                        ts = '直达';
                                        break;
                                    case 3:
                                        ts = d.transPort[1].portCode + ' 转关';
                                        cls = ' circle';
                                        break;
                                    case 4:
                                        ts = d.transPort[1].portCode + '、' + d.transPort[2].portCode + ' 转关';
                                        cls = ' circle';
                                        break;
                                }
                                str += '<div class="sg-rs fill" data-aid="' + d.airwayId + '">' +
                                    ' <p class="fl-l sg-start sg-big">' + d.deptPortCode + '</p> ' +
                                    '<p class="sg-zz fl-l"> <span class="zz' + cls + '">' + d.airCompanyCode + '</span> ' +
                                    '<span class="zd">' + ts + '</span> </p> ' +
                                    '<p class="fl-l sg-big sg-end">' + d.destPortCode + '</p> ' +
                                    '<a href="javascript:void(0);" class="dp-b fl-r sel-sg" data-a="' + (d.flightDay ? d.flightDay.join(',') : '') + '" data-end="' + (d.validEnd || '') + '">选择</a> </div>';
                            }
                        }
                    } else {
                        str = '<p class="info-warm">暂无搜索航线！</p>'
                    }
                    $('.search-body').find('.result').html(str);
                });
            }
        });
        $(document).on('click', '.sel-sg', function () {
            var ele = $(this).parents('.sg-rs');
            ele.addClass('active');
            ele.siblings().removeClass('active');
        });
        $(document).on('click', '#editor-ensure', function () {
            var ele = $('.sg-rs.active');
            if (ele.length > 0) {
                var str = '<p class="big start">' + ele.find('.sg-start').html() + '</p> <p class="zz">' +
                    ' <span class="zzg">' + ele.find('.zz').html() + '</span> ' +
                    '<span class="zd">' + ele.find('.zd').html() + '</span> </p> ' +
                    '<p class="big end">' + ele.find('.sg-end').html() + '</p> <p class="xghx">' +
                    ' <a href="javascript:void(0);" data-aid="' + ele.data('aid') + '"> <span class="glyphicon glyphicon-search"></span>选择航线 </a> </p>';
                $('.top').find('.dp-tb').html(str);

                var dt = ele.find('.sel-sg').data('a').split(','), arr = [];
                for (var x = 0; x < 7; x++) {
                    if (dt.indexOf(x == '0' ? '7' : x + '') < 0) {
                        arr.push(x);
                    }
                }
                $('#hbrq').datetimepicker('setEndDate', new Date(ele.find('.sel-sg').data('end')));
                $('#hbrq').datetimepicker('setDaysOfWeekDisabled', arr);


                $('.white-back').addClass('dp-n');
                $('.alert-part').addClass('dp-n');
            } else {
                Modal.setAlert('请选择一条航线！');
            }
        });
        $(document).on('click', '#save', function () {
            submit(-1, $(this).data('id'));
        });
        $(document).on('click', '#publish', function () {
            submit(1, $(this).data('id'));
        });
    };
    var airports = function () {
        //获取机场名称
        $(document).on('keyup', 'input.name', function (e) {
            var _this = $(this)
                , ul = _this.siblings('.get-name');
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
                Data.getName({key: _this.val()}, function (json) {
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
        });
        //input失去焦点
        $(document).on('blur', 'input.name', function () {
            var ul = $(this).siblings('.get-name');
            var data = ul.children('.active').data('val') || ul.find('li:first-child').data('val') || '';
            $(this).val(data);
            $(this).data('val', data);
            ul.hide();
        });
        //li元素悬浮获得焦点
        $(document).on('mouseenter ', '.get-name li', function () {
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
        });
    };
    var company = function () {
//获取机场名称
        $(document).on('keyup', 'input.get-company', function (e) {
            var _this = $(this)
                , ul = _this.siblings('.get-name');
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
        });
        //input失去焦点
        $(document).on('blur', 'input.get-company', function () {
            var ul = $(this).siblings('.get-name');
            var data = ul.children('.active').data('val') || ul.find('li:first-child').data('val') || '';
            $(this).val(data);
            $(this).data('val', data);
            ul.hide();
        });
    };
    var timeInit = function () {
        var dt = valid.flightDay.split(','), arr = [];
        for (var x = 0; x < 7; x++) {
            if (dt.indexOf(x == '0' ? '7' : x + '') < 0) {
                arr.push(x);
            }
        }
        $('#hbrq').datetimepicker({
            format: 'yyyy-mm-dd',//日期的格式
            startDate: new Date(),//选择器的开始日期
            endDate: 'validEnd' in valid && valid.validEnd ? new Date(valid.validEnd) : '',
            autoclose: true,//日期选择完成后是否关闭选择框
            bootcssVer: 3,//显示向左向右的箭头
            language: 'zh-CN',//语言
            minView: "month",//表示日期选择的最小范围，默认是hour
            daysOfWeekDisabled: 'flightDay' in valid && valid.flightDay ? arr : []
        });
    };

    function submit(state, id) {
        var pass = true;
        $('.s-require').each(function () {
            if ($(this).val()) {
                $(this).removeClass('warm');
            } else {
                $(this).addClass('warm');
                pass = false
            }
        });
        if (pass) {
            var obg = {};
            var num = 0;
            $('.jt-tb').find('tbody').find('tr').each(function () {
                obg[$(this).find('.weight').val()] = $(this).find('.price').val();
                num += 1;
            });
            var data = {
                "airwayId": $('.xghx').find('a').data('aid'),
                "deptCode": $('.top').find('.start').html(),
                "destCode": $('.top').find('.end').html(),
                "airCompanyCode": $('.top').find('.zzg').html(),
                "flightDate": $('#hbrq').val(),
                "remark": $('#remark').val(),
                "airwayLclPrice": {
                    "basicPrice": $('#jzj').val(),
                    "policy": obg
                },
                "airwayLimit": {
                    "height": $('#djcdsx').val(),
                    "width": $('#kdsx').val(),
                    "length": $('#gdsx').val(),
                    "minbulk": 0,
                    "maxbulk": 0,
                    "totalBulk": 0,
                    "minWeight": 0,
                    "maxWeight": $('#dpzlsx').val(),
                    "pieceWeight": $('#djspzl').val(),
                    "limtProducts": "string",
                    "dangerousGoods": $('#wxp').prop('checked')
                },
                "enbaleState": state
            };
            if (data.airwayId) {
                if (num > 0) {
                    if (id != 0) {
                        data['lclId'] = id;
                        Data.update(data, function (json) {
                            if (json && 'resCode' in json && json.resCode == 0) {
                                Modal.setAlert('更新成功！');
                            } else {
                                Modal.setAlert(json.resMsg || '更新失败！');
                            }
                        });
                    } else {
                        Data.add(data, function (json) {
                            if (json && 'resCode' in json && json.resCode == 0) {
                                Modal.setAlert('新增成功！');
                            } else {
                                Modal.setAlert(json.resMsg || '新增失败！');
                            }
                        });
                    }
                } else {
                    Modal.setAlert('请输入阶梯价！');
                }
            } else {
                Modal.setAlert('请选择一条航线！');
            }
        }
    }

    var run = function () {
        listener();
        airports();
        company();
        timeInit();
    };
    return {
        run: run
    }
}());
module.exports.Listener = Listener;