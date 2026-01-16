import type { RestaurantRequest, RestaurantResponse } from "@/Types/restaurant.types";
import { api } from "@/API/axios";

/**
 * Creates a new restaurant
 * @param restaurantData - Restaurant data to create
 * @returns Promise<RestaurantResponse> - Created restaurant data
 */
export const createRestaurant = async (
    restaurantData: RestaurantRequest
): Promise<RestaurantResponse> => {

    const { data } = await api.post(
        `restaurant`,
        restaurantData
    );
    return data;

};

/**
 * Updates an existing restaurant
 * @param restaurantId - ID of the restaurant to update
 * @param restaurantData - Updated restaurant data
 * @returns Promise<RestaurantResponse> - Updated restaurant data
 */
export const updateRestaurant = async (
    restaurantId: number,
    restaurantData: RestaurantRequest
): Promise<RestaurantResponse> => {

    const { data } = await api.put(
        `restaurant/${restaurantId}`,
        restaurantData
    );
    return data;

};

/**
 * Loads next 5 newest restaurants with pagination
 * @param page - Page number (0-indexed)
 * @param size - Number of items per page
 * @returns Promise<RestaurantResponse[]> - Array of restaurants
 */
export const loadRestaurants = async (
    page: number,
    size: number
): Promise<RestaurantResponse[]> => {

    const { data } = await api.get(
        `public/restaurants/newest`,
        {
            params: {
                page,
                size
            }
        }
    );
    return data;

};

/**
 * Searches restaurants by query string
 * @param query - Search query
 * @param page - Page number (0-indexed)
 * @param size - Number of items per page
 * @returns Promise<RestaurantResponse[]> - Array of matching restaurants
 */
export const loadRestaurantsWithQuery = async (
    query: string,
    page: number,
    size: number
): Promise<RestaurantResponse[]> => {

    const { data } = await api.get(
        `public/restaurants/search`,
        {
            params: {
                query,
                page,
                size
            }
        }
    );
    return data;

};