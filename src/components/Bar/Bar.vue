<script setup lang="ts">
    import { useRestaurantActiveOrdersStore } from '@/stores/Restaurant/useRestaurantActiveOrdersStore';
    import OrderWindow from '@/components/Bar/OrderWindow.vue';
    import { computed, ref } from 'vue';

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
    <div class="flex flex-col">
        <OrderWindow :orders="barOrders"/>
        <div class="self-center w-95/100 border-3 border-main-500 rounded-2xl p-3 flex m-5  h-[250px] overflow-y-hidden hover:overflow-y-auto">
            <span v-if="!barOrders" class="flex items-center justify-center w-full h-full text-3xl text-gray-500">Derzeit keine Bestellungen</span>
        </div>
    </div>
</template>