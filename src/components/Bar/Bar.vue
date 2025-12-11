<script setup lang="ts">
    import { useRestaurantActiveOrdersStore } from '@/stores/Restaurant/useRestaurantActiveOrdersStore';
    import OrderWindow from '@/components/Bar/OrderWindow.vue';
    import { computed, ref } from 'vue';

    const activeOrdersStore = useRestaurantActiveOrdersStore();

    const barOrders = computed(
        () => activeOrdersStore.getOrdersByType('BEVERAGE')
    );

    const now = ref(Date.now());

    setInterval(() => now.value = Date.now(), 1000);

    const currentTime = computed(() => new Date(now.value).toLocaleTimeString());

</script>

<template>
    <div class="flex flex-col mt-5">
        <span class="mainHeader">BESTELLUNGEN BAR</span>
        <span>{{ currentTime }}</span>
        <div class="border-2 rounded-2xl p-3 flex m-5 min-h-[550px] h-[600px] overflow-y-hidden hover:overflow-y-auto">
            <span v-if="!barOrders" class="flex items-center justify-center w-full h-full text-3xl text-gray-500">Derzeit keine Bestellungen</span>
            <OrderWindow v-for="order in barOrders" :key="order.id" :orderId="order.id"/>
        </div>
    </div>
</template>