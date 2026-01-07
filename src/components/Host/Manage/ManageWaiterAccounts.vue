<script setup lang="ts">
    import Window from '@/components/General/Window.vue';
import WaiterAccount from './WaiterAccount.vue';
import CustomButton from '@/components/General/CustomButton.vue';

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
    <Window class="p-12">
        <h2 class="text-2xl font-bold text-slate-900 mb-6">Kellner-Accounts</h2>
        <CustomButton variant="editBlue" class="w-full mb-6 gap-2">
            <img src="@/assets/svgs/plusWhite.svg" alt="" class="max-w-5">
            <span>
                Kellner anlegen
            </span>
        </CustomButton>
        <WaiterAccount v-for="acc in accounts" :account="acc"/>
    </Window>
</template>
