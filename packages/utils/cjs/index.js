'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')['default'];
Object.defineProperty(exports, '__esModule', {
  value: true,
});
var _exportNames = {
  useSetStatus: true,
  useVisiable: true,
  usePrevious: true,
  useEventProperties: true,
  useSettingProperties: true,
};
exports.useEventProperties = useEventProperties;
exports.usePrevious = usePrevious;
exports.useSetStatus = useSetStatus;
exports.useSettingProperties = useSettingProperties;
exports.useVisiable = useVisiable;
var _defineProperty2 = _interopRequireDefault(require('@babel/runtime/helpers/defineProperty'));
var _objectSpread3 = _interopRequireDefault(require('@babel/runtime/helpers/objectSpread2'));
var _slicedToArray2 = _interopRequireDefault(require('@babel/runtime/helpers/slicedToArray'));
var _react = require('react');
var _usePortal = require('./usePortal');
Object.keys(_usePortal).forEach(function (key) {
  if (key === 'default' || key === '__esModule') return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _usePortal[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _usePortal[key];
    },
  });
});
/// <reference types="@lbh7/react-amap-types" />

/**
 * 对实例有 setStatus 更改状态的处理
 * @param instance
 * @param props
 * @param propsName
 */
function useSetStatus(instance) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var propsName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  propsName.forEach(function (name) {
    var eName = name;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    var _useState = (0, _react.useState)(props[eName]),
      _useState2 = (0, _slicedToArray2['default'])(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];
    // eslint-disable-next-line react-hooks/rules-of-hooks
    (0, _react.useEffect)(
      function () {
        if (instance && props[eName] !== undefined) {
          if (props[eName] !== state) {
            // map.setStatus({
            //   dragEnable: true,
            //   keyboardEnable: true,
            //   doubleClickZoom: true,
            //   zoomEnable: true,
            //   rotateEnable: true
            // });
            var status = instance.getStatus();
            instance.setStatus(
              (0, _objectSpread3['default'])(
                (0, _objectSpread3['default'])({}, status),
                {},
                (0, _defineProperty2['default'])({}, eName, props[eName]),
              ),
            );
            setState(props[eName]);
          }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },
      [instance, props[eName]],
    );
  });
}

/**
 * 针对 Overlay 类型的组件，有公共的是否显示 对象处理
 * 通过参数 `visiable` 来控制执行 `show()` or `hide()`
 */
function useVisiable(instance, visiable) {
  var _useState3 = (0, _react.useState)(visiable),
    _useState4 = (0, _slicedToArray2['default'])(_useState3, 2),
    state = _useState4[0],
    setState = _useState4[1];
  (0, _react.useEffect)(
    function () {
      if (instance && visiable !== undefined) {
        if (visiable) {
          instance.show && instance.show();
        } else {
          instance.hide && instance.hide();
        }
        if (visiable !== state) {
          setState(visiable);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [instance, visiable],
  );
}

/**
 * 获取上一轮的 props 或 state
 * How to get the previous props or state?
 * https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
 * @example
 * ```js
 * function Counter() {
 *   const [count, setCount] = useState(0);
 *   const prevCount = usePrevious(count);
 *   return <h1>Now: {count}, before: {prevCount}</h1>;
 * }
 * ```
 */
function usePrevious(value) {
  var ref = (0, _react.useRef)();
  (0, _react.useEffect)(function () {
    ref.current = value;
  });
  return ref.current;
}
/**
 * 绑定事件
 * @param instance 实例对象
 * @param props 传递进来的 props
 * @param eventName 事件的名字，如，我们使用 `onClick` 事件，最终被转换成，`click` 绑定到实例中，`onDblClick` => `dblclick`
 *
 * @example
 * ```js
 * useEventProperties<BMap.Marker, UseMarker>(marker!, props, [
 *   'onMouseMove', 'onZoomChange', 'onMapMove', 'onMouseWheel', 'onZoomStart'
 * ]);
 * ```
 */
function useEventProperties(instance) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var eventName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var type = arguments.length > 3 ? arguments[3] : undefined;
  eventName.forEach(function (name) {
    var eventName = name;
    var eventHandle = props[eventName];
    // eslint-disable-next-line react-hooks/rules-of-hooks
    (0, _react.useEffect)(
      function () {
        if (!instance) return;
        var eName = name.toLocaleLowerCase().replace(/^on/, '');
        if (eventHandle && eName) {
          instance.on(eName, eventHandle);
        }
        return function () {
          if (eName && eventHandle) {
            instance.off(eName, eventHandle);
          }
        };
      },
      [instance, eventHandle],
    );
  });
}

/**
 * 属性受控
 * @param instance 实例对象
 * @param props 属性值
 * @param propsName 多个属性设置的名称
 * @example
 * ```ts
 * useSettingProperties<AMap.Polyline, UsePolyline>(polyline!, props, [
 *    'Path'
 * ]);
 * ```
 */
function useSettingProperties() {
  var instance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var propsName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  propsName.forEach(function (name) {
    var eName = 'set'.concat(name);
    var vName = ''.concat(name.charAt(0).toLowerCase()).concat(name.slice(1));
    var eventHandle = props[vName];
    var _useState5 = (0, _react.useState)(eventHandle),
      _useState6 = (0, _slicedToArray2['default'])(_useState5, 2),
      state = _useState6[0],
      setState = _useState6[1];
    // eslint-disable-next-line react-hooks/rules-of-hooks
    (0, _react.useEffect)(
      function () {
        if (instance && eventHandle !== undefined) {
          if (eventHandle !== state && instance[eName] && typeof instance[eName] === 'function') {
            instance[eName](eventHandle);
            setState(eventHandle);
          }
        }
      },
      [instance, eventHandle],
    );
  });
}
