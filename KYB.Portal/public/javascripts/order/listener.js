/**
 * Created by Jeremy on 2016/11/22.
 */
"use strict";
var url = require('../frame/function').url;
var Modal = require('../frame/modal');
var Data = require('./data').Data;
var Listener = (function () {
    var listener = function () {
        $(document).on('click', '#open_map', function () {
            Data.warehouse({id: $(this).data('id')}, function (json) {
                if (json && 'resCode' in json && json.resCode == 0) {
                    var d = json.resBody || {};
                    $('.w-name').html(d.warehouseName || '/');
                    $('.w-address').html(d.warehouseAddress || '/');
                    $('.w-tel').html(d.warehouseContact || '/' + '(电话：' + d.warehouseTel || '/' + '，传真：' + d.warehouseFax || '/' + ')');
                    Data.ossDown({"file": d.warehouseMap}, function (body) {
                        if (body && 'resCode' in body && body.resCode == 0 && body.resBody) {
                            var ele = '<img alt="进仓地图" src="' + body.resBody + '"/>';
                            $('.map-main').html(ele);
                        }
                        $('.white-back').removeClass('dp-n');
                        $('.map').removeClass('dp-n');
                    });
                }
            });
        });
        $(document).on('click', '#open_list', function () {
            $('.white-back').removeClass('dp-n');
            $('.list').removeClass('dp-n');
        });
        $(document).on('click', '.close-modal', function () {
            $('.white-back').addClass('dp-n');
            $('.map').addClass('dp-n');
            $('.list').addClass('dp-n');
        });
        $(document).on('click', '#dl-map', function () {
            dlMap();
        });
    };
    var dlMap = function () {
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
    };
    var run = function () {
        listener();
    };
    return {
        run: run
    }
}());
module.exports = Listener;