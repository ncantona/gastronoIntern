<script setup lang="ts">
    import { useRestaurantActiveOrdersStore } from '@/stores/Restaurant/useRestaurantActiveOrdersStore';
    import { ref, computed, onMounted, onUnmounted } from 'vue';

    type ItemType = 'BEVERAGE' | 'MEAL';

    interface Item {
        id: number;
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
    }>();

    const activeOrdersStore = useRestaurantActiveOrdersStore();

    const order = computed(
        () => activeOrdersStore.getOrderWithItemsByType(props.orderId, 'BEVERAGE')
    );

    const isClicked = ref(false);
    const isFading = ref(false);
    const now = ref(Date.now());
    const orderTime = order.value?.datetime.split('T')[1].substring(0, 5);

    let intervalID :number;
    let fadeStartTimeout: ReturnType<typeof setTimeout> | null = null;
    let removeTimeout: ReturnType<typeof setTimeout> | null = null;

    const resetAll = () => {
        if (fadeStartTimeout)
            clearTimeout(fadeStartTimeout);
        if (removeTimeout)
            clearTimeout(removeTimeout);

        fadeStartTimeout = null;
        removeTimeout = null;

        isClicked.value = false;
        isFading.value = false;
    };

    const handleClick = () => {

        if (isClicked.value) {
            resetAll();
            return;
        }

        isClicked.value = true;

        fadeStartTimeout = setTimeout(() => {
            isFading.value = true;

            removeTimeout = setTimeout(() => {
                order.value?.items.forEach(item => activeOrdersStore.markItemAsDone(props.orderId, item.id));
            }, 1500);

        }, 2000);
    };

    const passedTime = computed(() => {
        if (!order.value)
            return '';

        const orderDate = new Date(order.value.datetime);
        const diffMs = now.value - orderDate.getTime();

        const diffSeconds = Math.floor(diffMs / 1000);

        const minutes = Math.floor(diffSeconds / 60);
        const seconds = diffSeconds % 60;

        const mm = minutes.toString().padStart(2, '0');
        const ss = seconds.toString().padStart(2, '0');

        return `${mm}:${ss}`;
    });

    onMounted(() => {
        intervalID = window.setInterval(() => {
            now.value = Date.now();
        }, 1000);
    });

    onUnmounted(() => {
        if (intervalID)
            clearInterval(intervalID);
    });

</script>

<template>
    <div
        @click="handleClick"
        :class="[
            'flex flex-col rounded-2xl p-4 min-w-60 cursor-pointer max-w-55 shadow-xl transition-all duration-2000',
            isClicked ? 'border-2 border-green-200 bg-green-100' : 'border-2 bg-[rgba(255,255,255,0.64)] border-[rgba(126,111,90,0.89)]',
            isFading ? 'opacity-0 scale-[0.97]' : 'opacity-100'
        ]">

        <div class="flex flex-col gap-1 mb-5 border-2 rounded-2xl -m-2 p-1 border-[rgba(126,111,90,0.89)] bg-[rgba(255,255,255,0.64)]">
            <div class="flex gap-2 justify-center text-xl font-bold items-center">
                <img src="@/assets/svgs/table.svg" alt="table" class="w-10">
                {{ order?.tableId }}
            </div>
            <div class="flex justify-between">
                <div class="flex items-center gap-1.5 border-2 w-25.5 border-[rgba(126,111,90,0.42)] p-1 pl-3 pr-3 rounded-4xl">
                    <img src="@/assets/svgs/order.svg" alt="table" class="w-6">
                    {{ orderTime }}
                </div>
                <div class="flex items-center gap-1.5 border-2 w-25.5 border-[rgba(126,111,90,0.42)] p-1 pl-3 pr-3 rounded-4xl">
                    <img src="@/assets/svgs/timer.svg" alt="table" class="w-6">
                    <div>
                        {{ passedTime }}
                    </div>
                </div>
            </div>
        </div>

        <div v-for="item in order?.items" :key="item.id" class="mb-2">

            <div class="self-center text-2xl">
                {{ item.name }}
            </div>
            <div v-if="item.customMsg" class="flex flex-col">
                <div class="text-gray-600 text-xl">
                    {{ item.customMsg }}
                </div>
            </div>
        </div>

    </div>
</template>
