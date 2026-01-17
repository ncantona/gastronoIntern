import type { RestaurantResponse } from "@/Types/restaurant.types";
import { loadRestaurant } from "@/Services/restaurant.service";
import { defineStore } from "pinia";


export const useRestaurantStore = defineStore('restaurant', {
    state: () => ({
        restaurant: {} as RestaurantResponse | null,
        isInitialized: false as boolean,
    }),
    getters: {
        
    },
    actions: {

        /**
         * Initializes the restaurant store by loading restaurant data
         * Only loads if not already initialized
         * @param restaurantId - Restaurant ID to load
         * @returns Promise<void>
         */
        async initialize(
            restaurantId: number
        ): Promise<void> {

            if (!this.isInitialized)
                await this.loadRestaurant(restaurantId);

        },

        /**
         * Loads restaurant data by ID and updates the store
         * @param restaurantId - Restaurant ID to load
         * @returns Promise<void>
         */
        async loadRestaurant(
            restaurantId: number
        ): Promise<void> {

            if (restaurantId < 0)
                return;

            const restaurant = await loadRestaurant(restaurantId);
            this.restaurant = restaurant;
            this.isInitialized = true;

        },

    }
})