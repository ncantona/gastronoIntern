<script setup lang="ts">
import type { OrderResponse } from '@/Types/order.types';
    import { ref, computed, onMounted, onUnmounted } from 'vue';

    const props = defineProps<{
        order: OrderResponse
    }>();

    const isClicked = ref<boolean>(props.order.items.some(item => item.prepStatus === 'READY') ?? false);

    const now = ref(Date.now());
    const orderTime = props.order.orderedAt.split('T')[1].substring(0, 5);

    let intervalID :number;
    let markAsReadyTimeout: ReturnType<typeof setTimeout> | null = null;
    const isMarkedAsDone = ref<boolean>(props.order.items.some(item => item.prepStatus === 'READY') ?? false);

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
            isMarkedAsDone.value = true;
            if (intervalID)
                clearInterval(intervalID);
        }, 2500);
    };

    const elapsedMinutes = computed(() => {
        if (!props.order)
            return 0;

        const orderDate = new Date(props.order.orderedAt);
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
        if (!props.order)
            return '';

        const orderDate = new Date(props.order.orderedAt);
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
    <div class="flex h-full border-2 rounded-2xl w-full p-1.5 bg-main-500 border-main-500 shadow-lg min-h-55 overflow-y-hidden hover:overflow-y-auto">
    <div
        @click="handleClick()"
        :class="[
            'flex flex-col rounded-lg relative overflow-y-auto p-4 min-w-70 cursor-pointer max-w-55 shadow-xl',
            isClicked ? 'bg-green-100' : 'bg-white/90']">
        <div v-show="isMarkedAsDone" class="absolute self-center flex top-0 h-full items-center">
            <img src="@/assets/svgs/checkGreen.svg" alt="table" class="w-25 opacity-60">
        </div>

        <div class="flex flex-col gap-1 mb-5 border-2 rounded-2xl -m-2 p-1 border-main-500 bg-white/80">
            
            <div class="flex gap-2 justify-center text-xl font-medium items-center">
                <img src="@/assets/svgs/table.svg" alt="table" class="w-10">
                {{ order?.tableId }}
            </div>

            <div class="flex justify-between">
                
                <div class="flex items-center gap-1.5 border-2 w-25.5 border-main-500/50 p-1 pl-3 pr-3 rounded-4xl">
                    <img src="@/assets/svgs/order.svg" alt="table" class="w-6">
                    <span class="font-mono">{{ orderTime }}</span>
                </div>

                <div :class="[timeStatusClass]" class="flex items-center gap-1.5 border-2 border-main-500/50 p-1 pl-3 pr-3 rounded-4xl">
                    <img src="@/assets/svgs/timer.svg" alt="table" class="w-6">
                    <span class="font-mono">{{ passedTime.substring(0, 2) == '00' ? passedTime.substring(3) : passedTime }}</span>
                </div>

            </div>
        </div>

        <div v-for="item in order.items" :key="item.id" class="mb-3 pb-2 border-b-2 border-main-500/20">
            <div class="flex gap-3 text-xl">
                <span class="inline-flex items-center justify-center min-w-7 min-h-7 self-center rounded-full bg-gray-400/40 text-black">
                    {{ item.quantity }}
                </span>
                <div>
                    <span>
                        {{ item.itemName }}
                    </span>
                </div>
            </div>
        </div>

    </div>
</div>
</template>
