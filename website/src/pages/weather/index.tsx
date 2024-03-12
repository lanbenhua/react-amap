import Markdown from '../../components/Markdown';

export default class Page extends Markdown {
  editorUrl = '/packages/weather/README.md';
  getMdStr = () => import('@lbh7/react-amap-weather/README.md');
}
