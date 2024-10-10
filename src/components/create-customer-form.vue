<script setup>
const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
  errorMessage: {
    type: String,
    required: false,
  }
})
</script>

<template>
  <div class="items-center justify-center">
    Fields marked with (*) are required.
  </div>
  <div v-if="errorMessage" class="bg-red-100 text-red-500 p-4 rounded">
    {{ errorMessage }}
  </div>
  <div class="grid grid-cols-2 gap-4">
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-bold mb-2" for="name">Name *</label>
        <input
          required
          v-model="formData.name"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
          type="text"
          id="name"
          placeholder="Enter name"
        />
      </div>
      <div>
        <label class="block text-sm font-bold mb-2" for="reference"
          >Reference *</label
        >
        <input
          v-model="formData.reference"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
          type="text"
          id="reference"
          required
          placeholder="Enter reference"
        />
      </div>
      <div>
        <label class="block text-sm font-bold mb-2" for="category"
          >Category *</label
        >
        <select
          v-model="formData.category"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
          id="category"
        >
          <option value="" disabled>Select Category</option>
          <option value="Gold">Gold</option>
          <option value="Silver">Silver</option>
          <option value="Bronze">Bronze</option>
        </select>
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-lg font-bold">Details</h2>
      <div>
        <label class="block text-sm font-bold mb-2" for="startDate"
          >Start Date *</label
        >
        <input
          v-model="formData.startDate"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
          type="date"
          id="startDate"
        />
      </div>
      <div>
        <label class="block text-sm font-bold mb-2" for="description"
          >Description *</label
        >
        <textarea
          v-model="formData.description"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
          id="description"
          rows="4"
          placeholder="Enter description"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid {
  grid-template-columns: repeat(2, 1fr);
}
</style>
