<template>
  <div class="flex space-x-2 ">
    <slot/>
    <RouterLink v-if="viewHref" :to="viewHref">
      <EyeIcon class="h-5 w-5 "/>
    </RouterLink>
    <RouterLink v-if="editHref" :to="editHref">
      <PencilSquareIcon class="h-5 w-5 "/>
    </RouterLink>
    <DeleteButton v-if="deleteHref"
                  :method="deleteMethode"
                  @deleteResponse="emit('deleteResponse', $event)"
                  :href="deleteHref"
    />
    <!--    <DropdownAction v-if="options" :options="options"/>-->
  </div>
</template>
<script setup>
import {RouterLink} from "vue-router";
import {EyeIcon, PencilSquareIcon} from "@heroicons/vue/20/solid/index.js";
import DeleteButton from "@/components/Table/DeleteButton.vue";

const emit = defineEmits(['deleteResponse']);
defineProps({
  deleteMethode: {
    mimeTypes: String,
    default: 'delete',
  },
  deleteHref: String,
  options: Array,
  editHref: String,
  viewHref: String,
})

</script>
