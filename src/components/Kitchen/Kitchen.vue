<script setup lang="ts">
    import { useRestaurantActiveOrdersStore } from '@/stores/Restaurant/useRestaurantActiveOrdersStore';
    import OrderWindow from './OrderWindow.vue';
    import { computed } from 'vue';

    const activeOrdersStore = useRestaurantActiveOrdersStore();

    const kitchenOrders = computed(
        () => activeOrdersStore.getOrdersByType('MEAL')
    );

</script>

<template>
    <div class="flex flex-col mt-5">
        <div class="self-center w-95/100 border-3 border-[rgba(101,90,73,0.89)] rounded-2xl p-3 flex m-5 min-h-[550px] h-[600px] overflow-y-hidden hover:overflow-y-auto">
            <span v-if="!kitchenOrders" class="flex justify-center items-center h-full text-3xl text-gray-500">Derzeit keine Bestellungen</span>
            <OrderWindow v-for="order in kitchenOrders" :key="order.id" :orderId="order.id"/>
        </div>
    </div>
</template>