<template></template>
<script setup></script>
<!--<template>-->

<!--  <div class="border overflow-hidden rounded-md bg-white">-->
<!--    <div-->
<!--        v-if="sortSearchLink || isSearch || action && length"-->
<!--        class="flex-1 border-b px-6 py-3 flex flex-col md:flex-row justify-between  space-y-4 md:space-y-0"-->
<!--    >-->
<!--      <div class="flex-1 flex items-center">-->
<!--        <div class="w-full flex md:ml-0" v-if="sortSearchLink">-->
<!--          <label for="search-field" class="sr-only"> Search </label>-->
<!--          <div class="relative w-full flex text-primary-light">-->
<!--            <div-->
<!--                class="absolute inset-y-0 left-0 flex items-center pointer-events-none"-->
<!--            >-->
<!--              <MagnifyingGlassIcon class="h-5 w-5"/>-->
<!--            </div>-->
<!--            <input-->
<!--                id="search-field"-->
<!--                v-model="searchKeyword"-->
<!--                class="flex-1 border-0 block w-full h-full pl-10 pr-8 py-2-->
<!--                                        bg-transparent border-transparent text-primary placeholder-primary-light-->
<!--                                        focus:placeholder-primary-disabled-->
<!--                                        focus:outline-none focus:ring-0 focus:border-transparent font-medium text-sm"-->
<!--                placeholder="Search"-->
<!--                name="search"-->
<!--                autocomplete="off"-->
<!--                @input="getSearchResults"-->
<!--            />-->
<!--            <div-->
<!--                @click="resetSearch"-->
<!--                v-if="searchKeyword"-->
<!--                class="absolute inset-y-0 right-0 flex items-center cursor-pointer"-->
<!--            >-->
<!--              <XMarkIcon class="h-5 w-5"/>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="flex items-center md:space-x-2 md:ml-6" v-if="action">-->
<!--        <slot name="actionBtn">-->
<!--          <PrimaryButton :href="action?.href">-->
<!--            {{ action?.label }}-->
<!--          </PrimaryButton>-->
<!--        </slot>-->
<!--      </div>-->
<!--    </div>-->

<!--    <div v-if="length" class="overflow-auto">-->
<!--      <table class="min-w-full divide-y divide-gray-300">-->
<!--        <thead class="bg-gray-50">-->
<!--        <tr>-->
<!--          <th scope="col"-->
<!--              v-for="(field, index) in fields" :key="index"-->
<!--              @click="sort(field, sortByASC ? 'asc' : 'desc')"-->
<!--              class="py-2 pl-4 pr-3 text-left text-xs font-semibold text-gray-900 sm:pl-6 capitalize"-->
<!--              :class="field?.HeadClass"-->
<!--          >-->
<!--            <div class="group inline-flex cursor-pointer ">-->
<!--              <slot :name="`th_${field.key}`">{{ field.label?.replaceAll('_', ' ') }}</slot>-->

<!--              <span-->
<!--                  v-if="(field.sortKey == sortKey)&& (field.sortKey)"-->
<!--                  class="ml-2 flex-none rounded bg-gray-200 text-gray-900 group-hover:bg-gray-300">-->
<!--                                        <ChevronDownIcon v-if="sortByASC" class="h-5 w-5 ease-in-out duration-500"-->
<!--                                                         aria-hidden="true"/>-->
<!--                                        <ChevronUpIcon v-else class="h-5 w-5 ease-in-out duration-500"-->
<!--                                                       aria-hidden="true"/>-->
<!--                                      </span>-->
<!--              <span v-else-if="(field.sortKey != sortKey)&& (field.sortKey)"-->
<!--                    class="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">-->
<!--                                        <ChevronDownIcon class="h-5 w-5" aria-hidden="true"/>-->
<!--                                    </span>-->
<!--            </div>-->
<!--          </th>-->
<!--        </tr>-->
<!--        </thead>-->


<!--        <tbody v-if="!loading" class="divide-y divide-gray-200 bg-white">-->


<!--        <tr v-for="(it, ind) in tableItems" :key="ind" class="border-b border-stroke hover:bg-gray-50">-->
<!--          <td class="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"-->
<!--              v-for="(field, index) in fields" :key="index" :class="field?.BodyClass">-->
<!--            <p v-if="field.isNo">-->
<!--              {{ ((modelValue.current_page ?? 0) - 1) * (field.isNo) + (ind + 1) }}-->
<!--            </p>-->
<!--            <slot v-else :name="field.key" :item="it" :index="ind"-->
<!--                  :page="(modelValue.current_page??0)-1" :field="field">-->
<!--              {{ it[field.key] ?? 'N/A' }}-->
<!--            </slot>-->
<!--          </td>-->
<!--        </tr>-->
<!--        <tr v-if="bottomTd">-->
<!--          <td>-->
<!--            <div class="h-40">-->

<!--            </div>-->
<!--          </td>-->
<!--        </tr>-->
<!--        </tbody>-->
<!--      </table>-->
<!--    </div>-->

<!--    <div v-else-if="!loading" class="text-center py-6">-->
<!--      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24"-->
<!--           stroke="currentColor" aria-hidden="true">-->
<!--        <path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round"-->
<!--              stroke-width="2"-->
<!--              d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>-->
<!--      </svg>-->
<!--      <h3 class="mt-2 text-sm font-medium text-gray-900">No Result Found</h3>-->
<!--      <p class="mt-1 text-sm text-gray-500" v-if="action?.href">Get started by {{ action?.label }}.</p>-->
<!--      <div class="mt-6">-->

<!--        <slot name="actionBtn">-->
<!--          <RouterLink-->
<!--              v-if="action?.href"-->
<!--              class="inline-flex items-center rounded-md border border-transparent bg-primary hover:bg-primary-hover active:bg-primary-active px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2  focus:ring-offset-2"-->
<!--              :isDark="true" :to="action?.href">-->

<!--            <span class="ml-2">{{ action?.label }}</span>-->

<!--          </RouterLink>-->
<!--        </slot>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="flex items-center justify-center py-24 overflow-hidden" v-if="loading">-->
<!--      <Spinner class="animate-spin"/>-->
<!--    </div>-->


<!--  </div>-->
<!--</template>-->

<!--<script setup>-->
<!--import {computed, ref} from "vue";-->
<!--import {ChevronDownIcon, ChevronUpIcon, MagnifyingGlassIcon, XMarkIcon} from '@heroicons/vue/24/outline';-->
<!--import Spinner from "@/Components/Table/Spinner.vue";-->
<!--import {getParameters, makeParameter, setPath} from "../../utils/constData.js";-->
<!--import {RouterLink, useRoute, useRouter} from "vue-router";-->
<!--import PrimaryButton from "@/components/forms/PrimaryButton.vue";-->
<!--import '../../utils/adminAxios'-->
<!--const route = useRoute();-->
<!--const router = useRouter();-->

<!--const loading = ref(false);-->
<!--const sortByASC = ref(false);-->
<!--const sortKey = ref('');-->
<!--const searchKeyword = ref(getParameters()?.keyword ?? "");-->

<!--const query = computed(() => {-->
<!--  var data = {}-->
<!--  Object.keys(route.query).forEach((key) => {-->
<!--    if (route.query[key]) {-->
<!--      data[key] = route.query[key];-->
<!--    }-->
<!--  })-->
<!--  return data;-->
<!--})-->
<!--// fields.isNo pass total pagination number for sr no print-->
<!--const props = defineProps({-->
<!--  fields: Array,-->
<!--  modelValue: [Array, Object],-->
<!--  paginationParams: Array,-->
<!--  action: [Array, Object],-->
<!--  sortSearchLink: String,-->
<!--  isSearch: Boolean,-->
<!--  getPage: Boolean,-->
<!--  bottomTd: Boolean,-->
<!--});-->

<!--const length = computed(() => {-->
<!--  return tableItems.value.length;-->
<!--})-->


<!--const emit = defineEmits(['changePage', 'update:modelValue']);-->

<!--const tableItems = computed(() => {-->
<!--  if (props.modelValue.data) {-->
<!--    return props.modelValue.data;-->
<!--  }-->
<!--  return props.modelValue ?? [];-->
<!--});-->


<!--function sort(field, direction) {-->
<!--  if (!field?.sortKey) {-->
<!--    return false;-->
<!--  }-->
<!--  if (!props.sortSearchLink) {-->
<!--    alert('please pass props sortSearchLink');-->
<!--    return false;-->
<!--  }-->
<!--  sortKey.value = field?.sortKey;-->
<!--  sortByASC.value = !sortByASC.value;-->
<!--  setPath(makeParameter('sortBy', field.sortKey));-->
<!--  setPath(makeParameter('direction', direction));-->
<!--  window.axios-->
<!--      .get(props.sortSearchLink, {-->
<!--        params: {-->
<!--          sortBy: field?.sortKey,-->
<!--          direction,-->
<!--          keyword: searchKeyword.value,-->
<!--          ajax: true,-->
<!--          ...getParameters()-->
<!--        },-->
<!--      })-->
<!--      .then((res) => {-->
<!--        emit('update:modelValue', res.data);-->
<!--        loading.value = false;-->
<!--      });-->

<!--  loading.value = false;-->
<!--}-->

<!--const getSearchResults = async () => {-->
<!--  loading.value = true;-->

<!--  // setPath(makeParameter('keyword', searchKeyword.value));-->
<!--  // if (!searchKeyword.value) {-->
<!--  //   setPath(makeParameter('keyword', null));-->
<!--  // }-->
<!--  let queryData = query.value;-->
<!--  queryData.keyword = searchKeyword.value;-->

<!--  await router.push({-->
<!--    query: queryData-->
<!--  })-->
<!--  window.axios-->
<!--      .get(props.sortSearchLink, {-->
<!--        params: {-->
<!--          keyword: searchKeyword.value,-->
<!--          ajax: true,-->
<!--          ...getParameters()-->
<!--        },-->
<!--      })-->
<!--      .then((res) => {-->
<!--        loading.value = false;-->
<!--        emit('update:modelValue', res.data);-->

<!--      }).catch(() => loading.value = false);-->

<!--};-->
<!--const resetSearch = () => {-->
<!--  searchKeyword.value = '';-->
<!--  setPath(makeParameter('keyword', null));-->
<!--  getSearchResults()-->
<!--}-->
<!--</script>-->
