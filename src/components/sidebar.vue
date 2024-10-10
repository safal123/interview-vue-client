<template>
  <aside class="text-gray-900 w-64 h-screen flex flex-col">
    <div class="border-b border-gray-700">
      <div class="p-6 text-center">
        <h1 class="text-2xl font-bold text-blue-600">Slipstream</h1>
      </div>
      <div class="px-6 pb-4 text-center">
        <h2 class="text-lg text-muted text-gray-300">TMS Tenant</h2>
      </div>
    </div>
    <nav class="mt-4 flex-grow px-6 space-y-2">
      <router-link
        to="/customers"
        class="block py-2 px-4 rounded hover:bg-gray-700 hover:text-white"
      >
        Customers
      </router-link>
      <router-link
        to="/"
        class="block py-2 px-4 rounded hover:bg-gray-700 hover:text-white"
      >
        Demo 1
      </router-link>
    </nav>
  </aside>
</template>
