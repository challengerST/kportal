/**
 * Created by Jeremy on 2016/11/22.
 */
"use strict";
var Modal = require('../frame/modal')
    ,myformat = require('../frame/function').format;
var Listener = (function () {
    var listener = function () {
        $(document).on('input','.jiesuanma input',function(){
            $('.sanzima1').html($(this).val());
            $('.sanzima2').html($(this).val());
        });
        $(document).on('input','.guige',function(){
            var ss=$(this).html();
            if(($(this).height()/21)>16){
                var ss=$(this).html();
            }
        });
        var htmlright='';
        var htmlleft='';
        var rows =1;
        var masRows = 17;
        var hasSub =$('.container').data('hassub');
        if(hasSub){
            htmlright = '<span>console</span><br>';
        }else{
            if($('.guige').data('pm')){

                var str;
                str=($('.guige').data('pm')).replace(/，/ig,',');
                var tt=str.split(',');
                for(var i=0;i<tt.length;i++){
                    rows++;
                    if (rows < masRows) {
                        htmlright+='<span>'+tt[i]+'</span><br>';
                    } else {
                        htmlleft += '<span>' + tt[i] + '</span><br>'
                    }
                }
            }
            if($('.guige').data('mt')){
                var str;
                str=($('.guige').data('mt')).replace(/，/ig,',');
                var tt=str.split(',');
                for(var i=0;i<tt.length;i++){
                    rows++;
                    if (rows < masRows) {
                        htmlright+='<span>'+tt[i]+'</span><br>'
                    } else {
                        htmlleft += '<span>' + tt[i] + '</span><br>'
                    }
                }
            }
        }
        if($('.guige').data('size')){
            var str;
            //str=($('.guige').data('size')).replace(/，/ig,',');
            var tt=$('.guige').data('size').split(',');
            for(var i=0;i<tt.length-1;i++) {
                rows++;
                if (rows < masRows) {
                    htmlright += '<span>' + tt[i] + '</span><br>'
                } else {
                    htmlleft += '<span>' + tt[i] + '</span><br>'
                }
            }
        }

        $('.guige').html(htmlright);
        $('.guigebuchong').html(htmlleft);
        $(document).on('click', '#pdf', function () {
            if($('.guigebuchong').css('border')=='none'){
                alert('请先点击保存按钮！');
            }
            if($('.guigebuchong').css('border')!='none'){
                var code = '<!DOCTYPE html> <html lang="zh-CN"> <head> <meta charset="UTF-8"> ' +
                    '<meta name="Generator" content="Jeremy"> <meta name="Author" content="Jeremy"> ' +
                    '<meta name="Keywords" content=""> <meta name="Description" content="">' +
                    ' <title>提单确认</title> <style>' + $('style').html() + '</style></head> <body>' +
                    '<div class="container"><div class="td">' + $('.td').html() + '</div></div></body> </html>';

                $.ajax({
                    url: '/api/down/pdf'
                    , type: 'post'
                    , data: {code: code, name: '提单'}
                    , dataType: 'json'
                    , timeout: 100000
                    , success: function (json) {
                        if ('status' in json && json.status == 1) {
                            window.open("/getImgCode/pdf");
                        }
                    }
                });
            }
        });
        $(document).on('click', '.dl-yld', function () {
            var code = '<!DOCTYPE html> <html lang="zh-CN"> <head> <meta charset="UTF-8"> ' +
                '<meta name="Generator" content="Jeremy"> <meta name="Author" content="Jeremy"> ' +
                '<meta name="Keywords" content=""> <meta name="Description" content="">' +
                ' <title>提单确认</title> <style>' + $('style').html() + '</style></head> <body>' +
                $('.container').html() + '</body> </html>';
            $.ajax({
                url: '/api/down/pdf'
                , type: 'post'
                , data: {code: code, name: '预录单'}
                , dataType: 'json'
                , timeout: 100000
                , success: function (json) {
                    if ('status' in json && json.status == 1) {
                        window.open("/getImgCode/pdf");
                    }
                }
            });
        });
        $(document).on('click', '#ensure', function () {
            var data = {
                "memberId": 0,
                "orderId": $(this).data('id')
            };
            $.ajax({
                url: '/api/order/orderConfirm'
                , type: 'post'
                , data: data
                , dataType: 'json'
                , timeout: 100000
                , success: function (json) {
                    if (json && 'resCode' in json && json.resCode == 0) {
                        Modal.setAlert('确认成功！', null, function () {
                            location.reload();
                        });
                    } else {
                        Modal.setAlert(json.resMsg || '确认失败，请重试！');
                    }
                }
            });
        });


    };
    var priceInit = function () {
        $.ajax({
            url: '/api/order/tactPrice'
            , type: 'post'
            , data: {
                "orderId": $('.container').data('id')
            }
            , dataType: 'json'
            , timeout: 100000
            , success: function (json) {
                $(".zd-t").data('id');
                if (json && 'resCode' in json && json.resCode == 0) {
                    var data = json.resBody || {};
                    $('.dj').html($(".zd-t").data('id')==''?data.price.toFixed(2):'');
                    $('.yf').html($(".zd-t").data('id')==''?data.tactCharge.toFixed(2):'');
                    $('.yf2').html($(".zd-t").data('id')==''?data.tactCharge.toFixed(2):'');
                    $('.zj').html($(".zd-t").data('id')==''?data.totalCharge.toFixed(2):'');
                    $('.zfmx').data("awc",data.awc);
                    tactChange();
                }
            }
        });
        //小数点控制
        var size = myformat.formatvolume($('.pm').find('span').data('z'));
        $('.pm').find('span').data('z',size);
        $('.pm').find('span').html(size);
        $('.zl').html(myformat.formatweight($('.zl').html()));
        $('.jfzl').html(myformat.formatweight($('.jfzl').html()));
    };
    var tactChange = function(){
        var Awc,Myc,Scc;
        Awc=$(".zd-t").data('id')==''?'AWC：'+parseFloat($('.zfmx').data("awc")).toFixed(2):'';
        //myc计费重量
        Myc=$(".zd-t").data('id')==''?'MYC：'+parseFloat($('.jfzl').html()).toFixed(2):'';
        //MSC 计费重量乘以0.8
        Scc=$(".zd-t").data('id')==''?'MSC：'+(parseFloat($('.jfzl').html())*0.8).toFixed(2):'';
        $('.zfmx').html(
            (1 ?  Awc + '<br/>' : '') +
            (1 ?  Myc + '<br/>' : '') +
            (1 ?  Scc: '')
        );

        var xx=(+parseFloat($('.zfmx').data("awc")) + parseFloat($('.jfzl').html()) + parseFloat($('.jfzl').html())*0.8).toFixed(2);
        $('.zf').html($(".zd-t").data('id')==''?xx:'');
        if ($('.container').data("sid")) {
            $('.zj').html('');
        } else {
            $('.zj').html((parseFloat($('.yf2').html()) + parseFloat(xx)).toFixed(2));
        }
    }
    var run = function () {
        listener();
        priceInit();
    };
    return {
        run: run
    }
}());
module.exports = Listener;