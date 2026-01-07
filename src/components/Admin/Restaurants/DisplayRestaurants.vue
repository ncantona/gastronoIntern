<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    
    import RestaurantInfo from '@/components/Admin/Restaurants/RestaurantInfoV2.vue';
    import CustomInputField from '@/components/General/CustomInputField.vue';
    import Window from '@/components/General/Window.vue';
import { useAdminRestaurantStore } from '@/stores/Admin/useRestaurantStore';

    interface Restaurant {
        id: number,
        name: string,
        street: string,
        addressAddition: string,
        city: string,
        zipcode: string,
        isActive: boolean,
        categories?: string[],
        accounts?: any[],
    }

    const value = defineModel<Restaurant | null>();
    const adminRestaurantStore = useAdminRestaurantStore();
    const searchRestaurant = ref<string>('');

    const scrollWindowTop = () => window.scroll(0, 0);

    onMounted(async () => {
        await adminRestaurantStore.loadNext7Restaurants(0);
    });
</script>

<template>
    <Window class="p-12">
        <div class="mb-5 flex gap-2">
            <img src="@/assets/svgs/settingsBlack.svg" alt="Search Icon" class="w-6">
            <div class="subHeader">Restaurants verwalten</div>
        </div>
        <CustomInputField
            v-model="searchRestaurant"
            type="text"
            name="searchRestaurant"
            placeholder="Nach welchem Restaurant soll ich suchen?"
        />
        <div class="mb-1 p-3 grid grid-cols-[minmax(0,17rem)_minmax(0,17rem)_minmax(15rem,1fr)] rounded-2xl font-semibold text-lg">
            <span>Name</span>
            <span>Adresse</span>
            <span>Kategorien</span>
        </div>
        <span v-show="!adminRestaurantStore.restaurants" class="flex text-lg h-8/10 w-full items-center justify-center text-gray-500">
            Keine Restaurants gefunden.
        </span>
        <RestaurantInfo
            v-for="restaurant in adminRestaurantStore.restaurants" :key="restaurant.id" :restaurant="restaurant"
            @click="value = restaurant; scrollWindowTop()"/>
    </Window>
</template>