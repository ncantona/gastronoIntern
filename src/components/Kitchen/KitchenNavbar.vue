<script setup lang="ts">
    import { useAuthStore } from '@/stores/Auth/useAuthStore';
    import CustomButton from '../General/CustomButton.vue';
    import { log } from '@/utils/logger';
    import router from '@/router';
    import { ref } from 'vue';

    const authStore = useAuthStore();

    const isOpen = ref(false);
    const toggleSidebar = () => (isOpen.value = !isOpen.value);

    const handleLogout = async () => {
        try {
            log.info('Trying to loggout user.')
            await authStore.logout();
            router.push({ name: 'home' })
        } catch (error) {
            log.error('Logging out user failed.');
        }
    };

</script>

<template>
    <div>
        <button
            @click="toggleSidebar"
            :class="[
                'fixed top-1/2 -translate-y-1/2 z-50 bg-[rgba(163,144,115,0.94)] cursor-pointer',
                'w-12 h-46 border-r border-[rgb(163,144,115)] rounded-r-xl',
                'flex items-center justify-center transition-all',
                isOpen ? 'left-64' : 'left-0']">
        <div class="-rotate-90 font-semibold text-white tracking-wide">
            MENU
        </div>
        </button>

        <aside
            :class="[
                'fixed top-0 left-0 h-full w-64 shadow-xl z-40 bg-[rgba(163,144,115,0.94)] items-center flex',
                'transform transition-transform  flex flex-col justify-between pt-7 pb-7',
                isOpen ? 'translate-x-0' : '-translate-x-full']">

            <nav class="p-4 space-y-4 text-lg flex flex-col gap-2">
                <RouterLink :to="{ name: 'dashboardkitchen' }" @click="toggleSidebar" class="hover:text-[rgb(84,63,20)] cursor-pointer text-white">Übersicht</RouterLink>
                <a class="block hover:text-[rgb(84,63,20)] cursor-pointer text-white">Speisenverwaltung</a>
                <a class="block hover:text-[rgb(84,63,20)] cursor-pointer text-white">Vergangene Bestellungen</a>
            </nav>
            <CustomButton variant="logout" class="w-8/10" @click="handleLogout">abmelden</CustomButton>
        </aside>

        <div
            v-if="isOpen"
            @click="toggleSidebar"
            class="fixed inset-0 bg-black/40 backdrop-blur-sm z-30"
        ></div>
    </div>
</template>