import type { ItemRequest, ItemResponse, UpdateItemRequest } from "@/Types/item.types";
import { api } from "@/API/axios";

/**
 * Creates a new item for a restaurant
 * @param itemData - Item creation data
 * @param restaurantId - Restaurant ID
 * @returns Promise<ItemResponse> - Created item data
 */
export const createItem = async (
    itemData: ItemRequest,
    restaurantId: number
): Promise<ItemResponse> => {

    const { data } = await api.post(
        `restaurant/${restaurantId}/items`,
        itemData
    );
    return data;

};

/**
 * Updates an item for a restaurant
 * @param itemData - Updated item data
 * @param itemId - Item ID to update
 * @param restaurantId - Restaurant ID
 * @returns Promise<ItemResponse> - Updated item data
 */
export const updateItem = async (
    itemData: UpdateItemRequest,
    itemId: number,
    restaurantId: number
): Promise<ItemResponse> => {

    const { data } = await api.put(
        `restaurant/${restaurantId}/items/${itemId}`,
        itemData
    );
    return data;

};

/**
 * Deletes an item for a restaurant
 * @param itemId - Item ID to delete
 * @param restaurantId - Restaurant ID
 * @returns Promise<void>
 */
export const deleteItem = async (
    itemId: number,
    restaurantId: number
): Promise<void> => {

    await api.delete(
        `restaurant/${restaurantId}/items/${itemId}`
    );

};

/**
 * Gets a single item by ID for a restaurant
 * @param itemId - Item ID
 * @param restaurantId - Restaurant ID
 * @returns Promise<ItemResponse> - Item data
 */
export const getItem = async (
    itemId: number,
    restaurantId: number
): Promise<ItemResponse> => {

    const { data } = await api.get(
        `restaurant/${restaurantId}/items/${itemId}`
    );
    return data;

};

/**
 * Gets all items for a restaurant
 * @param restaurantId - Restaurant ID
 * @returns Promise<ItemResponse[]> - List of items
 */
export const getAllItems = async (
    restaurantId: number
): Promise<ItemResponse[]> => {

    const { data } = await api.get(
        `restaurant/${restaurantId}/items`
    );
    return data;

};

/**
 * Toggles the availability status of an item
 * @param itemId - Item ID
 * @param availability - Availability status (true/false)
 * @param restaurantId - Restaurant ID
 * @returns Promise<ItemResponse> - Updated item data
 */
export const toggleItemAvailability = async (
    itemId: number,
    availability: boolean,
    restaurantId: number
): Promise<ItemResponse> => {

    const { data } = await api.patch(
        `restaurant/${restaurantId}/items/${itemId}/availability`,
        null,
        {
            params: {
                availability
            }
        }
    );
    return data;

};