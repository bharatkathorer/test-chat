<template>
  <AuthLayouts>
<Chat/>
<!--    <InfinityScroll url="products"-->
<!--                    @loadData="loadData"/>-->
<!--    <div class="custom-container">-->

<!--      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" v-if="data.length">-->

<!--        <Product-->
<!--            v-for="(item) in data"-->
<!--            :key="item._id"-->
<!--            :item="item"-->
<!--            :carts="response.items"-->
<!--            @removeToCart="removeToCart"-->
<!--            @addToCart="addToCart"-->
<!--        />-->

<!--      </div>-->
<!--    </div>-->
  </AuthLayouts>
</template>
<script setup>
import AuthLayouts from "@/layouts/user/AuthLayouts.vue";
import {ref} from "vue";
import {ProductService} from "@/services/User/ProductService";
import {cartStore} from "@/stores/cartStore";
import InfinityScroll from "@/components/InfinityScroll.vue";
import Product from "@/components/Product.vue";
import Chat from "@/views/Chat.vue";

const response = ref();
const data = ref([]);

const loadData = async (resp) => {
  response.value = resp.response;
  data.value = await resp.data;
}

const addToCart = async (id) => {
  const result = await ProductService.addToCart(id);
  if (result?.data?.success) {
    response.value.items.push(result.data);
    await ProductService.cartUpdate(response.value.items);
  }
}
const removeToCart = async (id) => {
  const result = await ProductService.removeToCart(id);
  if (result.data.success) {
    response.value.items = response.value.items.filter((item) => (item.productId != id));
    await ProductService.cartUpdate(response.value.items);
  }
}


</script>
