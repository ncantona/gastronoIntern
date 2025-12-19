<script setup lang="ts">
    import { computed, ref } from 'vue';
    import { useRoute } from 'vue-router';

    const now = ref(Date.now());

    setInterval(() => now.value = Date.now(), 1000);

    const currentTime = computed(() => new Date(now.value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    const currentDate = computed(() => new Date(now.value).toLocaleDateString([], { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }));

    const route = useRoute();

</script>

<template>
    <div class="text-white h-28 text-shadow-lg z-50 shadow-xl text-3xl flex justify-between p-5 bg-main-500">
        
        <div class="flex flex-col self-center">
            <span>Grätzlgarten</span>
            <span>#132</span>
        </div>

        <div class="absolute left-1/2 -translate-x-1/2 flex flex-col items-center self-center">
            <span class="font-semibold">{{ route.meta.displayName || 'Dashboard' }}</span>
            <div class="h-0.5 w-22 bg-white rounded mt-1"></div>
        </div>

        <div class="flex flex-col items-end self-center">
            <span class="text-gray-200 text-2xl">{{ currentDate }}</span>
            <span class="font-mono">{{ currentTime }}</span>
        </div>

    </div>
</template>