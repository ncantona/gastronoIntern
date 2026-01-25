<script setup lang="ts">
    import { ref, computed } from 'vue';
    import { useRouter } from 'vue-router';
    import { usePopupStore } from '@/stores/General/usePopupStore';
    import { useAuthStore } from '@/stores/Auth/useAuthStore';
    import { useRestaurantStore } from '@/stores/Restaurant/useRestaurantStore';
    import { createOrder } from '@/Services/order.service';
    import type { MenuItemResponse } from '@/Types/menu.types';
    import Basket from '@/components/Menu/Basket.vue';
    import DisplayMenu from '@/components/Menu/DisplayMenu.vue';
    import MenuHeader from '@/components/Menu/MenuHeader.vue';

    interface CartItem {
        id: number;
        quantity: number;
        name: string;
        price: number;
    }

    const props = defineProps<{
        tableId: number,
        restaurantId: number,
    }>();

    const router = useRouter();
    const popupStore = usePopupStore();
    const authStore = useAuthStore();
    const restaurantStore = useRestaurantStore();

    const tableIdNum = computed(() => Number(props.tableId));
    const restaurantIdNum = computed(() => Number(props.restaurantId));

    const basketRef = ref<InstanceType<typeof Basket>>();
    const isLoading = ref(false);
    const showBasket = ref(false);
    const cartItems = ref<CartItem[]>([]);

    const cartItemsCount = computed(() => cartItems.value.length);

    const handleAddToCart = (item: MenuItemResponse) => {
        const existingItem = cartItems.value.find(ci => ci.id === item.id);
        
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartItems.value.push({
                id: item.id,
                quantity: 1,
                name: item.name,
                price: item.price,
            });
        }
    };

    const handleUpdateQuantity = (itemId: number, quantity: number) => {
        if (quantity <= 0) {
            cartItems.value = cartItems.value.filter(item => item.id !== itemId);
        } else {
            const item = cartItems.value.find(ci => ci.id === itemId);
            if (item) {
                item.quantity = quantity;
            }
        }
    };

    const handleRemoveFromCart = (itemId: number) => {
        cartItems.value = cartItems.value.filter(item => item.id !== itemId);
    };

    const handlePlaceOrder = async (cartItems: CartItem[]) => {
        try {
            isLoading.value = true;
            const orderItems = cartItems.map(item => ({
                itemId: item.id,
                quantity: item.quantity
            }));

            const orderData = {
                userIds: [],
                tableId: tableIdNum.value,
                waiterId: authStore.user?.id || '',
                restaurantId: restaurantIdNum.value,
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

    const closeBasket = () => {
        showBasket.value = false;
    };
</script>

<template>
    <div class="flex flex-col h-screen bg-white overflow-hidden">
        <MenuHeader
            :cart-items-count="cartItemsCount"
            v-model="showBasket"
            :table-id-num="tableIdNum"
            :restaurantId="restaurantIdNum"/>

        <div class="flex-1 overflow-hidden">
            <DisplayMenu 
                :restaurant-id="restaurantIdNum" 
                :cart-items="cartItems"
                @add-to-cart="handleAddToCart"
                @update-quantity="handleUpdateQuantity"/>
        </div>

        <Basket
            :table-id="tableIdNum"
            :restaurant-id="restaurantIdNum"
            :cart-items="cartItems"
            :is-open="showBasket"
            @place-order="handlePlaceOrder"
            @update-quantity="handleUpdateQuantity"
            @remove-from-cart="handleRemoveFromCart"
            @close="closeBasket"/>
    </div>
</template>