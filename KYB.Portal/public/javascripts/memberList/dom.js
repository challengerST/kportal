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
        //加载分页器
        $.burster($(".page-box"), param.offset || 0, json.resBody.totalCount, 5, param.limit || 20);
      } else {
        str = '<tr class="wrong-msg"><td colspan="9">暂无员工，请添加！</td></tr>';
        $('.page-box').html(' ');
      }
    } else {
      str = '<tr class="wrong-msg"><td colspan="9">获取列表失败，<a href="">请刷新重试</a>！</td></tr>';
      $('.page-box').html(' ');
    }
    $('tbody').html(str);
    function render(d) {
      var m = d.member || {}
        , r = d.role || {};
      return ' <tr> <td><input type="checkbox" name="sg" data-id="' + m.memberId + '"/></td> ' +
        '<td>' + (m.name || '/') + '</td> <td>' + r.roleName + '</td>' +
        ' <td>' + (m.mobile || '/') + '</td> <td>' + (m.email || '/') + '</td>' +
        ' <td>' + (m.memberState == 1 ? '已启用' : '已禁用') + '</td> <td><a href="/vip/member/detail?id=' + m.memberId + '">详情</a></td> </tr>'
    }
  };
  return {
    list: list
  }
}());
module.exports.Dom = Dom;