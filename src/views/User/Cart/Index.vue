<template>
  <AuthLayouts>
    <div class="custom-container">
      <div class="grid gap-6 md:grid-cols-3" v-if="carts?.items?.length">
        <div class="md:col-span-2 grid gap-6">
          <div class="grid grid-cols-3 font-semibold px-4">
            <div>
              Product
            </div>
            <div>
              Qty
            </div>
            <div class="text-end">
              Price
            </div>
          </div>
          <div class="bg-white p-4 rounded relative" v-for="(item) in carts.items" :key="item.productId._id">
            <button @click="removeToCart(item.productId._id)"
                    class="bg-red-500 rounded-full p-1 text-white hover:bg-red-400 duration-500 ease-in-out absolute -right-2 -top-2">
              <XMarkIcon class="h-4 w-4"/>
            </button>
            <div class="flex space-x-2 mb-4">
              <div class="px-2 bg-success rounded-full py-0.5 text-white"
                   v-for="(category) in item.productId.categories"
                   :key="category._id">
                {{ category.name }}
              </div>
            </div>
            <div class="grid grid-cols-3 font-semibold">
              <div>
                {{ item.productId.name }}
              </div>
              <div>
                {{ item.qty }}
              </div>
              <div class="text-end">
                ₹ {{ item.productId.price }}
              </div>
            </div>

          </div>
        </div>
        <div class="">
          <div class="p-4 md:sticky md:top-32 bg-white">
            <div class="flex justify-between text-xl font-semibold">
              <p> Total Amount </p>
              <p>₹ {{ carts.totalPrice }}</p>
            </div>
            <div class="mt-6">
              <button @click="checkout" class="btn-front w-full">Checkout</button>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="py-24 flex justify-center space-x-2">
        <p class="font-semibold text-error-dark">Cart Empty!</p>
        <RouterLink class="text-blue-700 hover:text-blue-500 font-bold" to="/">Add products in cart
        </RouterLink>
      </div>
    </div>
  </AuthLayouts>
</template>
<script setup>
import AuthLayouts from "@/layouts/user/AuthLayouts.vue";
import {onMounted, ref} from "vue";
import {ProductService} from "@/services/User/ProductService";
import {XMarkIcon} from "@heroicons/vue/24/outline";
import router from "@/router";

onMounted(() => {
  getCart();
})
const carts = ref([]);
const getCart = async () => {
  const response = await ProductService.carts();
  if (response.data.success) {
    carts.value = await response.data;
  }
}
const checkout = async () => {
  const response = await ProductService.checkout();
  if (response.data.success) {
    await getCart();
    await ProductService.cartUpdate(carts.value?.items ?? []);
    router.push('/orders')
  }
}
const removeToCart = async (id) => {

  const result = await ProductService.removeToCart(id);
  if (result.data.success) {
    await getCart();
    await ProductService.cartUpdate(carts.value?.items ?? []);
  }
}
</script>
