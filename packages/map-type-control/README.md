MapTypeControl 类型切换
===

[![Buy me a coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-048754?logo=buymeacoffee)](https://jaywcjlove.github.io/#/sponsor)
[![npm version](https://img.shields.io/npm/v/@lbh7/react-amap-map-type-control.svg)](https://www.npmjs.com/package/@lbh7/react-amap-map-type-control)
[![Downloads](https://img.shields.io/npm/dm/@lbh7/react-amap-map-type-control.svg?style=flat)](https://www.npmjs.com/package/@lbh7/react-amap-map-type-control)

地图类型切换插件。用户通过该插件进行地图切换。

```jsx
import { MapTypeControl } from '@lbh7/react-amap';
// 或者单独安装使用
import { MapTypeControl } from '@lbh7/react-amap-map-type-control';
```

### 基本用法

```jsx mdx:preview
import ReactDOM from 'react-dom';
import React, { useState, useRef } from 'react';
import { Map, APILoader, MapTypeControl } from '@lbh7/react-amap';

const Demo = () => {
  const [show, setShow] = useState(true);
  return (
    <>
      <button onClick={() => setShow(!show)}>
        {show ? '隐藏' : '显示'}
      </button>
      <div style={{ width: '100%', height: '300px' }}>
        <Map>
          <MapTypeControl
            visiable={show}
            offset={[30, 10]}
            position="RT"
          />
          {show && (
            <MapTypeControl
              visiable={show}
              offset={[10, 10]}
              position="RB"
            />
          )}
        </Map>
      </div>
    </>
  );
}

const Mount = () => (
  <APILoader akey="a7a90e05a37d3f6bf76d4a9032fc9129">
    <Demo />
  </APILoader>
);

export default Mount;
```

### Props

| 参数 | 说明 | 类型 | 默认值 |
| ----- | ----- | ----- | ----- |
| visiable | 覆盖物是否可见。 | `boolean` | - |
| showRoad | 覆盖物是否可见。 | `boolean` | `false` |
| showTraffic | 叠加实时交通图层 默认值：false | `boolean` | `false` |
| defaultType | 初始化默认图层类型。 取值为0：默认底图 取值为1：卫星图 默认值：0 | `number` | `0` |
