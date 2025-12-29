<script setup lang="ts">
    import { ref } from 'vue';
    
    import RestaurantInfo from '@/components/Admin/Restaurants/RestaurantInfoV2.vue';
    import CustomInputField from '@/components/General/CustomInputField.vue';
    import Window from '@/components/General/Window.vue';

    interface Restaurant {
        id: number,
        name: string,
        street: string,
        addressAddition: string,
        city: string,
        zipcode: string,
        isActive: boolean,
        categories: string[],
    }

    const value = defineModel<Restaurant | null>();

    const searchRestaurant = ref<string>('');

    let restaurants = ref([
        {
            id: 1,
            name: "Grätzlgarten",
            street: "Welsgasse",
            addressAddition: "16a",
            city: "Wien",
            zipcode: "1160",
            isActive: true,
            categories: [
                "Österreichisch",
                "Wiener Art",
            ],
        },
        {
            id: 2,
            name: "McDonalds",
            street: "Breitenfurt",
            addressAddition: "2",
            city: "Wien",
            zipcode: "1110",
            isActive: true,
            categories: [
                "Fast Food",
            ],
        },
        {
            id: 3,
            name: "Pablos Pizza",
            street: "Herringstraße",
            addressAddition: "1",
            city: "Wien",
            zipcode: "1230",
            isActive: true,
            categories: [
                "Italienisch",
                "Pizzeria",
            ],
        },
        {
            id: 3,
            name: "Pablos Pizza",
            street: "Herringstraße",
            addressAddition: "1",
            city: "Wien",
            zipcode: "1230",
            isActive: true,
            categories: [
                "Italienisch",
                "Pizzeria",
            ],
        },
        {
            id: 3,
            name: "Pablos Pizza",
            street: "Herringstraße",
            addressAddition: "1",
            city: "Wien",
            zipcode: "1230",
            isActive: true,
            categories: [
                "Italienisch",
                "Pizzeria",
                "Pizzeria",
                "Pizzeria",
            ],
        },
        {
            id: 3,
            name: "Pablos Pizza",
            street: "Herringstraße",
            addressAddition: "1",
            city: "Wien",
            zipcode: "1230",
            isActive: false,
            categories: [
                "Italienisch",
                "Pizzeria",
            ],
            restaurantAccounts: [
                "ID-Küche",
                "ID-Bar",
                "ID-Restaurant",
            ],
        },
        {
            id: 3,
            name: "Pablos Pizza",
            street: "Herringstraße",
            addressAddition: "1",
            city: "Wien",
            zipcode: "1230",
            isActive: true,
            categories: [
                "Italienisch",
                "Pizzeria",
            ],
        },
    ]);

    const scrollWindowTop = () => window.scroll(0, 0);

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
        <span v-show="restaurants.length === 0" class="flex text-lg h-8/10 w-full items-center justify-center text-gray-500">
            Keine Restaurants gefunden.
        </span>
        <RestaurantInfo
            v-for="restaurant in restaurants" :restaurant="restaurant"
            @click="value = restaurant; scrollWindowTop()"/>
    </Window>
</template>