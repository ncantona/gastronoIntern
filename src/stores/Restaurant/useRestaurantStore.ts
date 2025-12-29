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


export const useRestaurantStore = defineStore('restaurant', {
    state: () => ({
        restaurant: {
            id: 1,
            name: 'Grätzlgarten',
        },
    }),
    getters: {
        
    },
    actions: {

    }
})