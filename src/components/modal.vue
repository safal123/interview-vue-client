<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
})
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center px-6"
  >
    <div
      class="bg-white rounded-lg shadow-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto"
    >
      <slot></slot>
    </div>
  </div>
</template>
