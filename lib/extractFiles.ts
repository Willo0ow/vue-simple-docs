import fs from 'fs';
import path from 'path';
import { cwd } from 'process';
import { generateFileDetails } from './extractFileDetails';
import { formatFile } from './formatWithPrettier';

const baseDir = cwd();

import type { DirectoryObject, FileObject, SearchItem } from './src/types/lib';

const getPathPrefix = (elementDir: string, sourceDir: string) => {
  const relativePath = elementDir.replace(sourceDir, '');
  const parsedPath = path.parse(relativePath);
  return parsedPath.dir.split('/').reduce((prefix, part) => (prefix += part || ''), '');
};

const createDirectoryObj = (dirPath: string): DirectoryObject => {
  return {
    name: path.basename(dirPath),
    type: 'folder',
    children: [],
  };
};

const createFileObj = (filePath: string, sourceDir: string, fileType?: string): FileObject => {
  return {
    name: path.basename(filePath, path.extname(filePath)),
    type: 'file',
    fileType,
    extension: path.extname(filePath),
    prefix: getPathPrefix(filePath, sourceDir),
  };
};

const readDirectory = (
  dirPath: string,
  parent: DirectoryObject | DirectoryObject[],
  sourceDir: string,
  config: Config,
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
        const saveDirectory = path.join(
          baseDir,
          config.outputDir,
          'src',
          'generated',
          `${fileObj.prefix}${fileObj.name}.ts`,
        );
        const fileType: string | undefined = generateFileDetails(filePath, saveDirectory);

        if (typeof fileType === 'string') {
          if (fileType) {
            fileObj.fileType = fileType;
          } else {
            fileObj.fileType = fileObj.extension === '.vue' ? 'Component' : 'Module';
          }
          dirObj.children.push(fileObj);
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
  const searchList: SearchItem[] = [];
  filterSearchItems(indexContent, searchList);
  const content = { ...indexContent, children: filterNotEmptyDirectories(indexContent) };
  const indexOutputPath = path.join(baseDir, outputDir, 'src', 'generated', `index.ts`);
  const indexData = `const files = ${JSON.stringify(
    content,
  )}; \n export default files; \n export const searchItems = ${JSON.stringify(searchList)};`;

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

function filterSearchItems(sourceContent: DirectoryObject, searchItemsList: SearchItem[]) {
  return sourceContent.children.forEach((child) => {
    if (child.type === 'folder') {
      filterSearchItems(child, searchItemsList);
    } else {
      searchItemsList.push({ name: child.name, view: 'FileView', prefix: child.prefix });
    }
  });
}

function filterNotEmptyDirectories(sourceContent: DirectoryObject) {
  return sourceContent.children.reduce((childrenWithDocs, child) => {
    if (child.type === 'folder') {
      if (child.children.length > 0) {
        childrenWithDocs.push(child);
        child.children = filterNotEmptyDirectories(child);
      }
    } else {
      childrenWithDocs.push(child);
    }
    return childrenWithDocs;
  }, []);
}

import { type Config } from './loadConfig';

export const extracFiles = (config: Config) => {
  const sourceDir = path.join(baseDir, config.sourceDir);
  const sourceStructure: DirectoryObject[] = [];
  readDirectory(sourceDir, sourceStructure, sourceDir, config);

  if (sourceStructure.length) {
    saveIndexFile(sourceStructure[0], config.outputDir);
  }
};
