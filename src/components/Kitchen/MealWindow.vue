<script setup lang="ts">
import { useRestaurantActiveOrdersStore } from '@/stores/Restaurant/useRestaurantActiveOrdersStore';
import { ref } from 'vue';

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
    item: Item,
}>();

const activeOrdersStore = useRestaurantActiveOrdersStore();

const isClicked = ref(false);
const isFading = ref(false);

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
            activeOrdersStore.markItemAsDone(props.orderId, props.item.id);
        }, 2000);

    }, 2000);
};
</script>

<template>
    <div
        @click="handleClick"
        v-if="!item.isDone"
        :class="[
            'flex flex-col rounded-2xl p-4 min-w-60 cursor-pointer shadow-xl transition-all duration-2000',
            isClicked ? 'border-2 border-green-200 bg-green-100' : 'border-2 bg-[rgba(255,255,255,0.64)] border-[rgba(126,111,90,0.89)]',
            isFading ? 'opacity-0 scale-[0.97]' : 'opacity-100'
        ]">

        <div class="font-bold self-center mb-2">
            {{ props.item.name }}
        </div>

        <div class="flex justify-between gap-5">

            <div v-if="props.item.omits" class="mb-2 text-red-800">
                <div v-for="omit in props.item.omits" :key="omit">
                    {{ omit }}
                </div>
            </div>

            <div v-if="props.item.addOns" class="mb-2 text-green-600">
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
