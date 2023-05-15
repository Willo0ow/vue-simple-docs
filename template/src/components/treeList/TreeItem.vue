<template>
  <v-list-item>
    <v-list-item-title>
      <router-link :to="itemRoute" @click="props.item.children ? updateFolderContent(props.item.children) : null">
        {{ item.name }}
      </router-link>
    </v-list-item-title>
    <v-list-item-subtitle v-if="item?.children?.length">
      <v-list lines="two">
        <tree-item v-for="child in item.children" :item="child" :key="`${child.prefix}${child.name}`" />
      </v-list>
    </v-list-item-subtitle>
  </v-list-item>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { type FileSystemObject } from '@/types/generated';
import { useDirChildrenStore } from '@/store/dirChildren';
/**
 * @docProp {number} [param=0] - number of params
 */

const props = defineProps<{
  item: FileSystemObject;
}>();

const itemRoute = computed(() => {
  if (props.item.type === 'folder') {
    return {
      name: 'FolderView',
      params: { name: props.item.name },
    };
  }
  return {
    name: 'ComponentDetails',
    params: { name: props.item.name },
    query: { prefix: props.item.prefix },
  };
});
console.log(props.item.children);
const { updateFolderContent } = useDirChildrenStore();
</script>
