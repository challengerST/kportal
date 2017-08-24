/**
 * Created by Auser on 2016/11/29.
 */
"use strict";
var url = require('../frame/function').url;
var Data = require('./data').Data;
var Modal = require('../frame/modal');
var Dom = (function () {
    var favouriteShop = function (data, param) {
        var str = '';
        if (data && 'resCode' in data && data.resCode == 0){
            var json = data.resBody.sList;
            console.log(json.length);
            for (var i = 0; i < json.length; i++) {
                var company = json[i].freightCompany;
                var list = json[i].airwayList;
                //这里渲染店铺信息
                str += '<div class="container sac_agentCompany fill">' +
                        //遮罩层
                    '<div style="position:relative;width:100%;height:100%;">' +
                    '<div class="bcover">' +
                    '<div class="tl5">' +
                    '<p style="font-size:24px;">确定删除该店铺?</p>' +
                    '<a href="javascript:void(0)" class="sac_cancle">取消</a>' +
                    '<a href="javascript:void(0)" class="sac_ensure active">确定</a>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="sac_boss fl-l">' +
                    '<p style="margin-bottom:17px;"><img src="images/logo-m.png" alt="" style=""></p>' +
                    '<p class="sac_agentName">' + company['companyName'] + '</p>' +
                    '<p class="sac_shopIndex" data-id="' + json[i]['freightCompany']['companyId'] + '"><em class="iconfont icon-shouye"></em> <span>店铺首页</span></p>' +
                    '<p class="sac_shopDelete"><em class="iconfont icon-105"></em> <span>删除店铺</span></p>' +
                    '<p class="sac_shopUp"><em class="iconfont icon-1"></em> <span>向上移动</span></p>' +
                    '</div>' +
                    '<div class="fl-l sac_main">' +
                    '<div class="sac_lastestPrice">' +
                    '<a href="javascript:void(0)">最新价格</a>' +
                    '</div>' +
                    '<div class="fill">';
                //遮罩层结束
                if ('airwayList' in json[i] && json[i].airwayList instanceof Array && json[i].airwayList.length > 0) {
                    for (var l in list) {
                        if (list.hasOwnProperty(l)) {
                            //渲染航线信息
                            var obj = list[l];
                            str += render(obj, param);
                        }
                    }
                    str += '</div></div></div>';
                    $('#sum').html(json.totalCount);
                    //加载分页器
                    $.burster($(".page-box"), param.offset || 0, json.totalCount, 5, param.limit || 10);
                }else{
                    str += '</div></div></div>';
                    $('#sum').html(json.totalCount);
                    //加载分页器
                    $.burster($(".page-box"), param.offset || 0, json.totalCount, 5, param.limit || 10);
                }
            }
            if (json.length == 0) {
                str = '<div class="container sac_wrong"><div class="tb-wrong"><p class="wrong-msg">暂时没有您搜索的航线信息</p></div></div>';
                $('.page-box').html('');
                $('#sum').html(0);
            }
        }else{
            str = '<div class="container sac_wrong"><div class="tb-wrong"><p class="wrong-msg">出错，<a href="javascript:void(0);" class="reload">请重试</a></p></div></div>';
            $('.page-box').html('');
            $('#sum').html(0);
        }
        $('.sac_table').html(str);
        $('.bcover').css('height', ($('.sac_agentCompany').height() + 44) + 'px');
        $('.sac_cancle').click(function () {
            $(this).parent().parent().hide();
        });
        $('.sac_remark').click(function () {
            $(this).parent().siblings('.tipWithBorder').toggle();
        });
        $('.sac_agentCompany').on('click', '.sac_shopDelete', function () {
            $(this).parents('.sac_agentCompany').find('.bcover').show();
        });
        $('.sac_agentCompany').on('click', '.sac_shopIndex', function () {
            console.log($(this).parents('.sac_agentCompany').data('id'));
            window.location.href = "./shop/" + $(this).data('id')
        });

        $('.sac_agentCompany').on('click', '.sac_ensure', function () {
            var data = {
                "freightCompanyId": $(this).parents('.sac_agentCompany').find('.sac_shopIndex').data('id')
            };
            var _this = this;
            Data.favouriteRemove(data, function (json) {
                if (json && 'resCode' in json && json.resCode ==0) {
                    $(_this).parents('.sac_agentCompany').remove();
                    if($('.sac_table').find('.sac_agentCompany').length ==0){
                        $('.sac_table').html('<div class="container sac_wrong"><div class="tb-wrong"><p class="wrong-msg">暂时没有您搜索的航线信息</p></div></div>');
                    }
                } else {
                        Modal.setAlert('删除失败!');
                }
            });
        });
        function render(d, dt) {
            var zz;
            for (var t in d['transPort']) {
                if (d['transPort'].hasOwnProperty(t)) {
                    zz = d['transPort'].length > 2 ? '中转' : '直达';
                }
            }
            var hc = '';
            if (d['flightDay'].length < 7 && d['flightDay'].length > 0) {
                hc = '<span>周</span><span class="' + (d['flightDay'].indexOf(1) >= 0 ? 'dp-ib' : 'dp-n') + '">一</span>' +
                    '<span class="' + (d['flightDay'].indexOf(2) >= 0 ? 'dp-ib' : 'dp-n') + '">二</span><span class="' + (d['flightDay'].indexOf(3) >= 0 ? 'dp-ib' : 'dp-n') + '">三</span>' +
                    '<span class="' + (d['flightDay'].indexOf(4) >= 0 ? 'dp-ib' : 'dp-n') + '">四</span><span class="' + (d['flightDay'].indexOf(5) >= 0 ? 'dp-ib' : 'dp-n') + '">五</span>' +
                    '<span class="' + (d['flightDay'].indexOf(6) >= 0 ? 'dp-ib' : 'dp-n') + '">六</span><span class="' + (d['flightDay'].indexOf(7) >= 0 ? 'dp-ib' : 'dp-n') + '">日</span>'
            } else if (d['flightDay'].length >= 7) {
                hc = '<span>一周七天</span>'
            } else if (d['flightDay'].length == 0) {
                hc = '<span>暂无航程</span>'
            }
            var remarks = d['remarks'] ? d['remarks'] : '';
            var limitRemark = d['limtRemark'] ? d['limtRemark'] : '';
            return '<div class="fl-l sac_destail">' +
//success
                '<div class="sac_destailHeader">' +
                '<p class="fl-l">' +
                '<img src="images/airline/1A.png" alt="" style="width:26px;height:26px;margin-bottom:3px;">' +
                '</p>' +
                '<span class="fl-l" style="margin:0 4px;">' + d['airCompanyCode'] + '</span>' +
                '<span class="fl-l">' + d['airCompanyName'] + '</span>' +
                '<span class="sac_remark fl-r iconfont icon-ellipsis"></span>' +
                '</div>' +
//success
                '<div class="sac_destailBody">' +
                '<div class="sac_airlinInfo">' +
                '<span>PVG</span><span class="transline"></span><span class="cc">' + zz + '</span><span class="transline"></span><span>SFO</span>' +
                '</div>' +
                '<div class="sac_destailDate">' +
                '<p>' +
                '<span>截止日期</span><span class="sac_value sac_endTime">' + new Date(d['validEnd']).Format('yyyy-MM-dd') + '</span>' +
                '</p>' +
                '<div class="fill"><div class="fl-l" style="color: #657592;margin-bottom:16px;">头程航班</div><div class="fl-l sac_value sac_circle">' + hc + '</div></div>' +
                '<p class="sac_currency" style="text-align:right;">' +
                '<span class="currency">CNY</span><span class="sac_discountPrice">' + (d['airwayPrice']['rate'][0]['policy']['45']).toFixed(1) + '</span><span>起</span>' +
                '</p>' +
                '</div>' +
                '<div class="fill sac_operate">' +
                '<span class="seeDetail fl-l" style="color:#006bbc">查看详情</span>' +
                '<span class="book fl-r">订舱</span>' +
                '</div>' +
                '</div>' +
                    //success
                '<div class="tipWithBorder" style="display: none;width:216px;top:32px;right:0">' +
                '<div><h6>备注</h6>' +
                '<p>' + remarks + '</p>' +
                '</div>' +
                '<div><h6>航线限制条件</h6>' +
                '<p>' + limitRemark + '</p>' +
                '</div>' +
                '<div class="tipArrow"></div>' +
                '</div>' +

                '</div>'
        }
    };
    return {
        favouriteShop: favouriteShop
    }
}());
module.exports.Dom = Dom;