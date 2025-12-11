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
        <h1 class="mainHeader">BESTELLUNGEN KÜCHE</h1>
        <div class="border-2 rounded-2xl p-3 flex flex-col m-5 min-h-[550px] h-[600px] xl:overflow-hidden xl:hover:overflow-y-auto overflow-y-auto">
            <span v-if="!kitchenOrders" class="flex justify-center items-center h-full text-3xl text-gray-500">Derzeit keine Bestellungen</span>
            <OrderWindow v-for="order in kitchenOrders" :key="order.id" :orderId="order.id"/>
        </div>
    </div>
</template>