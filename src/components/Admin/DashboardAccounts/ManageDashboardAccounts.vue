<script setup lang="ts">
    import { getDashboardAccounts } from '@/Services/restaurantAccounts.service';
    import type { RestaurantAccountResponse } from '@/Types/user.types';
    import { onMounted, ref } from 'vue';

    import CreateDashboardAccount from '@/components/Admin/DashboardAccounts/CreateDashboardAccount.vue';
    import DashboardAccounts from '@/components/Admin/DashboardAccounts/DashboardAccounts.vue';
    import CustomButton from '@/components/General/CustomButton.vue';
    import WindowHeader from '@/components/General/WindowHeader.vue';
    import Window from '@/components/General/Window.vue';
    
    import GearSVG from '@/assets/svgs/settingsBlack.svg'

    const props = defineProps<{
        restaurantId: number;
    }>();

    const dashboardAccounts = ref<RestaurantAccountResponse[]>([]);

    const showCreateIntern = ref<boolean>(false);

    onMounted(async () => {
        dashboardAccounts.value = await getDashboardAccounts(props.restaurantId);
    });

</script>

<template>
    <Window class="p-12">
        <div class="flex flex-col gap-5">

            <WindowHeader
                :imgSrc="GearSVG"
                imgAlt="Ein Zahnrad">
                Dashboard-Accounts verwalten
            </WindowHeader>
    
            <CustomButton
                v-if="!showCreateIntern"
                variant="editBlue"
                class="w-full mb-6 gap-2"
                @click="showCreateIntern = true">
                <img src="@/assets/svgs/plusWhite.svg" alt="Weißes Plus in weißem Kreis" class="max-w-5">
                <span>Dashboard-Account anlegen</span>
            </CustomButton>

            <CreateDashboardAccount
                v-if="showCreateIntern"
                :restaurantId="restaurantId"
                @success="showCreateIntern = false; dashboardAccounts.push($event)"
                @cancel="showCreateIntern = false"/>

            <DashboardAccounts
                :accounts="dashboardAccounts"/>

        </div>
    </Window>
</template>