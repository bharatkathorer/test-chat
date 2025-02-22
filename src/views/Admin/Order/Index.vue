<template>
  <AuthLayout>

    <Table
        :fields="fields" v-model="response">
      <template #name="data">
        {{ data.item.user.name }}
      </template>
      <template #email="data">
        {{ data.item.user.email }}
      </template>
      <template #order="data">
        {{ data.item.items.length }}
      </template>
      <template #action="data">
        <Action
            :view-href="`/admin/orders/view/${data.item._id}`"
        />
      </template>
    </Table>
    <AjaxPagination class="mt-6" :limit="10"
                    href="/orders"
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
  {key: 'email', label: 'email'},
  {key: 'order', label: 'Products'},
  {key: 'created_at', label: 'Order Date'},
  {key: 'action', label: 'action'}
];

const response = ref([]);
const reloadPage = ref(false);

</script>
