<script setup lang="ts">
    import { useAdminRestaurantStore } from '@/stores/Admin/useAdminRestaurantStore';
    import { onMounted, ref } from 'vue';

    import DashboardAccounts from '@/components/Host/Manage/DashboardAccounts/DashboardAccounts.vue';
    import WindowHeader from '@/components/General/WindowHeader.vue';
    import Window from '@/components/General/Window.vue';
    
    import GearSVG from '@/assets/svgs/settingsBlack.svg'

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
        restaurantId: number;
    }>();

    const adminRestaurantStore = useAdminRestaurantStore();

    const internAccounts = ref<RestaurantAccountResponse[]>([]);

    onMounted(async () => {
        internAccounts.value = await adminRestaurantStore.getRestaurantInterns(props.restaurantId);
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
                :accounts="internAccounts"/>

        </div>
    </Window>
</template>