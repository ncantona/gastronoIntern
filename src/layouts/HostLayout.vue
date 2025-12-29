<script setup lang="ts">
    import HostHeader from '@/components/Host/Navbar/HostHeader.vue';


</script>

<template>
    <div class="w-screen">
        <HostHeader/>
        <div class="flex justify-center m-2.5">
            <RouterView class="w-full max-w-330"/>
        </div>
    </div>
</template>