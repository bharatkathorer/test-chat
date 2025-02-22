<template>

  <nav class="px-2">

    <div v-for="(item,index) in navigation" :key="index">

      <According v-if="(item?.menu?.length&&item.role)" :default-open="item.current"
                 :classes="[item.current? 'bg-primary text-white' : 'text-gray-600 hover:bg-primary-hover hover:text-white',
            'group flex items-center rounded py-2.5 px-2 text-base font-medium']">
        <div class="group flex items-center  rounded  text-base font-medium'">
          <component :is="item.icon"
                     :class="[item.current ? 'text-white' : 'group-hover:text-white', 'mr-4 h-6 w-6 flex-shrink-0']"
                     aria-hidden="true"/>
          {{ item.name }}
        </div>
        <template #body>
          <RouterLink v-for="(menu,index1) in item.menu" :key="index1" :to="menu.href"
                      :class="[menu.current ? 'bg-primary text-white' :
              'text-gray-600 hover:bg-primary-hover hover:text-white',
              'group flex items-center mx-2 rounded mb-1 py-2.5 px-4 text-base font-medium']">
            {{ menu.name }}
          </RouterLink>
        </template>
      </According>
      <RouterLink v-else-if="item.role" :to="item.href" :class="[item.current ? 'bg-primary text-white' :
              'text-gray-600 hover:bg-primary-hover hover:text-white',
              'group flex items-center rounded mb-1 py-2.5 px-2 text-base font-medium']">
        <component :is="item.icon"
                   :class="[item.current ? 'text-white' : 'group-hover:text-white', 'mr-4 h-6 w-6 flex-shrink-0']"
                   aria-hidden="true"/>
        {{ item.name }}
      </RouterLink>
    </div>

  </nav>
</template>
<script setup>
import {HomeIcon, CogIcon} from '@heroicons/vue/24/outline'
import According from "@/Components/According.vue";
import {RouterLink, useRoute} from "vue-router";
import {ref} from "vue";

const route = useRoute();

const checkActive = (value) => {
  return (route.name == value);
}
const navigation = [
  {
    role: 1,
    name: 'Dashboard',
    href: '/admin',
    icon: HomeIcon,
    current: checkActive('admin')
  },
  {
    role: 1,
    name: 'Category',
    href: '/admin/category',
    icon: HomeIcon,
    current:
        checkActive('category') ||
        checkActive('category-create') ||
        checkActive('category-edit')
  },
  {
    role: 1,
    name: 'Product',
    href: '/admin/product',
    icon: HomeIcon,
    current:
        checkActive('product') ||
        checkActive('product-create') ||
        checkActive('product-edit')
  },
  {
    role: 1,
    name: 'orders',
    href: '/admin/orders',
    icon: HomeIcon,
    current:
        checkActive('admin-orders') ||
        checkActive('order-view')
  },

  // {
  //   role: 1,
  //   name: 'Setting',
  //   href: '/',
  //   icon: CogIcon,
  //   current: false,
  //   menu: [
  //     {
  //       role: 1,
  //       name: 'Division',
  //       href: '/admin',
  //       current: false
  //     },
  //
  //   ]
  // },
]
</script>
