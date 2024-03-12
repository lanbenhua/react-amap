import Markdown from '../../components/Markdown';

export default class Page extends Markdown {
  editorUrl = '/packages/rectangle/README.md';
  getMdStr = () => import('@lbh7/react-amap-rectangle/README.md');
}
