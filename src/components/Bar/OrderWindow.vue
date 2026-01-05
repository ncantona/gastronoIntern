<script setup lang="ts">
    import DrinksWindow from '@/components/Bar/DrinksWindow.vue';
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
    };

    const props = defineProps<{
        orders: Order[];
    }>();

</script>

<template>
    <Window class="self-center w-95/100 bg-white/80 gap-4 rounded-md flex min-h-[600px] overflow-y-hidden hover:overflow-y-auto">
        <div v-for="order in orders" :key="order.id">
            <DrinksWindow :orderId="order.id"/>
        </div>
    </Window>
</template>

