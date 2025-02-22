<template>
  <AuthLayout>

    <form @submit.prevent="submitForm" class="bg-white p-6 grid grid-cols-2 gap-6 rounded">
      <InputItem name="name" :error="form.errors" v-model="form.name" label="Product name"/>
      <InputItem name="price" :error="form.errors" type="number" v-model="form.price" label="Product Price"/>
      <div class="flex flex-wrap">
        <div class="flex-1">
          <input type="file" class="me-2" @change="setFile">
          <InputError name="cover" class="object-cover" :error="form.errors"/>
        </div>
        <img :src="cover" class="h-20 rounded">
      </div>
      <InputMultiselct
          label="Select Category"
          mode="tags"
          v-model="form.categories"
          :options="categories"/>
      <div class="col-span-2">
        <PrimaryButton :disabled="loading">Submit</PrimaryButton>
      </div>
    </form>
  </AuthLayout>
</template>
<script setup>
import AuthLayout from "@/layouts/admin/AuthLayout.vue";
import PrimaryButton from "@/components/forms/PrimaryButton.vue";
import InputItem from "@/components/forms/InputItem.vue";
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import InputMultiselct from "@/components/forms/InputMultiselct.vue";
import {base_url} from "@/utils/constData";
import InputError from "@/components/forms/InputError.vue";
import {CategoryService} from "@/services/Admin/CategoryService";
import {ProductService} from "@/services/Admin/ProductService";

const router = useRouter()
const route = useRoute()
const item = ref();
onMounted(() => {
  getData();
});
const categories = ref([]);
const getData = async () => {
  loading.value = true;

  const category = await CategoryService.index();
  if (category.data.success) {
    categories.value = category.data.data;
  }

  const product = await ProductService.edit(route.params._id);
  if (product.data.success) {
    item.value = product.data;
    form.value.name = item.value.name;
    form.value.price = item.value.price;
    cover.value = base_url + item.value.cover;
    form.value.categories = item.value?.categories ?? [];
  }

  loading.value = false;
}
const loading = ref(false);

const form = ref({
  name: '',
  price: '',
  categories: [],
  cover: null,
  errors: ''
})
const cover = ref();
const setFile = (event) => {
  form.value.cover = event.target.files[0];
  cover.value = URL.createObjectURL(event.target.files[0]);
}
const submitForm = async () => {

  form.value.errors = '';
  loading.value = true;
  try {
    let fd = new FormData();
    Object.keys(form.value).forEach((key) => {
      if (key == 'categories') {
        fd.append('categories', JSON.stringify(form.value.categories));
      } else {
        fd.append(key, form.value[key])
      }
    })

    var result = '';
    if (item.value) {
      result = await ProductService.updateData(item.value._id, fd);
    } else {
      result = await ProductService.store(fd);
    }

    if (result.data.success) {
      router.push('/admin/product');
    } else {
      form.value.errors = result.data;
    }

    loading.value = false;
  } catch (e) {
    console.log(e);
    loading.value = false;
  }
}
</script>
