<script setup lang="ts">
    import type { RestaurantResponse } from '@/Types/restaurant.types';
    import { ref } from 'vue';

    import ManageInterns from '@/components/Admin/DashboardAccounts/ManageDashboardAccounts.vue';
    import ManageRestaurant from '@/components/Admin/Restaurant/ManageRestaurant.vue';
    import CreateRestaurant from '@/components/Admin/Restaurant/CreateRestaurant.vue';
    import CustomButton from '@/components/General/CustomButton.vue';
    import ManageHost from '@/components/Admin/Host/ManageHost.vue';

    const currentRestaurant = ref<RestaurantResponse | null>(null);

</script>

<template>
    <div class="flex flex-col">

        <CustomButton
            v-show="currentRestaurant"
            variant="cancel"
            @click="currentRestaurant = null"
            class="m-2.5">Zurück
        </CustomButton>

        <ManageRestaurant
            v-if="currentRestaurant"
            v-model="currentRestaurant"/>

        <ManageHost
            v-if="currentRestaurant"
            :restaurantId="currentRestaurant.id"/>

        <ManageInterns
            v-if="currentRestaurant"
            :restaurantId="currentRestaurant.id"/>

        <CreateRestaurant
            v-show="!currentRestaurant"
            @success="currentRestaurant = $event"/>

        <div class="h-100"></div>

    </div>
</template>