<template>
  <BaseTable :items="componentData" :headers="headers" />
</template>
<script setup lang="ts">
import type { ComponentData } from 'docs/types'
import BaseTable from '@/components/BaseTable.vue'

defineProps<{
  componentData: ComponentData[]
}>()

const headers = [
  {
    text: 'Name',
    value: 'name'
  },
  {
    text: 'Type',
    value: 'type'
  },
  {
    text: 'Default Value',
    value: 'defaultValue'
  },
  {
    text: 'Description',
    value: 'description'
  }
]
</script>
