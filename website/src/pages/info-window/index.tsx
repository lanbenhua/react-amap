import Markdown from '../../components/Markdown';

export default class Page extends Markdown {
  editorUrl = '/packages/info-window/README.md';
  getMdStr = () => import('@lbh7/react-amap-info-window/README.md');
}
