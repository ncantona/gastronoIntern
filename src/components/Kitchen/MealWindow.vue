<script setup lang="ts">
    import { useRestaurantActiveOrdersStore } from '@/stores/Restaurant/useRestaurantActiveOrdersStore';
    import { ref, computed } from 'vue';

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
        :class="[
            'flex flex-col rounded-lg relative p-4 min-w-60 cursor-pointer shadow-xl',
            isClicked ? 'bg-green-100' : 'bg-white/90'
        ]">

        <div v-show="isMarkedAsDone && !props.hideDoneOverlay" class="absolute self-center flex top-0 h-full items-center">
            <img src="@/assets/svgs/checkGreen.svg" alt="done" class="w-16 opacity-60">
        </div>

        <div class="font-bold self-center mb-2">
            {{ props.item.name }}
        </div>

        <div class="flex justify-between gap-5">

            <div v-if="props.item.omits && props.item.omits.length" class="mb-2 text-red-800">
                <div v-for="omit in props.item.omits" :key="omit">
                    {{ omit }}
                </div>
            </div>

            <div v-if="props.item.addOns && props.item.addOns.length" class="mb-2 text-green-600">
                <div v-for="addOn in props.item.addOns" :key="addOn">
                    {{ addOn }}
                </div>
            </div>

        </div>

        <div v-if="props.item.customMsg" class="flex flex-col">
            <span>Kommentar:</span>
            <div class="text-gray-600">
                {{ props.item.customMsg }}
            </div>
        </div>

    </div>
</template>
