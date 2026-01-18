<script setup lang="ts">
    import { useRestaurantStore } from '@/stores/Restaurant/useRestaurantStore';
    
    import ManageDashboardAccounts from '@/components/Host/Manage/DashboardAccounts/ManageDashboardAccounts.vue';
    import ManageWaiterAccounts from '@/components/Host/Manage/WaiterAccounts/ManageWaiterAccounts.vue';
    import RestaurantInfo from '@/components/ConnectedComponents/RestaurantInfo.vue';
    import ViewHeader from '@/components/General/ViewHeader.vue';

    const restaurantStore = useRestaurantStore();
</script>

<template>
    <div class="p-6 flex flex-col">

        <ViewHeader>
            <template #title>
                Restaurant verwalten
            </template>
            <template #subtitle>
                Sieh deine Restaurant-Informationen ein und verwalte deine Mitarbeiter-Accounts
            </template>
        </ViewHeader>

        <RestaurantInfo
            v-if="restaurantStore.restaurant"
            :restaurant="restaurantStore.restaurant"/>

        <ManageDashboardAccounts
            :restaurantId="restaurantStore.restaurant?.id || -1"/>

        <ManageWaiterAccounts
        :restaurantId="restaurantStore.restaurant?.id || -1"/>

    </div>
</template>
