import type { ChangePasswordRequest, RefreshToken, Tokens } from "@/Types/security.types";
import { api, apiAuth } from "@/API/axios";

/**
 * Refreshes the JWT access token using a refresh token
 * @param refreshToken - The refresh token to use for obtaining new tokens
 * @returns Promise<Tokens> - New access and refresh tokens
 */
export const refreshTokenJWT = async (
    refreshToken: RefreshToken
): Promise<Tokens> => {

    const { data } = await apiAuth.post(
        `refresh`,
        { refreshToken }
    );
    return data;

};

export const changeLoginId = async (
    newLoginId: string,
    userId: string,
    restaurantId: number
): Promise<void> => {

    await api.put(
        `host/${userId}/changeLoginId`,
        null,
        {
            params: {
                restaurantId,
                newLoginId
            }
        }
    );

};

export const changePassword = async (
    newPassword: ChangePasswordRequest,
    userId: string,
    restaurantId: number
): Promise<void> => {

    await api.put(
        `host/${userId}/changePassword`,
        newPassword,
        {
            params: {
                restaurantId
            }
        }
    );

}