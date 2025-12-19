<script setup lang="ts">
  import LogoHeader from '@/components/General/LogoHeader.vue';
  import Navbar from '@/components/Navbar/Navbar.vue';
  import NavbarV2 from '@/components/Navbar/NavbarV2.vue';
  import AddRestaurant from '@/components/Admin/Restaurants/AddRestaurant.vue';
  import { ref } from 'vue';

    interface NavbarButton {
        label: string;
        key: string;
    }

    interface NavbarSection {
        title: string;
        key: string;
        buttons: NavbarButton[];
    }

	const navbar :NavbarSection[] = [
		{
			key: 'general',
			title: 'Statistiken',
			buttons: [
			{ label: 'Restaurant Statistiken', key: 'statisticsrestaurant' },
			{ label: 'Benutzer Statistiken', key: 'statisticsuser' },
			],
		},
		{
			key: 'restaurant',
			title: 'Restaurant',
			buttons: [
			{ label: 'Restaurant anlegen', key: 'addrestaurant' },
			{ label: 'Restaurant bearbeiten', key: 'managerestaurant' },
			{ label: 'Accounts verwalten', key: 'managerestaurantaccounts' },
			],
		},
		{
			key: 'user',
			title: 'Benutzer',
			buttons: [
			{ label: 'Benutzer anzeigen', key: 'manageuser' },
			],
		},
	];

  const currentButton = ref<string>('');
</script>

<template>
  <div class="bg-main-500 grid grid-rows-[5rem_1fr] grid-cols-[19rem_1fr] h-screen w-screen max-w-500 overflow-hidden">
    
    <header class="col-start-2 row-span-1 z-50 h-full">
      <LogoHeader/>
    </header>

    <aside class="col-start-1 row-span-2 z-40 w-full">
      <NavbarV2 v-model="currentButton" :navbar="navbar" header="Admin Panel"/>
    </aside>

    <main class="col-start-2 row-start-2 p-6 pr-3">
      <AddRestaurant v-if="currentButton === 'addrestaurant'"></AddRestaurant>
    </main>

  </div>
</template>