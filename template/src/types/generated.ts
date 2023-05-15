export type FileDetails = {
  name: string;
  file?: string;
  description?: string;
  prop?: VariableDetails[];
  emit?: EmitDetails[];
  data?: VariableDetails[];
  computed?: VariableDetails[];
  method?: MethodDetails[];
  param?: VariableDetails[];
  return?: VariableDetails[];
  [key: string]: ElementDetails[] | string | undefined;
};

export type EmitDetails = {
  params?: Parameter[];
  name: string;
  description?: string;
};
export type VariableDetails = {
  type?: string;
  name: string;
  defaultValue?: string | null;
  description?: string;
};

export type MethodDetails = {
  type?: string;
  params?: Parameter[];
  name: string;
  description?: string;
};

type ElementDetails = MethodDetails & VariableDetails;

type Parameter = {
  name: string;
  type?: string;
};

export interface FileObject {
  name: string;
  type: 'file';
  fileType?: string;
  extension: string;
  prefix: string;
}

export interface DirectoryObject {
  name: string;
  type: 'folder';
  children: FileSystemObject[];
}

export type FileSystemObject = DirectoryObject | FileObject;
