import { forwardRef, useContext, useEffect, useImperativeHandle, useState } from 'react';
import { useEventProperties } from '@lbh7/react-amap-utils';
import { useMapContext } from '@lbh7/react-amap-map';
import { PolylineContext } from '@lbh7/react-amap-polyline';
import { PolygonContext } from '@lbh7/react-amap-polygon';

export interface PolyEditorProps extends Partial<AMap.PolyEditor>, AMap.PolyEditorEvents {
  /** 是否开启编辑功能 */
  active?: boolean;
  polyElement?: AMap.Polygon | AMap.Polyline;
}

export const PolyEditor = forwardRef<PolyEditorProps, PolyEditorProps>((props, ref) => {
  const polyline = useContext(PolylineContext);
  const polygon = useContext(PolygonContext);
  const { active, polyElement = polyline || polygon } = props;
  const { map } = useMapContext();
  const [visiable, setVisiable] = useState<boolean>(true);
  const [polyEditor, setPolyEditor] = useState<AMap.PolyEditor>();
  useImperativeHandle(ref, () => ({ ...props, polyEditor }));
  useEffect(() => {
    if (polyElement && map && !polyEditor && AMap && AMap.PolyEditor) {
      const instance = new AMap.PolyEditor(map, polyElement);
      polyElement.on('hide', () => setVisiable(false));
      polyElement.on('show', () => setVisiable(true));
      setPolyEditor(instance);
    }
  }, [polyElement]);

  useEffect(() => {
    if (!polyEditor) {
      return;
    }
    if (visiable && !active) {
      polyEditor.close();
      props.onEnd && props.onEnd({ type: 'end', target: props.polyElement as any });
    } else if (visiable && active) {
      polyEditor.open();
    } else if (!visiable && active) {
      polyEditor.close();
      props.onEnd && props.onEnd({ type: 'end', target: props.polyElement as any });
    }
  }, [active, visiable]);

  useEventProperties<AMap.PolyEditor, AMap.PolyEditorEvents>(polyEditor!, props, [
    'onEnd',
    'onAddnode',
    'onAdjust',
    'onRemovenode',
  ]);
  return null;
});
