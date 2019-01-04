

// const echarts = equire([
//   'line',
//   'tooltip',
//   'pie',
//   'legend',
//   'series'
// ])

// export default echarts


var _echarts = require("./lib/echarts");

(function () {
  for (var key in _echarts) {
    if (_echarts == null || !_echarts.hasOwnProperty(key) || key === 'default' || key === '__esModule') return;
    exports[key] = _echarts[key];
  }
})();

var _export = require("./lib/export");

(function () {
  for (var key in _export) {
    if (_export == null || !_export.hasOwnProperty(key) || key === 'default' || key === '__esModule') return;
    exports[key] = _export[key];
  }
})();

require("echarts/lib/chart/line");

require("echarts/lib/chart/pie");

require("echarts/lib/chart/lines");

require("echarts/lib/chart/bar");

require("echarts/lib/component/legendScroll");

require("echarts/lib/component/tooltip");


