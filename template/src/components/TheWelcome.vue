<template>
  <v-list lines="two">
    <tree-item v-for="item in componentList.children" :key="item.name" :item="item" />
  </v-list>
</template>

<script setup lang="ts">
import componentList from '@/generated/index';
import TreeItem from '@/components/treeList/TreeItem.vue';
</script>
