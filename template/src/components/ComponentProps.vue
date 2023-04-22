<template>
  <BaseTable :items="componentProps" :headers="headers" />
</template>
<script setup lang="ts">
import type { ComponentProp } from 'docs/types';
import BaseTable from '@/components/BaseTable.vue';

defineProps<{
  componentProps: ComponentProp[];
}>();

const headers = [
  {
    text: 'Name',
    value: 'name',
  },
  {
    text: 'Type',
    value: 'type',
  },
  {
    text: 'Default Value',
    value: 'defaultValue',
  },
  {
    text: 'Description',
    value: 'description',
  },
];
</script>
