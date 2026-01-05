<script setup lang="ts">
	import { ref } from 'vue';

	import Restaurants from '@/components/Admin/Restaurants/Restaurants.vue';
	import LogoHeader from '@/components/General/LogoHeader.vue';
	import Navbar from '@/components/Admin/Navbar/Navbar.vue';

  	const currentButton = ref<string>('restaurant');

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
				<Restaurants v-if="currentButton === 'restaurant'" />
			</section>

		</main>

	</div>
</template>