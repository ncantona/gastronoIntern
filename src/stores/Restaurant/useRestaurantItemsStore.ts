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
    itemType: ItemType;
    price: number;
    rating: number;
    prepTime: string;
    isAvailable: boolean;
};


export const useRestaurantItemsStore = defineStore('itemsStore', {
    state: () => ({
        items: [
            { id: 1, name: 'Crazy Chicken Salat', description: 'gegrillte Hühnerbruststreifen auf buntem Salatteller mit Zwiebel & Hausdressing', categoryName: 'Salate', categoryPosition: 1, position: 1, code: 'SA01', itemType: 'MEAL', price: 15.80, isAvailable: true, rating: 4.9, prepTime: "00:08" },
            { id: 2, name: 'Crumbed Chicken Salat', description: 'gebackene Hühnerbruststreifen auf Erdäpfelsalat mit Zwiebel & Kernöl' , categoryName: 'Salata', categoryPosition: 1, position: 2, code: 'SA02', itemType: 'MEAL', price: 15.80, isAvailable: true, rating: 6, prepTime: "00:09" },
            { id: 3, name: 'Thunfisch Salat', description: 'Nach Art des Hauses, gemischter Blattsalat mit Zwiebel, Thunfisch & Balsamico Dressing', categoryName: 'Salate', categoryPosition: 1, position: 3, code: 'SA03', itemType: 'MEAL', price: 15.80, isAvailable: true, rating: 8, prepTime: "00:11" },
        ] as Item[],
    }),

    getters: {
        getItemsByCategory: (state) => {
            return (categoryName :string) => 
                state.items
                    .filter(item => item.categoryName == categoryName)
                    .sort((a, b) => a.position - b.position);
        },
        getActiveItemsByCategory: (state) => {
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
        async updateItem(restaurantId :number, itemId :number, fields: Partial<Item>) {
            const { data } = await api.put(`/restaurant/${restaurantId}/items/${itemId}`, fields);
            const index = this.items.findIndex(item => item.id == itemId);
            if (index !== -1) {
                this.items[index] = data;
            }
        },
        async deleteItemById(restaurantId: number, itemId :number) {
            //await api.delete(`/restaurant/${restaurantId}/items/${itemId}`);
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
            //const { data } = await api.post(`/restaurant/${restaurantId}/items/`, item);
            //this.items.push(data);
            this.items.push(item as Item);
        },
    },
})