<template>
  <ul class="list-disc pl-4" v-if="formError">
    <li class="capitalize text-error-dark" v-if="error?.message">{{ error?.message }}</li>
  </ul>

  <div class="list-disc" v-else-if="(type == 'object')">
    <div v-for="(item,key) in Object(error.errors)" :key="key">
      <div class=" text-error-dark" v-if="(key==name)">
        {{ item['message'].replace('Path', 'The ').replace('is', 'field is').replaceAll('`', '') }}
      </div>
    </div>
  </div>

</template>
<script setup>
import {computed} from "vue";

const props = defineProps({
  error: [Array, String, Object],
  formError: Boolean,
  name: String,
})

const type = computed(() => {
  return (typeof props.error.errors);
})
</script>
