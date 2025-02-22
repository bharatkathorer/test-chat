<template>
  <RouterLink v-if="href" :to="href">
    <button v-bind="$attrs"
            class="py-2.5 px-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-md capitalize shadow disabled:bg-primary-disabled disabled:cursor-not-allowed">
      <slot/>
    </button>
  </RouterLink>
  <button v-else v-bind="$attrs"
          class="py-2.5 px-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-md capitalize shadow disabled:bg-primary-disabled disabled:cursor-not-allowed">
    <slot/>
  </button>

</template>

<script setup>
import {RouterLink} from "vue-router";

defineProps({
  href: String
});

</script>
