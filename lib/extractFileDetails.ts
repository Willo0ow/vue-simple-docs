import fs from 'fs';
import path from 'path';

import extractDocumentationTagsSection from './extractDocumentationTagsSection';
import prepareDocumentationTagsLines from './prepareDocumentationTagsLines';
import { formatFile } from './formatWithPrettier';
import { extractBaseTag, extractFunctionalTag } from './extractTags';

function extractTagsData(documentationTagsSection: string) {
  const tagLines = prepareDocumentationTagsLines(documentationTagsSection);
  let fileDocs = {};
  tagLines.forEach((line) => {
    if (line.includes('@docFile') || line.includes('@docDescription')) {
      const lineBaseTagData = extractBaseTag(line);
      fileDocs = { ...fileDocs, ...lineBaseTagData };
    } else {
      const lineFunctionalTagData = extractFunctionalTag(line);
      if (lineFunctionalTagData.tag) {
        const tag = lineFunctionalTagData.tag.toLowerCase();
        delete lineFunctionalTagData.tag;
        if (fileDocs[tag]) {
          fileDocs[tag].push(lineFunctionalTagData);
        } else {
          fileDocs[tag] = [lineFunctionalTagData];
        }
      }
    }
  });
  return fileDocs;
}

export const generateFileDetails = (file: string, saveDirectory: string) => {
  try {
    const fileContent = fs.readFileSync(file, 'utf-8');
    const documentationTagsSection = extractDocumentationTagsSection(fileContent);
    if (!documentationTagsSection) return undefined;
    const fileTagsData = extractTagsData(documentationTagsSection);
    const fileName = path.basename(file, path.extname(file));

    const fileDetails = {
      name: fileName,
      ...fileTagsData,
    };

    const outputContent = `import type {FileDetails} from "@/types/lib";\n const fileDetails: FileDetails = ${JSON.stringify(
      fileDetails,
    )}; \n export default fileDetails;`;
    const outputPath = saveDirectory;

    if (!fs.existsSync(path.dirname(outputPath))) {
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    }

    fs.writeFileSync(outputPath, outputContent);
    formatFile(outputPath, outputContent);
    console.log(`Generated file for ${fileName}.`);
    return fileTagsData['file'] || '';
  } catch (e) {
    console.error(e);
  }
};
