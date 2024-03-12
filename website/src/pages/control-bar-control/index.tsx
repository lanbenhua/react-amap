import Markdown from '../../components/Markdown';

export default class Page extends Markdown {
  editorUrl = '/packages/control-bar-control/README.md';
  getMdStr = () => import('@lbh7/react-amap-control-bar-control/README.md');
}
