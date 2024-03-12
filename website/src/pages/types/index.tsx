import Markdown from '../../components/Markdown';

export default class Page extends Markdown {
  editorUrl = '/packages/types/README.md';
  getMdStr = () => import('@lbh7/react-amap-types/README.md');
}
