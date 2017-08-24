/**
 * Created by Auser on 2016/11/29.
 */
"use strict";
var Dom = (function () {
    var airline = function (data, param) {
        var str = '';
        if (data && 'resCode' in data && data.resCode == 0) {
            var json = data.resBody;
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
                , p = d.airwayPrice.rate[0].policy;
            for (var t in d.transPort) {
                if (d.transPort.hasOwnProperty(t)) {
                    var dt = d.transPort[t];
                    str += dt['portCode'] + (t == d.transPort.length - 1 ? '' : ' -> ');
                }
            }
            return '<div class="tb-tr">' + (d.isHot ? '<i class="tuijian"></i>' : '') + '<div class="top"><div class="al-com fl-l tb-td"><div class="city fl-l">' +
                '<span class="dp-b ta-r">' + d['deptNode']['portCode'] + '</span><span class="dp-b ta-r">' + (d['deptNode']['portNameCn'] || '/') + '</span><span class="dp-b ta-r">' + d['deptNode']['portName'] + '</span></div>' +
                '<div class="air-info fl-l"><span class="dp-b">' + d['airCompanyCode'] + '</span><span class="dp-b border"></span><span class="dp-b">' + (d['airCompanyName'] || '/') + '</span></div>' +
                '<div class="city fl-l"> <span class="dp-b ta-l">' + d['destNode']['portCode'] + '</span> <span class="dp-b ta-l">' + (d['destNode']['portNameCn'] || '/') + '</span><span class="dp-b ta-l">' + d['destNode']['portName'] + '</span> </div></div>' +
                '<div class="al-info fl-l tb-td"> <p> ' + str + ' </p> ' +
                '<p class="weekday"><span class="' + (d['flightDay'].indexOf(1) >= 0 ? 'active' : '') + '">一</span>' +
                '<span class="' + (d['flightDay'].indexOf(2) >= 0 ? 'active' : '') + '">二</span><span class="' + (d['flightDay'].indexOf(3) >= 0 ? 'active' : '') + '">三</span>' +
                '<span class="' + (d['flightDay'].indexOf(4) >= 0 ? 'active' : '') + '">四</span><span class="' + (d['flightDay'].indexOf(5) >= 0 ? 'active' : '') + '">五</span>' +
                '<span class="' + (d['flightDay'].indexOf(6) >= 0 ? 'active' : '') + '">六</span><span class="' + (d['flightDay'].indexOf(7) >= 0 ? 'active' : '') + '">日</span></p> </div>' +
                '<div class="minWeight fl-l tb-td ta-r">' + (d.airwayPrice.rate[0].min ? d.airwayPrice.rate[0].min.toFixed(2) : '/') + '</div> ' +
                '<div class="weight fl-l tb-td ta-r">' + (p['45'] ? p['45'].toFixed(2) : '/') + '</div> ' +
                '<div class="weight fl-l tb-td ta-r">' + (p['100'] ? p['100'].toFixed(2) : '/') + '</div> ' +
                '<div class="weight fl-l tb-td ta-r">' + (p['300'] ? p['300'].toFixed(2) : '/') + '</div> ' +
                '<div class="weight fl-l tb-td ta-r">' + (p['500'] ? p['500'].toFixed(2) : '/') + '</div> ' +
                '<div class="weight fl-l tb-td ta-r">' + (p['1000'] ? p['1000'].toFixed(2) : '/') + '</div>' +
                '<div class="tdtime fl-l tb-td ta-r">' + new Date(d.validEnd).Format('yyyy-MM-dd') + '</div>' +
                '<div class="operate fl-l tb-td">' +
                ' <a href="/order/entrust?h=' + str + '&d=' + (d.flightDay.join(',')) + '&id=' + d.airwayId + '&s=' + d.deptPortCode + '&e=' + d.destPortCode + '&c=' + d.airCompanyCode + '" class="dp-b fl-l order-line blue-btn">订舱</a> ' +
                '</div> </div><div class="bottom"><span class="fl-r">备注：' + (d.remarks || '/') + '</span></div></div>'
        }
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