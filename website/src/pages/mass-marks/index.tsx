import Markdown from '../../components/Markdown';

export default class Page extends Markdown {
  editorUrl = '/packages/mass-marks/README.md';
  getMdStr = () => import('@lbh7/react-amap-mass-marks/README.md');
}
