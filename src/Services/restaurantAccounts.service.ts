import type { LoginRestaurantAccountRequest, LoginRestaurantAccountResponse, RegisterDashboardAccountRequest, RegisterHostAccountRequest, RestaurantAccountResponse, UpdateDashboardAccountRequestByAdmin, UpdateDashboardAccountRequestByHost, UpdateHostAccountRequest } from "@/Types/user.types"
import type { RefreshToken } from "@/Types/security.types";
import { api, apiAuth } from "@/API/axios"

/**
 * Registers a new host account
 * @param userData - Host account registration data
 * @returns Promise<RestaurantAccountResponse> - Registered host account data
 */
export const registerHost = async (
    userData: RegisterHostAccountRequest
): Promise<RestaurantAccountResponse> => {

    const { data } = await api.post(
        `auth/host/register`,
        userData
    );
    return data;

}

/**
 * Updates a host account
 * @param userData - Updated host account data
 * @param accountId - Host account ID to update
 * @returns Promise<RestaurantAccountResponse> - Updated host account data
 */
export const updateHost = async (
    userData: UpdateHostAccountRequest,
    accountId: string
): Promise<RestaurantAccountResponse> => {

    const { data } = await api.put(
        `host/${accountId}`,
        userData
    );
    return data;

};

/**
 * Deletes a host account
 * @param accountId - Host account ID to delete
 * @returns Promise<void>
 */
export const deleteHost = async (
    accountId: string
): Promise<void> => {

    await api.delete(
        `host/${accountId}`
    );

};

/**
 * Gets the host account for a restaurant
 * @param restaurantId - Restaurant ID
 * @returns Promise<RestaurantAccountResponse> - Host account data or null
 */
export const getHost = async (
    restaurantId: number
): Promise<RestaurantAccountResponse | null> => {

    const { data } = await api.get(
        `restaurant/${restaurantId}/accounts`
    );
    const hostAccount = data.find((account: RestaurantAccountResponse) => account.roles.includes('ROLE_HOST'));
    return hostAccount || null;

};

/**
 * Registers a new dashboard account (BAR or KITCHEN)
 * @param userData - Dashboard account registration data
 * @returns Promise<RestaurantAccountResponse> - Registered dashboard account data
 */
export const registerDashboardAccount = async (
    userData: RegisterDashboardAccountRequest
): Promise<RestaurantAccountResponse> => {

    const { data } = await api.post(
        `auth/host/registerDashboard`,
        userData
    );
    return data;

}

/**
 * Gets all dashboard accounts (BAR and KITCHEN) for a restaurant
 * @param restaurantId - Restaurant ID
 * @returns Promise<RestaurantAccountResponse> - Array of dashboard accounts or null
 */
export const getDashboardAccounts = async (
    restaurantId: number
): Promise<RestaurantAccountResponse[]> => {

    const { data } = await api.get(
        `restaurant/${restaurantId}/accounts`
    );
    const dashboardAccounts = (data || []).filter((account: RestaurantAccountResponse) => account.roles.includes('ROLE_BAR') || account.roles.includes('ROLE_KITCHEN'));
    return dashboardAccounts;

};

/**
 * Updates a dashboard account by admin (can change loginId and roles)
 * @param userData - Updated dashboard account data
 * @param accountId - Dashboard account ID to update
 * @returns Promise<RestaurantAccountResponse> - Updated dashboard account data
 */
export const updateDashboardAccountByAdmin = async (
    userData: UpdateDashboardAccountRequestByAdmin,
    accountId: string
): Promise<RestaurantAccountResponse> => {

    const { data } = await api.put(
        `host/${accountId}`,
        userData
    );
    return data;

};

/**
 * Updates a dashboard account by host (can only change loginId)
 * @param userData - Updated dashboard account data
 * @param accountId - Dashboard account ID to update
 * @returns Promise<RestaurantAccountResponse> - Updated dashboard account data
 */
export const updateDashboardAccountByHost = async (
    userData: UpdateDashboardAccountRequestByHost,
    accountId: string
): Promise<RestaurantAccountResponse> => {

    const { data } = await api.put(
        `host/${accountId}`,
        userData
    );
    return data;

};

/**
 * Loads the current restaurant account data
 * @returns Promise<RestaurantAccountResponse> - Current restaurant account data or null
 */
export const loadRestaurantAccount = async (
): Promise<RestaurantAccountResponse> => {

    const { data } = await api.get(
        `host/me`
    );
    return data || null;

};

/**
 * Logs in a restaurant account (HOST, BAR, or KITCHEN)
 * @param userData - Login credentials (loginId and password)
 * @returns Promise<LoginRestaurantAccountResponse> - Login response with user data and tokens
 */
export const loginRestaurantAccount = async (
    userData: LoginRestaurantAccountRequest
): Promise<LoginRestaurantAccountResponse> => {

    const { data } = await apiAuth.post(
        `systemLogin`,
        userData
    );
    return data;

};

/**
 * Logs out a restaurant account
 * @param refreshToken - The refresh token to invalidate
 * @returns Promise<void>
 */
export const logoutRestaurantAccount = async (
    refreshToken: RefreshToken
): Promise<void> => {

    await apiAuth.post(
        `logout`,
        { refreshToken }
    );

};