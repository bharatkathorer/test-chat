<template>
  <div class="w-full">

    <InputLabel :label="label" :required="required"/>
    <Multiselect

        autocomplete="off"
        v-bind="$attrs"
         class="w-full py-1 !rounded-md !border-gray-600 !border focus:!border-gray-600 focus:!ring-0 focus:!outline-gray-700"
        :required="required"
        :placeholder="placeholder"
        :label="labelKey"
        :trackBy="trackKey"
        v-model="modelData"
        :valueProp="returnValue"
        :disabled="disabled"
        :object="object"
        :mode="mode"
        :searchable="searchable"
        :max="max"
        :canClear="canClear"
        :searchStart="searchStart"
        @change="emit('change',$event)"
        @input="emit('update:modelValue', $event);"
        :options="options">
      <slot/>
    </Multiselect>
  </div>
</template>

<script setup>

import Multiselect from '@vueform/multiselect';
import {ref, watch} from "vue";
import InputLabel from "@/components/forms/InputLabel.vue";

const props = defineProps({
  label: String,
  required: Boolean,
  modelValue: [String, Number, Boolean, Array, Object],
  max: [Number],
  type: {
    type: String,
    default: 'text'
  },
  trackKey: {
    type: String,
    default: 'name'
  },
  labelKey: {
    type: String,
    default: 'name'
  },
  returnValue: {
    type: String,
    default: '_id'
  },
  placeholder: {
    type: String,
    default: 'Select'
  },
  disabled: {
    type: Boolean,
    default: false
  },

  canClear: {
    type: Boolean,
    default: true
  },
  object: {
    type: Boolean,
    default: false
  },
  searchStart: {
    type: Boolean,
    default: true
  },
  mode: {
    type: String,
    default: 'single'
  },
  searchable: {
    type: Boolean,
    default: true
  },
  error: String,
  options: {
    type: [Object, Array],
    default: [],
  },


})
const emit = defineEmits(['update:modelValue', 'change']);

const modelData = ref(props.modelValue);
watch(() => props.modelValue, (_new, _old) => {
  modelData.value = _new;
})
</script>


<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped>.is-open {
  z-index: 99 !important;
}</style>
