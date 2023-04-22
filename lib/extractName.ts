export enum FileTypes {
  Component = 'Component',
  Composable = 'Composable',
}

export default (documentationTagsSection: string, fileType = FileTypes.Component) => {
  let nameRegex = /@vueComponent\s+([\w-]+)/;
  if (fileType === FileTypes.Composable) nameRegex = /@vueComposable\s+([\w-]+)/;

  const nameMatch = nameRegex.exec(documentationTagsSection);
  return nameMatch?.[1] || '';
};
