<template>
  <div class="cursor-pointer" @click="isOpen=true">
    <slot>
      <TrashIcon class="h-5 w-5" aria-hidden="true"/>
    </slot>
  </div>
  <DialogBox classes="w-92" :buttonName="btnLabel" :heading="label" :description="message" v-model="isOpen"
             @confirmSubmit="confirmDelete"/>
</template>
<script setup>
import {TrashIcon} from '@heroicons/vue/20/solid'
import DialogBox from "@/Components/DialogBox.vue";
import '../../utils/adminAxios';
import axios from "axios";
import {ref} from "vue";

const props = defineProps({
  method: {
    type: String,
    default: 'delete'
  },
  classes: {type: String},
  href: String,
  btnLabel: {
    type: String,
    default: 'Delete'
  },
  label: {
    type: String,
    default: 'Delete'
  },
  message: {
    type: String,
    default: 'Are you sure you want to delete ?'
  },

})
const emit = defineEmits(['deleteResponse']);
const isOpen = ref(false);

const confirmDelete = async () => {
  isOpen.value = false;
  try {
    const result = await axios[props.method](props.href);
    if (result.data.success) {
      emit('deleteResponse', result.data);
    } else {
      console.log(result);
    }
  } catch (e) {
    console.log(e);
  }

}
</script>
