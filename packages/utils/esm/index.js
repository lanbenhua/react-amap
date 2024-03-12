import _extends from '@babel/runtime/helpers/extends';
/// <reference types="@lbh7/react-amap-types" />
import { useEffect, useState, useRef } from 'react';
export * from './usePortal';

/**
 * 对实例有 setStatus 更改状态的处理
 * @param instance
 * @param props
 * @param propsName
 */
export function useSetStatus(instance, props, propsName) {
  if (props === void 0) {
    props = {};
  }
  if (propsName === void 0) {
    propsName = [];
  }
  propsName.forEach((name) => {
    var eName = name;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    var [state, setState] = useState(props[eName]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
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
            _extends({}, status, {
              [eName]: props[eName],
            }),
          );
          setState(props[eName]);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [instance, props[eName]]);
  });
}

/**
 * 针对 Overlay 类型的组件，有公共的是否显示 对象处理
 * 通过参数 `visiable` 来控制执行 `show()` or `hide()`
 */
export function useVisiable(instance, visiable) {
  var [state, setState] = useState(visiable);
  useEffect(() => {
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
  }, [instance, visiable]);
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
export function usePrevious(value) {
  var ref = useRef();
  useEffect(() => {
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
export function useEventProperties(instance, props, eventName, type) {
  if (props === void 0) {
    props = {};
  }
  if (eventName === void 0) {
    eventName = [];
  }
  eventName.forEach((name) => {
    var eventName = name;
    var eventHandle = props[eventName];
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (!instance) return;
      var eName = name.toLocaleLowerCase().replace(/^on/, '');
      if (eventHandle && eName) {
        instance.on(eName, eventHandle);
      }
      return () => {
        if (eName && eventHandle) {
          instance.off(eName, eventHandle);
        }
      };
    }, [instance, eventHandle]);
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
export function useSettingProperties(instance, props, propsName) {
  if (instance === void 0) {
    instance = {};
  }
  if (props === void 0) {
    props = {};
  }
  if (propsName === void 0) {
    propsName = [];
  }
  propsName.forEach((name) => {
    var eName = 'set' + name;
    var vName = '' + name.charAt(0).toLowerCase() + name.slice(1);
    var eventHandle = props[vName];
    var [state, setState] = useState(eventHandle);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (instance && eventHandle !== undefined) {
        if (eventHandle !== state && instance[eName] && typeof instance[eName] === 'function') {
          instance[eName](eventHandle);
          setState(eventHandle);
        }
      }
    }, [instance, eventHandle]);
  });
}
