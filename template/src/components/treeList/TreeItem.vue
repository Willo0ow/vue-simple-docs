<template>
  <v-list-item>
    <v-list-item-title
      ><router-link
        :to="{
          name: 'ComponentDetails',
          params: { name: item.name },
          query: { prefix: item.prefix }
        }"
        >{{ item.name }}</router-link
      >
    </v-list-item-title>
    <v-list-item-subtitle v-if="item?.children?.length">
      <v-list lines="two">
        <tree-item
          v-for="child in item.children"
          :item="child"
          :key="`${child.prefix}${child.name}`"
        />
      </v-list>
    </v-list-item-subtitle>
  </v-list-item>
</template>

<script setup lang="ts">
import { type FileSystemObject } from '@/types/generated'
/**
 * @vueProp {number} [param=0] - number of params
 */

defineProps<{
  item: FileSystemObject
}>()
</script>
