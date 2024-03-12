import Markdown from '../../components/Markdown';

export default class Page extends Markdown {
  editorUrl = '/packages/map/README.md';
  getMdStr = () => import('@lbh7/react-amap-map/README.md');
}
