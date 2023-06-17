import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { DirectoryObject } from '@/types/generated';

export const useDirChildrenStore = defineStore('dirChildren', () => {
  const dirContent = ref<DirectoryObject[]>();

  const updateDirContent = (newContent: DirectoryObject[]) => {
    dirContent.value = newContent;
  };

  return { dirContent, updateDirContent };
});
