import { defineStore } from "pinia";
import { api } from "@/API/axios";

type ItemType = 'BEVERAGE' | 'MEAL';

interface Item {
    id: number;
    name: string;
    description: string;
    categoryId: number;
    position: number;
    code: string;
    itemType: ItemType;
    price: number;
    rating: number;
    prepTime: string;
    isAvailable: boolean;
};

interface CategoryRequest {
    name: string,
    position: number,
}

interface CategoryResponse {
    id: number,
    name: string,
    position: number,
};

export const useRestaurantItemsStore = defineStore('itemsStore', {
    state: () => ({
        items: [] as Item[],
    }),

    getters: {
        getItemsByCategory: (state) => {
            return (categoryId :number) => 
                state.items
                    .filter(item => item.categoryId == categoryId)
                    .sort((a, b) => a.position - b.position);
        },
        getActiveItemsByCategory: (state) => {
            return (categoryId :number) =>
                state.items
                    .filter(item => item.categoryId == categoryId)
                    .sort((a, b) => a.position - b.position)
                    .filter(item => item.isAvailable);
        },
    },
    actions: {
        async loadItems(restaurantId :number) {
            const { data } = await api.get(`/restaurant/${restaurantId}/items`);
            this.items = data;
        },
        async setItemAvailability(restaurantId: number, itemId :number, isAvailable: boolean) {
            const { data } = await api.put(
                `/restaurant/${restaurantId}/items/${itemId}/availability`,
                null,
                {
                    params: {
                        availability: isAvailable,
                    },
                }
            );

            const index = this.items.findIndex(item => item.id == itemId);
            if (index !== -1) {
                this.items[index] = data;
            }
        },
    },
})