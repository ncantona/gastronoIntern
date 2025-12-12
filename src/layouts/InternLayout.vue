<script setup lang="ts">
    import SystemHeader from '@/components/Homepage/SystemHeader.vue';

</script>

<template>
    <div class="min-h-screen w-full">
        <SystemHeader/>
        <RouterView/>
    </div>
</template>