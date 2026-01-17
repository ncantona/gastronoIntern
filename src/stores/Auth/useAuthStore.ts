import type { LoginRestaurantAccountRequest, LoginRestaurantAccountResponse, RestaurantAccountResponse } from "@/Types/user.types";
import { loadRestaurantAccount, loginRestaurantAccount, logoutRestaurantAccount } from "@/Services/restaurantAccounts.service";
import { refreshTokenJWT } from "@/Services/security.service";
import type { Tokens } from "@/Types/security.types";
import { defineStore } from "pinia";
import router from "@/router";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: {} as RestaurantAccountResponse | null,
        accessToken: localStorage.getItem('jwt'),
        refreshToken: localStorage.getItem('refreshToken'),
        isInitialized: false as boolean,
    }),
    getters: {
        isLoggedIn(
        ): boolean {

            return this.isInitialized;

        },
    },
    actions: {

        /**
         * Sets the access and refresh tokens in the store and localStorage
         * @param tokens - The tokens object containing accessToken and refreshToken
         * @returns void
         */
        setTokens(
            tokens: Tokens
        ): void {

            this.accessToken = tokens.accessToken;
            this.refreshToken = tokens.refreshToken;

            localStorage.setItem('jwt', tokens.accessToken);
            localStorage.setItem('refreshToken', tokens.refreshToken);

        },

        /**
         * Refreshes the user's JWT token using the refresh token
         * @returns Promise<void>
         */
        async refreshUserToken(
        ): Promise<void> {

            if (!this.refreshToken)
                return;

            const newTokens = await refreshTokenJWT(this.refreshToken);
            this.setTokens(newTokens);
    
        },

        /**
         * Initializes the auth store by loading the current user
         * Should be called on app startup
         * @returns Promise<void>
         */
        async initialize(
        ): Promise<void> {

            if (!this.isInitialized)
                await this.loadUser();

        },

        /**
         * Applies authentication by setting user data and tokens
         * @param response - Login response containing user and JWT tokens
         * @returns void
         */
        applyAuthentification(
            { user, jwtToken }: LoginRestaurantAccountResponse
        ): void {

            this.user = user;
            this.setTokens(jwtToken);
            this.isInitialized = true;

        },

        /**
         * Loads the current user's data from the API
         * Requires a valid access token
         * @returns Promise<void>
         */
        async loadUser(
        ): Promise<void> {

            if (!this.accessToken)
                return;

            const user = await loadRestaurantAccount();
            this.user = user;
            this.isInitialized = true;

        },

        /**
         * Logs out the current user and clears all authentication data
         * Removes tokens from localStorage and resets store state
         * @returns Promise<void>
         */
        async logout(
        ): Promise<void> {

            if (this.refreshToken)
                await logoutRestaurantAccount(this.refreshToken);

            this.user = null;
            this.isInitialized = false;
            this.accessToken = null;
            this.refreshToken = null;

            localStorage.removeItem('jwt');
            localStorage.removeItem('refreshToken');
            router.push({name: 'home'});

        },

        clearLoginState(
        ): void {

            this.user = null;
            this.isInitialized = false;
            this.accessToken = null;
            this.refreshToken = null;

            localStorage.removeItem('jwt');
            localStorage.removeItem('refreshToken');

        },

        /**
         * Logs in a restaurant system user (ADMIN, HOST, BAR, or KITCHEN)
         * @param userData - Login credentials (loginId and password)
         * @returns Promise<void>
         */
        async loginSystemUser(
            userData: LoginRestaurantAccountRequest
        ): Promise<void> {

            const user = await loginRestaurantAccount(userData);
            this.applyAuthentification(user);
    
        },
    }
})