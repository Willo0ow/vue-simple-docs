export default (documentationTagsSection: string) => {
  const descriptionRegex = /@vueDescription\s+([\w-]+)/
  const descriptionMatch = descriptionRegex.exec(documentationTagsSection)
  return descriptionMatch?.[1] || ''
}
