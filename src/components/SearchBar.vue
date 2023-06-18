<template>
  <v-autocomplete
    :items="searchItems"
    auto-select-first
    class="flex-full-width"
    density="comfortable"
    item-props
    menu-icon=""
    placeholder="Search for files"
    prepend-inner-icon="mdi-magnify"
    rounded
    theme="light"
    variant="solo"
    item-title="name"
    return-object
    @update:modelValue="($event) => goToFile($event)"
  ></v-autocomplete>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { searchItems } from '@/generated/index';
import { SearchItem } from '@/types/lib';

const router = useRouter();
const goToFile = (event: SearchItem) => {
  router.push({
    name: 'FileView',
    params: { name: event.name },
    query: { prefix: event.prefix },
  });
};
</script>
