export default (fileContent: string) => {
  const docTagsRegex = /\/\*\*(?:(.|\r|\n)*?@vue[A-Z](?:.|\r|\n)*?)\*\//gm;
  let docTagsSection = '';
  let docTagsMatch: RegExpExecArray | null;
  while ((docTagsMatch = docTagsRegex.exec(fileContent))) {
    if (docTagsSection) {
      docTagsSection = docTagsSection.concat('\r\n', docTagsMatch[0]);
    } else {
      docTagsSection = docTagsMatch[0];
    }
  }
  return docTagsSection;
};
