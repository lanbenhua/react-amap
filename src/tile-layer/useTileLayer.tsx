import { useEffect, useState } from 'react';
import { useVisiable } from '../utils';
import { useMapContext } from '../map';
import { TileLayerProps, TileLayerType } from './index';

export interface UseTileLayer extends TileLayerProps {}

export function useTileLayer(props = {} as UseTileLayer) {
  const [tileLayer, setTileLayer] = useState<AMap.TileLayer>();
  const { visiable, type, options } = props;
  const { map } = useMapContext();
  useEffect(() => {
    if (map) {
      let instance: AMap.TileLayer = null as any;
      if (type) {
        switch (type) {
          case TileLayerType.ROADNET:
            instance = new AMap.TileLayer.RoadNet({} as any);
            break;
          case TileLayerType.SATELLITE:
            instance = new AMap.TileLayer.Satellite({} as any);
            break;
          case TileLayerType.TRAFFIC:
            instance = new AMap.TileLayer.Traffic({} as any);
            break;
        }
      }
      if (options) {
        instance = new AMap.TileLayer(options);
      }
      if (!!instance) {
        // 暂不使用这个 API，这个不兼容 v1.4.xx
        // map.addLayer(instance);
        map.add(instance);
        props.onAdded && props.onAdded();
        setTileLayer(instance);
      }
      return () => {
        if (instance) {
          if (AMap.v) {
            map && map.remove(instance);
          } else {
            // 暂不使用这个 API，这个不兼容 v1.4.xx，改用 map.remove API
            map && map.removeLayer(instance);
          }
          setTileLayer(null as any);
          props.onRemoved && props.onRemoved();
        }
      };
    }
  }, [map, type, options]);

  useEffect(
    () => () => {
      if (map && tileLayer) {
        if (AMap.v) {
          map && map.remove(tileLayer);
        } else {
          // 暂不使用这个 API，这个不兼容 v1.4.xx，改用 map.remove API
          map && map.removeLayer(tileLayer);
        }
        setTileLayer(null as any);
        props.onRemoved && props.onRemoved();
      }
    },
    [],
  );

  useVisiable(tileLayer!, visiable);
  return {
    tileLayer,
    setTileLayer,
  };
}
