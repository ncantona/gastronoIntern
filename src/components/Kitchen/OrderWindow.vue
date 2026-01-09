<script setup lang="ts">
    import { computed } from 'vue';
    import MealsWindow from './MealsWindow.vue';
    import Window from '../General/Window.vue';

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
    }

    const props = defineProps<{
        orders: Order[] | null;
    }>();

    const sortedOrders = computed(() => {
        if (!props.orders) return null;
        return [...props.orders].sort((a, b) => 
            new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
        );
    });
</script>

<template>
    <Window class="self-center w-95/100 bg-white/80 gap-0 rounded-md min-h-[600px] overflow-y-auto">
        <div v-if="sortedOrders" class="grid grid-cols-4 gap-5 w-full auto-rows-max items-start">
            <div v-for="order in sortedOrders" :key="order.id">
                <MealsWindow :orderId="order.id"/>
            </div>
        </div>
    </Window>
</template>