import fs from 'fs';
import path from 'path';
import { cwd } from 'process';

import extractScriptDetails from './extractScriptDetails';
import extractDocumentationTagsSection from './extractDocumentationTagsSection';

import extractName from './extractName';
import extractDescription from './extractDescription';
import formatDocumentationTagsLines from './formatDocumentationTagsLines';
import extractDataLikeTags, { LineTypes } from './extractDataLikeTags';
import extractMethods from './extractMethods';
import extractEmits from './extractEmits';

function extractVueComponentElemets(documentationTagsSection: string) {
  const tagLines = formatDocumentationTagsLines(documentationTagsSection);
  const vuePropLines = tagLines.filter((line) => line.includes('@vueProp'));
  const vueEmitLines = tagLines.filter((line) => line.includes('@vueEmit'));
  const vueDataLines = tagLines.filter((line) => line.includes('@vueData'));
  const vueMethodLines = tagLines.filter((line) => line.includes('@vueMethod'));
  const vueComputedLines = tagLines.filter((line) => line.includes('@vueComputed'));

  return {
    props: extractDataLikeTags(vuePropLines, LineTypes.PROP),
    emits: extractEmits(vueEmitLines),
    data: extractDataLikeTags(vueDataLines),
    computed: extractDataLikeTags(vueComputedLines, LineTypes.COMPUTED),
    methods: extractMethods(vueMethodLines)
  };
}
const baseDir = cwd();
export const generateComponentData = (vueFile: string, saveDirectory: string) => {
  const filePath = vueFile;
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    const scriptTags = extractScriptDetails(fileContent);
    const documentationTagsSection = extractDocumentationTagsSection(fileContent);
    const elements = extractVueComponentElemets(documentationTagsSection);
    const fileName = path.basename(vueFile, path.extname(vueFile));

    const vueComponentDetails = {
      name: extractName(documentationTagsSection) || fileName,
      description: extractDescription(documentationTagsSection),
      ...scriptTags,
      ...elements
    };

    const outputContent = `import type {ComponentDetails} from "@/types/generated";\n const componentDetails: ComponentDetails = ${JSON.stringify(
      vueComponentDetails
    )}; \n export default componentDetails;`;
    const outputPath = saveDirectory;

    if (!fs.existsSync(path.dirname(outputPath))) {
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    }

    fs.writeFileSync(outputPath, outputContent);
    console.log(`Generated file for ${fileName}.`);
  } catch (e) {
    console.error(e);
  }
};
