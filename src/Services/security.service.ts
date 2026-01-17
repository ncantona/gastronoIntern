import type { RefreshToken, Tokens } from "@/Types/security.types";
import { apiAuth } from "@/API/axios";

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