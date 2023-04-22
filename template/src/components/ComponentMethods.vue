<template>
  <BaseTable :items="componentMethods" :headers="headers">
    <template #item="{ item, head }">
      <div v-if="head.value === 'parameters'">
        <div v-for="(parameter, idx) in item.parameters" :key="idx">{{ parameter.name }} - {{ parameter.type }}</div>
      </div>
    </template>
  </BaseTable>
</template>
<script setup lang="ts">
import type { ComponentMethod } from 'docs/types';
import BaseTable from '@/components/BaseTable.vue';

defineProps<{
  componentMethods: ComponentMethod[];
}>();

const headers = [
  {
    text: 'Name',
    value: 'name',
  },
  {
    text: 'Return type',
    value: 'returnType',
  },
  {
    text: 'Parameters',
    value: 'parameters',
  },
  {
    text: 'Description',
    value: 'description',
  },
];
</script>
