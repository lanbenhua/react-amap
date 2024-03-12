import Markdown from '../../components/Markdown';

export default class Page extends Markdown {
  editorUrl = '/packages/auto-complete/README.md';
  getMdStr = () => import('@lbh7/react-amap-auto-complete/README.md');
}
