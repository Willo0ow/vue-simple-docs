<template>
  <BaseTable :items="componentComputed" :headers="headers" />
</template>
<script setup lang="ts">
import type { ComponentComputed } from 'docs/types'
import BaseTable from '@/components/BaseTable.vue'

defineProps<{
  componentComputed: ComponentComputed[]
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
