'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')['default'];
Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.APILoader = void 0;
var _slicedToArray2 = _interopRequireDefault(require('@babel/runtime/helpers/slicedToArray'));
var _objectWithoutProperties2 = _interopRequireDefault(require('@babel/runtime/helpers/objectWithoutProperties'));
var _react = require('react');
var _amapJsapiLoader = require('@amap/amap-jsapi-loader');
var _jsxRuntime = require('react/jsx-runtime');
var _excluded = ['children']; /// <reference types="@lbh7/react-amap-types" />
/**
 * APILoader 用于加载百度地图依赖
 */
var APILoader = (exports.APILoader = function APILoader(props) {
  var children = props.children,
    config = (0, _objectWithoutProperties2['default'])(props, _excluded);
  var _useState = (0, _react.useState)(false),
    _useState2 = (0, _slicedToArray2['default'])(_useState, 2),
    loaded = _useState2[0],
    setLoaded = _useState2[1];
  var _useState3 = (0, _react.useState)(),
    _useState4 = (0, _slicedToArray2['default'])(_useState3, 2),
    error = _useState4[0],
    setError = _useState4[1];
  (0, _react.useEffect)(
    function () {
      var aKey = config.akey || '';
      var plugins = config.plugins;
      (0, _amapJsapiLoader.load)({
        key: aKey,
        plugins: plugins,
        version: config.version || '2.0',
        AMapUI: config.AMapUI,
        Loca: config.Loca,
      })
        .then(function () {
          setError(undefined);
          setLoaded(true);
        })
        ['catch'](function (err) {
          setError(err);
        });
    },
    [config.akey],
  );
  if (error) {
    return /*#__PURE__*/ (0, _jsxRuntime.jsx)('div', {
      style: {
        color: 'red',
      },
      children: error.message,
    });
  } else if (loaded) {
    return /*#__PURE__*/ (0, _jsxRuntime.jsx)(_react.Fragment, {
      children: children,
    });
  }
  return null;
});
