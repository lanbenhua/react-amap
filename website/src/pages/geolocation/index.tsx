import Markdown from '../../components/Markdown';

export default class Page extends Markdown {
  editorUrl = '/packages/geolocation/README.md';
  getMdStr = () => import('@lbh7/react-amap-geolocation/README.md');
}
