import { useEffect, useState } from 'react';
import { useVisiable } from '../utils';
import { useMapContext } from '../map';
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

  useEffect(() => () => map && controlBarControl && map.removeControl(controlBarControl), []);

  useVisiable(controlBarControl!, visiable);
  return {
    controlBarControl,
    setControlBarControl,
  };
}
