<script setup lang="ts">
    import type { RestaurantAccountResponse } from '@/Types/user.types';
    import { ref } from 'vue';

    import EditDashboardAccount from '@/components/Host/Manage/DashboardAccounts/EditDashboardAccount.vue';
    import DashboardAccountInfo from '@/components/ConnectedComponents/DashboardAccountInfo.vue';

    const props = defineProps<{
        accounts: RestaurantAccountResponse[];
    }>();

    const showEdit = ref<string>('');

    const updateLocalAccount = (account: RestaurantAccountResponse, index :number) => {
        props.accounts[index] = account;
    };

</script>

<template>
    <div class="flex flex-col gap-4">
        <div v-for="(account, index) in accounts" :key="account.id">
            <DashboardAccountInfo
                v-if="showEdit != account.id"
                :account="account"
                :showEdit="true"
                @edit="showEdit = account.id"/>

            <EditDashboardAccount
                v-if="showEdit === account.id"
                :dashboardAccount="account"
                :restaurant-id="account.restaurantId"
                @cancel="showEdit = ''"
                @success="updateLocalAccount($event, index); showEdit=''"/>
        </div>
    </div>
</template>
