<script setup lang="ts">
  import AdminHeader from '@/components/Homepage/AdminHeader.vue';
  import AdminNavbar from '@/components/Admin/AdminNavbar.vue';

</script>

<template>
  <div class="bg-brown08 grid grid-rows-[5rem_1fr] grid-cols-[19rem_1fr] h-screen w-screen max-w-500 overflow-hidden">
    
    <header class="col-start-2 row-span-1 z-50 h-full">
      <AdminHeader/>
    </header>

    <aside class="col-start-1 row-span-2 z-40 w-full">
      <AdminNavbar/>
    </aside>

    <main class="col-start-2 row-start-2 p-6 pr-3">
      <RouterView/>
    </main>

  </div>
</template>