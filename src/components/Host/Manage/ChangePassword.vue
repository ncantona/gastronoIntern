<script setup lang="ts">
import Window from '@/components/General/Window.vue';
import CustomButton from '@/components/General/CustomButton.vue';
import CustomInputField from '@/components/General/CustomInputField.vue';
import { usePopupStore } from '@/stores/General/usePopupStore';
import { useAuthStore } from '@/stores/Auth/useAuthStore';
import { ref } from 'vue';

const emit = defineEmits<{
    (e: 'cancel'): void;
    (e: 'success'): void;
}>();

const popupStore = usePopupStore();
const authStore = useAuthStore();

const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');

const errors = ref<string[]>(['', '', '']);

const validateForm = (): boolean => {
    errors.value = ['', '', ''];
    let isValid = true;

    if (!currentPassword.value) {
        errors.value[0] = 'Bitte gib dein aktuelles Passwort ein.';
        isValid = false;
    }

    if (!newPassword.value) {
        errors.value[1] = 'Bitte gib ein neues Passwort ein.';
        isValid = false;
    } else if (newPassword.value.length < 8) {
        errors.value[1] = 'Das Passwort muss mindestens 8 Zeichen lang sein.';
        isValid = false;
    }

    if (!confirmPassword.value) {
        errors.value[2] = 'Bitte bestätige dein neues Passwort.';
        isValid = false;
    } else if (newPassword.value !== confirmPassword.value) {
        errors.value[2] = 'Die Passwörter stimmen nicht überein.';
        isValid = false;
    }

    return isValid;
};

const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
        // TODO: API Call to change password
        // await authStore.changePassword({
        //     currentPassword: currentPassword.value,
        //     newPassword: newPassword.value,
        // });
        popupStore.setSuccess('Passwort erfolgreich geändert.');
        currentPassword.value = '';
        newPassword.value = '';
        confirmPassword.value = '';
        emit('success');
    } catch (error) {
        popupStore.setError('Passwortänderung fehlgeschlagen. Überprüfe dein aktuelles Passwort.');
    }
};
</script>

<template>
    <Window class="p-8">
        <div class="flex justify-between items-center mb-6">
            <div class="flex gap-3 items-center">
                <img src="@/assets/svgs/settingsBlack.svg" alt="Settings Icon" class="w-6">
                <h2 class="text-2xl font-bold text-slate-900">Passwort ändern</h2>
            </div>
            <button class="text-blue-500 hover:text-blue-400 cursor-pointer" @click="emit('cancel')">
                Abbrechen
            </button>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
            <!-- Current Password -->
            <CustomInputField
                v-model="currentPassword"
                type="password"
                label="Aktuelles Passwort"
                name="currentPassword"
                placeholder="Aktuelles Passwort eingeben"
                :error="errors[0]"
            />

            <!-- New Password -->
            <CustomInputField
                v-model="newPassword"
                type="password"
                label="Neues Passwort"
                name="newPassword"
                placeholder="Neues Passwort eingeben"
                :error="errors[1]"
            />

            <!-- Confirm Password -->
            <CustomInputField
                v-model="confirmPassword"
                type="password"
                label="Passwort bestätigen"
                name="confirmPassword"
                placeholder="Neues Passwort bestätigen"
                :error="errors[2]"
            />

            <!-- Password Requirements -->
            <div class="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <h3 class="text-sm font-medium text-slate-900 mb-2">Passwort-Anforderungen:</h3>
                <ul class="text-sm text-slate-600 space-y-1">
                    <li class="flex items-center gap-2">
                        <span :class="newPassword.length >= 8 ? 'text-green-600' : 'text-slate-400'">●</span>
                        Mindestens 8 Zeichen
                    </li>
                    <li class="flex items-center gap-2">
                        <span :class="newPassword && confirmPassword && newPassword === confirmPassword ? 'text-green-600' : 'text-slate-400'">●</span>
                        Passwörter müssen übereinstimmen
                    </li>
                </ul>
            </div>

            <!-- Submit Button -->
            <CustomButton variant="editBlue" class="w-full mt-6" type="submit">
                Passwort ändern
            </CustomButton>
        </form>
    </Window>
</template>
