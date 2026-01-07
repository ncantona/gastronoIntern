<script setup lang="ts">
    import { useRestaurantActiveOrdersStore } from '@/stores/Restaurant/useRestaurantActiveOrdersStore';
    import OrderWindow from '@/components/Bar/OrderWindow.vue';
    import { computed, ref } from 'vue';
import Window from '../General/Window.vue';
import CustomButton from '../General/CustomButton.vue';
import { useAuthStore } from '@/stores/Auth/useAuthStore';
import { log } from '@/utils/logger';
import router from '@/router';

    type ItemType = 'BEVERAGE' | 'MEAL';

    interface Item {
        id: number;
        itemId: number;
        name: string;
        description: string;
        type: ItemType;
        omits: string[];
        addOns: string[];
        customMsg: string;
        isDone: boolean;
        isPickedUp: boolean;
        prepTime: string;
        amount?: number;
    }

    interface Order {
        id: number;
        tableId: number;
        datetime: string;
        items: Item[];
    };

    const activeOrdersStore = useRestaurantActiveOrdersStore();

    const barOrders= computed(
        () => activeOrdersStore.getOrdersByType('BEVERAGE') as Order[]
    );

    const authStore = useAuthStore();

    const handleLogout = async () => {
        try {
            log.info('Trying to loggout user.');
            await authStore.logout();
            log.info('Successfully logged out.');
            router.push({ name: 'home' });
        } catch (error) {
            log.error('Logging out user failed.');
        }
    };

</script>

<template>
    <div class="flex flex-col">
        <OrderWindow :orders="barOrders"/>
        <span v-if="!barOrders" class="flex items-center justify-center w-full h-full text-3xl text-gray-500">Derzeit keine Bestellungen</span>
        <Window class="w-95/100 self-center min-h-[180px]">
            <div class="flex justify-end items-end h-full">
                <CustomButton variant="logout" @click="handleLogout">abmelden</CustomButton>
            </div>
        </Window>
    </div>
</template>