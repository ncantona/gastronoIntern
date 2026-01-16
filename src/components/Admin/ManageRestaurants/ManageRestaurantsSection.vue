<script setup lang="ts">
    import type { RestaurantResponse } from '@/Types/restaurant.types';
    import { ref } from 'vue';

    import DisplayAndSearchRestaurants from '@/components/Admin/ManageRestaurants/DisplayAndSearchRestaurant.vue';
    import ManageDashboardAccounts from '@/components/Admin/DashboardAccounts/ManageDashboardAccounts.vue';
    import ManageRestaurant from '@/components/Admin/Restaurant/ManageRestaurant.vue';
    import ManageHost from '@/components/Admin/Host/ManageHost.vue';
    import CustomButton from '@/components/General/CustomButton.vue';

    const currentRestaurant = ref<RestaurantResponse | null>(null);

</script>

<template>
    <div class="flex flex-col">

        <CustomButton
            v-show="currentRestaurant"
            variant="cancel"
            @click="currentRestaurant = null"
            class="m-2.5">
            Zurück
        </CustomButton>

        <DisplayAndSearchRestaurants
            v-show="!currentRestaurant"
            v-model="currentRestaurant"/>

        <ManageRestaurant
            v-if="currentRestaurant"
            v-model="currentRestaurant"/>

        <ManageHost
            v-if="currentRestaurant"
            :restaurantId="currentRestaurant.id"/>

        <ManageDashboardAccounts
            v-if="currentRestaurant"
            :restaurantId="currentRestaurant.id"/>

        <div class="h-100"></div>

    </div>
</template>