export enum LineTypes {
  DATA = 'data',
  COMPUTED = 'computed',
  PROP = 'prop',
}

import { ComponentElement } from "./types"
export default (lines: string[], linesType = LineTypes.DATA): ComponentElement[] => {
  return lines.map((line) => {
    let regex = /\*\s*@vueData\s*\{(\w+)\}\s*(\[(\w+)(=([\w']+))?\]|(\w+))\s*-\s*(.*)/
    if (linesType === LineTypes.PROP)
      regex = /\*\s*@vueProp\s*\{(\w+)\}\s*(\[(\w+)(=([\w']+))?\]|(\w+))\s*-\s*(.*)/
    if (linesType === LineTypes.COMPUTED)
      regex = /\*\s*@vueComputed\s*\{(\w+)\}\s*(\[(\w+)(=([\w']+))?\]|(\w+))\s*-\s*(.*)/
    const match = line.match(regex)

    if (!match) {
      console.error('Invalid input format', line)
      return {name: `invalid ${linesType} tag`}
    }

    const [, type, , name1, , defaultValue, name2, description] = match
    const name = name2 || name1
    return { type, name, defaultValue: defaultValue || null, description }
  })
}
