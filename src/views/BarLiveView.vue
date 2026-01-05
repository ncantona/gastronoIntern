<script setup lang="ts">
    import OrderWindow from '@/components/Bar/OrderWindow.vue';
    import Window from '@/components/General/Window.vue';
    import { useRestaurantActiveOrdersStore } from '@/stores/Restaurant/useRestaurantActiveOrdersStore';
    import { computed } from 'vue';

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

</script>

<template>
    <div class="p-6">
        <div class="p-8 px-0">
            <h1 class="text-4xl font-bold text-slate-900 mb-2">Bar Dashboard</h1>
            <p class="text-slate-600">Werfe einen Blick auf die derzeitigen Bestellungen deiner Bar</p>
        </div>
        <Window>
            
        </Window>
        <div class="relative left-1/2 right-1/2 w-screen -translate-x-1/2 bg-white my-5">
            <OrderWindow :orders="barOrders" class="shadow-none mx-24"/>
        </div>
    </div>
</template>