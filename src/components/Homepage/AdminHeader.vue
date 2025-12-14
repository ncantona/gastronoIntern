<script setup lang="ts">
    import { useRoute } from 'vue-router';
    import { computed, ref } from 'vue';

    const now = ref(Date.now());

    setInterval(() => now.value = Date.now(), 1000);

    const currentTime = computed(() => new Date(now.value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    const currentDate = computed(() => new Date(now.value).toLocaleDateString([], { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }));

    const route = useRoute();

</script>

<template>
    <div class="z-50 w-full text-white h-full text-shadow-lg shadow-xl text-3xl flex justify-center p-5 bg-[rgba(141,110,99,1)]">

        <div class="flex flex-col self-center">
            <img src="@/assets/images/Logooo.svg" alt="Gastrono Logo">
        </div>

    </div>
</template>