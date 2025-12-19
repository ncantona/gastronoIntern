<script setup lang="ts">
    import SystemHeader from '@/components/Homepage/SystemHeader.vue';
    import CustomButton from '@/components/General/CustomButton.vue';
    import { log } from '@/utils/logger';
    import router from '@/router';
    import { useAuthStore } from '@/stores/Auth/useAuthStore';

    const authStore = useAuthStore();

    const handleLogout = async () => {
        try {
            log.info('Trying to loggout user.');
            await authStore.logout();
            log.info('Successfully logged out.');
            router.push({ name: 'home' });
        } catch (error) {
            log.error('Logging out user failed.');
        }
    };
</script>

<template>
    <div class="grid grid-rows-[7rem_1fr] h-screen w-screen overflow-hidden">
    
        <header class="col-span-1 row-span-1 z-50">
            <SystemHeader/>
        </header>

        <main class="col-start-1 row-start-2 overflow-auto p-6 flex">
            <RouterView/>
        </main>
        <CustomButton variant="logout" class="w-8/10" @click="handleLogout">abmelden</CustomButton>

    </div>
</template>