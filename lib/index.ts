import fs from 'fs';
import fse from 'fs-extra';
import path from 'path';

function copyVueApp() {
  const sourceDir = path.join(process.cwd(), "template");
  const destinationDir = path.join(process.cwd(), 'docs');

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
    files.forEach(file => {
      const sourceFile = path.join(sourceDir, file);
      const destinationFile = path.join(destinationDir, file);

      fse.copy(sourceFile, destinationFile, err => {
        if (err) {
          console.error(err);
          process.exit(1);
        }

        console.log(`${sourceFile} was copied to ${destinationFile}`);
      });
    });
  });
}
copyVueApp();
