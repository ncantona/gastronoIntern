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

const currentLoginId = ref('user123'); // TODO: Get from auth store
const newLoginId = ref('');
const password = ref('');

const errors = ref<string[]>(['', '']);

const validateForm = (): boolean => {
    errors.value = ['', ''];
    let isValid = true;

    if (!newLoginId.value.trim()) {
        errors.value[0] = 'Bitte gib eine neue Login-ID ein.';
        isValid = false;
    } else if (newLoginId.value === currentLoginId.value) {
        errors.value[0] = 'Die neue Login-ID muss sich von der aktuellen unterscheiden.';
        isValid = false;
    } else if (newLoginId.value.length < 4) {
        errors.value[0] = 'Die Login-ID muss mindestens 4 Zeichen lang sein.';
        isValid = false;
    }

    if (!password.value) {
        errors.value[1] = 'Bitte gib dein Passwort zur Bestätigung ein.';
        isValid = false;
    }

    return isValid;
};

const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
        // TODO: API Call to change login ID
        // await authStore.changeLoginId({
        //     newLoginId: newLoginId.value,
        //     password: password.value,
        // });
        popupStore.setSuccess('Login-ID erfolgreich geändert.');
        newLoginId.value = '';
        password.value = '';
        emit('success');
    } catch (error) {
        popupStore.setError('Änderung fehlgeschlagen. Überprüfe dein Passwort.');
    }
};
</script>

<template>
    <Window class="p-8">
        <div class="flex justify-between items-center mb-6">
            <div class="flex gap-3 items-center">
                <img src="@/assets/svgs/settingsBlack.svg" alt="Settings Icon" class="w-6">
                <h2 class="text-2xl font-bold text-slate-900">Login-ID ändern</h2>
            </div>
            <button class="text-blue-500 hover:text-blue-400 cursor-pointer" @click="emit('cancel')">
                Abbrechen
            </button>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
            <!-- Current Login ID (Read-only) -->
            <div class="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <label class="text-sm text-slate-500 font-medium">Aktuelle Login-ID</label>
                <p class="text-lg text-slate-900 mt-1 font-medium">{{ currentLoginId }}</p>
            </div>

            <!-- New Login ID -->
            <CustomInputField
                v-model="newLoginId"
                type="text"
                label="Neue Login-ID"
                name="newLoginId"
                placeholder="Neue Login-ID eingeben"
                :error="errors[0]"
            />

            <!-- Password for Confirmation -->
            <CustomInputField
                v-model="password"
                type="password"
                label="Passwort zur Bestätigung"
                name="password"
                placeholder="Dein Passwort eingeben"
                :error="errors[1]"
            />

            <!-- Info Box -->
            <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p class="text-sm text-yellow-800">
                    <strong>Wichtig:</strong> Nach der Änderung deiner Login-ID musst du dich mit der neuen ID anmelden.
                </p>
            </div>

            <!-- Submit Button -->
            <CustomButton variant="editBlue" class="w-full mt-6" type="submit">
                Login-ID ändern
            </CustomButton>
        </form>
    </Window>
</template>
