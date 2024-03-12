import Markdown from '../../components/Markdown';

export default class Page extends Markdown {
  editorUrl = '/packages/polygon-editor/README.md';
  getMdStr = () => import('@lbh7/react-amap-polygon-editor/README.md');
}
