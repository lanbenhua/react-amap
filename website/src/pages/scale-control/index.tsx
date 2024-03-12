import Markdown from '../../components/Markdown';

export default class Page extends Markdown {
  editorUrl = '/packages/scale-control/README.md';
  getMdStr = () => import('@lbh7/react-amap-scale-control/README.md');
}
