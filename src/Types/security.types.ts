export interface Tokens {
    accessToken: AccessToken,
    refreshToken: RefreshToken,
};

export type RefreshToken = string;
export type AccessToken = string;