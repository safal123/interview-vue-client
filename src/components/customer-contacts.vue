<script setup>
import { defineProps, ref } from 'vue'
import Modal from './modal.vue'
import CreateContactForm from './create-contact-form.vue'
const props = defineProps({
  customer: {
    type: Object,
    required: true,
  },
})

const contacts = props.customer.contacts

const isEditModalOpen = ref(false)

const openEditModal = (contact) => {
  isEditModalOpen.value = true
}
</script>

<template>
  <div>
    <table class="w-full mt-4 border">
      <thead class="bg-gray-200">
        <tr>
          <th class="text-left px-4 py-2">First Name</th>
          <th class="text-left px-4 py-2">Last Name</th>
          <th class="px-4 py-2"></th>
        </tr>
      </thead>
      <tbody class="bg-gray-100">
        <template v-if="contacts && contacts.length > 0">
          <tr v-for="contact in contacts" :key="contact.id" class="border-b">
            <td class="px-4 py-2">{{ contact.first_name }}</td>
            <td class="px-4 py-2">{{ contact.last_name }}</td>
            <td class="px-4 py-2">
              <div class="flex space-x-2">
                <button
                  @click="openEditModal(contact)"
                  class="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
                <button class="bg-red-500 text-white px-4 py-2 rounded">
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td class="px-4 py-2" colspan="3">No contacts found</td>
          </tr>
        </template>
      </tbody>
    </table>
    <Modal
      @close="isEditModalOpen = false"
      :isOpen="isEditModalOpen"
      title="Contacts - Details"
    >
      <CreateContactForm />
    </Modal>
  </div>
</template>
