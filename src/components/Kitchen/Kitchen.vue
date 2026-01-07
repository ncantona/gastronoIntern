<script setup lang="ts">
    import { useRestaurantActiveOrdersStore } from '@/stores/Restaurant/useRestaurantActiveOrdersStore';
    import OrderWindow from './OrderWindow.vue';
    import { computed } from 'vue';
import Window from '../General/Window.vue';
import CustomButton from '../General/CustomButton.vue';
import { useAuthStore } from '@/stores/Auth/useAuthStore';
import router from '@/router';
import { log } from '@/utils/logger';

    const activeOrdersStore = useRestaurantActiveOrdersStore();

    const kitchenOrders = computed(
        () => activeOrdersStore.getOrdersByType('MEAL')
    );

    const authStore = useAuthStore();

    const logout = async () => {
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
    <div class="flex flex-col mt-5">
        <OrderWindow :orders="kitchenOrders"/>
        <span v-if="!kitchenOrders" class="flex justify-center items-center h-full text-3xl text-gray-500">Derzeit keine Bestellungen</span>
        <Window class="w-95/100 self-center min-h-[180px]">
            <div class="flex justify-end items-end h-full">
                <CustomButton variant="logout" @click="logout()">abmelden</CustomButton>
            </div>
        </Window>
    </div>
</template>