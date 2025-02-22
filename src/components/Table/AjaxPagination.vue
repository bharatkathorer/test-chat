<template>

  <div v-if="modelValue?.total_page">
    <div>
      <p class="text-sm font-medium text-primary-light">
        Showing
        <span class="font-medium">{{ modelValue.skip }}</span>
        to
        <span class="font-medium">{{ modelValue.data.length + modelValue.limit }}</span>
        of
        <span class="font-medium">{{ modelValue.total_record }}</span>
        results
      </p>
    </div>
    <div class="flex justify-between mt-2">
      {{ loadPage }}
      <PrimaryButton @click="getData(modelValue.prev_page)" :disabled="modelValue.prev_page==null">Prev</PrimaryButton>
      <PrimaryButton @click="getData(modelValue.next_page)" :disabled="modelValue.next_page==null">Next</PrimaryButton>
    </div>
  </div>
</template>
<script setup>
import PrimaryButton from "@/components/forms/PrimaryButton.vue";
import axios from "axios";
import {computed, onMounted} from "vue";
import {useRoute, useRouter} from "vue-router";
import '../../utils/adminAxios'
const props = defineProps({
  modelValue: [Object, Array],
  href: String,
  limit: {
    default: 10,
    type: Number
  },
  reloadPage: Boolean,
})
const emit = defineEmits(['update:modelValue', 'loading']);
const route = useRoute();
const router = useRouter();

const page = computed(() => {
  return route.query?.page ?? 1;
})

const query = computed(() => {
  var data = {}
  Object.keys(route.query).forEach((key) => {
    if (route.query[key]) {
      data[key] = route.query[key];
    }
  })
  return data;
})

const limit = computed(() => {
  return route.query?.limit ?? props.limit;
})
onMounted(() => {
  getData(page.value);
})

const loadPage = computed(() => {
  getData(page.value);
  if (props.reloadPage) {
    return '';
  }
  return '';
})
const getData = async (pageValue) => {
  let queryData = await query.value;
  queryData.page = pageValue;
  queryData.limit = limit.value;

  router.push({
    query: queryData
  })
  emit('loading', true);
  const url = `${props.href}?page=${pageValue}&limit=${limit.value}`;

  try {
    const result = await axios.get(url);
    if (result.data.success) {
      if (pageValue > result.data.total_page) {
        queryData.page = result.data.total_page;
        router.push({
          query: queryData
        })
      }
      emit('update:modelValue', result.data);
    }
    emit('loading', false);
  } catch (e) {
    console.log(e);
    emit('loading', false);
  }
}
</script>
