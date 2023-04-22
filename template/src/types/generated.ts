export type ComponentDetails = {
  name: string;
  description: string;
  lang: string;
  isSetup: string;
  props?: ComponentElement[];
  emits?: ComponentEmit[];
  data?: ComponentElement[];
  computed?: ComponentElement[];
  methods?: ComponentMethod[];
};

export type ComponentEmit = {
  emittedValues?: Parameter[];
  name: string;
  description?: string;
};
export type ComponentElement = {
  type?: string;
  name: string;
  defaultValue?: string | null;
  description?: string;
};

export type ComponentMethod = {
  returnType?: string;
  parameters?: Parameter[];
  name: string;
  description?: string;
};

type Parameter = {
  name: string;
  type?: string;
};

type FileObject = {
  name: string;
  type: 'file';
  extension: string;
  prefix: string;
};

type DirectoryObject = {
  name: string;
  type: 'folder';
  children: FileSystemObject[];
};

export type FileSystemObject = DirectoryObject | FileObject;
