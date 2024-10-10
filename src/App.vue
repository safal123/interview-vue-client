<script setup lang="ts"></script>

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
      <RouterView />
    </main>
  </div>
</template>
