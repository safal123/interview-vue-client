<script setup>
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
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
  >
    <div class="bg-white rounded-lg shadow-lg w-full lg:w-1/2">
      <div class="flex justify-between items-center p-4 border-b">
        <h2 class="text-xl font-bold">Confirm Delete</h2>
        <button
          @click="$emit('close')"
          class="text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
      </div>

      <div class="p-6">
        <p class="mb-4">Are you sure you want to delete this user?</p>
        <div class="flex justify-end">
          <button
            @click="$emit('close')"
            type="button"
            class="mr-4 px-4 py-2 rounded bg-gray-400 text-white"
          >
            Cancel
          </button>
          <button
            @click="$emit('delete')"
            class="px-4 py-2 rounded bg-red-500 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
