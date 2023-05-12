const typeGroup = /(\{([^\}]+)\})*/.source;
const paramsGroup = /(\(([^\)]*)\))*/.source;
const nameGroup = /([^\s]+)/.source;
const nameWithDefaultValueGroup = /\[([^\s\]=]*)(=([^\]]+))?\]/.source;
const descriptionGroup = /(?:-\s+([^\*\r\n]*))?/.source;
const oneOrMoreWhiteSpace = /\s+/.source;
const zeroOrMoreWhiteSpace = /\s*/.source;
const tagGroup = /@doc(\w+)/.source;

const functionalTagRegex = new RegExp(
  `${tagGroup}${oneOrMoreWhiteSpace}${typeGroup}${zeroOrMoreWhiteSpace}${paramsGroup}${zeroOrMoreWhiteSpace}\(${nameWithDefaultValueGroup}\|${nameGroup}\)${zeroOrMoreWhiteSpace}${descriptionGroup}`,
);

function formatFunctionalTagRegexMatch(matchArray: Array<string>) {
  const [, tag, , variableType, , paramString, , nameWithDefault, , defaultValue, variableName, description] =
    matchArray;
  const params = paramString?.split(',').map((param) => {
    const [paramName, paramType] = param.split('=');
    return { name: paramName, type: paramType };
  });
  const data = { tag, type: variableType, params, name: nameWithDefault || variableName, defaultValue, description };
  return data;
}
export const extractFunctionalTag = (line: string) => {
  const match = line.match(functionalTagRegex);
  return formatFunctionalTagRegexMatch(match);
};

const baseTagRegex = /@doc(\w+)\s+([\w- ]+)/;

function formatBaseTagRegexMatch(matchArray: Array<string>) {
  const [, tag, content] = matchArray;
  return { [tag.toLowerCase()]: content };
}

export const extractBaseTag = (line: string) => {
  const match = line.match(baseTagRegex);
  return formatBaseTagRegexMatch(match);
};
