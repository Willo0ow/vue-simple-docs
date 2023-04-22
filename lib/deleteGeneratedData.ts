import path from 'path';
import loadConfig from './loadConfig';
import { deleteDirectoryContents } from './deleteDirectoryContents';

(async () => {
  const config = await loadConfig();
  try {
    const generatedDir = path.join(config.outputDir, 'src', 'generated');
    deleteDirectoryContents(generatedDir);
    console.log(`Generated data deleted from ${generatedDir}`);
  } catch (error) {
    console.error(`Unable to delete generated data: ${error}`);
  }
})();
