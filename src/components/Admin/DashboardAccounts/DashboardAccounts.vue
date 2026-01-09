<script setup lang="ts">
    import { ref } from 'vue';

    import DashboardAccountInfo from '@/components/Admin/DashboardAccounts/DashboardAccountInfo.vue';
    import EditDashboardAccount from '@/components/Admin/DashboardAccounts/EditDashboardAccount.vue';
import DeleteWindow from '@/components/General/DeleteWindow.vue';

    interface RestaurantAccountResponse {
        id: string,
        loginId: string,
        firstName: string,
        lastName: string,
        email: string,
        roles: string[],
        restaurantId: number,
    };

    const props = defineProps<{
        accounts: RestaurantAccountResponse[];
    }>();

    const showEdit = ref<string>('');

    const updateLocalAccount = (account: RestaurantAccountResponse, index :number) => {
        props.accounts[index] = account;
    }

    const accountToDelete = ref<RestaurantAccountResponse | null>(null);
</script>

<template>
    <div class="flex flex-col gap-4">
        <div v-for="(account, index) in accounts" :key="account.id">
            <DashboardAccountInfo
                v-if="showEdit != account.id"
                :account="account"
                @edit="showEdit = account.id"
                @delete="accountToDelete = account"/>

            <EditDashboardAccount
                v-if="showEdit === account.id"
                :dashboardAccount="account"
                :restaurant-id="account.restaurantId"
                @cancel="showEdit = ''"
                @success="updateLocalAccount($event, index); showEdit = ''"/>

            <DeleteWindow
                v-if="accountToDelete"
                @cancel="accountToDelete = null">
                <div class="flex flex-col gap-4 justify-center items-center">
                    <span>Möchtest du den Dashboard-Account mit der Login-ID:</span>
                    <span class="flex w-full justify-center text-xl font-medium">{{ accountToDelete.loginId }}</span>
                    <span>wirklich löschen?</span>
                    <span class="text-gray-400">Dies kann nicht rückgängig gemacht werden.</span>
                </div>
            </DeleteWindow>
        </div>
    </div>
</template>
