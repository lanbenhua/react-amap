import Markdown from '../../components/Markdown';

export default class Page extends Markdown {
  editorUrl = '/packages/circle-marker/README.md';
  getMdStr = () => import('@lbh7/react-amap-circle-marker/README.md');
}
