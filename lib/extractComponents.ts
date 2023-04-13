import fs from "fs";
import path from "path";
import config from "../docs.config";
import { cwd } from "process";

import extractScriptDetails from "./extractScriptDetails";
import extractDocumentationTagsSection from "./extractDocumentationTagsSection";

import extractName, { FileTypes } from "./extractName";
import extractDescription from "./extractDescription";
import formatDocumentationTagsLines from "./formatDocumentationTagsLines";
import extractDataLikeTags, { LineTypes } from "./extractDataLikeTags";
import extractMethods from "./extractMethods";
import extractEmits from "./extractEmits";

function extractVueComponentElemets(documentationTagsSection: string) {
  const tagLines = formatDocumentationTagsLines(documentationTagsSection);
  const vuePropLines = tagLines.filter((line) => line.includes("@vueProp"));
  const vueEmitLines = tagLines.filter((line) => line.includes("@vueEmit"));
  const vueDataLines = tagLines.filter((line) => line.includes("@vueData"));
  const vueMethodLines = tagLines.filter((line) => line.includes("@vueMethod"));
  const vueComputedLines = tagLines.filter((line) =>
    line.includes("@vueComputed")
  );

  return {
    props: extractDataLikeTags(vuePropLines, LineTypes.PROP),
    emits: extractEmits(vueEmitLines),
    data: extractDataLikeTags(vueDataLines),
    computed: extractDataLikeTags(vueComputedLines, LineTypes.COMPUTED),
    methods: extractMethods(vueMethodLines),
  };
}
export const generateComponentsData = () => {
  const baseDir = cwd();
  const sourceDir = path.join(baseDir, config.componentDir);
  fs.readdir(sourceDir, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }

    const components: Array<{ name: string }> = [];
    const vueFiles = files.filter((file) => path.extname(file) === ".vue");

    vueFiles.forEach((vueFile) => {
      const filePath = path.join(baseDir, config.componentDir, vueFile);
      try {
        const fileContent = fs.readFileSync(filePath, "utf-8");

        const scriptTags = extractScriptDetails(fileContent);
        const documentationTagsSection =
          extractDocumentationTagsSection(fileContent);
        const elements = extractVueComponentElemets(documentationTagsSection);
        const fileName = path.basename(vueFile, path.extname(vueFile));

        const vueComponentDetails = {
          name: extractName(documentationTagsSection) || fileName,
          description: extractDescription(documentationTagsSection),
          ...scriptTags,
          ...elements,
        };

        const outputContent = `import type {ComponentDetails} from "../types/generated";\n const componentDetails: ComponentDetails = ${JSON.stringify(
          vueComponentDetails
        )}; \n export default componentDetails;`;
        const outputPath = path.join(
          baseDir,
          config.outputDir,
          "src",
          "generated",
          `${fileName}.ts`
        );

        if (!fs.existsSync(path.dirname(outputPath))) {
          fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        }

        fs.writeFileSync(outputPath, outputContent);
        console.log(`Generated file for ${fileName}.`);
        components.push({ name: fileName });
      } catch (e) {
        console.error(e);
      }
    });
    const indexPath = path.join(
      baseDir,
      config.outputDir,
      "src",
      "generated",
      `index.ts`
    );

    const outputIndexPath = indexPath;

    if (!fs.existsSync(path.dirname(outputIndexPath))) {
      fs.mkdirSync(path.dirname(outputIndexPath), { recursive: true });
    }

    const indexData = `const components = ${JSON.stringify(
      components
    )}; \n export default components;`;

    fs.writeFile(outputIndexPath, indexData, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`Generated index file.`);
    });
  });
};
