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

    const firstColumn = computed(() => {
        return props.orders?.filter((order, index) => index % 4 === 0) || [];
    });

    const secondColumn = computed(() => {
        return props.orders?.filter((order, index) => index % 4 === 1) || [];
    });

    const thirdColumn = computed(() => {
        return props.orders?.filter((order, index) => index % 4 === 2) || [];
    });

    const fourthColumn = computed(() => {
        return props.orders?.filter((order, index) => index % 4 === 3) || [];
    });

</script>

<template>
    <Window class="self-center w-95/100 bg-white/80 gap-0 rounded-md min-h-[600px] overflow-y-auto">
        <div v-if="props.orders" class="grid grid-cols-4 gap-5 w-full">

            <div class="flex flex-col gap-5">
                <div v-for="order in firstColumn" :key="order.id">
                    <MealsWindow :orderId="order.id"/>
                </div>
            </div>

            <div class="flex flex-col gap-5">
                <div v-for="order in secondColumn" :key="order.id">
                    <MealsWindow :orderId="order.id"/>
                </div>
            </div>

            <div class="flex flex-col gap-5">
                <div v-for="order in thirdColumn" :key="order.id">
                    <MealsWindow :orderId="order.id"/>
                </div>
            </div>

            <div class="flex flex-col gap-5">
                <div v-for="order in fourthColumn" :key="order.id">
                    <MealsWindow :orderId="order.id"/>
                </div>
            </div>

        </div>
    </Window>
</template>