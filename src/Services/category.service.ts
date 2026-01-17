import { api } from "@/API/axios";
import type { CategoryRequest, CategoryResponse } from "@/Types/category.types";

/**
 * Creates a new category for a restaurant
 * @param categoryData - Category payload
 * @param restaurantId - Restaurant ID the category belongs to
 * @returns Promise<CategoryResponse> - Created category data
 */
export const createCategory = async (
    categoryData: CategoryRequest,
    restaurantId: number
): Promise<CategoryResponse> => {

    const { data } = await api.post(
        `restaurant/${restaurantId}/categories`,
        categoryData
    );
    return data;

};

/**
 * Loads all categories for a restaurant
 * @param restaurantId - Restaurant ID
 * @returns Promise<CategoryResponse[]> - List of categories
 */
export const getCategories = async (
    restaurantId: number
): Promise<CategoryResponse[]> => {

    const { data } = await api.get(
        `restaurant/${restaurantId}/categories`
    );
    return data;

};

/**
 * Deletes a category by ID for a restaurant
 * @param categoryId - Category ID to delete
 * @param restaurantId - Restaurant ID
 * @returns Promise<void>
 */
export const deleteCategory = async (
    categoryId: number,
    restaurantId: number
): Promise<void> => {

    await api.delete(
        `restaurant/${restaurantId}/categories/${categoryId}`
    );

};

/**
 * Updates a category for a restaurant
 * @param category - Updated category payload
 * @param categoryId - Category ID to update
 * @param restaurantId - Restaurant ID
 * @returns Promise<CategoryResponse> - Updated category data
 */
export const updateCategory = async (
    category: CategoryRequest,
    categoryId: number,
    restaurantId: number
): Promise<CategoryResponse> => {

    const { data } = await api.put(
        `restaurant/${restaurantId}/categories/${categoryId}`,
        category
    );
    return data;

};

/**
 * Gets a single category by ID for a restaurant
 * @param categoryId - Category ID
 * @param restaurantId - Restaurant ID
 * @returns Promise<CategoryResponse> - Category data
 */
export const getCategory = async (
    categoryId: number,
    restaurantId: number
): Promise<CategoryResponse> => {

    const { data } = await api.get(
        `restaurant/${restaurantId}/categories/${categoryId}`
    );
    return data;
    
};