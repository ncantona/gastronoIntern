<script setup lang="ts">
    import DrinksWindow from '@/components/Bar/DrinksWindow.vue';
    import Window from '../General/Window.vue';
    import type { OrderResponse } from '@/Types/order.types';

    const props = defineProps<{
        orders: OrderResponse[];
    }>();

</script>

<template>
    <Window class="self-center w-95/100 bg-white/80 gap-4 rounded-md flex min-h-[600px] overflow-y-hidden hover:overflow-y-auto">
        <div v-for="order in orders" :key="order.id">
            <DrinksWindow :order="order"/>
        </div>
        <h3
            v-if="orders.length === 0"
            class="flex items-center justify-center w-full h-full text-3xl text-gray-500">
            Derzeit keine Bestellungen
        </h3>
    </Window>
</template>

