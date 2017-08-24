/**
 * Created by Auser on 2016/11/29.
 */
"use strict";
var Dom = (function () {
  var renderTr = function (json) {
    var str = '';
    for (var j in json) {
      if (json.hasOwnProperty(j)) {
        var d = json[j], data;
        data = render(d, j);
        str += ' <button class="collapse-btn" data-toggle="collapse" data-target="' + (j ? j : 'null') + '"> <span class="big dp-b fl-l">' + (j ? j : '直达') + '</span> <span class="big dp-b fl-l">' + (j ? '中转' : '') + '</span> <span class="dp-b fl-l">（' + data.n + '个目的港）</span> <span class="dp-b fl-r open">' + (j ? '+展开' : '-折叠') + '</span> </button>'
        str += data.str;
      }
    }
    $('.step4').find('.bd').html(str);
    function render(arr, j) {
      var str = '', n = 0;
      str += ' <div class="end-body collapse fill' + (j ? '' : ' in') + '" id="' + (j ? j : 'null') + '">';

      for (var a in arr) {
        if (arr.hasOwnProperty(a)) {
          var data = arr[a];
          str += '<div class="part fill' + (a ? ' add' : '') + '">';
          str += a ? '<div class="lf"><span>' + a + '</span></div>' : '';
          str += '<div class="rt fill">';
          for (var b in data) {
            if (data.hasOwnProperty(b)) {
              n += 1;
              var d = data[b];
              str += '<span class="sg-end" data-limit="' + d.flightDay.join(',') + '" data-val="' + d.airwayId + '">' + d.destPortCode + '</span>';
            }
          }

          str += '</div></div>';
        }
      }

      str += '</div>';
      return {
        str: str
        , n: n
      };
    }
  };
  return {
    renderTr: renderTr
  }
}());
module.exports.Dom = Dom;