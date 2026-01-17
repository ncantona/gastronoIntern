export type ItemType = 'BEVERAGE' | 'MEAL';

export interface ItemRequest {
    code: string,
    name: string,
    itemType: ItemType,
    position: number,
    categoryId: number,
    description: string,
    price: number,
    isAvailable: boolean,
    restaurantId: number
};

export interface ItemResponse {
    id: number,
    code: string,
    name: string,
    itemType: ItemType,
    position: number,
    categoryId: number,
    description: string,
    price: number,
    isAvailable: boolean,
    restaurantId: number
};

export interface UpdateItemRequest {
    code: string,
    name: string,
    itemType: ItemType,
    position: number,
    categoryId: number,
    description: string,
    price: number,
    isAvailable: boolean,
};