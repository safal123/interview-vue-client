<script setup>
import { defineProps, ref } from 'vue'
import Modal from './modal.vue'
import ContactForm from './contact-form.vue'
const props = defineProps({
  customer: {
    type: Object,
    required: true,
  },
})

const contacts = props.customer.contacts
const selectedContact = ref(null)

const isModelOpen = ref(false)

const openModel = (contact) => {
  selectedContact.value = contact
  isModelOpen.value = true
}
</script>

<template>
  <div class="overflow-y-auto">
    <div class="flex justify-between items-center border-b pb-2 px-2">
      <h2 class="text-xl font-bold">Contacts</h2>
      <button
        @click="openModel"
        class="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Create
      </button>
    </div>
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
            <td class="px-4 py-2">{{ contact.firstName }}</td>
            <td class="px-4 py-2">{{ contact.lastName }}</td>
            <td class="px-4 py-2">
              <div class="flex space-x-2">
                <button
                  @click="openModel(contact)"
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
    <Modal @close="isModelOpen = false" :isOpen="isModelOpen">
      <ContactForm
        :contact="selectedContact"
        @close="isModelOpen = false"
        :mode="'edit'"
      />
    </Modal>
  </div>
</template>
