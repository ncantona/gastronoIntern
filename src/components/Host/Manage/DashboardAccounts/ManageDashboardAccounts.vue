<script setup lang="ts">
    import { getDashboardAccounts } from '@/Services/restaurantAccounts.service';
    import type { RestaurantAccountResponse } from '@/Types/user.types';
    import { onMounted, ref } from 'vue';

    import DashboardAccounts from '@/components/Host/Manage/DashboardAccounts/DashboardAccounts.vue';
    import WindowHeader from '@/components/General/WindowHeader.vue';
    import Window from '@/components/General/Window.vue';
    
    import GearSVG from '@/assets/svgs/settingsBlack.svg'

    const props = defineProps<{
        restaurantId: number;
    }>();

    const dashboardAccounts = ref<RestaurantAccountResponse[]>([]);

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

            <DashboardAccounts
                :accounts="dashboardAccounts"/>

        </div>
    </Window>
</template>