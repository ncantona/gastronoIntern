<script setup lang="ts">
    import { computed } from 'vue';
    import CustomButton from '@/components/General/CustomButton.vue';

    interface CartItem {
        id: number;
        quantity: number;
        name: string;
        price: number;
    }

    interface Props {
        tableId: number;
        restaurantId: number;
        cartItems: CartItem[];
        isOpen: boolean;
    }

    interface Emits {
        'place-order': [items: CartItem[]];
        'update-quantity': [itemId: number, quantity: number];
        'remove-from-cart': [itemId: number];
        'close': [];
    }

    const props = withDefaults(defineProps<Props>(), {
        tableId: 0,
        restaurantId: 0,
        cartItems: () => [],
        isOpen: false
    });

    const emit = defineEmits<Emits>();

    const cartTotal = computed<string>(() => {
        return props.cartItems.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0).toFixed(2);
    });

    const removeFromCart = (itemId: number): void => {
        emit('remove-from-cart', itemId);
    };

    const updateQuantity = (itemId: number, quantity: number): void => {
        if (quantity <= 0) {
            removeFromCart(itemId);
        } else {
            emit('update-quantity', itemId, quantity);
        }
    };

    const handlePlaceOrder = (): void => {
        if (props.cartItems.length === 0) return;
        emit('place-order', props.cartItems);
    };

    const handleInputChange = (e: Event): void => {
        const target = e.target as HTMLInputElement;
        const itemId = parseInt(target.getAttribute('data-item-id') || '0');
        const quantity = parseInt(target.value) || 1;
        updateQuantity(itemId, quantity);
    };
</script>

<template>
    <div
        :class="isOpen ? 'translate-x-0' : 'translate-x-full'"
        class="fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-2xl transform transition-transform duration-300 z-50 flex flex-col overflow-hidden">

        <div class="p-7 py-4 md:p-4 border-b border-slate-300 flex justify-between items-center">
            <h2 class="text-2xl font-bold text-slate-900">Warenkorb</h2>
            <button
                @click="emit('close')"
                class="text-gray-500 hover:text-gray-700 text-2xl">
                ✕
            </button>
        </div>

        <div class="w-full flex flex-col flex-1 overflow-hidden">
            
            <div class="flex-1 overflow-y-auto h-full">

                <div
                    v-if="cartItems.length === 0"
                    class="text-center text-slate-500 py-8 h-full flex justify-center items-center">
                    Dein Warenkorb ist leer
                </div>
                
                <div
                    v-for="item in cartItems"
                    :key="item.id"
                    class="bg-slate-50 px-7 p-4 border-b last:border-b-0 border-slate-200">

                    <div class="flex justify-between items-center mb-2">
                        <h4 class="font-medium text-slate-900 text-md">{{ item.name }}</h4>
                        <button
                            @click="removeFromCart(item.id)"
                            class="text-red-500 hover:text-red-700 font-bold text-lg">
                            ✕
                        </button>
                    </div>

                    <div class="flex justify-between items-center gap-2">
                        <span class="text-slate-600 text-md">{{ item.price.toFixed(2) }}€</span>
                        <div class="flex items-center gap-1">
                            <button
                                @click="updateQuantity(item.id, item.quantity - 1)"
                                class="bg-slate-200 hover:bg-slate-300 px-2 py-1 rounded text-md font-semibold">
                                −
                            </button>
                            <input
                                :value="item.quantity"
                                :data-item-id="item.id"
                                @change="handleInputChange"
                                type="number"
                                min="1"
                                class="w-10 text-center border border-slate-300 rounded px-1 py-1 text-md"/>
                            <button
                                @click="updateQuantity(item.id, item.quantity + 1)"
                                class="bg-slate-200 hover:bg-slate-300 px-2 py-1 rounded text-md font-semibold">
                                +
                            </button>
                        </div>
                        <span class="font-semibold text-slate-900 min-w-12 text-right text-md">
                            {{ (item.price * item.quantity).toFixed(2) }}€
                        </span>
                    </div>

                </div>

            </div>

            <div class="border-t border-slate-300 pt-3 p-7 space-y-3">
                <div class="flex justify-between items-center text-lg font-bold">
                    <span>Gesamt:</span>
                    <span :class="cartItems.length === 0 ? 'text-gray-800' :'text-ownblue-500'">{{ cartTotal }}€</span>
                </div>

                <CustomButton
                    variant="editBlue"
                    class="w-full"
                    :disabled="cartItems.length === 0"
                    @click="handlePlaceOrder">
                    Bestellen
                </CustomButton>
            </div>
        </div>
    </div>
    <div v-if="isOpen" class="fixed inset-0 bg-white/60 blur-md bg-opacity-50 z-40" @click="emit('close')"></div>
</template>
