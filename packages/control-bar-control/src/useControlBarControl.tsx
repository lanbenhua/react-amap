import { useEffect, useState } from 'react';
import { useVisiable } from '@lbh7/react-amap-utils';
import { useMapContext } from '@lbh7/react-amap-map';
import { ControlBarControlProps } from '.';

export interface UseControlBarControl extends ControlBarControlProps {}

export function useControlBarControl(props = {} as UseControlBarControl) {
  const { position, visiable, offset } = props;
  const [controlBarControl, setControlBarControl] = useState<AMap.ControlBar>();
  const { map } = useMapContext();
  useEffect(() => {
    if (map && !controlBarControl) {
      let instance: AMap.ControlBar;
      map.plugin(['AMap.ControlBar', 'AMap.HawkEye'], () => {
        instance = new AMap.ControlBar({
          offset: offset,
          position,
        });
        map.addControl(instance);
        setControlBarControl(instance);
      });
      return () => {
        if (instance) {
          map.removeControl(instance);
        }
      };
    }
  }, [map]);

  useVisiable(controlBarControl!, visiable);
  return {
    controlBarControl,
    setControlBarControl,
  };
}
