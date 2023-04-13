import { ComponentMethod } from "./types"

export default (lines: string[]): ComponentMethod[] => {
  return lines.map((line) => {
    const regex = /@vueMethod\s+\{(.*?)\}\s*(\[(.*?)\]\s*)?(.*?)\s*(?:-\s*(.*))?$/
    const match = line.match(regex)

    if (!match) {
      console.error('Invalid input format', line)
      return {name: "invalid Method tag"}
    }
    const [, returnType, paramsStr, , functionName, description] = line.match(regex) || []
    const parameters = paramsStr
      ? paramsStr.split(',').map((p) => {
          const [paramName, paramType] = p.trim().split('=')
          return { name: paramName, type: paramType ? paramType.trim() : '' }
        })
      : []

    const functionNameParts = functionName?.split('=') || []
    const nameIndex = functionNameParts.length > 1 ? 1 : 0
    const functionNameValue = functionNameParts[nameIndex]?.trim() || ''

    return {
      returnType: returnType?.trim() || '',
      parameters,
      name: functionNameValue,
      description: description?.trim() || ''
    }
  })
}
