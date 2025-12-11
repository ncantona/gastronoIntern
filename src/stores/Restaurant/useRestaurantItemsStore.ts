import { defineStore } from "pinia";
import { api } from "@/API/axios";

type ItemType = 'BEVERAGE' | 'MEAL';

interface Item {
    id: number;
    name: string;
    description: string;
    categoryName: string;
    categoryPosition: number;
    position: number;
    code: string;
    type: ItemType;
    price: number;
    rating: number;
    prepTime: string;
    isAvailable: boolean;
};


export const useItemsStore = defineStore('itemsStore', {
    state: () => ({
        items: [] as Item[],
    }),

    getters: {
        getItemsBySection: (state) => {
            return (categoryName :string) => 
                state.items
                    .filter(item => item.categoryName == categoryName)
                    .sort((a, b) => a.position - b.position);
        },
        getActiveItemsBySection: (state) => {
            return (categoryName :string) =>
                state.items
                    .filter(item => item.categoryName == categoryName)
                    .sort((a, b) => a.position - b.position)
                    .filter(item => item.isAvailable);
        },
    },
    actions: {
        async loadItems() {
            const { data } = await api.get('/restaurant/items');
            this.items = data;
        },
        async updateItem(id :number, fields: Partial<Item>) {
            const { data } = await api.put(`/restaurant/items/${id}`, fields);
            const index = this.items.findIndex(item => item.id == id);
            if (index !== -1) {
                this.items[index] = data;
            }
        },
        async deleteItemById(id :number) {
            await api.delete(`/restaurant/items/${id}`);
            this.items = this.items.filter(item => item.id !== id);
        },
        async setItemAvailability(id :number, isAvailable: boolean) {
            const { data } = await api.put(`/restaurant/items/${id}/availability`, { isAvailable });
            const index = this.items.findIndex(item => item.id == id);
            if (index !== -1) {
                this.items[index] = data;
            }
        }
    },
})