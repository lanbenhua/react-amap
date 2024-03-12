import Markdown from '../../components/Markdown';

export default class Page extends Markdown {
  editorUrl = '/packages/bezier-curve/README.md';
  getMdStr = () => import('@lbh7/react-amap-bezier-curve/README.md');
}
