<script setup lang="ts">
    import { ref, onMounted, computed } from 'vue';
    import { useRouter } from 'vue-router';
    import { usePopupStore } from '@/stores/General/usePopupStore';
    import { useAuthStore } from '@/stores/Auth/useAuthStore';
    import { useRestaurantStore } from '@/stores/Restaurant/useRestaurantStore';
    import { getAllItems } from '@/Services/item.service';
    import { getCategories } from '@/Services/category.service';
    import { createOrder } from '@/Services/order.service';
    import type { ItemResponse } from '@/Types/item.types';
    import type { CategoryResponse } from '@/Types/category.types';
    import type { OrderItemRequest } from '@/Types/order.types';
    import CustomButton from '@/components/General/CustomButton.vue';

    interface CartItem extends OrderItemRequest {
        name: string;
        price: number;
    }

    const props = defineProps<{
        tableId: string;
    }>();

    const router = useRouter();
    const popupStore = usePopupStore();
    const authStore = useAuthStore();
    const restaurantStore = useRestaurantStore();

    const table = computed(() => parseInt(props.tableId) || 0);
    const items = ref<ItemResponse[]>([]);
    const categories = ref<CategoryResponse[]>([]);
    const cartItems = ref<CartItem[]>([]);
    const selectedCategory = ref<number | null>(null);
    const isLoading = ref(false);

    const filteredItems = computed(() => {
        if (selectedCategory.value === null) return items.value;
        return items.value.filter(item => item.categoryId === selectedCategory.value);
    });

    const cartTotal = computed(() => {
        return cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
    });

    const loadMenuData = async () => {
        try {
            isLoading.value = true;
            const restaurantId = restaurantStore.restaurant?.id || -1;
            const [itemsData, categoriesData] = await Promise.all([
                getAllItems(restaurantId),
                getCategories(restaurantId)
            ]);
            items.value = itemsData;
            categories.value = categoriesData;
        } catch (error) {
            popupStore.setError('Fehler beim Laden der Speisekarte');
        } finally {
            isLoading.value = false;
        }
    };

    const addToCart = (item: ItemResponse) => {
        const existingItem = cartItems.value.find(cartItem => cartItem.id === item.id);
        
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartItems.value.push({
                id: item.id,
                quantity: 1,
                name: item.name,
                price: item.price
            });
        }
    };

    const removeFromCart = (itemId: number) => {
        cartItems.value = cartItems.value.filter(item => item.id !== itemId);
    };

    const updateQuantity = (itemId: number, quantity: number) => {
        const item = cartItems.value.find(cartItem => cartItem.id === itemId);
        if (item) {
            if (quantity <= 0) {
                removeFromCart(itemId);
            } else {
                item.quantity = quantity;
            }
        }
    };

    const handlePlaceOrder = async () => {
        if (cartItems.value.length === 0) {
            popupStore.setError('Bitte fügen Sie Artikel zum Warenkorb hinzu');
            return;
        }

        try {
            isLoading.value = true;
            const restaurantId = restaurantStore.restaurant?.id || -1;
            const waiterId = authStore.user?.id || '';
            const userIds: number[] = [];
            
            const orderItems = cartItems.value.map(item => ({
                id: item.id,
                quantity: item.quantity
            }));

            const orderData = {
                userIds,
                tableId: table.value,
                waiterId,
                restaurantId,
                items: orderItems
            };

            await createOrder(orderData);
            popupStore.setSuccess('Bestellung erfolgreich aufgegeben');
            router.push({ name: 'dashboardhost' });
        } catch (error) {
            popupStore.setError('Fehler beim Aufgeben der Bestellung');
        } finally {
            isLoading.value = false;
        }
    };

    const handleCancel = () => {
        router.back();
    };

    onMounted(() => {
        if (table.value === 0) {
            popupStore.setError('Ungültige Tischnummer');
            router.back();
            return;
        }
        loadMenuData();
    });
</script>

<template>
    <div class="p-6">
        <div class="mb-6">
            <h1 class="text-4xl font-bold text-slate-900">Bestellung für Tisch {{ table }}</h1>
            <p class="text-slate-600 mt-2">Wählen Sie Speisen und Getränke aus</p>
        </div>

        <div v-if="isLoading" class="flex items-center justify-center p-12">
            <div class="text-slate-600">Speisekarte wird geladen...</div>
        </div>

        <div v-else class="border-2 border-ownblue-500 rounded-xl p-5 flex gap-6">
            <!-- Speisekarte -->
            <div class="flex-1 flex flex-col gap-4">
                <!-- Kategorie Filter -->
                <div class="flex gap-2 flex-wrap">
                    <button
                        @click="selectedCategory = null"
                        :class="selectedCategory === null ? 'bg-ownblue-500 text-white' : 'bg-slate-200 text-slate-900'"
                        class="px-4 py-2 rounded-lg font-medium transition hover:shadow-md">
                        Alle
                    </button>
                    <button
                        v-for="category in categories"
                        :key="category.id"
                        @click="selectedCategory = category.id"
                        :class="selectedCategory === category.id ? 'bg-ownblue-500 text-white' : 'bg-slate-200 text-slate-900'"
                        class="px-4 py-2 rounded-lg font-medium transition hover:shadow-md">
                        {{ category.name }}
                    </button>
                </div>

                <!-- Artikel Liste -->
                <div class="grid grid-cols-2 gap-4 overflow-y-auto max-h-96">
                    <div
                        v-for="item in filteredItems"
                        :key="item.id"
                        :class="item.isAvailable ? 'cursor-pointer hover:shadow-md' : 'opacity-50 cursor-not-allowed'"
                        class="border border-slate-300 rounded-lg p-4 transition"
                        @click="item.isAvailable && addToCart(item)">
                        <div class="flex justify-between items-start mb-2">
                            <h3 class="font-semibold text-slate-900">{{ item.name }}</h3>
                            <span class="text-ownblue-500 font-bold">{{ item.price.toFixed(2) }}€</span>
                        </div>
                        <p class="text-sm text-slate-600 mb-2">{{ item.description }}</p>
                        <div class="flex items-center gap-2">
                            <span v-if="item.itemType === 'BEVERAGE'" class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                Getränk
                            </span>
                            <span v-else class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                Speise
                            </span>
                            <span v-if="!item.isAvailable" class="text-xs bg-red-100 text-red-800 px-2 py-1 rounded ml-auto">
                                Nicht verfügbar
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Warenkorb -->
            <div class="w-80 flex flex-col gap-4 border-l border-slate-300 pl-6">
                <h2 class="text-2xl font-bold text-slate-900">Warenkorb</h2>

                <!-- Warenkorb Items -->
                <div class="flex-1 overflow-y-auto space-y-3 max-h-96">
                    <div
                        v-if="cartItems.length === 0"
                        class="text-center text-slate-500 py-8">
                        Warenkorb ist leer
                    </div>
                    <div
                        v-for="item in cartItems"
                        :key="item.id"
                        class="bg-slate-50 p-3 rounded-lg border border-slate-200">
                        <div class="flex justify-between items-start mb-2">
                            <h4 class="font-medium text-slate-900">{{ item.name }}</h4>
                            <button
                                @click="removeFromCart(item.id)"
                                class="text-red-500 hover:text-red-700 font-bold text-lg">
                                ✕
                            </button>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-slate-600">{{ item.price.toFixed(2) }}€</span>
                            <div class="flex items-center gap-2">
                                <button
                                    @click="updateQuantity(item.id, item.quantity - 1)"
                                    class="bg-slate-200 hover:bg-slate-300 px-2 py-1 rounded text-sm font-semibold">
                                    −
                                </button>
                                <input
                                    :value="item.quantity"
                                    @change="(e) => updateQuantity(item.id, parseInt((e.target as HTMLInputElement).value) || 1)"
                                    type="number"
                                    min="1"
                                    class="w-10 text-center border border-slate-300 rounded px-1 py-1 text-sm"/>
                                <button
                                    @click="updateQuantity(item.id, item.quantity + 1)"
                                    class="bg-slate-200 hover:bg-slate-300 px-2 py-1 rounded text-sm font-semibold">
                                    +
                                </button>
                            </div>
                            <span class="font-semibold text-slate-900 min-w-12 text-right">
                                {{ (item.price * item.quantity).toFixed(2) }}€
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Summe -->
                <div class="border-t border-slate-300 pt-3 space-y-3">
                    <div class="flex justify-between items-center text-lg font-bold">
                        <span>Gesamt:</span>
                        <span class="text-ownblue-500">{{ cartTotal }}€</span>
                    </div>

                    <!-- Buttons -->
                    <div class="flex gap-3">
                        <CustomButton
                            variant="editBlue"
                            class="flex-1"
                            :disabled="cartItems.length === 0 || isLoading"
                            @click="handlePlaceOrder">
                            Bestellen
                        </CustomButton>
                        <CustomButton
                            variant="cancel"
                            class="flex-1"
                            @click="handleCancel">
                            Abbrechen
                        </CustomButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
