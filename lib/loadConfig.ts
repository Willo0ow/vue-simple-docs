import { cosmiconfig } from 'cosmiconfig';

const explorer = cosmiconfig('docs');

export type Config = {
  sourceDir: string;
  outputDir: string;
};

const defaultConfig: Config = {
  sourceDir: 'template/src/compoennts',
  outputDir: 'docs',
};

const loadConfig = async (): Promise<Config> => {
  const result = await explorer.search('docs.config');
  if (result && result.config) {
    return result.config;
  }
  return { ...defaultConfig };
};

export default loadConfig;
