import { useEffect, useState } from 'react';
import { useVisiable } from '@lbh7/react-amap-utils';
import { useMapContext } from '@lbh7/react-amap-map';
import { ToolBarControlProps } from './';

export interface UseToolBarControl extends ToolBarControlProps {}

export function useToolBarControl(props = {} as UseToolBarControl) {
  const [toolBarControl, setToolBarControl] = useState<AMap.ToolBar>();
  const { position, visiable, offset } = props;
  const { map } = useMapContext();
  useEffect(() => {
    if (map && !toolBarControl) {
      let instance: AMap.Control;
      map.plugin(['AMap.ToolBar'], () => {
        instance = new AMap.ToolBar({
          offset,
          position,
        });
        map.addControl(instance);
        setToolBarControl(instance);
      });
      return () => {
        if (instance) {
          map.removeControl(instance);
        }
      };
    }
  }, [map]);

  useVisiable(toolBarControl!, visiable);
  return {
    toolBarControl,
    setToolBarControl,
  };
}
