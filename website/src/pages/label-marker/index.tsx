import Markdown from '../../components/Markdown';

export default class Page extends Markdown {
  editorUrl = '/packages/label-marker/README.md';
  getMdStr = () => import('@lbh7/react-amap-label-marker/README.md');
}
