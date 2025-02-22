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
import {AuthService} from "@/services/User/AuthService";
import {cartStore} from "@/stores/cartStore";

const router = useRouter()
const store = cartStore();
const form = ref({
  email: '',
  password: '',
  errors: '',
})

const login = async () => {
  form.value.errors = '';
  const response = await AuthService.login(form.value);
  if (response.data.success) {
    localStorage.setItem('front_user', JSON.stringify(response.data))
    localStorage.setItem('user_token', response.data.token)
    // store.$patch({
    //   user: response.data.user
    // });
    router.push('/');
  } else {
    form.value.errors = response.data;
  }
}
</script>
