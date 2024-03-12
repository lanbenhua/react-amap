'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.requireCss = requireCss;
exports.requireScript = requireScript;
var _importedScript = {};

/**
 * load dependency by css tag
 */
function requireCss(src) {
  var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '_react_amap_css';
  var headElement = document && (document.head || document.getElementsByTagName('head')[0]);
  var dom = document.getElementById(id);
  return new Promise(function (resolve, reject) {
    if (!document || src in _importedScript || dom) {
      resolve();
      return;
    }
    var script = document.createElement('link');
    script.type = 'text/css';
    script.rel = 'stylesheet';
    script.id = id;
    script.href = src;
    script.onerror = function (err) {
      headElement.removeChild(script);
      reject(new URIError('The css '.concat(src, ' is no accessible.')));
    };
    script.onload = function () {
      _importedScript[src] = true;
      resolve();
    };
    headElement.appendChild(script);
  });
}

/**
 * load dependency by script tag
 */
function requireScript(src) {
  var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '_react_amap_plugin';
  var headElement = document && (document.head || document.getElementsByTagName('head')[0]);
  var dom = document.getElementById(id);
  return new Promise(function (resolve, reject) {
    if (!document || src in _importedScript || dom) {
      resolve();
      return;
    }
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = id;
    script.async = true;
    script.defer = true;
    script.src = src;
    script.onerror = function (err) {
      headElement.removeChild(script);
      reject(new URIError('The Script '.concat(src, ' is no accessible.')));
    };
    script.onload = function () {
      _importedScript[src] = true;
      resolve();
    };
    headElement.appendChild(script);
  });
}
