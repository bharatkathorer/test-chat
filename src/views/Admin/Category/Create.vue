<template>
  <AuthLayout>

    <form @submit.prevent="submitForm" class="bg-white p-6 grid gap-6 rounded">
      <InputItem name="name" :error="form.errors" v-model="form.name" label="Category name"/>
      <div>
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
import {CategoryService} from "@/services/Admin/CategoryService";

const router = useRouter()
const route = useRoute()
const item = ref();
onMounted(() => {
  getData();
});

const loading = ref(false);
const getData = async () => {
  loading.value = true;
  const result = await CategoryService.edit(route.params._id);
  if (result.data.success) {
    item.value = result.data;
    form.value.name = item.value.name;
  }
  loading.value = false;
}

const form = ref({
  name: '',
  errors: '',
})

const submitForm = async () => {
  loading.value = true;
  form.value.errors = '';
  var result = '';
  if (item.value) {
    result = await CategoryService.updateData(item.value._id, form.value);
  } else {
    result = await CategoryService.store(form.value);
  }
  if (result.data.success) {
    router.push('/admin/category');
  } else {
    form.value.errors = result.data;
  }

  loading.value = false;
}
</script>
