/**
 * Created by Jeremy on 2017/1/5.
 */
'use strict';
var Data = require('./data').Data
    , url = require('../../general/function').url
    , Modal = require('../../general/modal');
var Listener = (function () {
    //最小价格
    var minP = 0;
    var lines = {}
        , delArr = {}
        , road = [];
    var updateData = [];
    var listener = function () {
        $(document).on('click', '.bz-lv', function () {
            $(this).toggleClass('active');
        });
        $(document).on('click', '#o-sj', function () {
            $('.single-info:checked').each(function () {
                var ele = $(this).parents('tbody');
                ele.removeClass('bg-r');
                ele.data('state', 1);
            });
        });
        $(document).on('click', '#recommend', function () {
            $('.single-info:checked').each(function () {
                var ele = $(this).parents('tbody');
                ele.find('.name').parent().append('<i class="tuijian"></i>');
                ele.data('recommend', 1);
            });
        });
        $(document).on('click', '#cancel-recommend', function () {
            $('.single-info:checked').each(function () {
                var ele = $(this).parents('tbody');
                ele.find('.tuijian').remove();
                ele.data('recommend', 0);
            });
        });
        $(document).on('click', '#o-xj', function () {
            $('.single-info:checked').each(function () {
                var ele = $(this).parents('tbody');
                ele.addClass('bg-r');
                ele.data('state', 0);
            });
        });
        $(document).on('mouseenter', 'td.opt', function () {
            $(this).find('div').show();
        });
        $(document).on('mouseleave', 'td.opt', function () {
            $(this).find('div').hide();
        });
        //顶部分类选中
        $(document).on('click', '.sel-btn', function () {
            minP = parseInt($(this).data('min'));
            var str = '';
            $('#com_id').data('id', $(this).data('id')).html($(this).data('name'));
            $('.right').addClass('dp-n');
            $('.new-al').removeClass('dp-n');
            $('#start').addClass('select');
            url.set('code', $(this).data('id'));
            var arr = $(this).data('company').split(',');
            for (var i = 0; i < arr.length; i++) {
                if (i == 0) {
                    $('#start').val(arr[i]);
                }
                str += '<li>' + arr[i] + '</li>';
            }
            $('#start').siblings('ul').html(str);
            clear(true);
            initTree($(this).data('id'));
        });
        //添加航线
        $(document).on('click', '.add-line', function () {
            clear(false);
            var ele = $('#save');
            ele.data('index', 0);
            ele.data('id', 0);
            $('#start').addClass('select');
            $('.right').removeClass('dp-n');
        });
        //保存新航线
        $(document).on('click', '#save', function () {
            var price = [];
            var pass = true;
            var save = $(this)
                , ele = $('.table-container tbody[data-each="1"]');
            var indexEle = $('.show-detail.active').length > 0 ? parseInt($('.show-detail.active').data('index')) : 1;
            if (indexEle < 4) {
                //ele.each(function () {
                //    var tr = $(this).find('tr');
                //    tr.each(function () {
                //        var _this = $(this);
                //        var min = parseFloat($(this).find('.min').val());
                //        if (!min || min < minP) {
                //            pass = false;
                //            $(this).find('.min').addClass('warm');
                //        } else {
                //            $(this).find('.min').removeClass('warm');
                //            if (parseFloat(_this.find('.45').val()) && parseFloat(_this.find('.45').val()) >= (min / 45)) {
                //                _this.find('.45').removeClass('warm');
                //            } else {
                //                _this.find('.45').addClass('warm');
                //                pass = false;
                //            }
                //            if (parseFloat(_this.find('.100').val()) && parseFloat(_this.find('.100').val()) >= (min / 100)) {
                //                _this.find('.100').removeClass('warm');
                //            } else {
                //                _this.find('.100').addClass('warm');
                //                pass = false;
                //            }
                //            if (parseFloat(_this.find('.300').val()) && parseFloat(_this.find('.300').val()) >= (min / 300)) {
                //                _this.find('.300').removeClass('warm');
                //            } else {
                //                _this.find('.300').addClass('warm');
                //                pass = false;
                //            }
                //            if (parseFloat(_this.find('.500').val()) && parseFloat(_this.find('.500').val()) >= (min / 500)) {
                //                _this.find('.500').removeClass('warm');
                //            } else {
                //                _this.find('.500').addClass('warm');
                //                pass = false;
                //            }
                //            if (parseFloat(_this.find('.1000').val()) && parseFloat(_this.find('.1000').val()) >= (min / 1000)) {
                //                _this.find('.1000').removeClass('warm');
                //            } else {
                //                _this.find('.1000').addClass('warm');
                //                pass = false;
                //            }
                //        }
                //    });
                //});
                if (pass) {
                    //重新添加航线
                    if (save.data('index') == 0) {
                        var newData = [];
                        if (ele.length > 0) {
                            Data.root({
                                "companyId": 10000,
                                "airCompanyCode": $('#com_id').data('id'),
                                "deptPortCode": $('#start').val(),
                                "remarks": $('#remark').val()
                            }, function (json) {
                                if (json && 'resCode' in json && json.resCode == 0) {
                                    ele.each(function () {
                                        var _this = $(this),
                                            flightDay = [];
                                        _this.find('.week').each(function () {
                                            if ($(this).hasClass('active')) {
                                                flightDay.push(parseInt($(this).data('num')));
                                            }
                                        });
                                        price = [];
                                        _this.find('tr').each(function () {
                                            var bbbbb = $(this);
                                            price.push({
                                                proportion: parseInt(bbbbb.data('bz')) || 1
                                                , min: bbbbb.find('.min').val()
                                                , policy: {
                                                    45: bbbbb.find('.45').val()
                                                    , 100: bbbbb.find('.100').val()
                                                    , 300: bbbbb.find('.300').val()
                                                    , 500: bbbbb.find('.500').val()
                                                    , 1000: bbbbb.find('.1000').val()
                                                }
                                            })
                                        });

                                        var tag = _this.find('.single-info').data('tag');
                                        var d = {
                                            nodeId: null,
                                            companyId: 10000,
                                            groupTag: tag && tag != 0 ? tag : '',
                                            airCompanyCode: $('#com_id').data('id'),
                                            deptPortCode: $('#start').val(),
                                            destPortCode: _this.find('.name').val(),
                                            flightDay: flightDay,
                                            transMode: _this.find('.method').val() != '卡车' ? 1 : 2,
                                            airwayPrice: {
                                                rate: price
                                            },
                                            validStart: new Date(),
                                            airwayLimit: {
                                                "height": _this.find('.ope-xz').data('hei'),
                                                "width": _this.find('.ope-xz').data('wid'),
                                                "length": _this.find('.ope-xz').data('len'),
                                                "minbulk": 0,
                                                "maxbulk": 0,
                                                "totalBulk": 0,
                                                "minWeight": _this.find('.ope-xz').data('minwei'),
                                                "maxWeight": 0,
                                                "pieceWeight": _this.find('.ope-xz').data('wei'),
                                                "limtProducts": "string",
                                                "dangerousGoods": _this.find('.ope-xz').data('danger') == 1
                                            },
                                            validEnd: new Date(),
                                            remarks: _this.find('.ope-xz').data('remark'),
                                            nodeState: _this.data('state'),
                                            isHot: _this.data('recommend') == 1,
                                            MYC_Fee: _this.find('.myc').val(),
                                            SCC_Fee: _this.find('.scc').val(),
                                            parentNode: json.resBody.nodeId,
                                            childNodes: [],
                                            createDt: new Date(),
                                            modifyDt: new Date()
                                        };
                                        newData.push(d);
                                    });
                                    Data.add({data: JSON.stringify(newData)}, function (json) {
                                        if (json && 'resCode' in json && json.resCode == 0) {
                                            Modal.setAlert(json.resMsg || '添加成功！');
                                            clear(false);
                                            initTree(url.get('code'));
                                        } else {
                                            Modal.setAlert(json.resMsg || '添加失败，请重试！');
                                        }
                                    });
                                } else {
                                    Modal.setAlert(json.resMsg || '添加失败，请重试！');
                                }
                            });
                        }
                    }
                    if (save.data('index') == 1) {
                        var add = []
                            , update = [];
                        ele.each(function () {
                            var _this = $(this),
                                flightDay = [];
                            price = [];
                            _this.find('.week').each(function () {
                                if ($(this).hasClass('active')) {
                                    flightDay.push(parseInt($(this).data('num')));
                                }
                            });
                            _this.find('tr').each(function () {
                                var aaaaaa = $(this);
                                price.push({
                                    proportion: parseInt(aaaaaa.data('bz')) || 1
                                    , min: aaaaaa.find('.min').val()
                                    , policy: {
                                        45: aaaaaa.find('.45').val()
                                        , 100: aaaaaa.find('.100').val()
                                        , 300: aaaaaa.find('.300').val()
                                        , 500: aaaaaa.find('.500').val()
                                        , 1000: aaaaaa.find('.1000').val()
                                    }
                                })
                            });
                            var id = _this.find('.single-info').data('id');
                            var tag = _this.find('.single-info').data('tag');
                            var d = {
                                nodeId: id == 0 ? '' : id,
                                companyId: 10000,
                                groupTag: tag && tag != 0 ? tag : '',
                                airCompanyCode: $('#com_id').data('id'),
                                deptPortCode: save.data('ori'),
                                destPortCode: _this.find('.name').val(),
                                flightDay: flightDay,
                                transMode: _this.find('.method').val() != '卡车' ? 1 : 2,
                                airwayPrice: {
                                    rate: price
                                },
                                validStart: new Date(),
                                validEnd: new Date(),
                                airwayLimit: {
                                    "height": _this.find('.ope-xz').data('hei'),
                                    "width": _this.find('.ope-xz').data('wid'),
                                    "length": _this.find('.ope-xz').data('len'),
                                    "minbulk": 0,
                                    "maxbulk": 0,
                                    "totalBulk": 0,
                                    "minWeight": _this.find('.ope-xz').data('minwei'),
                                    "maxWeight": 0,
                                    "pieceWeight": _this.find('.ope-xz').data('wei'),
                                    "limtProducts": "string",
                                    "dangerousGoods": _this.find('.ope-xz').data('danger') == 1
                                },
                                remarks: _this.find('.ope-xz').data('remark'),
                                nodeState: _this.data('state'),
                                isHot: _this.data('recommend') == 1,
                                MYC_Fee: _this.find('.myc').val(),
                                SCC_Fee: _this.find('.scc').val(),
                                parentNode: save.data('id'),
                                childNodes: id == 0 ? [] : lines[id].childNodes,
                                createDt: new Date(),
                                modifyDt: new Date()
                            };
                            if (_this.find('.single-info').data('id') == 0) {
                                add.push(d);
                            } else {
                                update.push(d);
                            }
                        });
                        if (add.length > 0) {
                            //记录太多，超过一定长度服务器端会报“(413) Request Entity Too Large.”
                            //拆分记录上传，每次10条
                            if (add.length > 10) {
                                var index=0;
                                var errorCount = 0,sucessCount=0;
                                var processCount = 0;
                                var totalXHCount=  add.length%10 && add.length/10+1 || add.length/10;
                                var addPart = [];
                                for (var i = 0; i < add.length; i++) {
                                    index++;
                                    addPart.push(add[i]);
                                    if(index>10 || i ==add.length-1){
                                        Data.add({data: JSON.stringify(addPart)}, function (json) {
                                            processCount++;
                                            if (json && 'resCode' in json && json.resCode == 0) {
                                                sucessCount++;
                                            } else {
                                                errorCount++;
                                            }
                                            if(processCount ==parseInt(totalXHCount) ){
                                                if (errorCount == 0) {
                                                    Modal.setAlert('添加成功！');
                                                    clear(false);
                                                    initTree(url.get('code'), road);
                                                } else {
                                                    if (sucessCount > 0)Modal.setAlert('部分航线添加失败，请重试！');
                                                    else  Modal.setAlert('添加失败，请重试！');
                                                }
                                            }
                                        });
                                        index=0;
                                        addPart = [];
                                    }
                                }
                            }
                            else {
                                Data.add({data: JSON.stringify(add)}, function (json) {
                                    if (json && 'resCode' in json && json.resCode == 0) {
                                        Modal.setAlert(json.resMsg || '添加成功！');
                                        clear(false);
                                        initTree(url.get('code'), road);
                                    } else {
                                        Modal.setAlert(json.resMsg || '添加失败，请重试！');
                                    }
                                });
                            }
                        }
                        if (update.length > 0) {
                            //记录太多，超过一定长度服务器端会报“(413) Request Entity Too Large.”
                            //拆分记录上传，每次10条
                            if (update.length > 10) {
                                var index=0;
                                var errorCount = 0,sucessCount=0;
                                var processCount = 0;
                                var totalXHCount=  update.length%10 && update.length/10+1 || update.length/10;

                                var updatePart = [];
                                for (var i = 0; i < update.length; i++) {
                                    index++;
                                    updatePart.push(update[i]);
                                    if(index==10 || i ==update.length-1){
                                        Data.update({data: JSON.stringify(updatePart)}, function (json) {
                                            processCount++;
                                            if (json && 'resCode' in json && json.resCode == 0) {
                                                sucessCount++;
                                            } else {
                                                errorCount++;
                                            }

                                            if(processCount ==parseInt(totalXHCount) ){
                                                if(errorCount ==0){  Modal.setAlert( '更新成功！');
                                                    clear(false);
                                                    initTree(url.get('code'), road);
                                                } else {
                                                    if(sucessCount > 0)Modal.setAlert( '部分航线更新失败，请重试！');
                                                    else  Modal.setAlert( '更新失败，请重试！');
                                                }
                                            }
                                        });
                                        index=0;
                                        updatePart = [];
                                    }
                                }

                            }else{
                                Data.update({data: JSON.stringify(update)}, function (json) {
                                    if (json && 'resCode' in json && json.resCode == 0) {
                                        Modal.setAlert(json.resMsg || '更新成功！');
                                        clear(false);
                                        initTree(url.get('code'), road);
                                    } else {
                                        Modal.setAlert(json.resMsg || '更新失败，请重试！');
                                    }
                                });
                            }
                        }
                    }
                } else {
                    Modal.setAlert('最小价格为' + minP + '，每个等级的价格必须>=最小价格 / 等级重量！');
                }
            } else {
                Modal.setAlert('航线中转最多四次');
            }
        });
        //删除航线
        $(document).on('click', '.delete-line', function () {
            var id = $('.air-tree').find('.show-detail.active').data('id') || '';
            if (id) {
                delArr = {
                    list: [id]
                };
                $('.white-back').removeClass('dp-n');
                $('.del-part').removeClass('dp-n');
            }
        });
        //左侧航线选择
        $('.left').on('click', '.show-detail', function () {
            $('.right').removeClass('dp-n');
            $('.left').find('.show-detail').removeClass('active');
            $(this).addClass('active');
            $('#save').data('index', 1);
            $('#save').data('id', $(this).data('id'));
            clear(null);
            //重置路径
            road = [];
            getRoad($('.show-detail.active'));
            var data = {
                id: $(this).data('id')
            };
            Data.detail(data, function (json) {
                if (json && 'resCode' in json && json.resCode == 0 && json.resBody) {
                    lines = {};
                    if (json.resBody.childList) {
                        var children = json.resBody.childList;
                        for (var c in children) {
                            if (children.hasOwnProperty(c)) {
                                for (var d in children[c]) {
                                    if (children[c].hasOwnProperty(d)) {
                                        var dt = children[c][d];
                                        lines[dt.nodeId] = dt;
                                    }
                                }
                            }
                        }
                    }
                    fill(json.resBody)
                } else {
                    Modal.setAlert(json.resMsg || '获取详情失败，请重试！');
                }
            });
        });
        //删除框关闭
        $(document).on('click', '.close-btn', function () {
            $('.white-back').addClass('dp-n');
            $('.show-part').addClass('dp-n');
        });
        //确认删除
        $(document).on('click', '#ensure-del', function () {
            $('.white-back').addClass('dp-n');
            $('.show-part').addClass('dp-n');
            del(delArr);
        });
        //刷新节点树
        $(document).on('click', '#refresh-tree', function () {
            initTree(url.get('code'));
        });
        //子节点折叠&打开
        $(document).on('click', '.open-icon', function () {
            $(this).parent('.get-size').siblings('ul').toggle();
            $(this).toggleClass('close-icon');
        });
        //设置分区
        $(document).on('click', '#set-group', function () {
            if ($('.single-info:checked').length > 0) {
                $('#ip-group').val('');
                $('.white-back').removeClass('dp-n');
                $('.group-part').removeClass('dp-n');
            }
        });
        //确认分区
        $(document).on('click', '#group-ensure', function () {
            var ele = $('.single-info:checked');
            if (ele.length > 0) {
                var tag = $('#ip-group').val() || 'null';
                if ($('tr[data-tg="' + tag + '"]').length <= 0) {
                    $('.table-container').find('table').append('<tbody data-each="0"><tr class=""><td colspan="13">' + tag + '</td></tr></tbody><tbody data-each="0"><tr class="hide" data-tg="' + tag + '"></tr></tbody>');
                }
                ele.each(function () {
                    $(this).data('tag', tag);
                    $('tr[data-tg="' + tag + '"]').parents('tbody').before($(this).parents('tbody'));
                });
                $('.white-back').addClass('dp-n');
                $('.group-part').addClass('dp-n');
            }
        });
    };
    /**
     *  填充航程信息
     *  @param data object 信息数据
     */
    var fill = function (data) {
        var ele = $('#start')
            , str = '<thead> <tr> <td class="th-small"><input type="checkbox" class="sel-all"/></td> <td class="th-mid">机场名称</td> <td class="th-big">头程航班</td> <td>中转方式</td><td>比重</td><td>MIN</td> <td>45KG</td> <td>100KG</td> <td>300KG</td> <td>500KG</td> <td>1000KG</td> <td>MYC</td><td>SCC</td> <td class="th-mid">操作</td> </tr> </thead>'
            , arr = data.childList;
        ele.val(data.current.destPortCode);
        ele.removeClass('select');
        $('#save').data('ori', data.current.deptPortCode);
        $('#remark').val(data.current.remarks);
        var hdTr = '', otherTd = '';
        for (var a in arr) {
            if (arr.hasOwnProperty(a)) {
                var inner = '';
                var hdInner = '';
                for (var l in arr[a]) {
                    if (arr[a].hasOwnProperty(l)) {
                        var d = arr[a][l];
                        if (a == '') {
                            hdInner += setTr(d);
                        } else {
                            inner += setTr(d);
                        }
                    }
                }
                if (a == '') {
                    hdTr += '<tbody data-each="0"><tr class="' + (a == '' ? ' hide' : '') + '"><td colspan="13">' + a + '</td></tr></tbody>' + hdInner + '<tbody data-each="0"><tr class="hide" data-tg="' + (a == '' ? 'null' : a) + '"></tr></tbody>';
                } else {
                    otherTd += '<tbody data-each="0"><tr class="' + (a == '' ? ' hide' : '') + '"><td colspan="13">' + a + '</td></tr></tbody>' + inner + '<tbody data-each="0"><tr class="hide" data-tg="' + (a == '' ? 'null' : a) + '"></tr></tbody>';
                }
            }
        }
        str += hdTr + otherTd;
        $('.table-container table').html(str);
        function setTr(d) {
            var flightDay = d.flightDay || [];
            var str = '';
            if (d['airwayPrice']['rate'].length > 0) {
                var arr = d['airwayPrice']['rate'];
                for (var a = 1; a < arr.length; a++) {
                    str += '<tr data-bz="' + arr[a].proportion + '"><td></td><td></td><td></td><td></td>' +
                        '<td><input class="bz weight" type="text" value="' + arr[a].proportion + '" readonly=""></td>' +
                        '<td><input class="min weight" type="text" value="' + arr[a].min + '"></td>' +
                        '<td><input class="45 weight" type="text" value="' + arr[a].policy['45'] + '"></td>' +
                        '<td><input class="100 weight" type="text" value="' + arr[a].policy['100'] + '"></td>' +
                        '<td><input class="300 weight" type="text" value="' + arr[a].policy['300'] + '"></td>' +
                        '<td><input class="500 weight" type="text" value="' + arr[a].policy['500'] + '"></td>' +
                        '<td><input class="1000 weight" type="text" value="' + arr[a].policy['1000'] + '"></td>' +
                        '<td></td><td></td><td></td></tr>';
                }
            }


            return '<tbody data-each="1" class="' + (d.nodeState == 1 ? '' : 'bg-r') + '" data-state="' + d.nodeState + '" data-recommend="' + (d.isHot ? '1' : '0') + '"><tr data-bz="1"> ' +
                '<td><input type="checkbox" class="single-info" data-tag="' + d.groupTag + '" data-id="' + d.nodeId + '"/></td> ' +
                '<td><input class="name" type="text" data-val="' + d.destPortCode + '" value="' + d.destPortCode + '"/> <ul class="get-name"></ul>' + (d.isHot ? '<i class="tuijian"></i>' : '') + '</td>' +
                '<td class="first">' +
                '<span class="weeks txt-input">' +
                '<span class="week' + (flightDay.indexOf(1) >= 0 ? ' active' : '') + '" data-num="1">一</span>' +
                '<span class="week' + (flightDay.indexOf(2) >= 0 ? ' active' : '') + '" data-num="2">二</span>' +
                '<span class="week' + (flightDay.indexOf(3) >= 0 ? ' active' : '') + '" data-num="3">三</span>' +
                '<span class="week' + (flightDay.indexOf(4) >= 0 ? ' active' : '') + '" data-num="4">四</span>' +
                '<span class="week' + (flightDay.indexOf(5) >= 0 ? ' active' : '') + '" data-num="5">五</span>' +
                '<span class="week' + (flightDay.indexOf(6) >= 0 ? ' active' : '') + '" data-num="6">六</span>' +
                '<span class="week' + (flightDay.indexOf(7) >= 0 ? ' active' : '') + '" data-num="7">日</span>' +
                '</span>' +
                '</td>' +
                '<td><input class="method select" type="text" readonly value="' + (d.transMode == 1 ? '飞机' : '卡车') + '"/><ul class="dp-n se-part"> <li>飞机</li> <li>卡车</li> </ul></td>' +
                '<td><input class="bz weight" type="text" value="/" readonly/></td>' +
                '<td><input class="min weight" type="text" value="' + (d['airwayPrice']['rate'][0]['min'] || '') + '"/></td>' +
                '<td><input class="45 weight" type="text" value="' + (d['airwayPrice']['rate'][0]['policy']['45'] || '') + '"/></td>' +
                '<td><input class="100 weight" type="text" value="' + (d['airwayPrice']['rate'][0]['policy']['100'] || '') + '"/></td>' +
                '<td><input class="300 weight" type="text" value="' + (d['airwayPrice']['rate'][0]['policy']['300'] || '') + '"/></td>' +
                '<td><input class="500 weight" type="text" value="' + (d['airwayPrice']['rate'][0]['policy']['500'] || '') + '"/></td>' +
                '<td><input class="1000 weight" type="text" value="' + (d['airwayPrice']['rate'][0]['policy']['1000'] || '') + '"/></td>' +
                '<td><input class="myc weight" type="text" value="' + (d.MYC_Fee || '0') + '"/></td>' +
                '<td><input class="scc weight" type="text" value="' + (d.SCC_Fee || '0') + '"/></td>' +
                '<td class="opt">操作<span class="caret"></span>' +
                '<div><a href="javascript:void(0);" class="ope-xz" data-remark="' + d.remarks + '" data-minwei="' + (d.airwayLimit ? d.airwayLimit.minWeight : '') + '" data-len="' + (d.airwayLimit ? d.airwayLimit.length : '') + '" data-wid="' + (d.airwayLimit ? d.airwayLimit.width : '') + '" data-hei="' + (d.airwayLimit ? d.airwayLimit.height : '') + '" data-wei="' + (d.airwayLimit ? d.airwayLimit.pieceWeight : '') + '" data-danger="' + (d.airwayLimit ? (d.airwayLimit.dangerousGoods ? 1 : 0) : 0) + '">限制</a>' +
                '<a href="javascript:void(0);" class="ope-bz">比重</a></div>' +
                '</td></tr>' + str + '</tbody>';
        }
    };
    /**
     *  初始化界面
     *  @param left boolean 删除左侧列表
     */
    var clear = function (left) {
        if (left) {
            $('.air-tree').html('');
        }
        $('.table-container .week').removeClass('active');
        $('#start').val($('#start').siblings('ul').find('li:first-child').text() || '');
        $('#method').val('飞机');
        $('#remark').val('');
        $('.table-container tbody').html('');
    };
    //自定义select元素事件
    var select = function () {
        $(document).on('click', '.select', function () {
            $('.se-part').addClass('dp-n');
            $(this).siblings('.se-part').removeClass('dp-n');
        });
        $(document).on('click', '.se-part li', function () {
            $(this).parents('ul').siblings('input').val($(this).html());
            if ($(this).html() == '已下架') {
                $(this).parents('ul').siblings('input').addClass('bg-r');
            } else {
                $(this).parents('ul').siblings('input').removeClass('bg-r');
            }
            $(this).parents('ul').addClass('dp-n');
        });
        $(document).on('click', function (e) {
            var target = $(e.target);
            if (target.closest('.select,.se-part li').length == 0) {
                $('.se-part').addClass('dp-n');
            }
        });
    };
    //自定义table事件
    var table = function () {
        //table添加新条目
        $(document).on('click', '#add', function () {
            var ele = '<tbody data-each="1" data-state="1"><tr data-bz="1"> ' +
                '<td><input type="checkbox" class="single-info" data-id="0" data-tag=""/></td> ' +
                '<td><input class="name" type="text" data-val=""/><ul class="get-name"></ul></td>' +
                '<td class="first">' +
                '<span class="weeks txt-input">' +
                '<span class="week active" data-num="1">一</span>' +
                '<span class="week active" data-num="2">二</span>' +
                '<span class="week active" data-num="3">三</span>' +
                '<span class="week active" data-num="4">四</span>' +
                '<span class="week active" data-num="5">五</span>' +
                '<span class="week active" data-num="6">六</span>' +
                '<span class="week active" data-num="7">日</span>' +
                '</span>' +
                '</td>' +
                '<td><input class="method select" type="text" value="飞机" readonly/><ul class="dp-n se-part"> <li>飞机</li> <li>卡车</li> </ul></td>' +
                '<td><input class="bz weight" type="text" value="/" readonly/></td>' +
                '<td><input class="min weight" type="text" value="' + minP + '"/></td>' +
                '<td><input class="45 weight" type="text"/></td>' +
                '<td><input class="100 weight" type="text"/></td>' +
                '<td><input class="300 weight" type="text"/></td>' +
                '<td><input class="500 weight" type="text"/></td>' +
                '<td><input class="1000 weight" type="text"/></td>' +
                '<td><input class="myc" type="text"/></td>' +
                '<td><input class="scc" type="text"/></td>' +
                '<td class="opt">操作<span class="caret"></span><div style="display: none;"><a href="javascript:void(0);" class="ope-xz" data-remark="" data-minwei="" data-len="" data-wid="" data-hei="" data-wei="" data-danger="0">限制</a><a href="javascript:void(0);" class="ope-bz">比重</a></div></td></tr></tbody>';
            if ($('.table-container tr[data-tg="null"]').length == 0) {
                $('.table-container thead').after('<tbody data-each="0"><tr class="hide"><td colspan="13"></td></tr></tbody><tbody data-each="0"><tr class="hide" data-tg="null"></tr></tbody>')
            }
            $('tr[data-tg="null"]').parents('tbody').before(ele);
        });
        //table删除按钮
        $(document).on('click', '#remove', function () {
            var arr = [];
            $('.single-info').each(function () {
                if ($(this).prop('checked')) {
                    if ($(this).data('id') != 0) {
                        arr.push($(this).data('id'));
                    } else {
                        $(this).parents('tbody').remove();
                    }
                }
            });
            if (arr.length > 0) {
                delArr = {
                    list: arr
                };
                $('.white-back').removeClass('dp-n');
                $('.del-part').removeClass('dp-n');
            }
            $('.sel-all').prop('checked', false);
        });
        //table全选按钮
        $(document).on('click', '.sel-all', function () {
            $('.single-info').prop('checked', $(this).prop('checked'));
        });
        //航班日期选择
        $(document).on('click', '.week', function () {
            $(this).toggleClass('active');
        });
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
            if (ul.css('display') == 'block' && ul.children().length > 0) {
                var data = ul.children('.active').data('val') || ul.find('li:first-child').data('val') || '';
                $(this).val(data);
                $(this).data('val', data);
                ul.hide();
            }
        });
        //li元素悬浮获得焦点
        $(document).on('mouseenter ', '.get-name li', function () {
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
        });
    };
    /**
     *  构建左侧dom树
     *  @param data object 航线节点树
     *  @param arr array 需要显示的航线
     *  @param open boolean 是否默认显示
     */
    var buildTree = function (data, arr, open, first, index) {
        var str = '';
        var i = index ? index + 1 : 1;
        for (var d in data) {
            if (data.hasOwnProperty(d)) {
                var child = data[d]['childNodes']
                    , name = data[d]['airportCode']
                    , id = data[d]['nodeId']
                    , deep = data[d]['nodeDepth'] ? parseInt(data[d]['nodeDepth']) + 1 : i;
                str += '<ul' + (open ? ' style="display: block;"' : '') + '><li><span class="get-size">' + (child.length > 0 ? '<span class="open-icon' + (arr.indexOf(id) >= 0 ? ' close-icon' : '') + '" data-id="' + id + '"></span>' : '') + '</span><div data-index="' + deep + '" class="show-detail" data-id="' + id + '"><span style="background-color: ' + (data[d]['nodeState'] ? '' : '#ccc;') + '" class="' + (first ? 'start' : 'end') + '">'
                    + (first ? '起' : '目') + '</span><span class="e-name">' + name + '</span></div>' + (child.length > 0 ? buildTree(child, arr, arr.indexOf(id) >= 0 ? 1 : 0, false, i) : '') + '</li></ul>';
            }
        }
        return str;
    };
    /**
     *  获取左侧节点树
     *  @param code string 航空公司代码
     *  @param arr string 是否需要显示路径
     */
    var initTree = function (code, arr) {
        var data = {
            cid: 10000
            , code: code
        };
        Data.tree(data, function (json) {
            if (json && 'resCode' in json && json.resCode == 0) {
                if ('nodeTree' in json.resBody && json.resBody.nodeTree.length >= 0) {
                    $('.air-tree').html(buildTree(json.resBody.nodeTree, arr && arr instanceof Array ? arr : [], null, true));
                }
            }
        });
    };
    //删除
    var del = function (data) {
        Data.del(data, function (json) {
            if (json && 'resCode' in json && json.resCode == 0) {
                Modal.setAlert(json.resMsg || '删除成功!');
                clear(false);
                var arr = data.list;
                for (var a in arr) {
                    if (arr.hasOwnProperty(a)) {
                        var d = arr[a];
                        $('.show-detail[data-id="' + d + '"]').parents('tbody').remove();
                    }
                }
            } else {
                Modal.setAlert(json.resMsg || '删除失败，请重试！');
            }
        })
    };
    //获取路径
    var getRoad = function (ele) {
        if (ele.data('id')) {
            road.push(ele.data('id'));
        }
        if (ele.parent().parent().siblings('.show-detail').length > 0) {
            getRoad(ele.parent().parent().siblings('.show-detail'));
        } else {
            return false;
        }
    };
    //发布
    var publish = function () {
        $(document).on('click', '.publish-btn', function () {
            $('#sel-time').datetimepicker({
                format: 'yyyy-mm-dd',//日期的格式
                startDate: new Date(),//选择器的开始日期
                autoclose: true,//日期选择完成后是否关闭选择框
                bootcssVer: 3,//显示向左向右的箭头
                language: 'zh-CN',//语言
                minView: "month",//表示日期选择的最小范围，默认是hour
                initialDate: new Date(new Date().getTime() + (7 * 24 * 60 * 60 * 1000))//默认选中时间
            }).on('changeDate', function (e) {
                var value = new Date(e.date).Format('yyyy-MM-dd');
                $('#expireDate').val(value);
            });
            $('#expireDate').val(new Date(new Date().getTime() + (7 * 24 * 60 * 60 * 1000)).Format('yyyy-MM-dd'));
            $('.white-back').removeClass('dp-n');
            $('.publish-part').removeClass('dp-n');
        });
        $(document).on('click', '#ensure-publish', function () {
            var data = {
                "airCompanyCode": url.get('code'),
                "expireDate": $('#expireDate').val()
            };
            Data.publish(data, function (json) {
                if (json && 'resCode' in json && json.resCode == 0) {
                    Modal.setAlert(json.resMsg || '发布成功！', null, function () {
                        location.reload();
                    });
                } else {
                    Modal.setAlert(json.resMsg || '发布失败，请重试！');
                }
            });
        });
    };
    //批量添加
    var multi = function () {
        //显示批量添加
        $(document).on('click', '#multi-add', function () {
            var str = '<tr> <td class="first"><span class="weeks txt-input"><span class="week active" data-num="1">一</span><span class="week active" data-num="2">二</span><span class="week active" data-num="3">三</span><span class="week active" data-num="4">四</span><span class="week active" data-num="5">五</span><span class="week active" data-num="6">六</span><span class="week active" data-num="7">日</span></span></td> <td><input class="method select" type="text" value="飞机" readonly=""> <ul class="dp-n se-part"> <li>飞机</li> <li>卡车</li> </ul> </td> <td> / </td> <td><input class="min weight" value="' + (minP || 200) + '" type="text"></td><td><input class="45 weight" data-200="0" data-300="0" data-500="0" type="text"></td> <td><input class="100 weight" data-200="0" data-300="0" data-500="0" type="text"></td> <td><input class="300 weight" data-200="0" data-300="0" data-500="0" type="text"></td> <td><input class="500 weight" data-200="0" data-300="0" data-500="0" type="text"></td> <td><input class="1000 weight" data-200="0" data-300="0" data-500="0" type="text"></td><td><input class="myc" type="text"></td><td><input class="scc" type="text"></td></tr>';
            $('.tips').hide();
            $('#input-tag').val('');
            $('.create-body').html('');
            $('.multi-add tbody').html(str);
            $('.white-back').removeClass('dp-n');
            $('.add-part').removeClass('dp-n');
        });
        //获取机场名称
        $(document).on('keyup', 'input#create-end', function (e) {
            $('.tips').hide();
            var _this = $(this)
                , ul = _this.siblings('.get-name');
            var index = ul.find('.active').index() || 0
                , len = ul.children().length;
            if (e.keyCode == 13) {//回车键
                _this.val('');
                var data = ul.children('.active').data('val') || ul.find('li:first-child').data('val') || '';
                var str = '<div class="sg-add" data-val="' + data + '">' + data + '<span class="delete-sg">X</span> </div>';
                if (data && $('.create-body').children().length >= 20) {
                    $('.tips').html('每次最多添加20条').show();
                    ul.html('');
                } else if (data && $('.sg-add[data-val="' + data + '"]').length > 0) {
                    $('.tips').html('该目的地已存在').show();
                    ul.html('');
                } else if (data) {
                    $('.create-body').append(str);
                    ul.html('');
                }
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
        $(document).on('blur', 'input#create-end', function () {
            $(this).val('');
            var ul = $(this).siblings('.get-name');
            var data = ul.children('.active').data('val') || ul.find('li:first-child').data('val') || '';
            var str = '<div class="sg-add" data-val="' + data + '">' + data + '<span class="delete-sg">X</span> </div>';
            if (data && $('.create-body').children().length >= 20) {
                $('.tips').html('每次最多添加20条').show();
                ul.html('');
            } else if (data && $('.sg-add[data-val="' + data + '"]').length > 0) {
                $('.tips').html('该目的地已存在').show();
                ul.html('');
            } else if (data) {
                $('.create-body').append(str);
                ul.html('');
            }
            ul.hide();
        });
        //确定添加
        $(document).on('click', '#ensure-add', function () {
            var str = ''
                , flightDay = [];
            var ele = $('.multi-add');
            var tg = $('#input-tag').val();
            var pass = true;

            var eleTr = ele.find('tbody').find('tr');
            //eleTr.each(function () {
            //    var _this = $(this);
            //    if (_this.find('td').length > 1) {
            //        var min = parseFloat($(this).find('.min').val());
            //        if (!min || min < minP) {
            //            pass = false;
            //            $(this).find('.min').addClass('warm');
            //            Modal.setAlert('最小价格为' + minP);
            //        } else {
            //            $(this).find('.min').removeClass('warm');
            //            if (parseFloat(_this.find('.45').val()) && parseFloat(_this.find('.45').val()) >= (min / 45)) {
            //                _this.find('.45').removeClass('warm');
            //            } else {
            //                _this.find('.45').addClass('warm');
            //                pass = false;
            //            }
            //            if (parseFloat(_this.find('.100').val()) && parseFloat(_this.find('.100').val()) >= (min / 100)) {
            //                _this.find('.100').removeClass('warm');
            //            } else {
            //                _this.find('.100').addClass('warm');
            //                pass = false;
            //            }
            //            if (parseFloat(_this.find('.300').val()) && parseFloat(_this.find('.300').val()) >= (min / 300)) {
            //                _this.find('.300').removeClass('warm');
            //            } else {
            //                _this.find('.300').addClass('warm');
            //                pass = false;
            //            }
            //            if (parseFloat(_this.find('.500').val()) && parseFloat(_this.find('.500').val()) >= (min / 500)) {
            //                _this.find('.500').removeClass('warm');
            //            } else {
            //                _this.find('.500').addClass('warm');
            //                pass = false;
            //            }
            //            if (parseFloat(_this.find('.1000').val()) && parseFloat(_this.find('.1000').val()) >= (min / 1000)) {
            //                _this.find('.1000').removeClass('warm');
            //            } else {
            //                _this.find('.1000').addClass('warm');
            //                pass = false;
            //            }
            //        }
            //    }
            //});

            if (pass) {
                ele.find('.week').each(function () {
                    if ($(this).hasClass('active')) {
                        flightDay.push(parseInt($(this).data('num')));
                    }
                });
                $('.sg-add').each(function () {
                    var d = {
                        id: 0
                        , code: $(this).data('val')
                        , tag: tg
                        , flightDay: flightDay
                        , type: ele.find('.method').val() == '飞机' ? 1 : 2
                        , min: ele.find('.min').val()
                        , 45: ele.find('.45').val()
                        , 100: ele.find('.100').val()
                        , 300: ele.find('.300').val()
                        , 500: ele.find('.500').val()
                        , 1000: ele.find('.1000').val()
                        , myc: ele.find('.myc').val()
                        , scc: ele.find('.scc').val()
                        , state: 1
                    };
                    str += '<tbody data-each="1" data-state="1"><tr> ' +
                        '<td data-bz="1"><input type="checkbox" class="single-info" data-tag="' + d.tag + '" data-id="' + d.id + '"/></td> ' +
                        '<td><input class="name" type="text" data-val="' + d.code + '" value="' + d.code + '"/> <ul class="get-name"></ul> </td>' +
                        '<td class="first">' +
                        '<span class="weeks txt-input">' +
                        '<span class="week' + (flightDay.indexOf(1) >= 0 ? ' active' : '') + '" data-num="1">一</span>' +
                        '<span class="week' + (flightDay.indexOf(2) >= 0 ? ' active' : '') + '" data-num="2">二</span>' +
                        '<span class="week' + (flightDay.indexOf(3) >= 0 ? ' active' : '') + '" data-num="3">三</span>' +
                        '<span class="week' + (flightDay.indexOf(4) >= 0 ? ' active' : '') + '" data-num="4">四</span>' +
                        '<span class="week' + (flightDay.indexOf(5) >= 0 ? ' active' : '') + '" data-num="5">五</span>' +
                        '<span class="week' + (flightDay.indexOf(6) >= 0 ? ' active' : '') + '" data-num="6">六</span>' +
                        '<span class="week' + (flightDay.indexOf(7) >= 0 ? ' active' : '') + '" data-num="7">日</span>' +
                        '</span>' +
                        '</td>' +
                        '<td><input class="method select" type="text" readonly value="' + (d.type == 1 ? '飞机' : '卡车') + '"/><ul class="dp-n se-part"> <li>飞机</li> <li>卡车</li> </ul></td>' +
                        '<td><input class="bz weight" type="text" value="/" readonly/></td>' +
                        '<td><input class="min weight" type="text" value="' + (d['min'] || '') + '"/></td>' +
                        '<td><input class="45 weight" type="text" value="' + (d['45'] || '') + '"/></td>' +
                        '<td><input class="100 weight" type="text" value="' + (d['100'] || '') + '"/></td>' +
                        '<td><input class="300 weight" type="text" value="' + (d['300'] || '') + '"/></td>' +
                        '<td><input class="500 weight" type="text" value="' + (d['500'] || '') + '"/></td>' +
                        '<td><input class="1000 weight" type="text" value="' + (d['1000'] || '') + '"/></td>' +
                        '<td><input class="myc weight" type="text" value="' + (d['myc'] || '') + '"/></td>' +
                        '<td><input class="scc weight" type="text" value="' + (d['scc'] || '') + '"/></td>' +
                        '<td class="opt">操作<span class="caret"></span><div style="display: none;">' +
                        '<a href="javascript:void(0);" class="ope-xz" data-remark="' + $('#add-beizhu').val() + '" data-minwei="' + $('#add-minWei').val() + '" data-len="' + $('#add-len').val() + '" data-wid="' + $('#add-wid').val() + '" data-hei="' + $('#add-hei').val() + '" data-wei="' + $('#add-zl').val() + '" data-danger="' + ($('#add-danger').prop('checked') ? 1 : 0) + '">限制</a>' +
                        '<a href="javascript:void(0);" class="ope-bz">比重</a></div></td></tr></tbody>';
                });
                if (tg == '') {
                    if ($('.table-container tr[data-tg="null"]').length == 0) {
                        $('.table-container thead').after('<tbody data-each=0><tr class="hide"><td colspan="13"></td></tr></tbody><tbody data-each=0><tr class="hide" data-tg="null"></tr></tbody>');
                    }
                    $('tr[data-tg="null"]').parents('tbody').before(str);
                } else {
                    if ($('.table-container tr[data-tg="' + tg + '"]').length == 0) {
                        $('.table-container table').append('<tbody data-each="0"><tr><td colspan="13">' + tg + '</td></tr></tbody><tbody data-each="0"><tr class="hide" data-tg="' + tg + '"></tr></tbody>');
                    }
                    $('tr[data-tg="' + tg + '"]').parents('tbody').before(str);
                }
                $('.white-back').addClass('dp-n');
                $('.add-part').addClass('dp-n');
            } else {
                Modal.setAlert('最小价格为' + minP + '，每个等级的价格必须>=最小价格 / 等级重量！');
            }
        });
        //删除
        $(document).on('click', '.delete-sg', function () {
            $(this).parent().remove();
        });
    };
    //批量修改
    var update = function () {
        $(document).on('click', '#multi-update', function () {
            updateData = [];
            var ele = $('.single-info:checked');
            var str = '';
            if (ele.length > 0) {
                ele.each(function () {
                    var tb = $(this).parents('tbody');
                    updateData.push(tb.index());
                    str += '<span>' + tb.find('.name').val() + '</span>'
                });
                $('.multi-update tbody').html('<tr> <td class="first"><span class="weeks txt-input"><span class="week active" data-num="1">一</span><span class="week active" data-num="2">二</span><span class="week active" data-num="3">三</span><span class="week active" data-num="4">四</span><span class="week active" data-num="5">五</span><span class="week active" data-num="6">六</span><span class="week active" data-num="7">日</span></span></td> <td><input class="method select" type="text" value="飞机" readonly=""> <ul class="dp-n se-part"> <li>飞机</li> <li>卡车</li> </ul> </td><td> / </td> <td><input value="' + minP + '" class="min weight" type="text"></td> <td><input class="45 weight" data-200="0" data-300="0" data-500="0" type="text"></td> <td><input class="100 weight" data-200="0" data-300="0" data-500="0" type="text"></td> <td><input class="300 weight" data-200="0" data-300="0" data-500="0" type="text"></td> <td><input class="500 weight" data-200="0" data-300="0" data-500="0" type="text"></td> <td><input class="1000 weight" data-200="0" data-300="0" data-500="0" type="text"></td><td><input type="text" class="myc"></td><td><input type="text" class="scc"></td></tr>');
                $('.up-end').html(str);
                $('.white-back').removeClass('dp-n');
                $('.update-part').removeClass('dp-n');
            }
        });
        $(document).on('click', '#ensure-update', function () {
            var dt = [];
            var pass2 = true;
            var ele = $('.multi-update');

            var pass = true;

            var eleTr = ele.find('tbody').find('tr');
            //eleTr.each(function () {
            //    var _this = $(this);
            //    if (_this.find('td').length > 1) {
            //        var min = parseFloat($(this).find('.min').val());
            //        if (!min || min < minP) {
            //            pass = false;
            //            $(this).find('.min').addClass('warm');
            //            Modal.setAlert('最小价格为' + minP);
            //        } else {
            //            $(this).find('.min').removeClass('warm');
            //            if (parseFloat(_this.find('.45').val()) && parseFloat(_this.find('.45').val()) >= (min / 45)) {
            //                _this.find('.45').removeClass('warm');
            //            } else {
            //                _this.find('.45').addClass('warm');
            //                pass = false;
            //            }
            //            if (parseFloat(_this.find('.100').val()) && parseFloat(_this.find('.100').val()) >= (min / 100)) {
            //                _this.find('.100').removeClass('warm');
            //            } else {
            //                _this.find('.100').addClass('warm');
            //                pass = false;
            //            }
            //            if (parseFloat(_this.find('.300').val()) && parseFloat(_this.find('.300').val()) >= (min / 300)) {
            //                _this.find('.300').removeClass('warm');
            //            } else {
            //                _this.find('.300').addClass('warm');
            //                pass = false;
            //            }
            //            if (parseFloat(_this.find('.500').val()) && parseFloat(_this.find('.500').val()) >= (min / 500)) {
            //                _this.find('.500').removeClass('warm');
            //            } else {
            //                _this.find('.500').addClass('warm');
            //                pass = false;
            //            }
            //            if (parseFloat(_this.find('.1000').val()) && parseFloat(_this.find('.1000').val()) >= (min / 1000)) {
            //                _this.find('.1000').removeClass('warm');
            //            } else {
            //                _this.find('.1000').addClass('warm');
            //                pass = false;
            //            }
            //        }
            //    }
            //});

            if (pass) {
                ele.find('.week.active').each(function () {
                    dt.push($(this).data('num'));
                });
                ele.find('.weight').each(function () {
                    if (!$(this).val()) {
                        pass2 = false;
                        $(this).addClass('warm');
                    } else {
                        $(this).removeClass('warm');
                    }
                });
                if (pass2) {
                    var data = {
                        dt: dt
                        , method: ele.find('.method').val()
                        , min: ele.find('.min').val()
                        , 45: ele.find('.45').val()
                        , 100: ele.find('.100').val()
                        , 300: ele.find('.300').val()
                        , 500: ele.find('.500').val()
                        , 1000: ele.find('.1000').val()
                        , myc: ele.find('.myc').val()
                        , scc: ele.find('.scc').val()
                    };
                    for (var i = 0; i < updateData.length; i++) {
                        var oTr = $('.table-container tbody').eq(updateData[i] - 1).find('tr[data-bz="1"]');
                        oTr.find('.method').val(data.method).end()
                            .find('.min').val(data['min']).end()
                            .find('.45').val(data['45']).end()
                            .find('.100').val(data['100']).end()
                            .find('.300').val(data['300']).end()
                            .find('.500').val(data['500']).end()
                            .find('.1000').val(data['1000']).end()
                            .find('.myc').val(data['myc']).end()
                            .find('.scc').val(data['scc']).end();

                        oTr.find('.ope-xz').data('len', $('#up-len').val());
                        oTr.find('.ope-xz').data('wid', $('#up-wid').val());
                        oTr.find('.ope-xz').data('hei', $('#up-hei').val());
                        oTr.find('.ope-xz').data('wei', $('#up-zl').val());
                        oTr.find('.ope-xz').data('minwei', $('#up-minWei').val());
                        oTr.find('.ope-xz').data('remark', $('#up-beizhu').val());
                        oTr.find('.ope-xz').data('danger', $('#up-danger').prop('checked') ? 1 : 0);

                        if (data['state'] == '已下架') {
                            $('.table-container tbody').eq(updateData[i] - 1).addClass('bg-r');
                            $('.table-container tbody').eq(updateData[i] - 1).data('state', 0);
                        } else {
                            $('.table-container tbody').eq(updateData[i] - 1).removeClass('bg-r');
                            $('.table-container tbody').eq(updateData[i] - 1).data('state', 1);
                        }
                        oTr.find('.week').each(function () {
                            if (data.dt.indexOf($(this).data('num')) >= 0) {
                                $(this).addClass('active');
                            } else {
                                $(this).removeClass('active');
                            }
                        });
                    }
                    $('.white-back').addClass('dp-n');
                    $('.update-part').addClass('dp-n');
                }
            } else {
                Modal.setAlert('最小价格为' + minP + '，每个等级的价格必须>=最小价格 / 等级重量！');
            }
        });
    };
    //航空公司
    var companyInit = function () {
        Data.companyList(function (json) {
            var str = '';
            if (json && 'resCode' in json && json.resCode == 0) {
                if ('sList' in json.resBody && json.resBody.sList instanceof Array && json.resBody.sList.length > 0) {
                    var arr = json.resBody.sList;
                    for (var a in arr) {
                        if (arr.hasOwnProperty(a)) {
                            var d = arr[a];
                            var inner = '', iArr = d.deptAirports || [];
                            for (var i = 0; i < iArr.length; i++) {
                                inner += iArr[i].airportCode + (i == iArr.length - 1 ? '' : ',');
                            }
                            var none = "this.style.display='none';document.getElementById('i" + a + "').style.display='block';";
                            str += '<div data-min="' + (d.minPrice || 200) + '" data-company="' + inner + '" class="sel-btn" data-id="' + d.airCompanyCode + '" data-name="' + d.airCompanyName + '">' +
                                ' <img src="/images/airline/' + d.airCompanyCode + '.png" class="dp-b circle" onerror="' + none + '"/> ' +
                                '<p id="i' + (a) + '" class="dp-n">' + d.airCompanyCode + '</p>' +
                                '<span class="dp-b text">' + d.airCompanyCode + '</span> </div>';
                        }
                    }
                    $('.list-cout').html('<strong>选择航空公司</strong> 已有 ' + arr.length + ' 家航空公司');
                } else {
                    str += '<div class="wrong">暂无航空公司，<a href="/airline/company">请添加！</a></div>';
                    $('.list-cout').html('<strong>选择航空公司</strong> 已有 0 家航空公司');
                }
            } else {
                str += '<div class="wrong">请求出错，请刷新重试！</div>';
                $('.list-cout').html('<strong>选择航空公司</strong> 已有 0 家航空公司');
            }
            $('.airports').find('.companys').html(str);
        });
    };
    //设置比重
    var setBz = function () {
        var opt = [];
        $(document).on('click', '.ope-bz', function () {
            opt = [];
            var ele = $(this).parents('tbody');
            opt.push(ele.index());
            $('.bz-lv').removeClass('active');
            ele.find('tr').each(function () {
                if ($(this).data('bz') != 1) {
                    $('.bz-lv[data-bz="' + $(this).data('bz') + '"]').addClass('active');
                }
            });
            $('.white-back').removeClass('dp-n');
            $('.sg-set-bz').removeClass('dp-n');
        });
        $(document).on('click', '#batch-bz', function () {
            opt = [];
            var ele = $('.single-info:checked').parents('tbody');
            ele.each(function () {
                opt.push($(this).index());
            });
            if (opt.length > 0) {
                $('.bz-lv').removeClass('active');
                $('.white-back').removeClass('dp-n');
                $('.sg-set-bz').removeClass('dp-n');
            }
        });
        $(document).on('click', '#ensure-sg-set-bz', function () {
            var arr = [];
            for (var o = 0; o < opt.length; o++) {
                var str = '';
                var tr = $('.table-container tbody').eq(opt[o] - 1).find('tr[data-bz="1"]');
                tr.siblings().remove();
                var data = {
                    min: parseFloat(tr.find('.min').val())
                    , 45: parseFloat(tr.find('.45').val())
                    , 100: parseFloat(tr.find('.100').val())
                    , 300: parseFloat(tr.find('.300').val())
                    , 500: parseFloat(tr.find('.500').val())
                    , 1000: parseFloat(tr.find('.1000').val())
                };
                $('.bz-lv.active').each(function () {
                    var bz = $(this).data('bz')
                        , p = parseFloat($('#bz-' + $(this).data('bz')).find('option:selected').val());
                    str += '<tr data-bz="' + bz + '"><td></td><td></td><td></td><td></td>' +
                        '<td><input class="bz weight" type="text" value="' + bz + '" readonly=""></td>' +
                        '<td><input class="min weight" type="text" value="' + (data['min']) + '"></td>' +
                        '<td><input class="45 weight" type="text" value="' + (data['45'] - p) + '"></td>' +
                        '<td><input class="100 weight" type="text" value="' + (data['100'] - p) + '"></td>' +
                        '<td><input class="300 weight" type="text" value="' + (data['300'] - p) + '"></td>' +
                        '<td><input class="500 weight" type="text" value="' + (data['500'] - p) + '"></td>' +
                        '<td><input class="1000 weight" type="text" value="' + (data['1000'] - p) + '"></td>' +
                        '<td></td><td></td></tr>'

                });
                tr.after(str);
            }
            $('.white-back').addClass('dp-n');
            $('.sg-set-bz').addClass('dp-n');
        });
    };
    //设置限制
    var setLimit = function () {
        var sgLimit = [];
        $(document).on('click', '.ope-xz', function () {
            sgLimit = [];
            sgLimit.push($(this).parents('tbody').index());
            $('.sg-limit-part').find('input').val('');
            $('.sg-limit-part').find('.main-info').html('已选择航线：' + $(this).parents('tbody').find('.name').val());
            $('#sg-len').val($(this).data('len'));
            $('#sg-wid').val($(this).data('wid'));
            $('#sg-hei').val($(this).data('hei'));
            $('#sg-zl').val($(this).data('wei'));
            $('#sg-minWei').val($(this).data('minwei'));
            $('#sg-beizhu').val($(this).data('remark'));
            $('#sg-danger').prop('checked', $(this).data('danger') == '1');
            $('.white-back').removeClass('dp-n');
            $('.sg-limit-part').removeClass('dp-n');
        });
        $(document).on('click', '#ensure-sg-limit', function () {
            var ele = $('.table-container tbody').eq(sgLimit[0] - 1).find('.ope-xz');
            ele.data('len', $('#sg-len').val());
            ele.data('wid', $('#sg-wid').val());
            ele.data('hei', $('#sg-hei').val());
            ele.data('wei', $('#sg-zl').val());
            ele.data('minwei', $('#sg-minWei').val());
            ele.data('remark', $('#sg-beizhu').val());
            ele.data('danger', $('#sg-danger').prop('checked') ? 1 : 0);
            $('.white-back').addClass('dp-n');
            $('.sg-limit-part').addClass('dp-n');
        });
    };
    var run = function () {
        //function notFound(t) {
        //    $(t).hide();
        //    $(t).siblings('p').show();
        //}
        listener();
        select();
        table();
        publish();
        multi();
        companyInit();
        update();
        setBz();
        setLimit();
    };
    return {
        run: run
    }
}());
module.exports.Listener = Listener;