<template>
  <AuthLayout>

    <Table
        sort-search-link="/product"
        :action="{href:'/admin/product/create',label:'Create Product'}"
        :fields="fields" v-model="response">
      <template #cover="data">
        <img class="h-10 w-16 object-cover" alt="no cover" :src="`${base_url}${data.item.cover}`"/>
      </template>
      <template #categories="data">
        <div class="flex flex-wrap">
          <div class="me-2 bg-green-500 px-2 rounded text-white" v-for="(item) in data.item?.categories"
               :key="item._id">{{ item.name }}
          </div>
        </div>
      </template>
      <template #action="data">
        <Action
            :edit-href="`/admin/product/edit/${data.item._id}`"
            :delete-href="`/product/${data.item._id}`"
            @delete-response="reloadPage=!reloadPage"
        />
      </template>
    </Table>

    <AjaxPagination class="mt-6"
                    :reloadPage="reloadPage"
                    href="/product"
                    v-model="response"
                    @loading="loading=$event"
                    :limit="8"
    />
  </AuthLayout>
</template>
<script setup>
import AuthLayout from "@/layouts/admin/AuthLayout.vue";
import {ref} from "vue";
import Table from "@/components/Table/Table.vue";
import Action from "@/components/Table/Action.vue";
import AjaxPagination from "@/components/Table/AjaxPagination.vue";
import {base_url} from "@/utils/constData";

const fields = [
  {key: 'cover', label: 'cover'},
  {key: 'name', label: 'name'},
  {key: 'price', label: 'price'},
  {key: 'categories', label: 'category'},
  {key: 'action', label: 'action'}
];

const response = ref([]);
const loading = ref(false);
const reloadPage = ref(false);


</script>
