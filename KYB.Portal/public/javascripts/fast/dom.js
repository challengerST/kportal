/**
 * Created by Auser on 2016/11/29.
 */
"use strict";
var Dom = (function () {
  var renderTr = function (json) {
    var str = '';
    for (var j in json) {
      if (json.hasOwnProperty(j)) {
        var d = json[j];
        str += '<tr> <td>' + j + '</td> <td class="end-body"> ' + render(d) + '</td></tr>';
      }
    }
    $('.info-table tbody').html(str);
    function render(arr) {
      var str = '';
      for (var a in arr) {
        if (arr.hasOwnProperty(a)) {
          var d = arr[a];
          str += '<span class="sg-end" data-val="' + d.airwayId + '">' + d.destPortCode + '</span>';
        }
      }
      return str;
    }
  };
  return {
    renderTr: renderTr
  }
}());
module.exports.Dom = Dom;