<script setup lang="ts">
    import SystemHeader from '@/components/Homepage/SystemHeader.vue';

</script>

<template>
    <div class="grid grid-rows-[7rem_1fr] h-screen w-screen overflow-hidden">
    
        <header class="col-span-1 row-span-1 z-50">
            <SystemHeader/>
        </header>

        <main class="col-start-1 row-start-2 overflow-auto p-6 flex">
            <RouterView/>
        </main>

    </div>
</template>