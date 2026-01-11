<script setup lang="ts">
    import { useRestaurantStore } from '@/stores/Restaurant/useRestaurantStore';
    import { usePopupStore } from '@/stores/General/usePopupStore';
    import RestaurantInfo from '@/components/Host/Manage/Restaurant/RestaurantInfo.vue';
    import ManageDashboardAccounts from '@/components/Host/Manage/DashboardAccounts/ManageDashboardAccounts.vue';
    import ManageWaiterAccounts from '@/components/Host/Manage/ManageWaiterAccounts.vue';
    import { onMounted, onUnmounted, ref } from 'vue';

    interface RestaurantAccountResponse {
        id: string,
        loginId: string,
        firstName: string,
        lastName: string,
        email: string,
        roles: string[],
        restaurantId: number,
    };

    const restaurantStore = useRestaurantStore();
    const popupStore = usePopupStore();

    onUnmounted(async () => {
        try {

        } catch {

        }
    })
</script>

<template>
    <div class="p-6 flex flex-col">

        <div class="p-8 px-0">
            <h1 class="text-4xl font-bold text-slate-900 mb-2">Restaurant verwalten</h1>
            <p class="text-slate-600">Sieh deine Restaurant-Informationen ein und verwalte deine Mitarbeiter-Accounts</p>
        </div>

        <RestaurantInfo :restaurant="restaurantStore.restaurant"/>
        <ManageDashboardAccounts :restaurantId="restaurantStore.restaurant?.id || -1"/>
        <ManageWaiterAccounts :accounts="waiterAccounts"/>
    </div>
</template>
