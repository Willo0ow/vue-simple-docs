<template>
  <v-container class="pa-3">
    <v-card-title class="text-h3 pl-0">{{ name }}</v-card-title>
    <v-sheet elevation="4" class="my-4">
      <v-card-title class="text-h6">Description</v-card-title>
      <v-card-text v-if="componentDetails">
        <p>{{ componentDetails.description }}</p>
        <p>Script setup: {{ componentDetails.isSetup }}</p>
        <p>Script langs: {{ componentDetails.lang }}</p>
      </v-card-text>
    </v-sheet>
    <v-sheet elevation="4" class="my-4" v-if="componentDetails?.props?.length">
      <v-card-title class="text-h6">Props</v-card-title>
      <v-card-text>
        <ComponentProps :component-props="componentDetails?.props" />
      </v-card-text>
    </v-sheet>
    <v-sheet elevation="4" class="my-4" v-if="componentDetails?.emits?.length">
      <v-card-title class="text-h6">Emits</v-card-title>
      <v-card-text>
        <ComponentEmits :component-emits="componentDetails?.emits" />
      </v-card-text>
    </v-sheet>
    <v-sheet elevation="4" class="my-4" v-if="componentDetails?.data?.length">
      <v-card-title class="text-h6">Data</v-card-title>
      <v-card-text>
        <ComponentData :component-data="componentDetails?.data" />
      </v-card-text>
    </v-sheet>

    <v-sheet elevation="4" class="my-4" v-if="componentDetails?.computed?.length">
      <v-card-title class="text-h6">Computed</v-card-title>
      <v-card-text>
        <ComponentComputed :component-computed="componentDetails?.computed" />
      </v-card-text>
    </v-sheet>
    <v-sheet elevation="4" class="my-4" v-if="componentDetails?.methods?.length">
      <v-card-title class="text-h6">Methods</v-card-title>
      <v-card-text>
        <ComponentMethods :component-methods="componentDetails?.methods" />
      </v-card-text>
    </v-sheet>
  </v-container>
</template>
<script lang="ts">
import { ref, onMounted } from 'vue'
import type { ComponentDetails } from 'docs/types'

import ComponentProps from '@/components/ComponentProps.vue'
import ComponentEmits from '@/components/ComponentEmits.vue'
import ComponentComputed from '@/components/ComponentComputed.vue'
import ComponentData from '@/components/ComponentData.vue'
import ComponentMethods from '@/components/ComponentMethods.vue'

export default {
  name: 'ComponentDetails',
  components: {
    ComponentProps,
    ComponentEmits,
    ComponentComputed,
    ComponentData,
    ComponentMethods
  },
  props: {
    name: {
      type: String,
      required: true
    },
    prefix: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const componentDetails = ref<ComponentDetails | null>(null)
    onMounted(async () => {
      try {
        const componentDetailsFile = await import(
          `../generated/${props.prefix}${props.name}.ts`
        ).then((module) => module?.default)
        componentDetails.value = componentDetailsFile
      } catch (error) {
        console.error(error)
      }
    })
    return {
      componentDetails
    }
  }
}
</script>

<style></style>
