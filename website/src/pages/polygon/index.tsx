import Markdown from '../../components/Markdown';

export default class Page extends Markdown {
  editorUrl = '/packages/polygon/README.md';
  getMdStr = () => import('@lbh7/react-amap-polygon/README.md');
}
