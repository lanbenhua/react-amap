import { forwardRef, useEffect, useImperativeHandle, useState, useContext } from 'react';
import { useEventProperties } from '../utils';
import { useMapContext } from '../map';
import { PolygonContext } from '../polygon';

export interface PolygonEditorProps extends Partial<AMap.PolygonEditor>, AMap.PolygonEditorEvents {
  /** 是否开启编辑功能 */
  active?: boolean;
}

export const PolygonEditor = forwardRef<PolygonEditorProps, PolygonEditorProps>((props, ref) => {
  const { active } = props;
  const { map } = useMapContext();
  const polygon = useContext(PolygonContext);
  const [visiable, setVisiable] = useState<boolean>(true);
  const [polyEditor, setPolyEditor] = useState<AMap.PolygonEditor>();
  useImperativeHandle(ref, () => ({ ...props, polyEditor }));
  useEffect(() => {
    if (polygon && map && !polyEditor && AMap && AMap.PolygonEditor) {
      const instance = new AMap.PolygonEditor(map, polygon);
      polygon.on('hide', () => setVisiable(false));
      polygon.on('show', () => setVisiable(true));
      setPolyEditor(instance);
    }
  }, [polygon]);

  useEffect(
    () => () => {
      if (map && polyEditor) {
        polyEditor.close();
        map.remove?.(polyEditor as any);
      }
    },
    [],
  );

  useEffect(() => {
    if (!polyEditor) {
      return;
    }
    if (visiable && !active && polygon) {
      polyEditor.close();
      props.onEnd && props.onEnd({ target: polygon });
    } else if (visiable && active && polygon) {
      polyEditor.open();
      props.onAdd && props.onAdd({ target: polygon });
    } else if (!visiable && active && polygon) {
      polyEditor.close();
      props.onEnd && props.onEnd({ target: polygon });
    }
  }, [active, visiable, polygon]);

  useEventProperties<AMap.PolygonEditor, AMap.PolygonEditorEvents>(polyEditor!, props, [
    'onEnd',
    'onAddnode',
    'onRemovenode',
    'onAdjust',
    'onMove',
    'onAdd',
  ]);
  return null;
});
PolygonEditor.displayName = 'PolygonEditor';
