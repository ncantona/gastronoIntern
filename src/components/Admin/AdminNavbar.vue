<script setup lang="ts">
    import { useAuthStore } from '@/stores/Auth/useAuthStore';
    import CustomButton from '../General/CustomButton.vue';
    import { log } from '@/utils/logger';
    import router from '@/router';

    const authStore = useAuthStore();

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
  <div class="fixed top-0 bottom-0 w-75 bg-[rgb(184,163,139)] text-white flex flex-col justify-between shadow-lg">

    <nav class="flex text-xl h-full justify-center flex-col p-6 pr-0 gap-3">
    
    
      <div class="flex flex-col gap-2 mb-2 mt-2">

        <div class="flex flex-col gap-2 mb-2 pr-6 mt-2">
          <span class="font-semibold text-[rgba(74,64,45,0.89)]">Allgemein</span>
          <div class="h-0.5 w-full bg-[rgba(74,64,45,0.89)] rounded mt-1"></div>
        </div>
        <RouterLink
          :to="{ name: 'statisticsrestaurant' }"
          class="flex items-center gap-3 p-3 rounded-l-lg text-[rgba(74,64,45,0.89)] hover:bg-[rgba(197,184,161,0.8)] transition-colors"
          active-class="bg-[rgba(197,184,161,0.8)] text-white">
          <span>Restaurant Statistiken</span>
        </RouterLink>
        <RouterLink
          :to="{ name: 'statisticsuser' }"
          class="flex items-center gap-3 p-3 rounded-l-lg text-[rgba(74,64,45,0.89)] hover:bg-[rgba(197,184,161,0.8)] transition-colors"
          active-class="bg-[rgba(197,184,161,0.8)] text-white">
          <span>Benutzer Statistiken</span>
        </RouterLink>

      </div>

      <div class="flex flex-col gap-2 mb-2 mt-2">

        <div class="flex flex-col gap-2 mb-2 pr-6 mt-2">
          <span class="font-semibold text-[rgba(74,64,45,0.89)]">Restaurants</span>
          <div class="h-0.5 w-full bg-[rgba(74,64,45,0.89)] rounded mt-1"></div>
        </div>
        <RouterLink
          :to="{ name: 'addrestaurant'}"
          class="flex items-center gap-3 p-3 rounded-l-lg text-[rgba(74,64,45,0.89)] hover:bg-[rgba(197,184,161,0.8)] transition-colors"
          active-class="bg-[rgba(197,184,161,0.8)] text-white">
          <span>Restaurant hinzufügen</span>
        </RouterLink>
        <RouterLink
          :to="{ name: 'managerestaurant'}"
          class="flex items-center gap-3 p-3 rounded-l-lg text-[rgba(74,64,45,0.89)] hover:bg-[rgba(197,184,161,0.8)] transition-colors"
          active-class="bg-[rgba(197,184,161,0.8)] text-white">
          <span>Restaurant bearbeiten</span>
        </RouterLink>
        <RouterLink
          :to="{ name: 'managerestaurantaccounts'}"
          class="flex items-center gap-3 p-3 rounded-l-lg text-[rgba(74,64,45,0.89)] hover:bg-[rgba(197,184,161,0.8)] transition-colors"
          active-class="bg-[rgba(197,184,161,0.8)] text-white">
          <span>Accounts verwalten</span>
        </RouterLink>

      </div>

      <div class="flex flex-col gap-2 mb-2 mt-2">

        <div class="flex flex-col gap-2 mb-2 pr-6 mt-2">
          <span class="font-semibold text-[rgba(74,64,45,0.89)]">Benutzer</span>
          <div class="h-0.5 w-full bg-[rgba(74,64,45,0.89)] rounded mt-1"></div>
        </div>
        <RouterLink
          :to="{ name: 'manageuser'}"
          class="flex items-center gap-3 p-3 rounded-l-lg text-[rgba(74,64,45,0.89)] hover:bg-[rgba(197,184,161,0.8)] transition-colors"
          active-class="bg-[rgba(197,184,161,0.8)] text-white">
          <span>Benutzer anzeigen</span>
        </RouterLink>

      </div>

    </nav>

    <div class="p-6 flex flex-col border-[rgba(74,64,45,0.89)]">
      <div class="h-0.5 w-30 self-center bg-[rgba(74,64,45,0.89)] rounded mb-4"></div>
      <CustomButton
        variant="logout"
        class="w-full"
        @click="handleLogout">
        Abmelden
      </CustomButton>
    </div>
  </div>
</template>