import { useState, useEffect } from 'react';
import { ContextMenuProps } from '.';
import { useEventProperties } from '../utils';

export interface UseContextMenu extends ContextMenuProps {
  map?: AMap.Map;
}
export const useContextMenu = (props = {} as UseContextMenu) => {
  const { position, map, open, ...other } = props;
  const [contextMenu, setContextMenu] = useState<AMap.ContextMenu>();

  useEffect(() => {
    if (!AMap || !map) return;
    if (!contextMenu) {
      let instance: AMap.ContextMenu = new AMap.ContextMenu({ ...other });
      setContextMenu(instance);
      return () => {
        try {
          if (instance) instance.close();
        } catch (e) {}
        setContextMenu(undefined);
      };
    }
  }, [map]);

  useEffect(() => {
    if (!contextMenu || !map) return;

    if (open && position) {
      contextMenu.open(map, position);
    } else {
      contextMenu.close();
    }
  }, [contextMenu, open, position]);

  useEffect(() => () => contextMenu && contextMenu.close(), []);

  useEventProperties<AMap.ContextMenu, UseContextMenu>(contextMenu!, props, ['onOpen', 'onClose']);

  return {
    contextMenu,
    setContextMenu,
  };
};
