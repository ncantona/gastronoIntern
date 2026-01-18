<script setup lang="ts">
    import { changeLoginId, changePassword } from '@/Services/security.service';
    import type { ChangePasswordRequest } from '@/Types/security.types';
    import type { RestaurantAccountResponse } from '@/Types/user.types';
    import { usePopupStore } from '@/stores/General/usePopupStore';
    import { computed, ref } from 'vue';
    import { usePasswordStrength } from '@/GeneralTypescript/PasswordValidation';

    import CustomInputField from '@/components/General/CustomInputField.vue';
    import WindowHeader from '@/components/General/WindowHeader.vue';
    import CustomButton from '@/components/General/CustomButton.vue';
    
    import GearSVG from '@/assets/svgs/settingsBlack.svg';

    type PasswordErrors = {
        newPassword: string,
        oldPassword: string,
        newPasswordRetry: string
    };
    
    const props = defineProps<{
        dashboardAccount: RestaurantAccountResponse,
        restaurantId: number,
    }>();

    const emit = defineEmits<{
        (e: 'success', dashboardAccount: RestaurantAccountResponse): void,
        (e: 'cancel'): void,
    }>();

    const popupStore = usePopupStore();

    const dashboardAccount = ref<RestaurantAccountResponse>({ ...props.dashboardAccount });

    const passwordErrors = ref<PasswordErrors>({
        newPassword: '',
        oldPassword: '',
        newPasswordRetry: ''
    });

    const idError = ref<string>('');

    const hasChanges = computed(() => JSON.stringify(dashboardAccount.value) !== JSON.stringify(props.dashboardAccount));
    const validateLoginId = () => {
        idError.value = dashboardAccount.value.loginId ? '' : 'Eine Login-ID muss angegeben werden.';

        return !idError.value;
    };
    const validatePassword = () => {

        passwordErrors.value.newPassword = '';
        passwordErrors.value.oldPassword = '';
        passwordErrors.value.newPasswordRetry = '';

        if (!passwords.value.newPassword) {
            passwordErrors.value.newPassword = 'Ein neues Passwort muss angegeben werden.';
        } else {
            const unmetRequirements: string[] = [];
            if (!hasMinLength.value)
                unmetRequirements.push('mindestens 8 Zeichen');
            if (!hasLowercase.value)
                unmetRequirements.push('mindestens 1 Kleinbuchstaben');
            if (!hasUppercase.value)
                unmetRequirements.push('mindestens 1 Großbuchstaben');
            if (!hasSpecialChar.value)
                unmetRequirements.push('mindestens 1 Sonderzeichen');
            if (unmetRequirements.length)
                passwordErrors.value.newPassword = `Passwort muss ${unmetRequirements.join(', ')} enthalten.`;
        }

        if (!passwordErrors.value.newPassword) {
            if (!newPasswordRetry.value)
                passwordErrors.value.newPasswordRetry = 'Das Passwort muss wiederholt werden.';
            else if (!passwordsMatch.value)
                passwordErrors.value.newPasswordRetry = 'Passwörter stimmen nicht überein.';
        }

        return !Object.values(passwordErrors.value).some(Boolean);

    }

    const handleUpdateDashboardAccount = async () => {

        if (activeSection.value === 'loginId') {
            if (!hasChanges.value) {
                popupStore.setSuccess('Keine Änderungen vorgenommen.');
                emit('success', { ...props.dashboardAccount });
                return;
            }
            if (!validateLoginId())
                return;
            
            try {
                /* const updatedDashboardAccount =  */await changeLoginId(dashboardAccount.value.loginId, props.dashboardAccount.id, props.restaurantId);
                popupStore.setSuccess('Login-ID erfolgreich aktualisiert.')
                emit('success', { ...dashboardAccount.value });
            } catch (error) {
                popupStore.setError('Aktualisieren von Login-ID fehlgeschlagen.')
            }
        }

        if (activeSection.value === 'password') {
            if (!validatePassword())
                return;

            try {
                await changePassword(passwords.value, dashboardAccount.value.id, props.restaurantId);
                popupStore.setSuccess('Passwort erfolgreich geändert.');
                emit('success', { ...dashboardAccount.value });
            } catch (error) {
                popupStore.setError('Ändern von Passwort fehlgeschlagen.')
            }
        };
    };

    const activeSection = ref<string>('loginId');

    const passwords = ref<ChangePasswordRequest>({
        oldPassword: '',
        newPassword: '',
    });

    const newPasswordRetry = ref<string>('');

    const newPasswordRef = computed(() => passwords.value.newPassword);
    const {
        hasMinLength,
        hasLowercase,
        hasUppercase,
        hasSpecialChar,
        passwordStrengthPercent,
        passwordStrengthLabel,
        passwordStrengthColor
    } = usePasswordStrength(newPasswordRef);

    const passwordsMatch = computed(
        () => passwords.value.newPassword && passwords.value.newPassword === newPasswordRetry.value
    );
    const dotClass = (valid :boolean) => valid ? 'text-green-600' : 'text-slate-400';

</script>

<template>
    <div class="border-2 border-ownblue-500 rounded-xl p-5">

        <WindowHeader
            :img-src="GearSVG"
            img-alt="Ein Pluszeichen in einem Kreis"
            :show-cancel="true"
            @cancel="emit('cancel')">
            Dashboard-Account bearbeiten
        </WindowHeader>

        <div class="flex flex-col w-full">
            <form @submit.prevent="handleUpdateDashboardAccount()" class="flex flex-col gap-3">

                <div class="flex justify-center-safe gap-10">
                    <button
                        type="button"
                        class="text-xl font-medium"
                        :class="activeSection === 'loginId' ? 'text-ownblue-500' : 'text-slate-900 hover:text-blue-400'"
                        @click="activeSection = 'loginId'">
                        ID bearbeiten
                    </button>
                    <button
                        type="button"
                        class="text-xl font-medium"
                        :class="activeSection === 'password' ? 'text-ownblue-500' : 'text-slate-900 hover:text-blue-400'"
                        @click="activeSection = 'password'">
                        Passwort bearbeiten
                    </button>
                </div>

                <CustomInputField
                    v-if="activeSection === 'loginId'"
                    v-model="dashboardAccount.loginId"
                    type="text"
                    label="Login-ID"
                    name="loginId"
                    placeholder="Login-ID eingeben"
                    :error="idError"/>

                <CustomInputField
                    v-if="activeSection === 'password'"
                    v-model="passwords.oldPassword"
                    type="password"
                    label="Derzeitiges Passwort"
                    name="oldPassword"
                    placeholder="Derzeitiges Passwort eingeben"
                    :error="passwordErrors.oldPassword"/>

                <CustomInputField
                    v-if="activeSection === 'password'"
                    v-model="passwords.newPassword"
                    type="password"
                    label="Neues Passwort"
                    name="newPassword"
                    placeholder="Neues Passwort eingeben"
                    :error="passwordErrors.newPassword"/>

                <CustomInputField
                    v-if="activeSection === 'password'"
                    v-model="newPasswordRetry"
                    type="password"
                    label="Password wiederholen"
                    name="newPasswordRetry"
                    placeholder="Neues Passwort wiederholen"
                    :error="passwordErrors.newPasswordRetry"/>

                <div v-if="activeSection === 'password'" class="space-y-2 mt-5">
                    <div class="flex justify-between text-sm">
                        <span class="text-slate-700">Passwort-Stärke</span>
                        <span class="text-slate-600">{{ passwordStrengthLabel }}</span>
                    </div>
                    <div class="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div
                            class="h-2 rounded-full transition-all duration-200"
                            :style="{ width: passwordStrengthPercent, backgroundColor: passwordStrengthColor }"/>
                    </div>
                </div>

                <div class="flex gap-5 w-full">
                    <CustomButton
                        variant="editBlue"
                        class="mt-4 w-full">
                        Speichern
                    </CustomButton>
                </div>
            </form>

        </div>
    </div>
</template>