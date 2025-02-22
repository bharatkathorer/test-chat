<template>
  <nav class="flex" aria-label="Breadcrumb">
    <ol role="list" class="flex items-center space-x-2">
      <li>
        <div>
          <RouterLink :to="href" class="text-gray-400 hover:text-gray-500">
            <svg class="h-5 w-5 flex-shrink-0 text-primary" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 20 20"
                 fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd"
                    d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
                    clip-rule="evenodd"></path>
            </svg>
            <span class="sr-only">Home</span>
          </RouterLink>
        </div>
      </li>

      <li v-for="(item,index) in breadcramb" :key="index">
        <div class="flex items-center">
          <svg class="h-5 w-5 flex-shrink-0 text-gray-400" xmlns="http://www.w3.org/2000/svg"
               fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z"></path>
          </svg>
          <RouterLink v-if="item.href" :to="item.href"
                      class="ml-2 text-sm capitalize font-medium text-primary hover:text-primary-hover">{{ item.label }}
          </RouterLink>
          <p v-else class="ml-2 text-sm capitalize font-medium text-gray-500">{{ item.label }}</p>
        </div>
      </li>

    </ol>
  </nav>
</template>
<script setup>

defineProps({
  href: {
    type: String,
    default: '/admin'
  },
  breadcramb: {
    type: Object,
    default: []
  }
})

</script>
