import fs from 'fs';
import path from 'path';
import config from '../docs.config';
import { cwd } from 'process';
import { generateComponentData } from './extractComponents';

const baseDir = cwd();
const sourceDir = path.join(baseDir, config.sourceDir);
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

const getPathPrefix = (elementDir: string) => {
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

const createFileObj = (filePath: string): FileObject => {
  return {
    name: path.basename(filePath, path.extname(filePath)),
    type: 'file',
    extension: path.extname(filePath),
    prefix: getPathPrefix(filePath)
  };
};

const readDirectory = (dirPath: string, parent: DirectoryObject | DirectoryObject[]): void => {
  const dirObj = createDirectoryObj(dirPath);

  try {
    const files = fs.readdirSync(dirPath);
    files.forEach((file) => {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) {
        readDirectory(filePath, dirObj);
      } else if (stats.isFile()) {
        const fileObj = createFileObj(filePath);
        dirObj.children.push(createFileObj(filePath));
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

const saveIndexFile = (indexContent: DirectoryObject) => {
  const indexOutputPath = path.join(baseDir, config.outputDir, 'src', 'generated', `index.ts`);
  const indexData = `const components = ${JSON.stringify(
    indexContent
  )}; \n export default components;`;

  if (!fs.existsSync(path.dirname(indexOutputPath))) {
    fs.mkdirSync(path.dirname(indexOutputPath), { recursive: true });
  }

  fs.writeFile(indexOutputPath, indexData, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`Generated index file.`);
  });
};

export const extracFiles = () => {
  const sourceStructure: DirectoryObject[] = [];
  readDirectory(sourceDir, sourceStructure);

  if (sourceStructure.length) {
    saveIndexFile(sourceStructure[0]);
  }
};
