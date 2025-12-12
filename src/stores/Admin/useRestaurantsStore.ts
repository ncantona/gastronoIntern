import { defineStore } from "pinia";
import { api } from "@/API/axios";

interface RestaurantAccount {
    id: number,
    email: string,
    roles: string[],
};

interface Restaurant {
    id: number,
    name: string,
    streetName: string,
    streetNumber: string,
    zip: string,
    restaurantAccounts: RestaurantAccount[],
};


export const useRestaurantsStore = defineStore('restaurants', {
    state: () => ({
        restaurants: [] as Restaurant[],
    }),
    getters: {
        
    },
    actions: {

    }
})