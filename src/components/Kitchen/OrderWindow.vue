<script setup lang="ts">
    import { useRestaurantActiveOrdersStore } from '@/stores/Restaurant/useRestaurantActiveOrdersStore';
    import MealWindow from './MealWindow.vue';
    import { computed, ref } from 'vue';

    const props = defineProps<{
        orderId: number,
    }>();

    const activeOrdersStore = useRestaurantActiveOrdersStore();

    const order = computed(
        () => activeOrdersStore.getOrderWithItemsByType(props.orderId, 'MEAL')
    );

</script>

<template>
    <div v-if="order" class="flex items-center mt-5">
        <div class="p-2 pr-5 text-4xl min-w-20 justify-center flex">
            {{ order.tableId }}
        </div>
        <div class="flex border-2 rounded-2xl gap-5 w-full p-2 bg-[rgba(163,144,115,0.31)] border-[rgba(101,90,73,0.89)] shadow-lg min-h-55 lg:overflow-y-hidden hover:overflow-y-auto">
            <MealWindow v-for="item in order.items" :key="item.id" :orderId="order.id" :item="item"/>
        </div>
    </div>
</template>