import { api } from "@/API/axios";
import type { ItemPreparationStatus, OrderItemResponse, OrderRequest, OrderResponse } from "@/Types/order.types";

export const createOrder = async (
    orderData: OrderRequest
): Promise<OrderResponse> => {

    const { data } = await api.post(
        `orders`,
        orderData
    );
    return data;

};

export const getActiveOrders = async (
    restaurantId: number
): Promise<OrderResponse[]> => {

    const { data } = await api.get(
        `orders/active`,
        {
            params: {
                restaurantId
            }
        }
    );
    return data;

};

export const changeOrderItemStatus = async (
    orderId: number,
    orderItemId: number,
    prepStatus: ItemPreparationStatus
): Promise<OrderItemResponse> => {

    const { data } = await api.patch(
        `api/orders/${orderId}/items/${orderItemId}/changeStatus`,
        null,
        {
            params: {
                prepStatus
            }
        }
    );
    return data;

};