import { api, apiNoJWT } from "@/API/axios";
import { log } from "@/utils/logger";
import { useAuthStore } from "@/stores/Auth/useAuthStore";
import type { ItemPreparationStatus, OrderItemResponse, OrderRequest, OrderResponse } from "@/Types/order.types";

export const createOrder = async (
    orderData: OrderRequest
): Promise<OrderResponse> => {

    const { data } = await apiNoJWT.post(
        `/public/orders`,
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

export const getActiveBarOrders = async (
    restaurantId: number
): Promise<OrderResponse[]> => {

    const { data } = await api.get(
        `restaurant/${restaurantId}/orders/active`,
        {
            params: {
                restaurantId
            }
        }
    );
    
    return data
    .map((order: OrderResponse) => ({
      ...order,
      items: order.items.filter(
        (item: OrderItemResponse) => item.itemType === 'BEVERAGE'
      )
    }))
    .filter((order: OrderResponse) => order.items.length > 0);

};

export const getActiveKitchenOrders = async (
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
    
    return data
    .map((order: OrderResponse) => ({
      ...order,
      items: order.items.filter(
        (item: OrderItemResponse) => item.itemType === 'BEVERAGE'
      )
    }))
    .filter((order: OrderResponse) => order.items.length > 0);

};

export const subscribeToBarOrders = (
    restaurantId: number,
    onMessage: (order: OrderResponse) => void,
    onError?: (error: Event) => void
): (() => void) => {
    const authStore = useAuthStore();
    const baseUrl = api.defaults.baseURL?.replace('/api/', '') || 'http://192.168.178.22:8080';
    const token = authStore.accessToken ? `Bearer ${authStore.accessToken}` : '';
    const apiUrl = `${baseUrl}/api/stream/restaurant/${restaurantId}/bar`;
    
    let controller: AbortController | null = new AbortController();

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': token,
        },
        signal: controller.signal,
    }).then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body?.getReader();
        if (!reader) throw new Error('No response body');

        let buffer = '';

        const processStream = async () => {
            try {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    buffer += new TextDecoder().decode(value);
                    const lines = buffer.split('\n');
                    
                    buffer = lines[lines.length - 1];

                    for (let i = 0; i < lines.length - 1; i++) {
                        const line = lines[i].trim();
                        if (line.startsWith('data:')) {
                            const data = line.substring(5).trim();
                            try {
                                const newOrder = JSON.parse(data) as OrderResponse;
                                log.info('New bar order received via SSE:', newOrder);
                                onMessage(newOrder);
                            } catch (error) {
                                log.error('Failed to parse SSE message:', error);
                            }
                        }
                    }
                }
            } catch (error) {
                if ((error as Error).name !== 'AbortError') {
                    log.error('Stream processing error:', error);
                    if (onError) onError(error as Event);
                }
            }
        };

        processStream();
    }).catch((error) => {
        if (error.name !== 'AbortError') {
            log.error('SSE connection error:', error);
            if (onError) onError(error as Event);
        }
    });

    // Return unsubscribe function
    return () => {
        if (controller) {
            controller.abort();
            controller = null;
        }
        log.info('Unsubscribed from bar orders');
    };
};
