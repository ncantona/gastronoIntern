<script setup lang="ts">
import Window from '@/components/General/Window.vue';
import CustomButton from '@/components/General/CustomButton.vue';
import CustomInputField from '@/components/General/CustomInputField.vue';
import { usePopupStore } from '@/stores/General/usePopupStore';
import { useAuthStore } from '@/stores/Auth/useAuthStore';
import { isValidEmail } from '@/GeneralTypescript/HelperFunctions';
import { ref } from 'vue';

interface Account {
    id?: string;
    loginId: string;
    firstName: string;
    lastName: string;
    email: string;
    roles: string[];
}

const props = defineProps<{
    account?: Account;
    restaurantId: number;
}>();

const emit = defineEmits<{
    (e: 'cancel'): void;
    (e: 'success'): void;
}>();

const popupStore = usePopupStore();
const authStore = useAuthStore();

const isEditMode = !!props.account;

const localAccount = ref<Account>(props.account ? { ...props.account } : {
    loginId: '',
    firstName: '',
    lastName: '',
    email: '',
    roles: ['WAITER'],
});

const selectedRoles = ref<Record<string, boolean>>({
    HOST: localAccount.value.roles.includes('HOST'),
    WAITER: localAccount.value.roles.includes('WAITER'),
    KITCHEN: localAccount.value.roles.includes('KITCHEN'),
    BAR: localAccount.value.roles.includes('BAR'),
});

const errors = ref<string[]>(['', '', '', '', '']);

const validateForm = (): boolean => {
    errors.value = ['', '', '', '', ''];
    let isValid = true;

    if (!localAccount.value.loginId.trim()) {
        errors.value[0] = 'Bitte gib eine Login-ID ein.';
        isValid = false;
    }

    if (!localAccount.value.firstName.trim()) {
        errors.value[1] = 'Bitte gib einen Vornamen ein.';
        isValid = false;
    }

    if (!localAccount.value.lastName.trim()) {
        errors.value[2] = 'Bitte gib einen Nachnamen ein.';
        isValid = false;
    }

    if (!localAccount.value.email.trim()) {
        errors.value[3] = 'Bitte gib eine E-Mail-Adresse ein.';
        isValid = false;
    } else if (!isValidEmail(localAccount.value.email)) {
        errors.value[3] = 'Bitte gib eine gültige E-Mail-Adresse ein.';
        isValid = false;
    }

    const selectedRolesList = Object.entries(selectedRoles.value)
        .filter(([_, isSelected]) => isSelected)
        .map(([role]) => role);

    if (selectedRolesList.length === 0) {
        errors.value[4] = 'Bitte wähle mindestens eine Rolle aus.';
        isValid = false;
    }

    return isValid;
};

const handleSubmit = async () => {
    if (!validateForm()) return;

    localAccount.value.roles = Object.entries(selectedRoles.value)
        .filter(([_, isSelected]) => isSelected)
        .map(([role]) => role);

    try {
        if (isEditMode) {
            // TODO: API Call to update account
            // await authStore.updateRestaurantAccount(props.restaurantId, localAccount.value);
            popupStore.setSuccess('Account erfolgreich aktualisiert.');
        } else {
            // TODO: API Call to create account
            // await authStore.createRestaurantAccount(props.restaurantId, localAccount.value);
            popupStore.setSuccess('Account erfolgreich erstellt.');
        }
        emit('success');
    } catch (error) {
        popupStore.setError(isEditMode ? 'Aktualisierung fehlgeschlagen.' : 'Erstellung fehlgeschlagen.');
    }
};
</script>

<template>
    <Window class="p-12">
        <div class="flex justify-between items-center mb-6">
            <div class="flex gap-3 items-center">
                <img src="@/assets/svgs/settingsBlack.svg" alt="Settings Icon" class="w-6">
                <h2 class="text-2xl font-bold text-slate-900">
                    {{ isEditMode ? 'Account bearbeiten' : 'Neuen Account erstellen' }}
                </h2>
            </div>
            <button class="text-blue-500 hover:text-blue-400 cursor-pointer" @click="emit('cancel')">
                Abbrechen
            </button>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
            <!-- Login ID -->
            <CustomInputField
                v-model="localAccount.loginId"
                type="text"
                label="Login-ID"
                name="loginId"
                placeholder="z.B. mario123"
                :error="errors[0]"
            />

            <!-- Name -->
            <div class="flex gap-4">
                <CustomInputField
                    v-model="localAccount.firstName"
                    type="text"
                    label="Vorname"
                    name="firstName"
                    placeholder="Vorname"
                    :error="errors[1]"
                    class="flex-1"
                />
                <CustomInputField
                    v-model="localAccount.lastName"
                    type="text"
                    label="Nachname"
                    name="lastName"
                    placeholder="Nachname"
                    :error="errors[2]"
                    class="flex-1"
                />
            </div>

            <!-- Email -->
            <CustomInputField
                v-model="localAccount.email"
                type="email"
                label="E-Mail-Adresse"
                name="email"
                placeholder="beispiel@email.com"
                :error="errors[3]"
            />

            <!-- Roles Selection -->
            <div class="space-y-3">
                <label class="text-base font-medium text-slate-900">Rollen</label>
                <div class="space-y-2">
                    <label class="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                        <input
                            type="checkbox"
                            v-model="selectedRoles.HOST"
                            class="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <div>
                            <span class="font-medium text-slate-900">Manager (HOST)</span>
                            <p class="text-sm text-slate-500">Vollständiger Zugriff auf Restaurant-Verwaltung</p>
                        </div>
                    </label>

                    <label class="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                        <input
                            type="checkbox"
                            v-model="selectedRoles.WAITER"
                            class="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <div>
                            <span class="font-medium text-slate-900">Kellner (WAITER)</span>
                            <p class="text-sm text-slate-500">Zugriff auf Bestellungen und Tischverwaltung</p>
                        </div>
                    </label>

                    <label class="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                        <input
                            type="checkbox"
                            v-model="selectedRoles.KITCHEN"
                            class="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <div>
                            <span class="font-medium text-slate-900">Küche (KITCHEN)</span>
                            <p class="text-sm text-slate-500">Zugriff auf Küchen-Interface</p>
                        </div>
                    </label>

                    <label class="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                        <input
                            type="checkbox"
                            v-model="selectedRoles.BAR"
                            class="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <div>
                            <span class="font-medium text-slate-900">Bar (BAR)</span>
                            <p class="text-sm text-slate-500">Zugriff auf Bar-Interface</p>
                        </div>
                    </label>
                </div>
                <p v-if="errors[4]" class="text-sm text-red-600 mt-1">{{ errors[4] }}</p>
            </div>

            <!-- Default Password Info -->
            <div v-if="!isEditMode" class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p class="text-sm text-blue-800">
                    <strong>Hinweis:</strong> Das Standard-Passwort ist <code class="bg-blue-100 px-2 py-1 rounded">password123</code>. 
                    Der Benutzer kann es nach dem ersten Login ändern.
                </p>
            </div>

            <!-- Submit Button -->
            <CustomButton variant="editBlue" class="w-full mt-6" type="submit">
                {{ isEditMode ? 'Änderungen speichern' : 'Account erstellen' }}
            </CustomButton>
        </form>
    </Window>
</template>
