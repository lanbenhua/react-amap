import Markdown from '../../components/Markdown';

export default class Page extends Markdown {
  editorUrl = '/packages/polyline-editor/README.md';
  getMdStr = () => import('@lbh7/react-amap-polyline-editor/README.md');
}
