import { api } from "@/API/axios";
import { useAuthStore } from "@/stores/Auth/useAuthStore";
import { log } from "@/utils/logger";

api.interceptors.request.use(
    (config) => {
        const auth = useAuthStore();
        if (auth.accessToken) {
            config.headers.Authorization = `Bearer ${auth.accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        log.debug('Requesterror: ', error);
        const auth = useAuthStore();
        const originalRequest = error.config;

        if (error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                log.debug('Trying to refresh JWT Token.')
                await auth.refreshUserToken();
                originalRequest.headers.Authorization = `Bearer ${auth.accessToken}`;
                log.debug('Successfully refreshed JWT Token: ', auth.accessToken);
                return api(originalRequest);
            } catch (err) {
                auth.logout();
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default api;