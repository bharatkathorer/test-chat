<template>
  <div v-if="label" class="mb-2 flex items-center space-x-2 capitalize">
    <label class="text-gray-600">{{ label }} </label>
    <p v-if="required" class="text-red-600">*</p>
  </div>
</template>
<script setup>
defineProps({
  label: String,
  required: Boolean
})
</script>
