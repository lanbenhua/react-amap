import Markdown from '../../components/Markdown';

export default class Page extends Markdown {
  editorUrl = '/packages/tool-bar-control/README.md';
  getMdStr = () => import('@lbh7/react-amap-tool-bar-control/README.md');
}
