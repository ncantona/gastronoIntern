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
            console.log(data);
            this.items = data;
        },
        async updateItem(restaurantId :number, itemId :number, fields: Partial<Item>) {
            const { data } = await api.put(`/restaurant/${restaurantId}/items/${itemId}`, fields);
            const index = this.items.findIndex(item => item.id == itemId);
            if (index !== -1) {
                this.items[index] = data;
            }
        },
        async deleteItemById(restaurantId: number, itemId :number) {
            await api.delete(`/restaurant/${restaurantId}/items/${itemId}`);
            this.items = this.items.filter(item => item.id !== itemId);
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
        async createItem(restaurantId :number, item: Partial<Item>) {
            const { data } = await api.post(`/restaurant/${restaurantId}/items`, item);
            this.items.push(data);
        },
    },
})