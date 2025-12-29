<script setup lang="ts">
    import DisplayRestaurants from '@/components/Admin/Restaurants/DisplayRestaurants.vue';
    import CreateRestaurant from './CreateRestaurantV2.vue';
    import { ref } from 'vue';
    import ManageRestaurant from './ManageRestaurant.vue';
    import ManageHost from './ManageHost.vue';
import ManageInterns from './ManageInterns.vue';
import CustomButton from '@/components/General/CustomButton.vue';

    interface Restaurant {
        id: number,
        name: string,
        street: string,
        addressAddition: string,
        city: string,
        zipcode: string,
        isActive: boolean,
        categories: string[],
    }

    const currentRestaurant = ref<Restaurant | null>(null);

</script>

<template>
    <div class="flex flex-col">
        <CustomButton v-show="currentRestaurant" variant="cancel" @click="currentRestaurant = null" class="m-2.5">Zurück</CustomButton>
        <DisplayRestaurants v-model="currentRestaurant" v-show="!currentRestaurant"/>
        <ManageRestaurant :restaurant="currentRestaurant" v-if="currentRestaurant"/>
        <ManageHost :restaurantId="currentRestaurant.id" v-if="currentRestaurant"/>
        <ManageInterns :restaurantId="currentRestaurant.id" v-if="currentRestaurant"/>
        <CreateRestaurant v-show="!currentRestaurant" @createSuccess="currentRestaurant = $event"/>
        <div class="h-200"></div>
    </div>
</template>