<template>
  <v-list lines="one">
    <v-list-item v-for="item in componentList" :key="item.name">
      <v-list-item-title
        ><router-link :to="{ name: 'ComponentDetails', params: { name: item.name } }">{{
          item.name
        }}</router-link></v-list-item-title
      >
    </v-list-item>
  </v-list>
</template>

<script setup lang="ts">
import componentList from '../generated/index'
</script>
