<script setup lang="ts">
    import { useRestaurantStore } from '@/stores/Restaurant/useRestaurantStore';
    import { ref } from 'vue'
    
    import MenuWindowHeader from '@/components/Host/Menu/MenuWindowHeader.vue';
    import CategorySection from '@/components/Host/Menu/Category/CategorySection.vue';
    import ManageItems from '@/components/Host/Menu/Items/ManageItems.vue';
    import ViewHeader from '@/components/General/ViewHeader.vue';
    import Window from '@/components/General/Window.vue';
import type { CategoryResponse } from '@/Types/category.types';

    const restaurantStore = useRestaurantStore();
    const restaurantId :number = restaurantStore.restaurant?.id ?? -1;

    const amounts = ref<{beverage: number, meals: number}>({beverage: 0, meals: 0});

    const currentCategory = ref<CategoryResponse | null>(null)

</script>

<template>
    <div class="p-6">
        
        <ViewHeader>
            <template #title>
                Speisekarte verwalten
            </template>
            <template #subtitle>
                Verwalte deine Speisekarte
            </template>
        </ViewHeader>

        <Window class="flex flex-col p-12 gap-5 min-h-175">
            
            <MenuWindowHeader
                :amountBeverage="amounts.beverage"
                :amountMeals="amounts.meals"/>

            <CategorySection
                :restaurantId="restaurantId"
                @switch="currentCategory = $event"
                @set="currentCategory = $event"/>

            <ManageItems
                v-model="amounts"
                :currentCategory="currentCategory"
                :restaurantId="restaurantId"/>

        </Window>
    </div>
</template>