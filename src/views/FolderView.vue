<template>
  <v-list-item>
    <v-list-item-title>{{ props.name }}</v-list-item-title>
  </v-list-item>
  <v-list v-for="item of dirContent" :key="item.name" class="ml-5">
    <tree-item :key="item.name" :item="item" />
  </v-list>
</template>

<script lang="ts" setup>
import TreeItem from '@/components/treeList/TreeItem.vue';
import { useDirChildrenStore } from '@/store/dirChildren';

interface MyProps {
  name: string;
}

const props = defineProps<MyProps>();
const { dirContent } = useDirChildrenStore();
</script>
