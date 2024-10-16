<script setup>
import { defineProps, defineEmits, onMounted, ref } from 'vue'

const props = defineProps({
  contact: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['close'])
const close = () => emit('close')

const conactForm = ref({
  firstName: '',
  lastName: '',
})

onMounted(() => {
  if (props.contact) {
    conactForm.value = { ...props.contact }
  }
})
</script>

<template>
  <div class="p-4">
    <div class="flex justify-between items-center border-b p-6">
      <h2 class="text-xl font-bold">
        {{ props.contact ? 'Edit' : 'Create' }} Contact
      </h2>
      <div>
        <button @click="close" class="border rounded px-4 py-2 mr-2">
          Back
        </button>
        <button
          @click="close"
          type="submit"
          class="border rounded px-4 py-2 bg-blue-500 text-white"
        >
          Save
        </button>
      </div>
    </div>
    <form class="space-y-4">
      <div>
        <label class="block text-sm font-bold mb-2" for="firstName"
          >First Name</label
        >
        <input
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
          type="text"
          id="firstName"
          v-model="conactForm.firstName"
          placeholder="Enter first name"
        />
      </div>
      <div>
        <label class="block text-sm font-bold mb-2" for="lastName"
          >Last Name</label
        >
        <input
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
          type="text"
          id="lastName"
          v-model="conactForm.lastName"
          placeholder="Enter last name"
        />
      </div>
    </form>
  </div>
</template>
