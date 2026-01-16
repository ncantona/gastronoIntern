<script setup lang="ts">
    import { useRestaurantActiveOrdersStore } from '@/stores/Restaurant/useRestaurantActiveOrdersStore';
    import { ref, computed } from 'vue';
import CheckMark from '../Svgs/CheckMark.vue';

    type ItemType = 'BEVERAGE' | 'MEAL';

    interface Item {
        id: number;
        itemId?: number;
        name: string;
        description: string;
        type: ItemType;
        omits: string[];
        addOns: string[];
        customMsg: string;
        isDone: boolean;
        amount?: number;
    }

    const props = defineProps<{
        orderId: number,
        item: Item,
        hideDoneOverlay?: boolean,
    }>();

    const activeOrdersStore = useRestaurantActiveOrdersStore();

    const isClicked = ref(false);
    const isMarkedAsDone = computed(() => props.item.isDone);

    let markAsReadyTimeout: ReturnType<typeof setTimeout> | null = null;

    const resetAll = () => {
        if (markAsReadyTimeout)
            clearTimeout(markAsReadyTimeout);

        markAsReadyTimeout = null;
        isClicked.value = false;
    };

    const handleClick = () => {
        if (isMarkedAsDone.value)
            return;
        if (isClicked.value) {
            resetAll();
            return;
        }

        isClicked.value = true;

        markAsReadyTimeout = setTimeout(() => {
            const targetId = props.item.itemId ?? props.item.id;
            activeOrdersStore.markItemAsDone(props.orderId, targetId);
        }, 2500);
    };

</script>

<template>
    <div
        @click="handleClick"
        class="'flex flex-col rounded-lg relative p-4 min-w-60 cursor-pointer shadow-xl'"
        :class="[isClicked ? 'bg-green-100' : 'bg-white/90']">

        <CheckMark v-if="isMarkedAsDone && !props.hideDoneOverlay" class="absolute flex w-fit top-0 p-3 right-0 h-full items-center"/>

        <div class="flex gap-3 items-center">

            <p class="inline-flex items-center justify-center min-w-7 min-h-7 rounded-full bg-gray-400/40 text-black font-semibold">
                {{ props.item.amount ?? 1 }}
            </p>

            <p class="font-bold text-left">{{ props.item.name }}</p>

        </div>

    </div>
</template>
