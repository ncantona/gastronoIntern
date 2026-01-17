import { api } from "@/API/axios";
import type { RefreshToken, Tokens } from "@/Types/security.types";

export const refreshTokenJWT = async (
    refreshToken: RefreshToken
): Promise<Tokens> => {

    const { data } = await api.post(
        `auth/refresh`,
        refreshToken
    );
    return data;

}