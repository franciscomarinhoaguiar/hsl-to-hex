var toRgb = require('hsl-to-rgb-for-reals');
var debug = require('debug');
function max(val, n) {
  debug('ensuring ' + val + ' is no more than ' + n);
  return val > n ? n : val;
}
function min(val, n) {
  debug('ensuring ' + val + ' is no less than ' + n);
  return val < n ? n : val;
}
function cycle(val) {
  debug('resolving ' + val + ' within the 0-359 range ' + n);
  val = max(val, 1e7);
  val = min(val, -1e7);
  while (val < 0) {
    val += 360;
  }
  while (val > 359) {
    val -= 360;
  }
  return val;
}

function hls(hue, saturation, luminosity) {
  hue = cycle(hue);
  saturation = min(max(saturation, 100), 0);
  luminosity = min(max(luminosity, 100), 0);
  saturation /= 100;
  luminosity /= 100;
  var rgb = toRgb(hue, saturation, luminosity);
  return (
    '#' +
    rgb
      .map(function (n) {
        return (256 + n).toString(16).substr(-2);
      })
      .join('')
  );
}

module.exports = hls;
