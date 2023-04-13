<template>
  <div>
    <v-card width="400">
      <v-card-title>{{ title }}</v-card-title>
      <v-card-subtitle>{{ name }}</v-card-subtitle>
      <v-card-text>
        <p>This product is sold in {{ stores }} stores.</p>
        <p v-if="daysToSale > 0">The sale starts in {{ daysToSale }} days.</p>
        <p v-else-if="daysToSale === 0">The sale starts today!</p>
        <p v-else>The sale has already started {{ daysToSale }} days ago.</p>
        <p>
          <v-btn size="x-small" @click="changeQuantity(false)">-</v-btn>
          <span class="mx-3">{{ quantity }}</span>
          <v-btn size="x-small" @click="changeQuantity(true)">+</v-btn>
        </p>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="$emit('onBuy', quantity)">Buy</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup lang="ts">
/**
 * @vueComponent Hello
 * @vueDescription dsdfsfds description
 * @vueProp {string} [title='My product'] - component title
 * @vueProp {string} name - product's name
 * @vueProp {string} [startSale=undefined] - start date of the product's sale
 * @vueProp {number} stores - number of stores where the product is sold
 * @vueData {Date} [today=new Date()] - today's date
 * @vueData {number} [quantity=1] - quantity of items to buy
 * @vueComputed {number} daysToSale - days remaining until the sale starts
 * @vueEmit [quantity=number] onBuy - emitted when the buy button is clicked,
 * emits the quantity of items to buy
 * @vueMethod {void} [add=boolean] changeQuantity - changes the quantity of items to buy
 * depending on the value of the add parameter.
 * If add is true, the quantity is increased by 1, otherwise it is decreased by 1.
 */
import { ref, computed } from 'vue'

const props = withDefaults(
  defineProps<{
    title?: string
    name: string
    startSale?: string
    stores: number
  }>(),
  {
    title: 'My product'
  }
)

defineEmits<{
  (e: 'onBuy', amount: number): void
}>()

const today = new Date()
const quantity = ref(1)
const daysToSale = computed(() => {
  if (props.startSale) {
    return (new Date(props.startSale).getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  }
  return 0
})
const changeQuantity = (add: boolean) => {
  if (add) {
    quantity.value++
  } else {
    quantity.value--
  }
}
</script>
<script></script>
<style scoped></style>
