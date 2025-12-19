<script setup lang="ts">
    import { RouterLink } from 'vue-router';
    import CustomButton from '../General/CustomButton.vue';
    
</script>

<template>
<div class="text-white z-50 shadow-xl flex justify-between pr-5 pl-5 p-1 bg-main-500" >
    <RouterLink :to="{name: 'home'}">
        <img src="@/assets/images/Logo.svg" alt="Logo" class="w-60">
    </RouterLink>
    <div class="flex gap-4">
        <div class="lg:flex items-center hidden">
            <RouterLink :to="{name: 'login'}">
                <CustomButton variant="main" class="items-center gap-3">
                    <img src="@/assets/svgs/person_white.svg" alt="Person Icon" class="w-6">
                    Anmelden
                </CustomButton>
            </RouterLink>
        </div>
        <div class="flex items-center">
            <CustomButton variant="main" class="w-13 h-12">
                <img src="@/assets/svgs/burgerMenue_white.svg" alt="burger Menue Icon" class="min-w-8 self-center">
            </CustomButton>
        </div>
    </div>
</div>
</template>