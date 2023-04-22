export default (documentationTagsSection: string) => {
  const lines = documentationTagsSection.split(/\r?\n/);
  return lines.reduce((returnLines, line) => {
    if (line.includes('@vue')) returnLines.push(line);
    else if (!(line.includes('/**') || line.includes('*/')))
      returnLines[returnLines.length - 1] += ` ${line.replace('*', '').trim()}`;
    return returnLines;
  }, [] as string[]);
};
