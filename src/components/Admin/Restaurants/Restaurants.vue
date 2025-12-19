<script setup lang="ts">
    import { ref } from 'vue';
    
    import CustomInputField from '@/components/General/CustomInputField.vue';
    import Window from '@/components/General/Window.vue';
    import CustomButton from '@/components/General/CustomButton.vue';
    import ToggleSwitch from '@/components/General/ToggleSwitch.vue';

    const searchRestaurant = ref<string>('');

    let restaurants = ref([
        {
            id: 1,
            name: "Grätzlgarten",
            streetName: "Welsgasse",
            streetNumber: "16a",
            city: "Wien",
            zip: "1160",
            isActive: true,
            categories: [
                "Österreichisch",
                "Wiener Art",
            ],
            restaurantAccounts: [
                "ID-Küche",
                "ID-Bar",
                "ID-Restaurant",
            ],
        },
        {
            id: 2,
            name: "McDonalds",
            streetName: "Breitenfurt",
            streetNumber: "2",
            city: "Wien",
            zip: "1110",
            isActive: true,
            categories: [
                "Fast Food",
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
            streetName: "Herringstraße",
            streetNumber: "1",
            city: "Wien",
            zip: "1230",
            isActive: true,
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
            streetName: "Herringstraße",
            streetNumber: "1",
            city: "Wien",
            zip: "1230",
            isActive: true,
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
            streetName: "Herringstraße",
            streetNumber: "1",
            city: "Wien",
            zip: "1230",
            isActive: true,
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
            streetName: "Herringstraße",
            streetNumber: "1",
            city: "Wien",
            zip: "1230",
            isActive: true,
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
            streetName: "Herringstraße",
            streetNumber: "1",
            city: "Wien",
            zip: "1230",
            isActive: true,
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
    ]);

    const enabled = ref<boolean[]>();

</script>

<template>
    <div class="flex flex-col gap-10">
        <div class="flex justify-around gap-2 items-center">
            <Window class="p-6 pt-2 pb-4 max-w-150 max-h-20">
                <CustomInputField
                    v-model="searchRestaurant"
                    type="text"
                    label=""
                    name="searchRestaurant"
                    placeholder="Nach welchem Restaurant soll ich suchen?"
                    error=""
                />
            </Window>
            <Window class="max-w-200 p-6 flex flex-col justify-center max-h-20">
                <CustomButton>Restaurant erstellen</CustomButton>
            </Window>
        </div>
        <Window class="h-full">
            <div class="mb-1 p-3 grid 2xl:grid-cols-[minmax(0,20rem)_minmax(0,20rem)_minmax(0,37rem)_minmax(0,1fr)] rounded-2xl font-semibold text-2xl">
                <span>Name</span>
                <span>Adresse</span>
                <span>Kategorien</span>
            </div>
            <span v-show="restaurants.length === 0" class="flex text-3xl h-8/10 w-full items-center justify-center text-gray-500">Keine Restaurants gefunden.</span>
            <div v-for="restaurant in restaurants" class="shadow-xl items-center text-xl mb-4 p-3 grid 2xl:grid-cols-[minmax(0,20rem)_minmax(0,20rem)_minmax(0,37rem)_minmax(0,1fr)] rounded-2xl">
                <div class="flex flex-col">
                    <span>{{ restaurant.name }}</span>
                </div>
                <div>
                    <div>
                        <span>{{ restaurant.streetName + " " }}</span>
                        <span>{{ restaurant.streetNumber }}</span>
                    </div>
                    <div>
                        <span>{{ restaurant.zip + " "}}</span>
                        <span>{{ restaurant.city }}</span>
                    </div>
                </div>
                <div class="flex gap-3">
                    <div v-for="category in restaurant.categories">
                        <div class="border-2 border-main-800/30 p-2 pr-3 pl-3 rounded-full">
                            {{ category }}
                        </div>
                    </div>
                </div>
                <div class="flex gap-4 justify-end items-center">
                    <ToggleSwitch v-model="restaurant.isActive" @click="toggleRestaurantStatus(restaurant.id)"></ToggleSwitch>
                    <CustomButton variant="editGreen"><img src="@/assets/svgs/usersWhite.svg" alt="Users Icon" class="w-6"></CustomButton>
                    <CustomButton variant="editBlue"><img src="@/assets/svgs/editWhite.svg" alt="Edit Icon" class="w-6"></CustomButton>
                </div>
            </div>
        </Window>
    </div>
</template>