import { useEffect, useState } from 'react';
import { useVisiable } from '../utils';
import { useMapContext } from '../map';
import { MapTypeControlProps } from '.';

export interface UseMapTypeControl extends MapTypeControlProps {}

export function useMapTypeControl(props = {} as UseMapTypeControl) {
  const [mapTypeControl, setMapTypeControl] = useState<AMap.MapType>();
  const { visiable, defaultType = 0, ...other } = props;
  const { map } = useMapContext();
  useEffect(() => {
    if (map && !mapTypeControl) {
      let instance: AMap.MapType;
      map.plugin(['AMap.MapType'], () => {
        instance = new AMap.MapType({ defaultType, ...other });
        map.addControl(instance);
        setMapTypeControl(instance);
      });
      return () => {
        if (instance) {
          map.removeControl(instance);
        }
      };
    }
  }, [map]);

  useEffect(
    () => () => {
      if (map && mapTypeControl) {
        map.removeControl(mapTypeControl);
      }
    },
    [],
  );

  useVisiable(mapTypeControl!, visiable);
  return {
    mapTypeControl,
    setMapTypeControl,
  };
}
