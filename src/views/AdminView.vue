<script setup lang="ts">
	import { ref } from 'vue';

	import ManageRestaurantsSection from '@/components/Admin/ManageRestaurants/ManageRestaurantsSection.vue';
	import CreateRestaurantSection from '@/components/Admin/CreateRestaurant/CreateRestaurantSection.vue';
	import LogoHeader from '@/components/General/LogoHeader.vue';
	import Navbar from '@/components/Admin/Navbar/Navbar.vue';

  	const currentButton = ref<string>('manageRestaurant');

</script>

<template>
	<div class="h-screen w-screen flex flex-col">

		<header>
			<LogoHeader />
		</header>

		<main class="flex flex-1 max-w-330 self-center w-full">

			<aside class="w-5/20">
				<Navbar v-model="currentButton" />
			</aside>

			<section class="w-full flex-1 overflow-auto">
				<ManageRestaurantsSection v-if="currentButton === 'manageRestaurant'" />
				<CreateRestaurantSection v-if="currentButton === 'createRestaurant'"/>
			</section>

		</main>

	</div>
</template>