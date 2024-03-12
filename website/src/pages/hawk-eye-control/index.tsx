import Markdown from '../../components/Markdown';

export default class Page extends Markdown {
  editorUrl = '/packages/hawk-eye-control/README.md';
  getMdStr = () => import('@lbh7/react-amap-hawk-eye-control/README.md');
}
