<template>
  <div>

    <SideBarComponent class="!block" v-model="sidebarOpen">
      <SideBarLink/>
    </SideBarComponent>

    <!-- Static sidebar for desktop -->
    <div v-if="!store.fullView" class="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pt-5">
        <div class="flex flex-shrink-0 items-center px-4">
          <!--          <LogoIcon class="h-8 w-auto"/>-->
        </div>
        <div class="mt-5 flex flex-grow flex-col">
          <SideBarLink/>
        </div>
      </div>
    </div>
    <div :class="store.fullView?'':'lg:pl-64'">
      <div class="sticky top-0 z-10 flex h-16 flex-shrink-0 border-b lg:px-8 border-gray-200 bg-white">
        <button type="button"
                :class="store.fullView?'me-4':'lg:hidden'"
                class="border-r border-gray-200 pr-4 text-gray-500 focus:outline-none focus:ring-0 focus:ring-inset focus:ring-indigo-500 pl-4 lg:-ml-8"
                @click="sidebarOpen = true">
          <span class="sr-only">Open sidebar</span>
          <Bars3BottomLeftIcon class="h-6 w-6" aria-hidden="true"/>
        </button>
        <div class="flex flex-1 justify-between px-4 lg:px-0">
          <div class="flex flex-1 items-center">
            <div>

              <button type="button"
                      class="hidden lg:block text-gray-500 focus:outline-none "
                      @click="toggleFullView">
                <span class="sr-only">Open sidebar</span>
                <ViewfinderCircleIcon v-if="!store.fullView" class="h-6 w-6" aria-hidden="true"/>
                <XMarkIcon v-else class="h-6 w-6" aria-hidden="true"/>
              </button>
            </div>

          </div>
          <div class="ml-4 flex items-center lg:ml-6">


            <!-- Profile dropdown -->
            <Menu as="div" class="relative ml-3">
              <div>
                <MenuButton
                    class="flex max-w-xs items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <span class="sr-only">Open user menu</span>
                  <UserCircleIcon class="h-8 w-8"/>
                </MenuButton>
              </div>
              <transition enter-active-class="transition ease-out duration-100"
                          enter-from-class="transform opacity-0 scale-95"
                          enter-to-class="transform opacity-100 scale-100"
                          leave-active-class="transition ease-in duration-75"
                          leave-from-class="transform opacity-100 scale-100"
                          leave-to-class="transform opacity-0 scale-95">
                <MenuItems
                    class="absolute divide-y right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">

                  <div v-for="item in userNavigation" :key="item.name" @click="openData(item)"
                       class="hover:bg-gray-100 block text-sm text-gray-700 px-4 py-2 cursor-pointer" :to="item.href">
                    {{ item.name }}
                  </div>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>
      <main class="flex-1 bg-gray-50 h-[calc(100vh-64px)] overflow-auto">
        <div class="py-6 lg:px-8">
          <div class="px-4 sm:px-6 lg:px-0 mb-6" v-if="breadcramb">
            <Breadcramb :breadcramb="breadcramb"/>
          </div>
          <div class="px-4 sm:px-6 lg:px-0">
            <slot/>
          </div>
        </div>
      </main>
    </div>
  </div>
  <!--  <Head :title="title.charAt(0).toUpperCase() + title.slice(1)"/>-->

</template>

<script setup>
import {ref} from 'vue'
import {Menu, MenuButton, MenuItems,} from '@headlessui/vue'
import {Bars3BottomLeftIcon, UserCircleIcon, ViewfinderCircleIcon, XMarkIcon} from '@heroicons/vue/24/outline'
import SideBarComponent from "@/layouts/SideBarComponent.vue"
import Breadcramb from "@/layouts/Breadcramb.vue"
import SideBarLink from "@/layouts/SideBarLink.vue"
import router from "@/router";
import {AuthService} from "@/services/Admin/AuthService";
// import LogoIcon from "@/Icons/LogoIcon.vue";
// import {storeData} from "@/Store/store.js";

const store = ref({fullView: false});
const toggleFullView = () => {
  store.value.fullView = !store.value.fullView;
  // let fullView = store.fullView;
  // store.$patch({fullView: !fullView})
}
const userNavigation = [
  {name: 'Your Profile', href: '#'},
  {name: 'Settings', href: '#'},
  {name: 'Sign out', href: '/admin/login', method: "post"},
]
defineProps({
  title: {
    type: String,
    default: ''
  },
  breadcramb: Array
})
const sidebarOpen = ref(false)

const openData = (item) => {
  if (item.name == 'Sign out') {
    logout();
  } else {
    router.push(item.href);
  }
}
const logout = async () => {
  try {
    const result = await AuthService.logout();
    console.log(result);
    if (result.data.success) {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      router.push('/admin/login');
    }
  } catch (e) {
    console.log(e);
  }

}
</script>

