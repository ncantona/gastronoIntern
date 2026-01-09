<script setup lang="ts">
    import { ref } from 'vue';

    import CreateRestaurant from '@/components/Admin/General/CreateRestaurant.vue';
    import ManageHost from '@/components/Admin/General/ManageHost.vue';
    import CustomButton from '@/components/General/CustomButton.vue';
    import ManageInterns from '@/components/Admin/Restaurants/ManageDashboardAccounts.vue';
    import ManageRestaurant from '@/components/Admin/General/ManageRestaurant.vue';

    interface RestaurantResponse {
        id: number,
        name: string,
        street: string,
        addressAddition: string,
        zipcode: string,
        city: string,
        isActive: boolean,
        createdAt: string,
    };

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