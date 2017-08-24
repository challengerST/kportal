/**
 * Created by Auser on 2016/12/7.
 */
"use strict";
var Dom = (function () {
  var renderGp = function (data) {
    var str = '';
    if (data && 'resCode' in data && data.resCode == 0) {
      var json = data.resBody;
      if ('sList' in json && json.sList instanceof Array && json.sList.length > 0) {
        var list = json.sList;
        for (var l in list) {
          if (list.hasOwnProperty(l)) {
            var obj = list[l];
            str += render(obj);
          }
        }
        $('.gp-num').html('根据您的改配信息我们为您推荐 ' + list.length + ' 条航线，结果： ');
      } else {
        str = '<tr><td colspan="8">暂时没有您搜索的航线信息</td></tr>';
        $('.gp-num').html('根据您的改配信息我们为您推荐 0 条航线，结果： ');
      }
    } else {
      str = '<tr><td colspan="8">暂时没有您搜索的航线信息</td></tr>';
      $('.gp-num').html('根据您的改配信息我们为您推荐 0 条航线，结果： ');
    }
    $('.ctb-body tbody').html(str);
    function render(d) {
      var str = '';
      var arr = d.transPort || [];
      for (var a in arr) {
        if (arr.hasOwnProperty(a)) {
          str += arr[a].portCode + (a == arr.length - 1 ? '' : ' -> ')
        }
      }
      return '<tr> <td><input type="radio" name="gp-sg" data-id="' + d.airwayId + '"/></td> <td>' +
        ' <div class="port"> <span class="s">' + d.deptNode.portCode + '</span> <span>' + d.deptNode.portName + '</span>' +
        ' </div> <div class="logo"> <span class="top"></span> <span class="c">' + d.airCompanyCode + '</span> ' +
        '</div> <div class="port"> <span class="e">' + d.destNode.portCode + '</span> <span>' + d.destNode.portName + '</span> </div>' +
        ' </td> <td> <div class="lg"> ' + (str || '/') + '</div> <div class="days"> ' +
        '<span class="' + (d.flightDay.indexOf(1) >= 0 ? 'active' : '') + '">一</span> ' +
        '<span class="' + (d.flightDay.indexOf(2) >= 0 ? 'active' : '') + '">二</span> <span class="' + (d.flightDay.indexOf(3) >= 0 ? 'active' : '') + '">三</span> ' +
        '<span class="' + (d.flightDay.indexOf(4) >= 0 ? 'active' : '') + '">四</span> <span class="' + (d.flightDay.indexOf(5) >= 0 ? 'active' : '') + '">五</span> <span class="' + (d.flightDay.indexOf(6) >= 0 ? 'active' : '') + '">六</span>' +
        ' <span class="' + (d.flightDay.indexOf(7) >= 0 ? 'active' : '') + '">日</span> </div> </td>' +
        ' <td class="font-red">' + d.airwayPrice.rate[0].policy['45'] + '</td> <td class="font-red">' + d.airwayPrice.rate[0].policy['100'] + '</td>' +
        ' <td class="font-red">' + d.airwayPrice.rate[0].policy['300'] + '</td> <td class="font-red">' + d.airwayPrice.rate[0].policy['500'] + '</td> <td class="font-red">' + d.airwayPrice.rate[0].policy['1000'] + '</td> </tr>'
    }
  };
  var recommend = function (data) {
    var str = ''
      , num;
    if (data && 'resCode' in data && data.resCode == 0 && 'resBody' in data) {
      if ('list' in data.resBody && data.resBody.list instanceof Array && data.resBody.list.length > 0) {
        var list = data.resBody.list;
        for (var l in list) {
          if (list.hasOwnProperty(l)) {
            str += rend(list[l]);
          }
        }
        num = list.length;
      } else {
        str = '<tr class="wrong-msg"><td colspan="7">暂时没有本订单的推荐航线！</td></tr>';
        num = 0;
      }
    } else {
      str = '<tr class="wrong-msg"><td colspan="7">获取推荐航线失败，<a href="">请刷新重试</a>！</td></tr>';
      num = 0;
    }
    $('.rc-box').find('tbody').html(str);
    $('.rc-sum').html(num);
    function rend(d) {
      return '<tr><td>' + (d.AircompaName + d.FlightNo) + '</td>' +
        '<td>' + (d.OriginPort + d.OriginPortCode + '-' + d.Destport + d.DestportCode) + '</td>' +
        '<td>' + (d.IsDirect ? '直达' : '中转') + '</td>' +
        '<td>' + d.FlightTime + '</td>' +
        '<td>2016-08-12 12:30</td>' +
        '<td>CNY 20393.30</td>' +
        '<td><input type="radio" name="recommend"/></td></tr>'
    };
  };
  return {
    renderGp: renderGp
    , recommend: recommend
  }
}());
module.exports.Dom = Dom;