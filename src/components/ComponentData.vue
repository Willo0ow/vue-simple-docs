<template>
  <BaseTable :items="componentData" :headers="headers" />
</template>
<script setup lang="ts">
import type { VariableDetails } from '@/types/lib';
import BaseTable from '@/components/BaseTable.vue';

defineProps<{
  componentData: VariableDetails[];
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
