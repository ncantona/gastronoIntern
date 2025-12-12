import { api, apiAuth } from "@/API/axios";
import { defineStore } from "pinia";

interface Token {
    accessToken: string,
    refreshToken: string,
};

interface User {
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    roles: string[],
    restaurantId: number,
};

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isInitialized: false as boolean,
        user: {} as User | null,
        accessToken: localStorage.getItem('jwt'),
        refreshToken: localStorage.getItem('refreshToken'),
    }),
    getters: {
        isLoggedIn(): boolean {
            return this.isInitialized;
        },
    },
    actions: {

        //------ General ------//

        setTokens({ accessToken, refreshToken } :Token) {
            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
            localStorage.setItem('jwt', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
        },
        async refreshUserToken() {
            if (!this.refreshToken)
                return;
            try {
                const { data } = await apiAuth.post('/refresh', {refreshToken: this.refreshToken});
                this.setTokens(data);
            } catch {
                this.logout();
            }
        },
        async initialize() {
            if (!this.isInitialized) {
                await this.loadUser().catch(() => undefined);
            }
            this.isInitialized = true;
        },
        applyAuthentification({jwtToken, user}: {jwtToken :Token, user :User}) {
            this.user = user;
            this.setTokens(jwtToken);
            this.isInitialized = true;
        },
        async loadUser() {
            if (!this.accessToken)
                return;
            const { data } = await api.get('/host/me');
            this.user = data;
            this.isInitialized = true;
        },
        async logout() {
            if (this.refreshToken)
                await apiAuth.post('/logout', {refreshToken: this.refreshToken});
            this.user = null;
            this.isInitialized = false;
            this.accessToken = null;
            this.refreshToken = null;
            localStorage.removeItem('jwt');
            localStorage.removeItem('refreshToken');
        },
        
        //------ Sytem-User ------//

        async registerSystemUser(userData :{loginId :string, email :string, firstName :string
            lastName :string, password :string}) {
            await apiAuth.post('/systemRegister', userData);
        },
        async loginSystemUser(userData :{loginId :string, password :string}) {
            const { data } = await apiAuth.post('/systemLogin', userData);
            this.applyAuthentification(data);
        },
    }
})