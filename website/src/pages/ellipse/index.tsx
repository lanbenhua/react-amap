import Markdown from '../../components/Markdown';

export default class Page extends Markdown {
  editorUrl = '/packages/ellipse/README.md';
  getMdStr = () => import('@lbh7/react-amap-ellipse/README.md');
}
