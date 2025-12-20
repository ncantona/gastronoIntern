<script setup lang="ts">
    import { ref } from 'vue';
    
    import CreateRestaurant from '@/components/Admin/Restaurants/CreateRestaurant.vue';
    import RestaurantInfo from '@/components/Admin/Restaurants/RestaurantInfo.vue';
    import CustomInputField from '@/components/General/CustomInputField.vue';
    import CustomButton from '@/components/General/CustomButton.vue';
    import Window from '@/components/General/Window.vue';

    const searchRestaurant = ref<string>('');
    const showCreateRestaurant = ref<boolean>(false);

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

</script>

<template>
    <div class="flex flex-col gap-5">
        <div class="flex gap-2 items-center w-full">
            <Window class="grid gap-3 2xl:grid-cols-[minmax(0,45rem)_minmax(0,0rem)_minmax(200px,1fr)] items-center">
                <CustomInputField
                    v-model="searchRestaurant"
                    type="text"
                    name="searchRestaurant"
                    placeholder="Nach welchem Restaurant soll ich suchen?"
                />
                <div class="col-start-3 flex justify-end">
                    <CustomButton
                        variant="submit"
                        @click="showCreateRestaurant = true"
                        class="gap-3">
                        <img src="@/assets/svgs/plusWhite.svg" alt="Plus Icon" class="w-6">Restaurant anlegen
                    </CustomButton>
                </div>
            </Window>
        </div>
        <Window class="h-full">
            <div class="mb-1 p-3 grid 2xl:grid-cols-[minmax(0,20rem)_minmax(0,20rem)_minmax(0,37rem)_minmax(0,1fr)] rounded-2xl font-semibold text-2xl">
                <span>Name</span>
                <span>Adresse</span>
                <span>Kategorien</span>
            </div>
            <span v-show="restaurants.length === 0" class="flex text-3xl h-8/10 w-full items-center justify-center text-gray-500">
                Keine Restaurants gefunden.
            </span>
            <RestaurantInfo v-for="restaurant in restaurants" :restaurant="restaurant"/>
        </Window>
        <CreateRestaurant v-if="showCreateRestaurant" @createSuccess="showCreateRestaurant = false"/>
    </div>
</template>