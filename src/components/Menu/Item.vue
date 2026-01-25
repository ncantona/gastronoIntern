<script setup lang="ts">
    import { computed } from 'vue';
    import type { MenuItemResponse } from '@/Types/menu.types';

    interface CartItem {
        id: number;
        quantity: number;
    }

    const props = defineProps<{
        item: MenuItemResponse;
        cartItems?: CartItem[];
    }>();

    const emit = defineEmits<{
        addToCart: [item: MenuItemResponse];
        updateQuantity: [itemId: number, quantity: number];
    }>();

    const quantityInCart = computed(() => {
        if (!props.cartItems) return 0;
        const cartItem = props.cartItems.find(ci => ci.id === props.item.id);
        return cartItem?.quantity || 0;
    });

    const handleAddToCart = () => {
        if (props.item.isAvailable) {
            emit('addToCart', props.item);
        }
    };

    const handleIncrement = () => {
        if (props.item.isAvailable) {
            emit('updateQuantity', props.item.id, quantityInCart.value + 1);
        }
    };

    const handleDecrement = () => {
        const newQuantity = quantityInCart.value - 1;
        if (newQuantity <= 0) {
            emit('updateQuantity', props.item.id, 0);
        } else {
            emit('updateQuantity', props.item.id, newQuantity);
        }
    };
</script>

<template>
    <div class="flex gap-2">
        <div
            :class="item.isAvailable ? 'hover:shadow-md' : 'opacity-50'"
            class="border w-full border-slate-300 rounded-lg p-3 transition bg-white flex flex-col justify-between">
            <div>
                <div class="flex justify-between items-start mb-1 gap-1">
                    <div class="flex-1">
                        <h4 class="font-semibold text-slate-900 text-md line-clamp-2">{{ item.name }}</h4>
                        <p class="text-sm text-slate-600 line-clamp-1">{{ item.description }}</p>
                    </div>
                    <div class="flex flex-col justify-center items-end">
                        <span class="text-ownblue-500 font-bold text-md  whitespace-nowrap">{{ item.price.toFixed(2) }}€</span>
                        <span v-show="quantityInCart > 0" class="w-5 text-center font-semibold text-md bg-gray-400 text-white rounded-full text-sm">{{ quantityInCart }}</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="flex flex-col gap-1 h-full">
            <button
                @click="handleAddToCart"
                class="bg-ownblue-500 hover:bg-ownblue-600 text-white rounded p-3 py-2 h-full transition flex items-center justify-center">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                </svg>
            </button>
            <button
                v-if="quantityInCart > 0"
                @click="handleDecrement"
                class="bg-red-500 hover:bg-red-600 text-white rounded p-3 py-2 h-full transition flex items-center justify-center">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 20m8-8H4"/>
                </svg>
            </button>
        </div>
    </div>
</template>