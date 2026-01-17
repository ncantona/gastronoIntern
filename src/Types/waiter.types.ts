export interface WaiterResponse {
    id: string,
    firstName: string,
    lastName: string,
    roles: string[],
    loginId: string,
    restaurantId: number,
    sectionIds: number[]
};

export interface WaiterRequest {
    firstName: string,
    lastName: string,
    password: string,
    loginId: string,
    restaurantId: number
};

export interface UpdateWaiterRequest {
    firstName: string,
    lastName: string,
    loginId: string
};