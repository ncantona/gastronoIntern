<script setup lang="ts">
  import AdminNavbarSectionHeader from './AdminNavbarSectionHeader.vue';
  import { useAuthStore } from '@/stores/Auth/useAuthStore';
  import AdminNavbarButton from './AdminNavbarButton.vue';
  import CustomButton from '../General/CustomButton.vue';
  import { log } from '@/utils/logger';
  import router from '@/router';
  import { ref } from 'vue';

  type ActiveSection = 'general' | 'restaurant' | 'user' | null;

  const authStore = useAuthStore();
  const showGeneral = ref<boolean>(false);
  const showRestaurant = ref<boolean>(false);
  const showUser = ref<boolean>(false);

  const handleLogout = async () => {
      try {
          log.info('Trying to loggout user.')
          await authStore.logout();
          router.push({ name: 'home' })
      } catch (error) {
          log.error('Logging out user failed.');
      }
  };
  
  const activeSection = ref<ActiveSection[]>([]);

  const changeSection = (activeSectionI : ActiveSection) => {
    if (activeSection.value.includes(activeSectionI)) {
      activeSection.value = activeSection.value.filter(as => as != activeSectionI);
      if (activeSectionI === 'general')
        showGeneral.value = false;
      else if (activeSectionI === 'restaurant')
        showRestaurant.value = false;
      else if (activeSectionI === 'user')
        showUser.value = false;
    }
    else {
      activeSection.value.push(activeSectionI);
      if (activeSectionI === 'general')
        showGeneral.value = true;
      else if (activeSectionI === 'restaurant')
        showRestaurant.value = true;
      else if (activeSectionI === 'user')
        showUser.value = true;
    }
  }

</script>

<template>
  <div class="fixed top-0 left-0 bottom-0 w-[19rem] bg-white/80 text-white flex flex-col  z-40">

    <nav class="flex w-full text-lg h-full flex-col p-6 pr-0 gap-1">

      <div class="flex flex-col mb-6 pr-6">
        <span class="mainHeader text-reallyDarkBrown mb-4">Admin Panel</span>
        <div class="h-0.5 w-30 self-center bg-reallyDarkBrown rounded mb-4"></div>
      </div>

      <AdminNavbarSectionHeader @click="changeSection('general')" v-model="showGeneral">Statistiken</AdminNavbarSectionHeader>

      <div
        class="overflow-hidden transition-all duration-400"
        :class="activeSection.includes('general') ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'">
        <AdminNavbarButton linkTo="statisticsrestaurant">
          Restaurant Statistiken
        </AdminNavbarButton>
        <AdminNavbarButton linkTo="statisticsuser">
          Benutzer Statistiken
        </AdminNavbarButton>
      </div>

      <AdminNavbarSectionHeader @click="changeSection('restaurant')" v-model="showRestaurant">Restaurants</AdminNavbarSectionHeader>

      <div
        class="overflow-hidden transition-all duration-400"
        :class="activeSection.includes('restaurant') ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'">
        <AdminNavbarButton linkTo="addrestaurant">Restaurant anlegen</AdminNavbarButton>
        <AdminNavbarButton linkTo="managerestaurant">Restaurant bearbeiten</AdminNavbarButton>
        <AdminNavbarButton linkTo="managerestaurantaccounts">Accounts verwalten</AdminNavbarButton>
      </div>
      <AdminNavbarSectionHeader @click="changeSection('user')" v-model="showUser">Benutzer</AdminNavbarSectionHeader>
      
      <div
        class="overflow-hidden transition-all duration-400"
        :class="activeSection.includes('user') ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'">
        <AdminNavbarButton linkTo="manageuser">Benutzer anzeigen</AdminNavbarButton>
      </div>
    </nav>

    <div class="p-6 flex flex-col border-reallyDarkBrown">
      <div class="h-0.5 w-30 self-center bg-reallyDarkBrown rounded mb-4"></div>
      <CustomButton
        variant="logout"
        class="w-full"
        @click="handleLogout">
        Abmelden
      </CustomButton>
    </div>
  </div>
</template>