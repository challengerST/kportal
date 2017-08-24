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
        str = '<tr class="wrong-msg"><td colspan="9">该员工暂无订单！</td></tr>';
        $('.page-box').html(' ');
      }
    } else {
      str = '<tr class="wrong-msg"><td colspan="9">获取列表失败，<a href="">请刷新重试</a>！</td></tr>';
      $('.page-box').html(' ');
    }
    $('tbody').html(str);
    function render(d) {
      var state = '';
      switch (d.orderState) {
        case 0:
          state = '新订单，未确认';
          break;
        case 1:
          state = '已确认订单';
          break;
        case 2:
          state = '进行中';
          break;
        case 3:
          state = '已结束';
          break;
        case 4:
          state = '已制单';
          break;
        case -1:
          state = '已取消（无费用）';
          break;
        case -2:
          state = '已取消（有费用）';
          break;
      }
      return '<tr> <td><input type="checkbox" name="sg" data-id="' + d.orderId + '"/></td> <td>' + d.orderId + '</td>' +
        ' <td>' + new Date(d.flightDate).Format('yyyy-MM-dd') + '</td> <td>' + d.deptPortCode + '</td> ' +
        '<td>' + d.destPortCode + '</td> <td>' + d.cargoName + '</td>' +
        ' <td>' + state + '</td> <td><a href="/order/detail?id=' + d.orderId + '">详情</a></td> </tr>'
    }
  };
  return {
    list: list
  }
}());
module.exports.Dom = Dom;