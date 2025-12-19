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

    const isClicked = ref<boolean>(order.value?.items.some(item => item.isDone) ?? false);

    const now = ref(Date.now());
    const orderTime = order.value?.datetime.split('T')[1].substring(0, 5);

    let intervalID :number;
    let markAsReadyTimeout: ReturnType<typeof setTimeout> | null = null;
    const isMarkedAsDone = ref<boolean>(order.value?.items.some(item => item.isDone) ?? false);

    const resetTimeout = () => {
        if (markAsReadyTimeout)
            clearTimeout(markAsReadyTimeout);

        markAsReadyTimeout = null;
        isClicked.value = false;
    }

    const handleClick = () => {

        if (isMarkedAsDone.value)
            return;
        if (isClicked.value) {
            resetTimeout();
            return;
        }

        isClicked.value = true;

        markAsReadyTimeout = setTimeout(() => {
            activeOrdersStore.markAllItemsByTypeAsDone(props.orderId, 'BEVERAGE');
            activeOrdersStore.setAllItemsByTypePrepTime(props.orderId, passedTime.value, 'BEVERAGE');
            isMarkedAsDone.value = true;
            if (intervalID)
                clearInterval(intervalID);
        }, 2500);
    };

    const elapsedMinutes = computed(() => {
        if (!order.value)
            return 0;

        const orderDate = new Date(order.value.datetime);
        const diffMs = now.value - orderDate.getTime();
        const diffSeconds = Math.floor(diffMs / 1000);
        return Math.floor(diffSeconds / 60);
    });

    const timeStatusClass = computed(() => {
        if (elapsedMinutes.value >= 10) {
            return 'border-red-400 bg-red-100 text-red-700';
        }
        if (elapsedMinutes.value >= 7) {
            return 'border-orange-400 bg-orange-100 text-orange-700';
        }
        return '';
    });

    const passedTime = computed(() => {
        if (!order.value)
            return '';

        const orderDate = new Date(order.value.datetime);
        const diffMs = now.value - orderDate.getTime();
        const diffSeconds = Math.floor(diffMs / 1000);

        const hours = Math.floor(diffSeconds / 3600);
        const minutes = Math.floor((diffSeconds % 3600) / 60);
        const seconds = diffSeconds % 60;

        const hh = hours.toString().padStart(2, '0');
        const mm = minutes.toString().padStart(2, '0');
        const ss = seconds.toString().padStart(2, '0');

        return `${hh}:${mm}:${ss}`;
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
            'flex flex-col rounded-xl relative overflow-y-auto p-4 min-w-70 cursor-pointer max-w-55 shadow-xl',
            isClicked ? 'bg-green-100' : 'bg-main-50']">
        <div v-show="isMarkedAsDone" class="absolute self-center flex top-0 h-full items-center">
            <img src="@/assets/svgs/checkGreen.svg" alt="table" class="w-25 opacity-60">
        </div>

        <div class="flex flex-col gap-1 mb-5 border-2 rounded-2xl -m-2 p-1 border-[rgba(126,111,90,0.89)] bg-[rgba(255,255,255,0.64)]">
            
            <div class="flex gap-2 justify-center text-xl font-bold items-center">
                <img src="@/assets/svgs/table.svg" alt="table" class="w-10">
                {{ order?.tableId }}
            </div>

            <div class="flex justify-between">
                
                <div class="flex items-center gap-1.5 border-2 w-25.5 border-[rgba(126,111,90,0.42)] p-1 pl-3 pr-3 rounded-4xl">
                    <img src="@/assets/svgs/order.svg" alt="table" class="w-6">
                    <span class="font-mono">{{ orderTime }}</span>
                </div>

                <div :class="[timeStatusClass]" class="flex items-center gap-1.5 border-2 border-[rgba(126,111,90,0.42)] p-1 pl-3 pr-3 rounded-4xl">
                    <img src="@/assets/svgs/timer.svg" alt="table" class="w-6">
                    <span class="font-mono">{{ passedTime.substring(0, 2) == '00' ? passedTime.substring(3) : passedTime }}</span>
                </div>

            </div>
        </div>

        <div v-for="item in order?.items" :key="item.id" class="mb-2 pb-2 border-b-2 border-[rgba(167,153,134,0.38)]">
            <div class="flex gap-3 text-xl">
                <span class="inline-flex items-center justify-center min-w-7 min-h-7 self-center rounded-full bg-[rgba(183,173,158,0.72)] text-black">
                    {{ item.amount }}
                </span>
                <div>
                    <span>
                        {{ item.name }}
                    </span>
                    <div v-if="item.customMsg" class="flex flex-col">
                        <div class="text-gray-600 text-lg">
                        {{ item.customMsg }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
