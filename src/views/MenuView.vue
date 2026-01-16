<script setup lang="ts">
    import { useRestaurantStore } from '@/stores/Restaurant/useRestaurantStore';
    import { ref } from 'vue'
    
    import MenuWindowHeader from '@/components/Host/Menu/MenuWindowHeader.vue';
    import CategorySection from '@/components/Host/Menu/CategorySection.vue';
    import ManageItems from '@/components/Host/Menu/ManageItems.vue';
    import ViewHeader from '@/components/General/ViewHeader.vue';
    import Window from '@/components/General/Window.vue';

    interface CategoryResponse {
        id: number,
        name: string,
        position: number,
    }

    const restaurantStore = useRestaurantStore();
    const restaurantId :number = restaurantStore.restaurant?.id ?? -1;

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

            <CategorySection :restaurantId="restaurantId" @switch="currentCategory = $event" @set="currentCategory = $event"/>

            <ManageItems :currentCategory="currentCategory"/>

        </Window>
    </div>
</template>