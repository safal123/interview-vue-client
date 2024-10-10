<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: 'Modal Title',
  },
})

const emit = defineEmits(['close', 'save'])
const close = () => emit('close')
const save = () => emit('save')
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center px-6"
  >
    <div class="bg-white rounded-lg shadow-lg w-full lg:w-1/2">
      <div class="flex justify-between items-center p-4 border-b">
        <h2 class="text-xl font-bold">{{ title }}</h2>
        <div>
          <button @click="close" class="border rounded px-4 py-2 mr-2">
            Back
          </button>
          <button
            @click="save"
            class="border rounded px-4 py-2 bg-blue-500 text-white"
          >
            Save
          </button>
        </div>
      </div>
      <div class="p-6">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
