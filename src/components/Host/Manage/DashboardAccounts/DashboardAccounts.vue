<script setup lang="ts">
    import { ref } from 'vue';

    import DashboardAccountInfo from '@/components/Host/Manage/DashboardAccounts/DashboardAccountInfo.vue';
    import EditDashboardAccount from '@/components/Host/Manage/DashboardAccounts/EditDashboardAccount.vue';

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

</script>

<template>
    <div class="flex flex-col gap-4">
        <div v-for="(account, index) in accounts" :key="account.id">
            <DashboardAccountInfo
                v-if="showEdit != account.id"
                :account="account"
                @edit="showEdit = account.id"/>

            <EditDashboardAccount
                v-if="showEdit === account.id"
                :dashboardAccount="account"
                :restaurant-id="account.restaurantId"
                @cancel="showEdit = ''"
                @success="updateLocalAccount($event, index); showEdit = ''"/>
        </div>
    </div>
</template>
