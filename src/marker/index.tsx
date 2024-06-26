import { useImperativeHandle, forwardRef } from 'react';
import { OverlayProps } from '../map';
import { useMarker } from './useMarker';

export * from './useMarker';

export interface MarkerProps extends OverlayProps, AMap.MarkerEvents, AMap.MarkerOptions {
  /** 覆盖物是否可见 */
  visiable?: boolean;
  className?: string;
  children?: JSX.Element;
}

export const Marker = forwardRef<MarkerProps & { marker?: AMap.Marker }, MarkerProps>((props, ref) => {
  const { marker, MarkerPortal } = useMarker(props);
  useImperativeHandle(ref, () => ({ ...props, marker }), [marker]);
  return <MarkerPortal>{props.children}</MarkerPortal>;
});
Marker.displayName = 'Marker';
