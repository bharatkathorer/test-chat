<template>

  <div class="min-h-screen font-sans text-gray-700 white bg-gray-100">

    <div class="bg-gray-100 sticky top-0 z-40 shadow">
      <div class="custom-container mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 py-6">
        <div class="flex justify-center sm:justify-start">
          <RouterLink to="/">
            <img :src="logo" alt="Themes.dev Logo" title="Themes.dev Logo" class="h-10">
          </RouterLink>
        </div>

        <div
            class="flex flex-wrap justify-center sm:justify-start items-center space-x-6  font-semibold order-3 lg:order-2 sm:col-span-2">
          <!--                    <RouterLink v-for="(item,index) in options" :key="index" :to="item.to"-->
          <!--                          :class="item.active?'text-indigo-600':'text-gray-700 hover:text-indigo-500'">-->
          <!--                        {{ item.name }}-->
          <!--                    </RouterLink>-->
        </div>
        <div class="flex justify-center sm:justify-end order-2 lg:order-3 items-center">
          <div class="space-x-2">
            <RouterLink v-if="!isLogin" to="/login"
                        class="btn-front">
              Login
            </RouterLink>
            <RouterLink v-if="isLogin" to="/orders"
                        class="btn-front relative">
              Orders
            </RouterLink>
            <RouterLink v-if="isLogin" to="/cart"
                        class="btn-front relative">
              Carts
              <span class="absolute -bottom-3 -left-2
               bg-white text-primary-dark rounded-full px-2
                shadow" v-if=" store?.user?.carts?.items?.length">{{ store?.user?.carts?.items?.length }}</span>
            </RouterLink>
            <RouterLink v-if="isLogin" @click="logout" class="btn-front" to="#">
              Logout
            </RouterLink>
          </div>
          <!--                    <div class="flex space-x-2">-->

          <!--                        <RouterLink to="#"-->
          <!--                              class="btn-front">-->
          <!--                            Login-->
          <!--                        </RouterLink>-->
          <!--                        <RouterLink to="#"-->
          <!--                              class="btn-front">-->
          <!--                            Register school-->
          <!--                        </RouterLink>-->
          <!--                    </div>-->
        </div>

      </div>
    </div>

    <main v-bind="$attrs" class="mx-auto mt-10">
      <slot/>
    </main>

    <footer class="text-base md:text-lg  bg-gray-50 py-6 mt-10">
      <div class="text-gray-500 md:text-gray-500  md:flex-row md:justify-between custom-container">
        <p>© Copyright All rights reserved to owner of SMARTSSCHOOL</p>
      </div>
    </footer>

  </div>


</template>

<script setup>
import {RouterLink} from "vue-router";
import logo from '../../assets/logo.svg'
import {AuthService} from "@/services/User/AuthService";
import router from "@/router";
import {computed} from "vue";
import {cartStore} from "@/stores/cartStore";

const store = cartStore();

const isLogin = computed(() => {
  return (store.user?._id);
})
const logout = async () => {
  const response = await AuthService.logout();
  if (response.data.success) {
    localStorage.removeItem('front_user');
    localStorage.removeItem('user_token');
    router.push('/login');
  }
}
</script>
