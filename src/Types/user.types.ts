export interface RestaurantAccountResponse {
    id: string,
    loginId: string,
    firstName: string,
    lastName: string,
    email: string,
    roles: string[],
    restaurantId: number,
};

export interface RegisterHostAccountRequest {
    loginId: string,
    firstName: string,
    lastName: string,
    email: string,
    restaurantId: number,
    password: string,
};

export interface UpdateHostAccountRequest {
    loginId: string,
    firstName: string,
    lastName: string,
    email: string,
};

export type HostErrors = {
    loginId: string,
    firstName: string,
    lastName: string,
    email: string,
};

export interface RegisterDashboardAccountRequest {
    loginId: string,
    roles: string,
    restaurantId: number,
    password: string,
};

export interface UpdateDashboardAccountRequestByAdmin {
    loginId: string,
    roles: string,
};

export interface UpdateDashboardAccountRequestByHost {
    loginId: string,
};

export type DashboardAccountErrors = {
    loginId: string,
    roles: string,
};

export interface RegisterWaiterAccountRequest {
    loginId: string,
    firstName: string,
    lastName: string,
    restaurantId: number,
    password: string,
};

export interface UpdateWaiterAccountRequest {
    loginId: string,
    firstName: string,
    lastName: string,
};