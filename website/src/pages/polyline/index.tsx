import Markdown from '../../components/Markdown';

export default class Page extends Markdown {
  editorUrl = '/packages/polyline/README.md';
  getMdStr = () => import('@lbh7/react-amap-polyline/README.md');
}
