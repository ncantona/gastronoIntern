<script setup lang="ts">
import StatisticsRestaurant from './StatisticsRestaurant.vue';
import StatisticsUser from './StatisticsUser.vue';


</script>

<template>
    <div class="flex flex-col w-full h-full gap-10">
        <div class="w-full h-full">
            <span class="mainHeader text-white">Restaurant Statistiken</span>
            <StatisticsRestaurant></StatisticsRestaurant>
        </div>
        <div class="w-full h-full">
            <span class="mainHeader text-white">Benutzer Statistiken</span>
            <StatisticsUser></StatisticsUser>
            asd
        </div>
    </div>
</template>
