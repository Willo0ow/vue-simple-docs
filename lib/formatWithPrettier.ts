import prettier from 'prettier';
import fs from 'fs';

const prettierOptions = {
  jsxBracketSameLine: false,
  semi: true,
  tabWidth: 2,
  singleQuote: true,
  printWidth: 120,
  useTabs: false,
  bracketSpacing: true,
};

export const formatFile = (filePath: string, fileContent: string) => {
  const formattedContent = prettier.format(fileContent, {
    ...prettierOptions,
    filepath: filePath,
  });
  fs.writeFileSync(filePath, formattedContent, 'utf8');
};
