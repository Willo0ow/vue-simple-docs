import fs from 'fs';
import path from 'path';
import { cwd } from 'process';
import { generateComponentData } from './extractComponents';
import { formatFile } from './formatWithPrettier';

const baseDir = cwd();

interface FileObject {
  name: string;
  type: 'file';
  extension: string;
  prefix: string;
}

interface DirectoryObject {
  name: string;
  type: 'folder';
  children: FileSystemObject[];
}

type FileSystemObject = DirectoryObject | FileObject;

const getPathPrefix = (elementDir: string, sourceDir: string) => {
  const relativePath = elementDir.replace(sourceDir, '');
  const parsedPath = path.parse(relativePath);
  return parsedPath.dir.split('/').reduce((prefix, part) => (prefix += part || ''), '');
};

const createDirectoryObj = (dirPath: string): DirectoryObject => {
  return {
    name: path.basename(dirPath),
    type: 'folder',
    children: []
  };
};

const createFileObj = (filePath: string, sourceDir: string): FileObject => {
  return {
    name: path.basename(filePath, path.extname(filePath)),
    type: 'file',
    extension: path.extname(filePath),
    prefix: getPathPrefix(filePath, sourceDir)
  };
};

const readDirectory = (
  dirPath: string,
  parent: DirectoryObject | DirectoryObject[],
  sourceDir: string,
  config: Config
): void => {
  const dirObj = createDirectoryObj(dirPath);

  try {
    const files = fs.readdirSync(dirPath);
    files.forEach((file) => {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) {
        readDirectory(filePath, dirObj, sourceDir, config);
      } else if (stats.isFile()) {
        const fileObj = createFileObj(filePath, sourceDir);
        dirObj.children.push(createFileObj(filePath, sourceDir));
        if (path.extname(file) === '.vue') {
          const saveDirectory = path.join(
            baseDir,
            config.outputDir,
            'src',
            'generated',
            `${fileObj.prefix}${fileObj.name}.ts`
          );
          generateComponentData(filePath, saveDirectory);
        }
      }
    });
    if (Array.isArray(parent)) {
      parent.push(dirObj);
    } else {
      parent.children.push(dirObj);
    }
  } catch (error) {
    console.error('Unable to read directory: ' + error);
    return;
  }
};

const saveIndexFile = (indexContent: DirectoryObject, outputDir: string) => {
  const indexOutputPath = path.join(baseDir, outputDir, 'src', 'generated', `index.ts`);
  const indexData = `const components = ${JSON.stringify(
    indexContent
  )}; \n export default components;`;

  if (!fs.existsSync(path.dirname(indexOutputPath))) {
    fs.mkdirSync(path.dirname(indexOutputPath), { recursive: true });
  }
  try {
    fs.writeFileSync(indexOutputPath, indexData);
    formatFile(indexOutputPath, indexData);
  } catch (err) {
    console.error(err);
  }
};

import { type Config } from './loadConfig';

export const extracFiles = (config: Config) => {
  const sourceDir = path.join(baseDir, config.sourceDir);
  const sourceStructure: DirectoryObject[] = [];
  readDirectory(sourceDir, sourceStructure, sourceDir, config);

  if (sourceStructure.length) {
    saveIndexFile(sourceStructure[0], config.outputDir);
  }
};
