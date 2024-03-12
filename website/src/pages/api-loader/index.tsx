import Markdown from '../../components/Markdown';

export default class Page extends Markdown {
  editorUrl = '/packages/api-loader/README.md';
  getMdStr = () => import('@lbh7/react-amap-api-loader/README.md');
}
