<script setup lang="ts">
    import { useRestaurantStore } from '@/stores/Restaurant/useRestaurantStore';
    import { ref } from 'vue'
    
    import MenuWindowHeader from '@/components/Host/Menu/MenuWindowHeader.vue';
    import CategorySection from '@/components/Host/Menu/CategorySection.vue';
    import ManageItems from '@/components/Host/Menu/ManageItems.vue';
    import ViewHeader from '@/components/General/ViewHeader.vue';
    import Window from '@/components/General/Window.vue';

    type ItemType = 'BEVERAGE' | 'MEAL';

    interface CategoryResponse {
        id: number,
        name: string,
        position: number,
    }

    interface Item {
        id: number;
        name: string;
        description: string;
        categoryId: number;
        position: number;
        code: string;
        itemType: ItemType;
        price: number;
        isAvailable: boolean;
    }

    const restaurantStore = useRestaurantStore();

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
            
            <MenuWindowHeader/>

            <CategorySection :restaurantId="restaurantStore.restaurant?.id ?? -1" @switch="currentCategory = $event" @set="currentCategory = $event"/>

            <ManageItems :currentCategory="currentCategory"/>

        </Window>
    </div>
</template>