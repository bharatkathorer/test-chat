<template>
  <div>
    <!-- Your content to display the fetched data will go here -->
    <slot name="items" :data="_data"
          :loading="loading"
          :main_data="currentData"
    />
    <div v-if="loading" class="flex justify-center my-4">
      <Spinner class="animate-spin"/>
    </div>
  </div>
</template>

<script setup>
import {onMounted, onUnmounted, ref} from 'vue';
import Spinner from "@/components/Table/Spinner.vue";
import '../utils/axios'
import axios from "axios";

const props = defineProps({
  url: [String],
  limit: {
    type: Number,
    default: 10,
  }
})
const emit = defineEmits(['loadData']);
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  loadData();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const handleScroll = () => {
  const scrollY = window.scrollY;
  const visibleHeight = document.documentElement.clientHeight;
  const totalHeight = document.documentElement.scrollHeight;
  const offset = 100;

  if (scrollY + visibleHeight + offset >= totalHeight) {
    if (!loading.value) {
      loadData();
    }
  }
};

const loading = ref(false);

const url = ref(`${props.url}?page=1&limit=${props.limit}`);

const _data = ref([]);
const currentData = ref([]);
const loadData = () => {
  loading.value = true;
  if (url.value) {
    try {
      axios.get(url.value).then((resp) => {
        if (resp.data.next_page) {
          url.value = `${props.url}?page=${resp.data.next_page}&limit=${props.limit}`
        } else {
          url.value = null;
        }
        if (resp?.data?.data?.length) {
          _data.value = [..._data.value, ...resp.data.data];
        }
        currentData.value = resp.data;
        loading.value = false;
        emit('loadData', {data: _data.value, response: resp.data});
      })
    } catch (e) {
      loading.value = false;
    }
  } else {
    loading.value = false;
  }
}
</script>
