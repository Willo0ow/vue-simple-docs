import prettier from 'prettier';
import fs from 'fs';

const prettierOptions = {
  semi: true,
  singleQuote: true,
  jsxBracketSameLine: false,
  printWidth: 80,
  tabWidth: 2,
  useTabs: false
};

export const formatFile = (filePath: string, fileContent: string) => {
  const formattedContent = prettier.format(fileContent, {
    ...prettierOptions,
    filepath: filePath
  });
  fs.writeFileSync(filePath, formattedContent, 'utf8');
};
ž;
