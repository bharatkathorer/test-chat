<template>
  <AuthLayout>
    <div class=" p-4 rounded bg-white" v-if="item">
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
  </AuthLayout>
</template>
<script setup>
import AuthLayout from "@/layouts/admin/AuthLayout.vue";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import OrderService from "@/services/Admin/OrderService";

const route = useRoute()
const item = ref();
onMounted(() => {
  getData();
});

const loading = ref(false);
const getData = async () => {
  loading.value = true;
  const result = await OrderService.view(route.params._id);
  if (result.data.success) {
    item.value = result.data.data;
  }
  loading.value = false;
}


</script>
