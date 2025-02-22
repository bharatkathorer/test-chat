<template>
  <GuestLayout>
    <form class="grid gap-6" @submit.prevent="login">
      <InputItem type="email" v-model="form.email" placeholder="Email" :required="true" label="Email"/>
      <InputItem v-model="form.password" placeholder="password" :required="true" label="password" type="password"/>
      <InputError :form-error="true" :error="form.errors"/>
      <PrimaryButton>
        Login
      </PrimaryButton>
    </form>
  </GuestLayout>
</template>
<script setup>
import GuestLayout from "@/layouts/GuestLayout.vue";
import InputItem from "@/components/forms/InputItem.vue";
import {ref} from "vue";
import PrimaryButton from "@/components/forms/PrimaryButton.vue";
import {useRouter} from "vue-router";
import InputError from "@/components/forms/InputError.vue";
import {AuthService} from "@/services/Admin/AuthService";

const router = useRouter()
const form = ref({
  email: '',
  password: '',
  errors: '',
})

const login = async () => {
  form.value.errors = '';
  const response = await AuthService.login(form.value);
  if (response.data.success) {
    localStorage.setItem('admin_user', JSON.stringify(response.data.user))
    localStorage.setItem('admin_token', response.data.token)
    router.push('/admin');
  } else {
    form.value.errors = response.data;
    console.log(response.data.message);
  }
}
</script>
