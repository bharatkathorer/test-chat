<template>
    <div class="w-full flex md:ml-0">
        <label for="search-field" class="sr-only"> Search </label>
        <div class="relative w-full flex text-primary-light">
            <div
                class="absolute inset-y-0 left-0 flex items-center pointer-events-none"
            >
                <MagnifyingGlassIcon class="h-5 w-5"/>
            </div>
            <input
                id="search-field"
                v-model="searchKeyword"
                class="flex-1 border-0 block w-full h-full pl-10 pr-8 py-2
                                        bg-transparent border-transparent text-primary placeholder-primary-light
                                        focus:placeholder-primary-disabled
                                        focus:outline-none focus:ring-0 focus:border-transparent font-medium text-sm"
                placeholder="Search"
                name="search"
                autocomplete="off"
                @input="getSearchResults"
            />
            <div
                @click="resetSearch"
                v-if="searchKeyword"
                class="absolute inset-y-0 right-0 flex items-center cursor-pointer"
            >
                <XMarkIcon class="h-5 w-5"/>
            </div>
        </div>
    </div>
</template>
<script setup>
import {MagnifyingGlassIcon, XMarkIcon} from "@heroicons/vue/24/outline";
import {ref} from "vue";

const props = defineProps({
    searchLink: String,
    items: {
        type: Object,
        default: [],
    }
})
const searchKeyword = ref("");
const emit = defineEmits(['searchResult']);
const getSearchResults = _.debounce(function () {
    if (searchKeyword.value != '') {
        window.axios
            .get(props.searchLink, {
                params: {keyword: searchKeyword.value},
            })
            .then((res) => {
                emit('searchResult', res.data);
            });
    } else {
        emit('searchResult', props.items);
    }

}, 500);

const resetSearch = () => {
    searchKeyword.value = '';
    emit('searchResult', props.items);
}
</script>
