export interface RestaurantRequest {
    name: string,
    street: string,
    addressAddition: string,
    city: string,
    zipcode: string,
    isActive: boolean,
};

export interface RestaurantResponse {
    id: number,
    name: string,
    street: string,
    addressAddition: string,
    zipcode: string,
    city: string,
    isActive: boolean,
    createdAt: string,
};

export type RestaurantErrors = {
    name: string,
    street: string,
    zipcode: string,
    city: string,
};