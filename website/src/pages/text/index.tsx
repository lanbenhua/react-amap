import Markdown from '../../components/Markdown';

export default class Page extends Markdown {
  editorUrl = '/packages/text/README.md';
  getMdStr = () => import('@lbh7/react-amap-text/README.md');
}
