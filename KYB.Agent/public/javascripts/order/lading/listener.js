/**
 * Created by Jeremy on 2016/11/22.
 */
"use strict";
var Modal = require('../../general/modal')
    ,myformat = require('../../general/function').format;
var Listener = (function () {
    var listener = function () {
            $(document).on('keyup','.jiesuanma textarea',function(e){
             //   $('.sanzima1').html($(this).val());
                if (e.keyCode==32)  //回车键的键值为13,空格未32
                {
                   //$(this).val( $(this).val() + '\n')
                }
                $('.sanzima2').html($(this).val());
                //$('.sanzima2').html($(this).val().replace(/\n/ig,'<br/>'));
                $('.printshow').html($(this).val().replace(/\n/ig,'<br/>'));
            });
            //$(document).on('input','.guige',function(){
            //    var ss=$(this).html();
            //    if(($(this).height()/21)>16){
            //        var ss=$(this).html();
            //    }
            //});
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
            if( $("#save").data("status") ==0){
                Modal.setAlert('请先点击保存按钮！');
                return;
            }
            if($('.guigebuchong').css('border')!='none'){
                var code = '<!DOCTYPE html> <html lang="zh-CN"> <head> <meta charset="UTF-8"> ' +
                    '<meta name="Generator" content="Jeremy"> <meta name="Author" content="Jeremy"> ' +
                    '<meta name="Keywords" content=""> <meta name="Description" content="">' +
                    ' <title>提单确认</title> <style>' + $('style').html() + '</style></head> <body>' +
                    '<div class="container"><div class="td">' + $('.td').html() + '</div></div></body> </html>';

                $.ajax({
                    url: '/api/other/pdf'
                    , type: 'post'
                    , data: {code: code, name: '提单'}
                    , dataType: 'json'
                    , timeout: 100000
                    , success: function (json) {
                        if ('status' in json && json.status == 1) {
                            window.open("/download/pdf");
                        }
                    }
                });
            }
        });
        $(document).on('click', '#down', function () {
            //下载给航空公司
            if( $("#save").data("status") ==0){
                Modal.setAlert('请先点击保存按钮！');
                return;
            }
            //计费重量改为毛重，体积改为实际进仓数据
            var oldzl = $(".jfzl").html();
            var oldSize =  $('.pm').find('span').html();
            $(".jfzl").html($(".zl").html());
            $('.pm').find('span').html($('.pm').find('span').data('z'));
            if($('.guigebuchong').css('border')!='none'){
                var code = '<!DOCTYPE html> <html lang="zh-CN"> <head> <meta charset="UTF-8"> ' +
                    '<meta name="Generator" content="Jeremy"> <meta name="Author" content="Jeremy"> ' +
                    '<meta name="Keywords" content=""> <meta name="Description" content="">' +
                    ' <title>提单确认</title> <style>' + $('style').html() + '</style></head> <body>' +
                    '<div class="container"><div class="td">' + $('.td').html() + '</div></div></body> </html>';

                $.ajax({
                    url: '/api/other/pdf'
                    , type: 'post'
                    , data: {code: code, name: '提单'}
                    , dataType: 'json'
                    , timeout: 100000
                    , success: function (json) {
                        if ('status' in json && json.status == 1) {
                            window.open("/download/pdf");
                            $(".jfzl").html(oldzl);
                            $('.pm').find('span').html(oldSize);
                        }
                    }
                });
            }
        });
        $(document).on('click', '#print', function () {
            if( $("#save").data("status") ==0){
                Modal.setAlert('请先点击保存按钮！');
                return;
            }
            //打印，需要下移增加样式控制，适应纸质打印模板
            var printStyle='<style>p,span,div{font-size:22px}.air-company,.FP{font-size:22px}.wordremark,.jiesuanma textarea,.airlineInfo,.qfrq{font-size:20px}.info-start{top:528px}.to1{top:573px}.to2{top:573px}.info-zz1{top:573px}.info-zz2{top:573px}.info-zz3{top:573px}.info-zz1-cd{top:573px}.CNY{top:573px}.P1{top:573px}.P2{top:573px}.NVD{top:573px}.NVC{top:573px}.mdg{top:628px}.hbh{top:628px}.qfrq{top:628px}.airlineInfo{top:628px}.pm{left:830px}.js{top:831px}.zl{top:831px}.jfzl{top:831px}.dj{top:831px}.yf{top:831px}.unit{top:831px}.unit2{top:831px}.guige{top:824px;left:830px}.guigebuchong{top:858px}.wordremark{top:858px}.pm{top:1174px}.yf2{top:1180px}.zfmx{top:1180px}.sanzima2{top:1344px}.zf{top:1375px}.zj{top:1470px}.btm-info{top:1470px}.foot-yd{top:1550px}</style>'
            var code = '<!DOCTYPE html> <html lang="zh-CN"> <head> <meta charset="UTF-8"> ' +
                '<meta name="Generator" content="Jeremy"> <meta name="Author" content="Jeremy"> ' +
                '<meta name="Keywords" content=""> <meta name="Description" content="">' +
                ' <title>提单确认</title> <style>' + ($('style').html().replace('background: url("http://kybpublic.oss-cn-shanghai.aliyuncs.com/images/img/td.png") no-repeat;', '')) + '</style>'+printStyle+'</head> <body>' +
                '<div class="container"><div class="td">' + $('.td').html() + '</div></div></body> </html>';
            $.ajax({
                url: '/api/other/pdf'
                , type: 'post'
                , data: {code: code, name: '提单'}
                , dataType: 'json'
                , timeout: 100000
                , success: function (json) {
                    if ('status' in json && json.status == 1) {
                        window.open("/download/pdf");
                    }
                }
            });
        });
        $(document).on('click', '.dl-yld', function () {
            var code = '<!DOCTYPE html> <html lang="zh-CN"> <head> <meta charset="UTF-8"> ' +
                '<meta name="Generator" content="Jeremy"> <meta name="Author" content="Jeremy"> ' +
                '<meta name="Keywords" content=""> <meta name="Description" content="">' +
                ' <title>提单确认</title> <style>' + $('style').html() + '</style></head> <body>' +
                $('.container').html() + '</body> </html>';
            $.ajax({
                url: '/api/other/pdf'
                , type: 'post'
                , data: {code: code, name: '预录单'}
                , dataType: 'json'
                , timeout: 100000
                , success: function (json) {
                    if('status' in json && json.status == 1) {
                        window.open("/download/pdf");
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
        //保存提单
        $(document).on('click', '#save', function () {
            if( $(this).data("status") ==1){
                $('.sanzima1').addClass('tt');
                $('.wordremark').attr("style","");
                $('.wordremark').addClass('tt');
                $('.sanzima2').addClass('tt');
                $('.sanzima1').find('input').removeAttr("style");
               // $('.jiesuanma').addClass('tt');
                //$('.jiesuanma').find('texterea').removeAttr("style");
                $('.inputshow').show();
                $('.printshow').hide();

                $('.guige').addClass('tt');
                $('.guigebuchong').addClass('tt');
                $('.jfzl').addClass('tt');
                $(this).html("保存");
                $(this).data("status",0);
                return;
            }
            var _this = this;
            $('.sanzima1').removeClass('tt');
            $('.wordremark').removeClass('tt');
            $('.wordremark').css({'background':'rgba(0,0,0,0)','border':'none'});
            $('.sanzima2').removeClass('tt');
           // $('.jiesuanma').removeClass('tt');
          //  $('.jiesuanma').find('textarea').css({'background':'rgba(0,0,0,0)','border':'none'});
            $('.inputshow').hide();
            $('.printshow').show();
            $('.sanzima1').find('input').css({'background':'rgba(0,0,0,0)','border':'none'});

            $('.guige').removeClass('tt');
            $('.guigebuchong').removeClass('tt');
            $('.jfzl').removeClass('tt');
            var data = {
                "memberId": 0,
                "orderId": $(this).data('id'),
                "SettlementCode1": $('.sanzima1').find('input').val(),
                "SettlementCode2": $('.jiesuanma').find('textarea').val(),
                "SettlementCode3": $('.jiesuanma').find('textarea').val(),
                "BillRemark": $('.wordremark').val().trim(),
                "subNum": $('.zd-t').data('id')||'',
                "chargingWeight" :$('.jfzl').html()
            };
            $.ajax({
                url: '/api/order/detail/ladingSave'
                , type: 'post'
                , data: data
                , dataType: 'json'
                , timeout: 100000
                , success: function (json) {
                    if (json && 'resCode' in json && json.resCode == 0) {
                        Modal.setAlert('保存成功！', null, function () {
                           $(_this).data("status",1);
                            $(_this).html("编辑");
                            //location.reload();
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
            url: '/api/order/detail/tactPrice'
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
    };
    var printInit = function () {

        if($("#save").data("status")==1){
            $('.sanzima1').removeClass('tt');
            $('.wordremark').removeClass('tt');
            $('.wordremark').css({'background':'rgba(0,0,0,0)','border':'none'});
            $('.sanzima2').removeClass('tt');

            //$('.jiesuanma').removeClass('tt');
            //$('.jiesuanma').find('textarea').css({'background':'rgba(0,0,0,0)','border':'none'});
            $('.inputshow').hide();
            $('.printshow').show();
            $('.sanzima1').find('input').css({'background':'rgba(0,0,0,0)','border':'none'});
            $('.guige').removeClass('tt');
            $('.guigebuchong').removeClass('tt');
            $('.jfzl').removeClass('tt');
            $("#save").html("编辑");
        }
        //小数点控制
        var size = myformat.formatvolume($('.pm').find('span').data('z'));
        $('.pm').find('span').data('z',size);
        $('.pm').find('span').html(size);
        $('.zl').html(myformat.formatweight($('.zl').html()));
        $('.jfzl').html(myformat.formatweight($('.jfzl').html()));
    };
    var tactChange = function() {
        var Awc, Myc, Scc;
        Awc = $(".zd-t").data('id') == '' ? 'AWC：' + parseFloat($('.zfmx').data("awc")).toFixed(2) : '';
        //myc计费重量
        Myc = $(".zd-t").data('id') == '' ? 'MYC：' + parseFloat($('.jfzl').html()).toFixed(2) : '';
        //MSC 计费重量乘以0.8
        Scc = $(".zd-t").data('id') == '' ? 'MSC：' + (parseFloat($('.jfzl').html()) * 0.8).toFixed(2) : '';
        $('.zfmx').html(
            (1 ? Awc + '<br/>' : '') +
            (1 ? Myc + '<br/>' : '') +
            (1 ? Scc : '')
        );

        var xx = (parseFloat($('.zfmx').data("awc")) + parseFloat($('.jfzl').html()) + parseFloat($('.jfzl').html()) * 0.8).toFixed(2);
        $('.zf').html($(".zd-t").data('id') == '' ? xx : '');
        if ($('.container').data("sid")) {
            $('.zj').html('');
        } else {
            $('.zj').html((parseFloat($('.yf2').html()) + parseFloat(xx)).toFixed(2));
        }

    }
    $(document).on('input','.jfzl',function(){
        //体积谁小取谁
        var calsize = parseFloat($('.jfzl').html())*0.006;
        $('.pm').find('span').html(calsize > parseFloat($('.pm').find('span').data('z'))?$('.pm').find('span').data('z'):myformat.formatvolume(calsize));
        tactChange();
    });
    var run = function () {
        listener();
        priceInit();
        printInit();
    };
    return {
        run: run
    }
}());
module.exports = Listener;