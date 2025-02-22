<template>
  <AuthLayout>

    <Table
        sort-search-link="/category"
        :action="{href:'/admin/category/create',label:'Create Category'}"
        :fields="fields" v-model="response">
      <template #action="data">
        <Action
            :edit-href="`/admin/category/edit/${data.item._id}`"
            :delete-href="`/category/${data.item._id}`"
            @delete-response="reloadPage=!reloadPage"
        />
      </template>
    </Table>
    <AjaxPagination class="mt-6" :limit="10"
                    href="/category"
                    v-model="response"
                    :reload-page="reloadPage"
    />
  </AuthLayout>
</template>
<script setup>
import AuthLayout from "@/layouts/admin/AuthLayout.vue";
import {ref} from "vue";
import Table from "@/components/Table/Table.vue";
import Action from "@/components/Table/Action.vue";
import AjaxPagination from "@/components/Table/AjaxPagination.vue";

const fields = [
  {key: 'name', label: 'name'},
  {key: 'action', label: 'action'}
];

const response = ref([]);
// const loading = ref(false);
const reloadPage = ref(false);

</script>
