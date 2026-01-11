import { defineStore } from "pinia";
import { api } from "@/API/axios";
import { useAuthStore } from "../Auth/useAuthStore";

    interface RestaurantAccountResponse {
        id: string,
        loginId: string,
        firstName: string,
        lastName: string,
        email: string,
        roles: string[],
        restaurantId: number,
    };

    interface Restaurant {
        id: number,
        name: string,
        street: string,
        addressAddition: string,
        city: string,
        zipcode: string,
        isActive: boolean,
    }


export const useRestaurantStore = defineStore('restaurant', {
    state: (): { restaurant :Restaurant | null, isInitialized :boolean, accounts :RestaurantAccountResponse[]} => ({
        restaurant: null,
        isInitialized: false,
        accounts: [] as RestaurantAccountResponse[],
    }),
    getters: {
        
    },
    actions: {
        async loadRestaurant(restaurantId :number) {
            if (restaurantId === -1)
                return;
            const { data } = await api.get(`/restaurant/${restaurantId}`);
            this.restaurant = data;
            this.isInitialized = true;
        }, 
        async loadAccounts(restaurantId :number) {
            if (restaurantId === -1)
                return;
            const { data } = await api.get(`/restaurant/${restaurantId}/accounts`);
            this.accounts = data;
        }, 
    }
})