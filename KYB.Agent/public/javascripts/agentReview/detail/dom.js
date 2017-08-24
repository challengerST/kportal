/**
 * Created by Administrator on 2017/7/17.
 */
var Dom = (function () {
    var list = function (json) {
        var obj = {};
        var str = '';
        if (json && 'resCode' in json && json.resCode == 0 && 'resBody' in json && json.resBody) {
            if ('sList' in json.resBody && json.resBody.sList instanceof Array && json.resBody.sList.length > 0) {
                var body = json.resBody.sList;
                for (var b in body) {
                    if (body.hasOwnProperty(b)) {
                        obj[body[b].invoiceId] = body[b];
                        str += render(body[b]);
                    }
                }
            } else {
                str = '<tr class="wrong-msg"><td colspan="6">暂无开票资料，新添加！</td></tr>';
            }
        } else {
            str = '<tr class="wrong-msg"><td colspan="6">获取列表失败，<a href="">请刷新重试</a>！</td></tr>';
        }
        $('tbody').html(str);
        return obj;
        function render(d) {
            return '<tr><td>' + (d.invoiceType == 1 ? '普票' : '增票') + '</td> <td>' + d.invoiceTitle + '</td> <td>' + (d.invoiceTaxNum || '-') + '</td> <td>' + (d.invoiceBank || '-') + '</td>'
                + '<td>' + (d.invoiceAddress || '-') + '</td> <td>' + (d.invoiceTel || '-') + '</td>' +
               /* '<td><a class="change-btn" data-id="' + d.invoiceId + '">修改</a><a class="delete-btn" data-id="' + d.invoiceId + '">删除</a></td>' +*/
                '</tr>'
        }
    };
    return {
        list: list
    }
}());
module.exports.Dom = Dom;