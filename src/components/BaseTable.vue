<template>
  <v-table density="compact">
    <thead>
      <tr>
        <th class="text-left" v-for="(head, index) in headers" :key="index">
          {{ head.text }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, idx) in items" :key="idx">
        <td v-for="(head, index) in headers" :key="index">
          <slot name="item" :item="item" :head="head">
            {{ item[head.value] }}
          </slot>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
/**
 * @docProp {number} [param=0] - number of params
 */

type TableHeader = {
  text: string;
  value: string;
};
defineProps<{
  items: { [key: string]: any }[];
  headers: TableHeader[];
}>();
</script>
