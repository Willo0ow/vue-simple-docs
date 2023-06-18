import fs from 'fs';
import path from 'path';

// Function to delete the contents of a directory
export function deleteDirectoryContents(directory: string) {
  if (!fs.existsSync(directory)) {
    return;
  }

  fs.readdirSync(directory).forEach((file) => {
    const filePath = path.join(directory, file);

    if (fs.lstatSync(filePath).isDirectory()) {
      deleteDirectoryContents(filePath);
      fs.rmdirSync(filePath);
    } else {
      fs.unlinkSync(filePath);
    }
  });
}
