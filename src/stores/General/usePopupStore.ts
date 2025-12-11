import { defineStore } from "pinia";

interface Popup {
    success: string,
    error: string,
};

export const usePopupStore = defineStore('popups', {
    state: (): Popup => ({
        success: '',
        error: '',
    }),
    actions: {
        setSuccess(msg: string) {
            this.success = msg;
        },
        setError(msg: string) {
            this.error = msg;
        },
        clearSuccess() {
            this.success = '';
        },
        clearError() {
            this.error = '';
        },
    },
});