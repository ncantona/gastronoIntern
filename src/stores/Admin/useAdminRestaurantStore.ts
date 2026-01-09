import { defineStore } from "pinia";
import { api } from "@/API/axios";

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
    name: string,
    street: string,
    addressAddition: string,
    city: string,
    zipcode: string,
    isActive: boolean,
}

interface RestaurantResponse {
    id: number,
    name: string,
    street: string,
    addressAddition: string,
    zipcode: string,
    city: string,
    isActive: boolean,
    createdAt: string,
};


export const useAdminRestaurantStore = defineStore('adminRestaurant', {
    state: () => ({
        restaurants: [] as RestaurantResponse[],
    }),
    getters: {
        
    },
    actions: {
        async createRestaurant(restaurantData: Restaurant) :Promise<RestaurantResponse> {
            const { data } = await api.post('/restaurant', restaurantData);
            return data;
        },
        async loadNext5Restaurants(page: number) {
            const { data } = await api.get('public/restaurants/newest', { params: { page, size: 5 } });
            this.restaurants = data;
        },
        async load5RestaurantsBySearch(search :string) {
            const { data } = await api.get('public/restaurants/search', { params: { query: search, page: 0, size: 5 } });
            this.restaurants = data.content;
        },
        async getRestaurantHost(restaurantId :number) {
            const { data } = await api.get(`restaurant/${restaurantId}/accounts`);
            const hostAccount = data.find((account :RestaurantAccountResponse) => account.roles.includes('ROLE_HOST'));
            return (hostAccount || null);
        },
        async getRestaurantInterns(restaurantId :number) {
            const { data } = await api.get(`restaurant/${restaurantId}/accounts`);
            const internAccounts = data.filter((account :RestaurantAccountResponse) => account.roles.includes('ROLE_BAR') || account.roles.includes('ROLE_KITCHEN'));
            return (internAccounts);
        },
        async updateRestaurantHost(userData :Partial<RestaurantAccountResponse>, hostId :string) {
            await api.put(`host/${hostId}`, userData);
        },
        async deleteRestaurantHost(hostId :string) {
            await api.delete(`host/${hostId}`);
        },
        async updateRestaurant(restaurantData :Partial<Restaurant>, restaurantId :number) {
            await api.put(`/restaurant/${restaurantId}`, restaurantData);
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
        async getRestaurantAccounts(id: number) {
            const { data } = await api.get(`restaurant/${id}/accounts`);
            return data;
        },
        async deleteRestaurantAccount(restaurantId: number, accountId: number) {
            await api.delete(`restaurant/${restaurantId}//accounts/${accountId}`);
        }
    }
})