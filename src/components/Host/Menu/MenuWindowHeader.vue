<script setup lang="ts">
    import { useRestaurantItemsStore } from '@/stores/Restaurant/useRestaurantItemsStore';
    import { computed } from 'vue';
    
    import WindowHeader from '@/components/General/WindowHeader.vue';

    const restaurantItemsStore = useRestaurantItemsStore();

    const totalMealItems = computed(() => restaurantItemsStore.items.filter(item => item.itemType === 'MEAL').length);
    const totalBeverageItems = computed(() => restaurantItemsStore.items.filter(item => item.itemType === 'BEVERAGE').length);
</script>

<template>
    <div class="flex justify-between">

        <WindowHeader>
            Meine Speisekarte
            <div class="flex text-gray-500 text-base font-normal mt-2">
                <p>{{ totalMealItems }} {{ totalMealItems !== 1 ? 'Gerichte' : 'Gericht' }}</p>
                <span class="whitespace-break-spaces"> / </span>
                <p>{{ totalBeverageItems }} {{ totalBeverageItems !== 1 ? 'Getränke' : 'Getränk' }}</p>
            </div>
        </WindowHeader>

        <div class="text-gray-500 min-w-25 lg:flex hidden flex-col">
            <p class="flex items-center">
                <img src="@/assets/svgs/hamburgerIcon.svg" alt="" class="max-w-6">
                <span class="whitespace-break-spaces"> = Gericht</span>
            </p>
            <p class="flex items-center">
                <img src="@/assets/svgs/cocktailIcon.svg" alt="" class="max-w-6">
                <span class="whitespace-break-spaces"> = Getränk</span>
            </p>
        </div>
        
    </div>
</template>
