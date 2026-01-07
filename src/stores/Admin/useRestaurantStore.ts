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
        accounts: RestaurantAccount[],
        /*         categories: string[], */
    }


export const useRestaurantStore = defineStore('restaurant', {
    state: () => ({
        restaurants: [] as Restaurant[],
    }),
    getters: {
        
    },
    actions: {
        createRestaurant: async (restaurantData: {name: string, street: string, addressAddition: string, zipcode: string, city: string}) => {
            await api.post('/restaurant', restaurantData);
        },
        getRestaurantsByName: async (search: string) => {
            const { data } = await api.get('restaurant/search', {params: search});
            return data;
        },
        getRestaurantById: async (id: number) => {
            const { data } = await api.get(`restaurant/${id}`);
            return data;
        },
        toggleRestaurantStatus: async (id: number) => {
            await api.patch(`restaurant/${id}`);
        },
        updateRestaurant: async (restaurantData: {id: number, name: string, street: string, addressAddition: string, zipcode: string, city: string}) => {
            await api.put(`/restaurant/${restaurantData.id}`, restaurantData);
        },
        getRestaurantAccounts: async (id :number) => {
            const { data } = await api.get(`restaurant/${id}/accounts`);
            return data;
        },
        deleteRestaurantAccount: async (restaurantId :number, accountId :number) => {
            await api.delete(`restaurant/${restaurantId}//accounts/${accountId}`);
        }
    }
})