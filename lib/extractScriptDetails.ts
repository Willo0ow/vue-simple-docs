export default (fileContent: string) => {
  const scriptTagRegex = /<script[^>]*>/g
  const scriptLangRegex = /lang="(.*)"/

  const scriptTags = { isSetup: '', lang: '' }
  let scriptTag: RegExpExecArray | null
  while ((scriptTag = scriptTagRegex.exec(fileContent))) {
    const langValue = scriptLangRegex.exec(scriptTag[0])?.[1] || 'js'
    const isSetup = scriptTag[0]?.includes('setup')
    scriptTags.isSetup = scriptTags.isSetup
      ? `${scriptTags.isSetup}, ${isSetup.toString()}`
      : isSetup.toString()
    scriptTags.lang = scriptTags.lang ? `${scriptTags.lang}, ${langValue}` : langValue
  }
  return scriptTags
}
