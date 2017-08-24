/**
 * Created by Auser on 2016/12/7.
 */
"use strict";
require('../frame/burster');
var Dom = (function () {
  var list = function (json, ele, param) {
    var str = '';
    if (json && 'resCode' in json && json.resCode == 0 && 'resBody' in json && json.resBody && 'sList' in json.resBody) {
      if (json.resBody.sList instanceof Array && json.resBody.sList.length > 0) {
        var body = json.resBody.sList;
        for (var b in body) {
          if (body.hasOwnProperty(b)) {
            str += render(body[b]);
          }
        }
        $.burster($(".page-box"), param.offset || 0, json.resBody.totalCount || 0, 5, param.limit || 10);
      } else {
        str = '<tr class="wrong-msg"><td colspan="7">暂无此类消息</td></tr>';
        $('.page-box').html('');
      }
    } else {
      str = '<tr class="wrong-msg"><td colspan="7">获取列表失败，<a href="">请刷新重试</a>！</td></tr>';
      $('.page-box').html('');
    }
    ele.find('tbody').html(str);
    function render(d) {
      var type;
      switch (d.messageType) {
        case 10:
          type = '系统消息';
          break;
        case 20:
          type = '订单消息';
          break;
        case 30:
          type = '账单消息';
          break;
        case 40:
          type = '发票消息';
          break;
      }
      return '<tr> <td><input type="checkbox" name="tb-sel" data-id="' + d.Id + '"></td> ' +
        '<td><a href="/vip/note/detail?id=' + d.Id + '">' + (d.messageTitle || '无标题') + '</a></td> ' +
        '<td>' + new Date(d.createDt).Format('yyyy-MM-dd hh:mm:ss') + '</td> <td>' + type + '</td> </tr>'
    }
  };
  return {
    list: list
  }
}());
module.exports.Dom = Dom;