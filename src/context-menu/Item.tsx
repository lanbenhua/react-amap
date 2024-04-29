import { useEffect } from 'react';
import { MapChildProps } from '../map';
import useMemoizedFn from './useMemoizedFn';

export interface ContextMenuItem extends MapChildProps {
  contextMenu?: AMap.ContextMenu;
  text?: string;
  order?: number;
  onClick?: (event: MouseEvent) => void;
}

const noop = function () {};

export default (props: ContextMenuItem = {}) => {
  const { text, order = 1, onClick = noop, contextMenu, map } = props;
  const clickFn = useMemoizedFn(onClick);

  useEffect(() => {
    if (contextMenu && text) {
      contextMenu.addItem(text, clickFn, order);
    }
    return () => {
      try {
        if (map && props.contextMenu && text) {
          props.contextMenu.removeItem(text, clickFn);
        }
      } catch (e) {}
    };
  }, [contextMenu, order, text, clickFn]);

  return null;
};
