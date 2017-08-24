/**
 * Created by Auser on 2016/11/29.
 */
"use strict";
var Dom = (function () {
  var renderLi = function (json, ele, sel) {
    var str = '';
    for (var j in json) {
      if (json.hasOwnProperty(j)) {
        var d = json[j]
          , innerStr
          , value;
        if (sel == 1) {
          innerStr = d.displayName;
          value = d.airportCode;
        } else {
          innerStr = (d.Name ? d.Name : '') + (d.Name ? '-' : '') + d.Code;
        }
        str += '<li data-val="' + value + '">' + innerStr + '</li>'
      }
    }
    ele.html(str);
  };
  var renderNews = function (data, type) {
    var str = '';
    if (data && 'resCode' in data && data.resCode == 0) {
      if ('resBody' in data && data.resBody && 'sList' in data.resBody && data.resBody.sList instanceof Array && data.resBody.sList.length > 0) {
        var body = data.resBody.sList;
        for (var b in body) {
          if (body.hasOwnProperty(b)) {
            var d = body[b];
            var sp = type == 10 ? new Date(d.modifyDt).Format('yyyy-MM-dd') : 0;//fixme 数据暂无阅读量  数据库增加字段
            var cl = type == 10 ? '' : 'qa-img';
            str += '<p class="sg-new"><a href="home/news/detail?id=' + d.Id + '">' + d.newsTitle + '</a><span class="' + cl + '">' + sp + '</span></p>'
          }
        }
      } else {
        str = type == 10 ? '<div class="wrong">暂无新闻！</div>' :'<div class="wrong">暂无常见问题！</div>' ;
      }
    } else {
      str = '<div class="wrong">获取出错，<a href="">请重试</a>！</div>';
    }
    $(type == 10 ? '.dynamic-body' : '.common-body').html(str);
  };
  return {
    renderLi: renderLi
    , renderNews: renderNews
  }
}());
module.exports.Dom = Dom;