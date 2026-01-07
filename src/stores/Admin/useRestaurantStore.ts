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
        street: string,
        addressAddition: string,
        city: string,
        zipcode: string,
        isActive: boolean,
        categories?: string[],
        accounts?: RestaurantAccount[],
    }


export const useAdminRestaurantStore = defineStore('adminRestaurant', {
    state: () => ({
        restaurants: [] as Restaurant[],
    }),
    getters: {
        
    },
    actions: {
        async createRestaurant(restaurantData: {name: string, street: string, addressAddition: string, zipcode: string, city: string}) {
            await api.post('/restaurant', restaurantData);
        },
        async loadNext7Restaurants(page: number) {
            const { data } = await api.get('public/restaurants/newest', { params: { page, size: 7 } });
            this.restaurants = data;
        },
        async getRestaurantsByName(search: string) {
            const { data } = await api.get('restaurant/search', {params: search});
            return data;
        },
        async getRestaurantById(id: number) {
            const { data } = await api.get(`restaurant/${id}`);
            return data;
        },
        async toggleRestaurantStatus(id: number) {
            await api.patch(`restaurant/${id}`);
        },
        async updateRestaurant(restaurantData: {id: number, name: string, street: string, addressAddition: string, zipcode: string, city: string}) {
            await api.put(`/restaurant/${restaurantData.id}`, restaurantData);
        },
        async getRestaurantAccounts(id: number) {
            const { data } = await api.get(`restaurant/${id}/accounts`);
            return data;
        },
        async deleteRestaurantAccount(restaurantId: number, accountId: number) {
            await api.delete(`restaurant/${restaurantId}//accounts/${accountId}`);
        }
    }
})