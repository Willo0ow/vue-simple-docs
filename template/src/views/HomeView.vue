<template>
  <HelloWorld name="Best Product" :stores="10" start-sale="01-10-2024" @on-buy="buyProduct" />
</template>

<script setup lang="ts">
import HelloWorld from '../components/HelloWorld.vue'

const buyProduct = (quantity: number) => {
  console.log(`Buying ${quantity} products`)
}
</script>
