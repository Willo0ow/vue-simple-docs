<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import SearchBarVue from "./components/SearchBar.vue";
</script>

<template>
  <v-app>
    <v-app-bar absolute>
      <v-toolbar-title
        ><router-link :to="{ name: 'Home' }"
          >Vue Simple Docs</router-link
        ></v-toolbar-title
      >
      <SearchBarVue />
      <RouterLink :to="{ name: 'About' }" class="mr-5">About</RouterLink>
    </v-app-bar>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>
