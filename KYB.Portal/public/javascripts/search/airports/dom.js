/**
 * Created by Auser on 2016/12/7.
 */
"use strict";
var Dom = (function () {
  var list = function (json, param) {
    var str = '';
    if (json && 'resCode' in json && json.resCode == 0 && 'resBody' in json && json.resBody) {
      if ('sList' in json.resBody && json.resBody.sList instanceof Array && json.resBody.sList.length > 0) {
        var body = json.resBody.sList;
        for (var b in body) {
          if (body.hasOwnProperty(b)) {
            str += render(body[b]);
          }
        }
        $('.page-box').html(' ');
        //加载分页器
        $.burster($(".page-box"), param.offset || 0, json.resBody.totalCount, 5, param.limit || 20);
      } else {
        str = '<tr class="wrong-msg"><td colspan="10">没有搜索到该机场</td></tr>';
        $('.page-box').html(' ');
      }
    } else {
      str = '<tr class="wrong-msg"><td colspan="10">获取列表失败，<a href="">请刷新重试</a>！</td></tr>';
      $('.page-box').html(' ');
    }
    $('tbody').html(str);
    function render(d) {
      return ' <tr> <td>' + d.airportCode + '</td><td>' + d.airportName + '</td><td>' + (d.airportAlias || '/') + '</td>' +
        '<td>' + d.airportCity + '</td><td>' + d.airportCountry + '</td><td>' + d.airportCountryCode + '</td>' +
        '<td>' + d.airportDST + '</td><td>' + d.airportLon + '</td><td>' + d.airportLat + '</td><td>' + d.airportAlt + 'ft</td>' +
        ' </tr>'
    }
  };
  return {
    list: list
  }
}());
module.exports.Dom = Dom;