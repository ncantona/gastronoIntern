import { defineStore } from "pinia";
import { api } from "@/API/axios";
import AddRestaurant from "@/components/Admin/Restaurants/AddRestaurant.vue";
import { log } from "@/utils/logger";

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
        restaurants: [] as Restaurant[],
    }),
    getters: {
        
    },
    actions: {
        addRestaurant: async (restaurantData: {restaurantName: string, streetName: string, streetNumber: string, zip: string, city: string}) => {
            await api.post('/restaurant', restaurantData);
        },
        getRestaurantsByName: async (search: string) => {
            const response = await api.get('restaurant/search', {params: search});
            return response.data;
        },
        getRestaurantById: async (id: number) => {
            const response = await api.get(`restaurant/${id}`);
            return response.data;
        },
    }
})