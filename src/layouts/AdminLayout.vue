<script setup lang="ts">
    import AdminHeader from '@/components/Homepage/AdminHeader.vue';
    import AdminNavbar from '@/components/Admin/AdminNavbar.vue';

</script>

<template>
     <div class="grid grid-rows-[7rem_1fr] grid-cols-[18rem_1fr] h-screen w-screen overflow-hidden">
    
    <header class="col-span-2 row-span-1 z-50">
      <AdminHeader />
    </header>

    <aside class="col-start-1 row-start-2 z-40">
      <AdminNavbar />
    </aside>

    <main class="col-start-2 row-start-2 overflow-auto p-6 pr-3">
      <RouterView />
    </main>

  </div>
</template>