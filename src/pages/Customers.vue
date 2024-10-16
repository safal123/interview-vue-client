<script setup>
import { ref } from 'vue'
import Sidebar from '../components/sidebar.vue'
import CustomersTable from '../components/customers-table.vue'
import { onMounted } from 'vue'
import useCustomers from '../composables/useCustomers'

const { fetchCustomers, customers } = useCustomers()

onMounted(() => {
  fetchCustomers()
})
</script>

<template>
  <div class="flex">
    <aside class="w-64 hidden lg:flex">
      <div class="min-h-screen bg-gray-100">
        <Sidebar />
      </div>
    </aside>
    <main class="w-full flex-1">
      <CustomersTable :customers="customers" />
    </main>
  </div>
</template>
