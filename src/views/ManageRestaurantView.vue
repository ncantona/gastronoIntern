<script setup lang="ts">
    import { ref } from 'vue';
    import { useRestaurantStore } from '@/stores/Restaurant/useRestaurantStore';
    import { usePopupStore } from '@/stores/General/usePopupStore';
    import RestaurantInfo from '@/components/Host/Manage/RestaurantInfo.vue';
    import EditRestaurantInfo from '@/components/Host/Manage/EditRestaurantInfo.vue';
    import ManageInternAccounts from '@/components/Host/Manage/ManageInternAccounts.vue';
import ManageWaiterAccounts from '@/components/Host/Manage/ManageWaiterAccounts.vue';

    type ViewMode = 'overview' | 'editRestaurant' | 'manageAccounts' | 'createAccount' | 'editAccount' | 'changePassword' | 'changeLoginId';

    interface Restaurant {
        id: number;
        name: string;
        street: string;
        streetNumber: string;
        addressAddition?: string;
        city: string;
        zipcode: string;
        isActive: boolean;
    }

    interface Account {
        id: string;
        loginId: string;
        firstName: string;
        lastName: string;
        email: string;
        roles: string[];
    }

    const restaurantStore = useRestaurantStore();
    const popupStore = usePopupStore();

    const currentView = ref<ViewMode>('overview');
    const selectedAccount = ref<Account | undefined>(undefined);

    const restaurant = ref<Restaurant>({
        id: 1,
        name: 'Grätzlgarten',
        street: 'Hauptstraße',
        streetNumber: '42',
        addressAddition: '2. Stock',
        city: 'Wien',
        zipcode: '1010',
        isActive: true,
    });

    const showEditRestaurant = ref<boolean>(false);

    const backToOverview = () => {
        currentView.value = 'overview';
        selectedAccount.value = undefined;
    };

    const handleRestaurantUpdateSuccess = () => {
        backToOverview();
        // Refresh restaurant data
    };

</script>

<template>
    <div class="p-6 flex flex-col">

        <div class="p-8 px-0">
            <h1 class="text-4xl font-bold text-slate-900 mb-2">Restaurant verwalten</h1>
            <p class="text-slate-600">Verwalte deine Restaurant-Informationen und Mitarbeiter-Accounts</p>
        </div>

        <EditRestaurantInfo
            v-if="showEditRestaurant"
            :restaurant="restaurant"
            @cancel="showEditRestaurant = false"
            @success="showEditRestaurant = false"/>
        <RestaurantInfo 
            v-if="!showEditRestaurant"
            :restaurant="restaurant" 
            @edit="showEditRestaurant = true"/>
        <ManageInternAccounts/>
        <ManageWaiterAccounts/>
    </div>
</template>
