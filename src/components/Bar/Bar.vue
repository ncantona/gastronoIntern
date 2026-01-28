<script setup lang="ts">
    import OrderWindow from '@/components/Bar/OrderWindow.vue';
    import { onMounted, onUnmounted, ref } from 'vue';
    import Window from '../General/Window.vue';
    import CustomButton from '../General/CustomButton.vue';
    import { useAuthStore } from '@/stores/Auth/useAuthStore';
    import { log } from '@/utils/logger';
    import router from '@/router';
    import type { OrderResponse } from '@/Types/order.types';
    import { getActiveBarOrders, subscribeToBarOrders } from '@/Services/order.service';
    import { useRestaurantStore } from '@/stores/Restaurant/useRestaurantStore';

    const restaurantStore = useRestaurantStore();
    const authStore = useAuthStore();

    const activeBarOrders = ref<OrderResponse[]>([]);
    let unsubscribe: (() => void) | null = null;

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

    onMounted(async (): Promise<void> => {
        const restaurantId = restaurantStore.restaurant?.id;
        
        if (!restaurantId) {
            log.error('No restaurant ID available');
            return;
        }

        // Load initial orders
        activeBarOrders.value = await getActiveBarOrders(restaurantId);
        log.info('Loaded initial bar orders:', activeBarOrders.value);

        // Subscribe to real-time updates
        unsubscribe = subscribeToBarOrders(
            restaurantId,
            (newOrder) => {
                activeBarOrders.value.push(newOrder);
            },
            (error) => {
                log.error('SSE error:', error);
            }
        );
    });

    onUnmounted(() => {
        if (unsubscribe) {
            unsubscribe();
        }
    });

</script>

<template>
    <div class="flex flex-col mt-5">
        <OrderWindow :orders="activeBarOrders"/>
        <Window class="w-95/100 self-center min-h-[180px]">
            <div class="flex justify-end items-end h-full">
                <CustomButton variant="logout" @click="handleLogout">abmelden</CustomButton>
            </div>
        </Window>
    </div>
</template>