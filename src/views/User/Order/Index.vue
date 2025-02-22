<template>
  <AuthLayouts>
    <div class="custom-container">

      <div class="grid gap-6" v-if="orders?.data?.length">
        <div class=" p-4 rounded bg-white" v-for="(item) in orders?.data" :key="item._id">
          <p class="font-semibold">
            ORDER ID : {{ item._id }}
          </p>

          <div class="divide-y border rounded mt-6">
            <div class="p-2 grid grid-cols-4 gap-6" v-for="(product,index) in item.items" :key="product._id">
              <div>
                {{ index + 1 }}. {{ product?.product?.name }}
              </div>
              <div>
                QTY. {{ product.qty }}
              </div>
              <div class="text-end">
                ₹ {{ product.price }}
              </div>
              <div class="text-end text-success">
                Completed
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </AuthLayouts>
</template>
<script setup>
import AuthLayouts from "@/layouts/user/AuthLayouts.vue";
import {onMounted, ref} from "vue";
import {ProductService} from "@/services/User/ProductService";

onMounted(() => {
  getOrders();
})
const orders = ref([]);
const getOrders = async () => {
  const response = await ProductService.orders();

  if (response?.data?.success) {
    orders.value = response.data;
  }
}
</script>
