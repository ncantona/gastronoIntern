<script setup lang="ts">
    import { useAdminRestaurantStore } from '@/stores/Admin/useAdminRestaurantStore';
    import { onMounted, ref } from 'vue';

    import CreateDashboardAccount from '@/components/Admin/Restaurants/CreateDashboardAccount.vue';
    import DashboardAccount from '@/components/Host/Manage/DashboardAccount.vue';
    import CustomButton from '@/components/General/CustomButton.vue';
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

    const showCreateIntern = ref<boolean>(false);

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
                Interns verwalten
            </WindowHeader>
    
            <CustomButton
                v-if="!showCreateIntern"
                variant="editBlue"
                class="w-full mb-6 gap-2"
                @click="showCreateIntern = true">
                <img src="@/assets/svgs/plusWhite.svg" alt="Weißes Plus in weißem Kreis" class="max-w-5">
                <span>Intern anlegen</span>
            </CustomButton>

            <CreateDashboardAccount
                v-if="showCreateIntern"
                :restaurantId="restaurantId"
                @success="showCreateIntern = false; internAccounts.push($event)"
                @cancel="showCreateIntern = false"/>

            <DashboardAccount
                v-for="acc in internAccounts"
                :key="acc.id"
                :account="acc"/>

        </div>
    </Window>
</template>