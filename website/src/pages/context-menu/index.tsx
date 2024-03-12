import Markdown from '../../components/Markdown';

export default class Page extends Markdown {
  editorUrl = '/packages/context-menu/README.md';
  getMdStr = () => import('@lbh7/react-amap-context-menu/README.md');
}
