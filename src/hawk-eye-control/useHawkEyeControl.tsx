import { useEffect, useState } from 'react';
import { useVisiable } from '../utils';
import { useMapContext } from '../map';
import { HawkEyeControlProps } from '.';

export interface UseHawkEyeControl extends HawkEyeControlProps {}

export function useHawkEyeControl(props = {} as UseHawkEyeControl) {
  const [hawkEyeControl, setHawkEyeControl] = useState<AMap.HawkEye>();
  const { offset, visiable, ...other } = props;
  const { map } = useMapContext();
  useEffect(() => {
    if (map && !hawkEyeControl) {
      let instance: AMap.HawkEye;
      map.plugin(['AMap.HawkEye'], () => {
        instance = new AMap.HawkEye({ offset: offset, ...other });
        map.addControl(instance);
        setHawkEyeControl(instance);
      });
    }
    return () => {
      if (hawkEyeControl && map) {
        map && map.removeControl(hawkEyeControl);
        setHawkEyeControl(undefined);
      }
    };
  }, [map, hawkEyeControl]);

  useEffect(() => () => map && hawkEyeControl && map.removeControl(hawkEyeControl), []);

  useVisiable(hawkEyeControl! as any, visiable);
  return {
    hawkEyeControl,
    setHawkEyeControl,
  };
}
