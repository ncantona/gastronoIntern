<script setup lang="ts">
import SystemHeader from '@/components/Homepage/SystemHeader.vue';
import { ref, computed } from 'vue';


    const now = ref(Date.now());

    setInterval(() => now.value = Date.now(), 1000);

    const currentTime = computed(() => new Date(now.value).toLocaleTimeString());

</script>

<template>
    <div class="min-h-screen w-full">
        <SystemHeader/>
        <RouterView/>
    </div>
</template>