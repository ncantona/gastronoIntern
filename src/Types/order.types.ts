import type { ItemType } from "./item.types"

export type ItemPreparationStatus = 'PREPARING' | 'READY' | 'SERVED';

export interface OrderResponse {
    id: number,
    userIds: number[],
    orderTime: string,
    totalAmount: number,
    tableId: number,
    waiterId: string,
    invoiceId: number,
    restaurantId: number,
    isActive: boolean,
    items: OrderItemResponse[]
};

export interface OrderRequest {
    userIds: number[],
    tableId: number,
    waiterId: string,
    restaurantId: number,
    items: OrderItemRequest[]
};

export interface OrderItemResponse {
    id: number,
    itemId: number,
    itemName: string,
    itemType: ItemType,
    quantity: number,
    price: number,
    subtotal: number,
    prepStatus: ItemPreparationStatus
};

export interface OrderItemRequest {
    itemId: number,
    quantity: number,
};