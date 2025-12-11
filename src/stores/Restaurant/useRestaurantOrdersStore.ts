import { defineStore } from "pinia";
import { api } from "@/API/axios";

interface Item {
    id: number;
    name: string;
    description: string;
    price: number;
};

interface Order {
    id: number;
    invoiceId: number;
    waiterId: string;
    tableId: number;
    totalPrice: number;
    datetime: string;
    items: Item[];
};

export const useRestaurantOrdersStore = defineStore('restaurantOrders', {
    state: () => ({
        orders: [] as Order[],
    }),
    getters: {
        
    },
    actions: {

    }
})