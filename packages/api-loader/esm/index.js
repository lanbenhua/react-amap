import _objectWithoutPropertiesLoose from '@babel/runtime/helpers/objectWithoutPropertiesLoose';
var _excluded = ['children'];
/// <reference types="@lbh7/react-amap-types" />

import { Fragment, useEffect, useState } from 'react';
import { load } from '@amap/amap-jsapi-loader';
import { jsx as _jsx } from 'react/jsx-runtime';
/**
 * APILoader 用于加载百度地图依赖
 */
export var APILoader = (props) => {
  var { children } = props,
    config = _objectWithoutPropertiesLoose(props, _excluded);
  var [loaded, setLoaded] = useState(false);
  var [error, setError] = useState();
  useEffect(() => {
    var aKey = config.akey || '';
    var plugins = config.plugins;
    load({
      key: aKey,
      plugins,
      version: config.version || '2.0',
      AMapUI: config.AMapUI,
      Loca: config.Loca,
    })
      .then(() => {
        setError(undefined);
        setLoaded(true);
      })
      .catch((err) => {
        setError(err);
      });
  }, [config.akey]);
  if (error) {
    return /*#__PURE__*/ _jsx('div', {
      style: {
        color: 'red',
      },
      children: error.message,
    });
  } else if (loaded) {
    return /*#__PURE__*/ _jsx(Fragment, {
      children: children,
    });
  }
  return null;
};
