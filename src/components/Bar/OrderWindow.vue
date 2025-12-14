<script setup lang="ts">
    import { useRestaurantActiveOrdersStore } from '@/stores/Restaurant/useRestaurantActiveOrdersStore';
    import DrinksWindow from '@/components/Bar/DrinksWindow.vue';
    import { computed } from 'vue';

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
        <div class="flex h-full border-2 rounded-2xl w-full p-1.5 bg-[rgba(141,110,99,0.8)] border-[rgba(141,110,99,0.2)] shadow-xl min-h-55 overflow-y-hidden hover:overflow-y-auto">
            <DrinksWindow :orderId="order.id"/>
        </div>
    </div>
</template>