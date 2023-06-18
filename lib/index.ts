import fs from 'fs';
import fse from 'fs-extra';
import path from 'path';
import loadConfig from './loadConfig';

async function copyVueApp() {
  const config = await loadConfig();
  const packageDir = path.dirname(__filename);
  const sourceDir = path.join(packageDir, '..');

  const dirsToCopy = [
    'public',
    'src',
    '.eslintrc.cjs',
    '.gitignore',
    '.prettierrc.json',
    'env.d.ts',
    'index.html',
    'package.json',
    'README.md',
    'tsconfig.node.json',
    'tsconfig.json',
    'vite.config.ts',
    'lib',
  ];

  const destinationDir = path.join(process.cwd(), config.outputDir);

  // Check if source directory exists
  if (!fs.existsSync(sourceDir)) {
    console.error(`Source directory ${sourceDir} does not exist`);
    process.exit(1);
  }

  // Check if destination directory exists, create it if it doesn't
  if (!fs.existsSync(destinationDir)) {
    fs.mkdirSync(destinationDir);
    console.log(`Created destination directory ${destinationDir}`);
  }

  // Get the list of files in the source directory
  fs.readdir(sourceDir, (err, files) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    // Copy each file from the source directory to the destination directory
    files.forEach((file) => {
      if (dirsToCopy.includes(file)) {
        const sourceFile = path.join(sourceDir, file);
        const destinationFile = path.join(destinationDir, file);

        fse.copy(sourceFile, destinationFile, (err) => {
          if (err) {
            console.error(err);
            process.exit(1);
          }
          console.log(`Copied ${sourceFile}.`);
        });
      }
    });
  });
}
copyVueApp();
