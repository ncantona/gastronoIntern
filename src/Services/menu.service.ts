import { api } from "@/API/axios"
import type { MenuCategoryResponse } from "@/Types/menu.types"

export const getMenuByRestaurantId = async (
    restaurantId: number
): Promise<MenuCategoryResponse[]> => {
    const { data } = await api.get(
        `public/restaurants/${restaurantId}/menu`
    );
    return data;
}