import Markdown from '../../components/Markdown';

export default class Page extends Markdown {
  editorUrl = '/packages/require-script/README.md';
  getMdStr = () => import('@lbh7/react-amap-require-script/README.md');
}
