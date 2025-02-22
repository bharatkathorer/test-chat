<template>
  <div class="shadow-md rounded-lg overflow-hidden">

    <img class="w-full h-56 object-cover" :src="`${base_url}${item?.cover}`"/>
    <div class="p-4">
      <p class="text-lg">{{ item?.name }}</p>
      <p class="font-bold text-lg">Rs.{{ item?.price }}</p>
    </div>
    <div class="flex" v-if="!inCart">
      <PrimaryButton @click="emit('addToCart',item._id)" class="w-full btn-front">Add To Cart</PrimaryButton>
    </div>
    <div v-else>
      <PrimaryButton @click="emit('removeToCart',item._id)" class="w-full btn-front">Remove To Cart</PrimaryButton>
    </div>
  </div>
</template>

<script setup>

import PrimaryButton from "@/components/forms/PrimaryButton.vue";
import {base_url} from "@/utils/constData";
import {computed} from "vue";

const props = defineProps({
  item: [Array, Object],
  carts: [Array, Object]
})

const inCart = computed(() => {
  return props.carts.find((item) => (item.productId == props.item._id));
})

const emit = defineEmits([
  'removeToCart', 'addToCart'
]);
</script>
