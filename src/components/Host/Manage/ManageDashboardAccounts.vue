<script setup lang="ts">
    import Window from '@/components/General/Window.vue';
import DashboardAccount from './DashboardAccount.vue';

    interface Account {
        id: string;
        loginId: string;
        firstName: string;
        lastName: string;
        email: string;
        roles: string[];
    }

    const props = defineProps<{
        accounts: Account[],
    }>();
</script>

<template>
    <Window class="p-12 flex flex-col gap-5">
        <h2 class="text-2xl font-bold text-slate-900 mb-6">Dashboard-Accounts</h2>
        <DashboardAccount v-for="acc in accounts" :account="acc"/>
    </Window>
</template>
