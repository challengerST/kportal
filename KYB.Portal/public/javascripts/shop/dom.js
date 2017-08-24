/**
 * Created by Auser on 2016/11/29.
 */
"use strict";
var Dom = (function () {
    var airline = function (data, param) {
        var str = '';
        if (data && 'resCode' in data && data.resCode == 0) {
            $('.companyInfo').data('id',data.resBody.freightCompany.companyId);
            $('.companyInfo').html(data.resBody.freightCompany.companyName);
            $('.shopCollect').data('status',data.resBody.isMyFavourite);
            $('.shop-box').find('.searchDeport').css('float','right');
            if(data.resBody.freightCompany.companyId == $('.shopCollect').find('em').data('companyid')){
                $('.shopCollect').hide();
            }
            if(data.resBody.isMyFavourite)$('.shopCollect').find('em').css('color','rgb(230, 76, 123)');
            var json = data.resBody.AirwayList;
            $('#start-txt').html(param.s);
            $('#end-txt').html(param.e);
            if ('sList' in json && json.sList instanceof Array && json.sList.length > 0) {
                var list = json.sList;
                for (var l in list) {
                    if (list.hasOwnProperty(l)) {
                        var obj = list[l];
                        str += render(obj, param);
                    }
                }
                $('#sum').html(json.totalCount);
                //加载分页器
                $.burster($(".page-box"), param.offset || 0, json.totalCount, 5, param.limit || 10);
            } else {
                str = '<div class="tb-wrong"><p class="wrong-msg">暂时没有您搜索的航线信息</p></div>';
                $('.page-box').html('');
                $('#sum').html(0);
            }
        } else {
            str = '<div class="tb-wrong"><p class="wrong-msg">您搜索的航班信息出错，<a href="javascript:void(0);" class="reload">请重试</a></p></div>';
            $('.page-box').html('');
            $('#sum').html(0);
        }
        $('.table-body').html(str);
        function render(d, dt) {
            var str = ''
                , p = d.airwayPrice.rate[0].policy, zz,
                zZ, pNs;
            for (var t in d.transPort) {
                if (d.transPort.hasOwnProperty(t)) {
                    var dt = d.transPort[t];
                    str += dt['portCode'] + (t == d.transPort.length - 1 ? '' : ' -> ');
                    zz = d.transPort.length > 2 ? '中转' : '直达';
                }
            }
            if (d.domesticTransPort || (d.domesticTransPort && d.overseaTransPort)) {
                zZ = d.domesticTransPort;
            } else if (d.overseaTransPort) {
                zZ = d.overseaTransPort;
            } else if (d.domesticTransPort == '' && d.overseaTransPort == '') {
                zZ = '/';
            }
            if (d.transPort.length > 2) {
                if (d['transPort'][1]['portNameCn']) {
                    pNs = d['transPort'][1]['portNameCn'];
                } else if (d['transPort'][1]['portName']) {
                    pNs = d['transPort'][1]['portName'];
                }
            }
            var tt;
            if (d['flightDay'].length < 7 && d['flightDay'].length > 0) {
                tt= '<span class="' + (d['flightDay'].indexOf(1) >= 0 ? 'dp-ib' : 'dp-n') + '">周一</span>' +
                    '<span class="' + (d['flightDay'].indexOf(2) >= 0 ? 'dp-ib' : 'dp-n') + '">周二</span><span class="' + (d['flightDay'].indexOf(3) >= 0 ? 'dp-ib' : 'dp-n') + '">周三</span>' +
                    '<span class="' + (d['flightDay'].indexOf(4) >= 0 ? 'dp-ib' : 'dp-n') + '">周四</span><span class="' + (d['flightDay'].indexOf(5) >= 0 ? 'dp-ib' : 'dp-n') + '">周五</span>' +
                    '<span class="' + (d['flightDay'].indexOf(6) >= 0 ? 'dp-ib' : 'dp-n') + '">周六</span><span class="' + (d['flightDay'].indexOf(7) >= 0 ? 'dp-ib' : 'dp-n') + '">周日</span>'
            } else if (d['flightDay'].length >= 7) {
                tt = '<span>一周七天</span>'
            } else if (d['flightDay'].length == 0) {
                tt = '<span>暂无航程</span>'
            }
            var remarks=d['remarks']?d['remarks']:'' ;

            var limitRemarks=d['limtRemark']?d['limtRemark']:'';
            //3u
            //<span class="dp-b">' + d['airCompanyCode'] + '</span>
            //简写
            //<span class="dp-b">' + (d['airCompanyName'] || '/') + '</span>
            return '<div class="tb-tr">' + (d.isHot ? '<i class="tuijian iconfont icon-icon_tjlx"></i>' : '') + '<div class="top"><div class="al-com fl-l tb-td">' +
                '<div class="shop_airheaderInfo"><img src="/images/airline/' + d.airCompanyCode + '.png" /><span>' + d['airCompanyCode'] + '</span> <span class="">' + (d['airCompanyName'] || '/') + '</span></div>' +
                '<div class="city fl-l">' +
                '<span class="dp-b ta-r">' + d['deptNode']['portCode'] + '</span><span class="dp-b ta-r">' + (d['deptNode']['portNameCn'] || d['deptNode']['portName']) + '</span></div>' +
                '<div class="air-info fl-l fill"><em class=""></em><span>' + zz + '</span><em class=""></em></div>' +
                '<div class="city fl-r"> <span class="dp-b ta-l">' + d['destNode']['portCode'] + '</span> <span class="dp-b ta-l">' + (d['destNode']['portNameCn'] || d['destNode']['portName']) + '</span></div></div>' +
                '<div class="al-status al-statusInfo fl-l tb-td"><p>' + zZ + '/' + d.enduranceTime + '天</p><p style="color:#657592;font-size:12px;margin-top:2px;" class="zZ">' + (pNs == undefined ? '/' : pNs) + '</p></div>' +
                '<div class="al-info fl-l tb-td"> ' +
                //'<p> ' + str + ' </p> ' +
                '<p class="weekday">'+tt+'</p> </div>' +
                '<div class="tdtime fl-l tb-td ta-r">' + new Date(d.validEnd).Format('yyyy-MM-dd') + '</div>' +
                '<div class="minWeight fl-l tb-td ta-r">' + (d.airwayPrice.rate[0].min ? d.airwayPrice.rate[0].min.toFixed(2) : '/') + '</div> ' +
                '<div class="weight fl-l tb-td ta-r" style="">' + (p['45'] ? p['45'].toFixed(2) : '/') + '</div> ' +
                '<div class="weight fl-l tb-td ta-r">' + (p['100'] ? p['100'].toFixed(2) : '/') + '</div> ' +
                '<div class="weight fl-l tb-td ta-r">' + (p['300'] ? p['300'].toFixed(2) : '/') + '</div> ' +
                '<div class="weight fl-l tb-td ta-r">' + (p['500'] ? p['500'].toFixed(2) : '/') + '</div> ' +
                '<div class="weight fl-l tb-td ta-r">' + (p['1000'] ? p['1000'].toFixed(2) : '/') + '</div>' +
                '<div class="operate fl-l tb-td fill">' +
                ' <a href="/order/entrust?h=' + str + '&d=' + (d.flightDay.join(',')) + '&id=' + d.airwayId + '&s=' + d.deptPortCode + '&e=' + d.destPortCode + '&c=' + d.airCompanyCode + '" class="dp-b fl-l order-line blue-btn" style="margin-left:30px;width:76px;height:28px;line-height:28px;border-radius:4px;background:#006bbc;font-size:12px;">订舱</a>' +
                '<a href="javascript:void(0)" class="fl-l dp-b shop_orderMustsee" id="" style="width:100%;margin-top:8px;font-size:12px;color:#006bbc;">下单必看</a>' +
                '</div>' + '<div class="tipWithBorder"><div><h6>备注</h6><p>'+remarks+'</p>' +
                '</div><div><h6>航线限制条件</h6><p>'+limitRemarks+'</p>' +
                '</div><div class="tipArrow"></div></div>' + '</div></div>';
        }
        $('.shop_orderMustsee').hover(function () {
            $(this).parent().siblings('.tipWithBorder').show();
        }, function () {
            $(this).parent().siblings('.tipWithBorder').hide();
        });
    };
    var renderLi = function (json, ele, sel) {
        var str = '';
        for (var j in json) {
            if (json.hasOwnProperty(j)) {
                var d = json[j]
                    , innerStr;
                if (sel == 1) {
                    innerStr = (d.AirportCnname ? d.AirportCnname : '') + (d.AirportCnname ? '-' : '') + d.ThreeCode;
                } else {
                    innerStr = (d.Name ? d.Name : '') + (d.Name ? '-' : '') + d.Code;
                }
                str += '<li>' + innerStr + '</li>'
            }
        }
        ele.html(str);
    };
    return {
        airline: airline
        , renderLi: renderLi
    }
}());
module.exports.Dom = Dom;