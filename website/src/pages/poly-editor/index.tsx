import Markdown from '../../components/Markdown';

export default class Page extends Markdown {
  editorUrl = '/packages/poly-editor/README.md';
  getMdStr = () => import('@lbh7/react-amap-poly-editor/README.md');
}
