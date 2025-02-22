<script setup>
import {onMounted, ref} from 'vue';
import InputLabel from "@/components/forms/InputLabel.vue";
import InputError from "@/components/forms/InputError.vue";

defineProps(['modelValue', 'disabled', 'required', 'label', 'error', 'name']);

defineEmits(['update:modelValue']);

const input = ref(null);

onMounted(() => {
  if (input.value.hasAttribute('autofocus')) {
    input.value.focus();
  }
});
</script>

<template>
  <div>
    <InputLabel :label="label" :required="required"/>
    <input ref="input"
           class="w-full py-2.5 px-4 rounded-md border-gray-600 border focus:border-gray-600 focus:ring-0 focus:outline-gray-700"
           :value="modelValue"
           :disabled="disabled"
           v-bind="$attrs"
           @input="$emit('update:modelValue', $event.target.value)"
    >
    <InputError v-if="name&&error" class="mt-2" :error="error" :name="name"/>
  </div>
</template>
