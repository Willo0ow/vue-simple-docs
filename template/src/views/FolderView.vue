<template>
  <v-list-item>
    <v-list-item-title lines="two">{{ props.name }}</v-list-item-title>
  </v-list-item>
  <v-list v-for="item of dirContent" :key="item.name" class="ml-5">
    <tree-item :key="item.name" :item="item" />
  </v-list>
</template>

<script lang="ts" setup>
import TreeItem from '@/components/treeList/TreeItem.vue';
import { useDirChildrenStore } from '@/store/dirChildren';

const props = defineProps<{
  name: string;
}>();
const { dirContent } = useDirChildrenStore();
</script>
