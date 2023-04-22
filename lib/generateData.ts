import { extracFiles } from './extractFiles';
import loadConfig from './loadConfig';

(async () => {
  const config = await loadConfig();
  extracFiles(config);
})();
