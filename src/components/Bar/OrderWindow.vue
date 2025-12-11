<script setup lang="ts">
    import { useRestaurantActiveOrdersStore } from '@/stores/Restaurant/useRestaurantActiveOrdersStore';
    import DrinksWindow from '@/components/Bar/DrinksWindow.vue';
    import { computed, ref } from 'vue';

    const props = defineProps<{
        orderId: number,
    }>();

    const activeOrdersStore = useRestaurantActiveOrdersStore();

    const order = computed(
        () => activeOrdersStore.getOrderWithItemsByType(props.orderId, 'BEVERAGE')
    );

</script>

<template>
    <div v-if="order" class="flex flex-col items-center mr-4">
        <div class="flex h-full border-2 rounded-2xl w-full p-2 bg-[rgba(163,144,115,0.31)] border-[rgba(101,90,73,0.89)] shadow-lg min-h-55 overflow-y-hidden hover:overflow-y-auto">
            <DrinksWindow :orderId="order.id"/>
        </div>
    </div>
</template>