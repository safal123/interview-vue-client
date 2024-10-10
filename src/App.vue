<script setup lang="ts">
import { onMounted } from 'vue'
import useAuthentication from './composables/useAuthentication'

const { isLoggedIn, signIn, fetchUser, currentUser } = useAuthentication()

// Onmount check if user is logged in
// This is a direct login for demo purposes
// WARNING: Do not do this in production.
onMounted(() => {
  if (!isLoggedIn.value) {
    // User with this credentials is already created in the database
    signIn({
      email: 'demo@slipstream.com',
      password: 'password',
    })
  }
  fetchUser()
})
</script>

<template>
  <div class="container mx-auto min-h-screen">
    <nav>
      <div class="py-6 px-4 sm:px-6 lg:px-8 border-b bg-gray-100">
        <div class="flex justify-between items-center">
          <RouterLink to="/" class="text-gray-800"> Home </RouterLink>
          <RouterLink to="/customers" class="text-gray-800">
            Customers
          </RouterLink>
        </div>
      </div>
    </nav>
    <main>
      <pre>
        {{ currentUser }}
      </pre>
      <RouterView />
    </main>
  </div>
</template>
