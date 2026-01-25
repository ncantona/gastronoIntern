<script setup lang="ts">
    import { ref, computed, onMounted, nextTick, watch } from 'vue';
    import { getMenuByRestaurantId } from '@/Services/menu.service';
    import type { MenuCategoryResponse, MenuItemResponse } from '@/Types/menu.types';
    import Category from './Category.vue';
    import Item from './Item.vue';

    interface CartItem {
        id: number;
        quantity: number;
        name: string;
        price: number;
    }

    const props = defineProps<{
        restaurantId: number;
        cartItems?: Array<{ id: number; quantity: number }>;
    }>();

    const emit = defineEmits<{
        addToCart: [item: MenuItemResponse];
        updateQuantity: [itemId: number, quantity: number];
    }>();

    const menu = ref<MenuCategoryResponse[]>([]);
    const activeCategory = ref<number | null>(null);
    const isLoading = ref(false);
    const menuScrollContainer = ref<HTMLDivElement | null>(null);
    const categoryScrollContainer = ref<HTMLDivElement | null>(null);

    const scrollActiveCategoryIntoView = () => {
        if (!categoryScrollContainer.value || activeCategory.value === null) return;
        const container = categoryScrollContainer.value;
        const button = container.querySelector(`[data-category-btn="${activeCategory.value}"]`) as HTMLElement | null;
        if (!button) return;

        const offsetLeft = button.offsetLeft - 8; // small padding to align near start
        const maxScroll = container.scrollWidth - container.clientWidth;
        const nextScroll = Math.max(0, Math.min(offsetLeft, maxScroll));
        container.scrollTo({ left: nextScroll, behavior: 'smooth' });
    };

    const handleMenuScroll = () => {
        if (!menuScrollContainer.value) return;
        
        const container = menuScrollContainer.value;
        const sections = container.querySelectorAll('[data-category-id]');
        const headerOffset = 150; // sticky header height/offset
        
        let currentCategory: number | null = null;
        for (const section of Array.from(sections)) {
            const rect = section.getBoundingClientRect();
            // Erste Überschrift, deren Top unterhalb des Headers und im Viewport liegt
            if (rect.top >= headerOffset && rect.top < window.innerHeight) {
                currentCategory = parseInt((section as HTMLElement).dataset.categoryId || '0');
                break;
            }
        }
        
        if (currentCategory) {
            activeCategory.value = currentCategory;
        }
    };

    const scrollToCategory = (categoryId: number) => {
        if (!menuScrollContainer.value) return;
        
        nextTick(() => {
            const section = menuScrollContainer.value?.querySelector(`[data-category-id="${categoryId}"]`) as HTMLElement;
            if (section) {
                const container = menuScrollContainer.value!;
                const sectionTop = section.offsetTop;
                const offset = 150; // Kleiner Abstand zur Kategorie-Überschrift
                
                container.scrollTo({
                    top: sectionTop - offset,
                    behavior: 'smooth'
                });
                activeCategory.value = categoryId;
                nextTick(scrollActiveCategoryIntoView);
            }
        });
    };

    const handleAddToCart = (item: MenuItemResponse) => {
        emit('addToCart', item);
    };

    const handleUpdateQuantity = (itemId: number, quantity: number) => {
        emit('updateQuantity', itemId, quantity);
    };

    const loadMenuData = async () => {
        try {
            isLoading.value = true;
            const menuData = await getMenuByRestaurantId(props.restaurantId);
            menu.value = menuData;
            
            await nextTick();
            if (menu.value.length > 0) {
                activeCategory.value = menu.value[0].id;
            }
        } catch (error) {
            console.error('Fehler beim Laden der Speisekarte:', error);
        } finally {
            isLoading.value = false;
        }
    };

    watch(activeCategory, () => {
        nextTick(scrollActiveCategoryIntoView);
    });

    onMounted(() => {
        loadMenuData();
    });
</script>

<template>
    <div class="flex-1 flex flex-col h-full w-screen lg:w-120 px-3">
        <div v-if="isLoading" class="flex items-center justify-center p-12">
            <div class="text-slate-600">Speisekarte wird geladen...</div>
        </div>

        <div v-else class="flex flex-col h-full w-full overflow-hidden relative">
            <div class="absolute top-0 left-0 right-0 bg-white z-10 p-3 px-2">
                <div ref="categoryScrollContainer" class="overflow-x-auto w-full">
                    <div class="flex gap-2 w-full">
                        <button
                            v-for="category in menu"
                            :key="category.id"
                            :data-category-btn="category.id"
                            @click="scrollToCategory(category.id)"
                            :class="activeCategory === category.id ? 'bg-ownblue-500 text-white' : 'bg-slate-200 text-slate-900'"
                            class="px-3 py-4 rounded-lg font-medium transition hover:shadow-md whitespace-nowrap text-xs">
                            {{ category.name }}
                        </button>
                    </div>
                </div>
            </div>

            <div 
                ref="menuScrollContainer"
                class="overflow-y-auto h-full w-full pt-20"
                @scroll="handleMenuScroll">
                <div class="space-y-3 pb-4 px-2">
                    <div
                        v-for="category in menu"
                        :key="category.id"
                        :data-category-id="category.id">
                        <Category :category="category">
                            <div class="grid grid-cols-1 gap-2 ">
                                <Item
                                    v-for="item in category.items"
                                    :key="item.id"
                                    :item="item"
                                    :cart-items="cartItems"
                                    @add-to-cart="handleAddToCart"
                                    @update-quantity="handleUpdateQuantity"/>
                            </div>
                        </Category>
                    </div>
                </div>
                <div class="h-100"></div>
            </div>
        </div>
    </div>
</template>