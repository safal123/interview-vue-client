<script setup>
import { ref } from 'vue'
</script>

<template>
  <div>
    <form class="space-y-4">
      <div>
        <label class="block text-sm font-bold mb-2" for="firstName"
          >First Name</label
        >
        <input
          required
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
          type="text"
          id="firstName"
          placeholder="Enter first name"
        />
      </div>
      <div>
        <label class="block text-sm font-bold mb-2" for="lastName"
          >Last Name</label
        >
        <input
          required
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
          type="text"
          id="lastName"
          placeholder="Enter last name"
        />
      </div>
    </form>
  </div>
</template>
