export interface Tokens {
    accessToken: AccessToken,
    refreshToken: RefreshToken
};

export interface ChangePasswordRequest {
    oldPassword: string,
    newPassword: string
};

export type RefreshToken = string;
export type AccessToken = string;