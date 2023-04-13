<template>
  <BaseTable :items="componentEmits" :headers="headers">
    <template #item="{ item, head }">
      <div v-if="head.value === 'emittedValues'">

        <div v-for="(emitValue, idx) in item.emittedValues" :key="idx">
          {{ emitValue.name }} - {{ emitValue.type }}
  
        </div>
      </div>
    </template>
  </BaseTable>
</template>
<script setup lang="ts">
import type { ComponentEmit } from 'docs/types'
import BaseTable from '@/components/BaseTable.vue'

defineProps<{
  componentEmits: ComponentEmit[]
}>()

const headers = [
  {
    text: 'Name',
    value: 'name'
  },
  {
    text: 'Emitted Payload',
    value: 'emittedValues'
  },
  {
    text: 'Description',
    value: 'description'
  }
]
</script>
