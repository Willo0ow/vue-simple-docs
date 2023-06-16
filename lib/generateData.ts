import { extracFiles } from './extractFiles';
import loadConfig from './loadConfig';
import './deleteGeneratedData';

(async () => {
  const config = await loadConfig();
  extracFiles(config);
})();
