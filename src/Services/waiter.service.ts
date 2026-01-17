import { api } from "@/API/axios";
import type { UpdateWaiterRequest, WaiterRequest, WaiterResponse } from "@/Types/waiter.types";

/**
 * Registers a new waiter for a restaurant
 * @param waiterData - Waiter registration data
 * @param restaurantId - Restaurant ID
 * @returns Promise<WaiterResponse> - Registered waiter data
 */
export const registerWaiter = async (
    waiterData: WaiterRequest,
    restaurantId: number
): Promise<WaiterResponse> => {

    const { data } = await api.post(
        `restaurant/${restaurantId}/waiters`,
        waiterData
    );
    return data;

};

/**
 * Updates a waiter for a restaurant
 * @param waiterData - Updated waiter data
 * @param waiterId - Waiter ID to update
 * @param restaurantId - Restaurant ID
 * @returns Promise<WaiterResponse> - Updated waiter data
 */
export const updateWaiter = async (
    waiterData: UpdateWaiterRequest,
    waiterId: string, 
    restaurantId: number
): Promise<WaiterResponse> => {

    const { data } = await api.put(
        `restaurant/${restaurantId}/waiters/${waiterId}`,
        waiterData
    );
    return data;

};

/**
 * Deletes a waiter for a restaurant
 * @param waiterId - Waiter ID to delete
 * @param restaurantId - Restaurant ID
 * @returns Promise<void>
 */
export const deleteWaiter = async (
    waiterId: string,
    restaurantId: number
): Promise<void> => {

    await api.delete(
        `restaurant/${restaurantId}/waiters/${waiterId}`
    );

};

/**
 * Gets a single waiter by ID for a restaurant
 * @param waiterId - Waiter ID
 * @param restaurantId - Restaurant ID
 * @returns Promise<WaiterResponse> - Waiter data
 */
export const getWaiter = async (
    waiterId: string,
    restaurantId: number
): Promise<WaiterResponse> => {

    const { data } = await api.get(
        `restaurant/${restaurantId}/waiters/${waiterId}`
    );
    return data;

};

/**
 * Gets all waiters for a restaurant
 * @param restaurantId - Restaurant ID
 * @returns Promise<WaiterResponse[]> - List of waiters
 */
export const getAllWaiters = async (
    restaurantId: number
): Promise<WaiterResponse[]> => {

    const { data } = await api.get(
        `restaurant/${restaurantId}/waiters`
    );
    return data;

};
