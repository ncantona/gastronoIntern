<script setup lang="ts">
    import { useRestaurantStore } from '@/stores/Restaurant/useRestaurantStore';
    import { usePopupStore } from '@/stores/General/usePopupStore';
    import RestaurantInfo from '@/components/Host/Manage/RestaurantInfo.vue';
    import ManageDashboardAccounts from '@/components/Host/Manage/ManageDashboardAccounts.vue';
    import ManageWaiterAccounts from '@/components/Host/Manage/ManageWaiterAccounts.vue';
    import { onMounted, onUnmounted, ref } from 'vue';

    interface Account {
        id: string;
        loginId: string;
        firstName: string;
        lastName: string;
        email: string;
        roles: string[];
    }

    const restaurantStore = useRestaurantStore();
    const allRestaurantAccounts = ref<Account[]>();
    const dashboardAccounts = ref<Account[]>([]);
    const waiterAccounts = ref<Account[]>([]);
    const popupStore = usePopupStore();

    onMounted(async () => {
        try {
            await restaurantStore.loadAccounts(restaurantStore.restaurant?.id);
            allRestaurantAccounts.value = restaurantStore.accounts;
            dashboardAccounts.value = allRestaurantAccounts.value.filter(acc => acc.roles.includes('ROLE_KITCHEN') || acc.roles.includes('ROLE_BAR'));
            waiterAccounts.value = allRestaurantAccounts.value.filter(acc => acc.roles.includes('ROLE_WAITER'));
        } catch {

        }
    })

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
        <ManageDashboardAccounts :accounts="dashboardAccounts"/>
        <ManageWaiterAccounts :accounts="waiterAccounts"/>
    </div>
</template>
