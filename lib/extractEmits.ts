import { ComponentEmit } from "./types"
export default (lines: string[]): ComponentEmit[] => {
  return lines.map((line) => {
    const regex = /@vueEmit\s*(\[(.*?)\]\s*)?(.*?)\s*(?:-\s*(.*))?$/
    const match = line.match(regex)

    if (!match) {
      console.error('Invalid input format', line)
      return {name: "invalid Emit tag"}
    }

    const [, , paramsStr, emitName, description] = match
    const emittedValues = paramsStr
      ? paramsStr.split(',').map((p) => {
          const [paramName, paramType] = p.trim().split('=')
          return { name: paramName || '', type: paramType ? paramType.trim() : '' }
        })
      : []

    return {
      emittedValues,
      name: emittedValues.length === 0 ? emitName.trim() : emitName.split('[')[0].trim(),
      description: description !== undefined ? description.trim() : ''
    }
  })
}
