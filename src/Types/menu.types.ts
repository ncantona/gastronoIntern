export interface MenuCategoryResponse {
    id: number,
    name: string,
    position: number,
    items: MenuItemResponse[]
};

export interface MenuItemResponse {
    id: number,
    code: string,
    name: string,
    position: number,
    description: string,
    price: number,
    isAvailable: boolean,
};