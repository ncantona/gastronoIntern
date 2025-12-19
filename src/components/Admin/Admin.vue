<script setup lang="ts">
	import { ref } from 'vue';

	import Statistics from '@/components/Admin/Statistics/Statistics.vue';
	import Restaurants from '@/components/Admin/Restaurants/Restaurants.vue';
	import User from '@/components/Admin/User/User.vue';
	import LogoHeader from '@/components/General/LogoHeader.vue';
	import Navbar from '@/components/Admin/Navbar/Navbar.vue';

  const currentButton = ref<string>('');

</script>

<template>
	<div class="bg-main-500 grid grid-rows-[5rem_1fr] grid-cols-[19rem_1fr] h-screen w-screen max-w-500 overflow-hidden">

	<header class="col-start-2 row-span-1 z-50 h-full">
		<LogoHeader/>
	</header>

	<aside class="col-start-1 row-span-2 z-40 w-full">
		<Navbar v-model="currentButton"/>
	</aside>

	<main class="col-start-2 row-start-2 p-6 mt-10">
		<Statistics v-if="currentButton === 'statistics'"></Statistics>
		<Restaurants v-if="currentButton === 'restaurant'"></Restaurants>
		<User v-if="currentButton === 'user'"></User>
	</main>

	</div>
</template>