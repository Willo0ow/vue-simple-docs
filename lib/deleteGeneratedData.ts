import path from 'path';
import loadConfig from './loadConfig';
import { deleteDirectoryContents } from './deleteDirectoryContents';

(async () => {
  const config = await loadConfig();
  deleteDirectoryContents(path.join(config.outputDir, 'src', 'generated'));
})();
