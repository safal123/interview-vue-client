<script setup>
import { ref, defineEmits, watch } from 'vue'
import Modal from './modal.vue'
import CreateCustomerForm from './create-customer-form.vue'
import CustomerContacts from './customer-contacts.vue'
import ConfirmModal from './confirm-modal.vue'
import useCustomers from '../composables/useCustomers'

const props = defineProps({
  customers: {
    type: Array,
    required: true,
  },
})
const emit = defineEmits(['refetchCustomers'])
const refetchCustomers = () => emit('refetchCustomers')

const formData = ref({
  name: '',
  reference: '',
  category: '',
  startDate: '',
  description: '',
})

const search = ref('')
const searchCategory = ref('')

const error = ref(null)
const modalState = ref({
  isModalOpen: false,
  isEditModalOpen: false,
  isDeleteModalOpen: false,
})

const selectedCustomer = ref(null)

const toggleModal = (key, value) => (modalState.value[key] = value)
const resetFormData = () => {
  formData.value = {
    name: '',
    reference: '',
    category: '',
    startDate: '',
    description: '',
  }
}

const { fetchCustomers, createCustomer, updateCustomer, deleteCustomer } =
  useCustomers()

const handleCustomerSave = async () => {
  try {
    await createCustomer(formData.value)
    resetFormData()
    await refetchCustomers()
    toggleModal('isModalOpen', false)
  } catch (e) {
    console.log(error)
    error.value = e || 'An error occurred'
  }
}

watch(formData, () => {
  error.value = null
})

const openModalForCreate = () => {
  resetFormData()
  toggleModal('isModalOpen', true)
}

const openModalForEdit = (customer) => {
  selectedCustomer.value = customer
  formData.value = { ...customer }
  toggleModal('isEditModalOpen', true)
}

const openModalForDelete = (customer) => {
  selectedCustomer.value = customer
  toggleModal('isDeleteModalOpen', true)
}

const handleCustomerEdit = async () => {
  await updateCustomer(formData.value)
  await refetchCustomers()
  toggleModal('isEditModalOpen', false)
}

const handleCustomerDelete = async () => {
  await deleteCustomer(selectedCustomer.value.id)
  await refetchCustomers()
  toggleModal('isDeleteModalOpen', false)
}

const resetSearch = async () => {
  search.value = ''
  searchCategory.value = ''
  await fetchCustomers()
}

const applySearch = async () => {
  await fetchCustomers({
    search: search.value,
    category: searchCategory.value,
  })
  await refetchCustomers()
}
</script>

<template>
  <div class="px-12 py-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-blue-600">Customers</h1>
      <button
        @click="openModalForCreate"
        class="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create
      </button>
    </div>
    <div>
      <div class="flex items-center space-x-4 mt-4">
        <input
          type="text"
          v-model="search"
          class="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring"
          placeholder="Search"
        />
        <div class="w-1/3 flex items-center space-x-4">
          <label for="category">Category</label>
          <select
            v-model="searchCategory"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
          >
            <option value="all">All</option>
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
            <option value="Bronze">Bronze</option>
          </select>
        </div>
        <div class="w-1/3 flex justify-end space-x-4">
          <button
            @click="applySearch"
            class="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Apply
          </button>
          <button
            @click="resetSearch"
            class="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Clear
          </button>
        </div>
      </div>

      <table class="w-full mt-4 border">
        <thead class="bg-gray-200">
          <tr>
            <th class="text-left px-4 py-2">Name</th>
            <th class="text-left px-4 py-2">Reference</th>
            <th class="text-left px-4 py-2">Category</th>
            <th class="text-left px-4 py-2">No. of Contacts</th>
            <th class="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody class="bg-gray-100">
          <tr v-for="customer in customers" :key="customer.id" class="border-b">
            <td class="px-4 py-2">{{ customer.name }}</td>
            <td class="px-4 py-2">{{ customer.reference }}</td>
            <td class="px-4 py-2">{{ customer.category }}</td>
            <td class="px-4 py-2">{{ customer.noOfContacts }}</td>
            <td class="px-4 py-2">
              <div class="flex space-x-2">
                <button
                  @click="openModalForEdit(customer)"
                  class="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
                <button
                  @click="openModalForDelete(customer)"
                  class="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Modal
      :isOpen="modalState.isModalOpen"
      title="Customers - Create"
      @close="toggleModal('isModalOpen', false)"
      @save="handleCustomerSave"
    >
      <CreateCustomerForm
        :errorMessage="error"
        v-if="modalState.isModalOpen"
        :formData="formData"
      />
    </Modal>

    <Modal
      :isOpen="modalState.isEditModalOpen"
      title="Customers - Edit"
      @close="toggleModal('isEditModalOpen', false)"
      @save="handleCustomerEdit"
    >
      <CreateCustomerForm
        v-if="modalState.isEditModalOpen"
        :formData="formData"
      />
      <CustomerContacts :customer="formData" />
    </Modal>

    <ConfirmModal
      :isOpen="modalState.isDeleteModalOpen"
      title="Customers - Delete"
      @close="toggleModal('isDeleteModalOpen', false)"
      @delete="handleCustomerDelete"
    />
  </div>
</template>
