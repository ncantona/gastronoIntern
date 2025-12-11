<script setup lang="ts">
import { mainColor } from '@/assets/mainColors';
import { RouterLink } from 'vue-router';

</script>

<template>
    <div class="text-white z-50 shadow-xl flex justify-start p-1 pr-5 pl-5" :style="{backgroundColor: mainColor}" >
        <RouterLink :to="{name: 'home'}">
            <img src="@/assets/images/Logo.svg" alt="Logo" class="w-60">
        </RouterLink>
    </div>
</template>