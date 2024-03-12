import { useEffect, useState } from 'react';
import { useVisiable } from '@lbh7/react-amap-utils';
import { useMapContext } from '@lbh7/react-amap-map';
import { ScaleControlProps } from './';

export interface UseScaleControl extends ScaleControlProps {}

export function useScaleControl(props = {} as UseScaleControl) {
  const [scaleControl, setScaleControl] = useState<AMap.Scale>();
  const { position, visiable, offset } = props;
  const { map } = useMapContext();
  useEffect(() => {
    if (map && !scaleControl) {
      let instance: AMap.Control;
      map.plugin(['AMap.Scale'], () => {
        instance = new AMap.Scale({
          offset: offset,
          position,
        });
        map.addControl(instance);
        setScaleControl(instance);
      });
      return () => {
        if (instance) {
          map.removeControl(instance);
        }
      };
    }
  }, [map]);

  useVisiable(scaleControl!, visiable);
  return {
    scaleControl,
    setScaleControl,
  };
}
