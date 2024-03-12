'use strict';

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard')['default'];
var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')['default'];
Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.usePortal = void 0;
var _slicedToArray2 = _interopRequireDefault(require('@babel/runtime/helpers/slicedToArray'));
var _react = _interopRequireWildcard(require('react'));
var _reactDom = require('react-dom');
var usePortal = (exports.usePortal = function usePortal() {
  var _React$useState = _react['default'].useState(function () {
      var el = document.createElement('div');
      return el;
    }),
    _React$useState2 = (0, _slicedToArray2['default'])(_React$useState, 1),
    container = _React$useState2[0];
  var _useState = (0, _react.useState)({
      render: function render() {
        return null;
      },
      remove: function remove() {
        return null;
      },
    }),
    _useState2 = (0, _slicedToArray2['default'])(_useState, 2),
    portal = _useState2[0],
    setPortal = _useState2[1];
  var ReactCreatePortal = _react['default'].useCallback(function (elmm) {
    var Portal = function Portal(_ref) {
      var children = _ref.children;
      if (!children) return null;
      return /*#__PURE__*/ (0, _reactDom.createPortal)(children, elmm);
    };
    var remove = function remove(elm) {
      elm && (0, _reactDom.unmountComponentAtNode)(elm);
    };
    return {
      render: Portal,
      remove: remove,
    };
  }, []);
  (0, _react.useEffect)(
    function () {
      if (container) portal.remove();
      var newPortal = ReactCreatePortal(container);
      setPortal(newPortal);
      return function () {
        newPortal.remove(container);
      };
    },
    [container],
  );
  return {
    Portal: portal.render,
    container: container,
  };
});
