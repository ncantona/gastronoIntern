<script setup lang="ts">
    import { mainColor } from '@/assets/mainColors';
    import { computed, ref } from 'vue';


    const now = ref(Date.now());

    setInterval(() => now.value = Date.now(), 1000);

    const currentTime = computed(() => new Date(now.value).toLocaleTimeString());
</script>

<template>
    <div class="text-white z-50 shadow-xl text-3xl flex justify-between p-5" :style="{backgroundColor: mainColor}" >
        <div>
            Restaurant: {{  }}
        </div>
        <div class=" w-28">
            {{ currentTime }}
        </div>
    </div>
</template>