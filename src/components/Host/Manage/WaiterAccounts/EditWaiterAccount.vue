<script setup lang="ts">
    import { usePopupStore } from '@/stores/General/usePopupStore';
    import { computed, ref } from 'vue';
    import { updateWaiter } from '@/Services/waiter.service';
    import { changePassword, changeLoginId } from '@/Services/security.service';
    import type { ChangePasswordRequest } from '@/Types/security.types';
    import type { WaiterResponse, UpdateWaiterRequest } from '@/Types/waiter.types';
    import { usePasswordStrength } from '@/GeneralTypescript/PasswordValidation';

    import CustomInputField from '@/components/General/CustomInputField.vue';
    import WindowHeader from '@/components/General/WindowHeader.vue';
    import CustomButton from '@/components/General/CustomButton.vue';

    import GearSVG from '@/assets/svgs/settingsBlack.svg';

    const props = defineProps<{
        waiterAccount: WaiterResponse,
    }>();

    const emit = defineEmits<{
        (e: 'success', restaurant: WaiterResponse): void,
        (e: 'cancel'): void,
    }>();

    const popupStore = usePopupStore();

    const waiterAccount = ref<WaiterResponse>({ ...props.waiterAccount });

    const loginIdError = ref<string>('');
    const errors = ref({
        firstName: '',
        lastName: '',
    });

    const hasChanges = computed(() => JSON.stringify(waiterAccount.value) !== JSON.stringify(props.waiterAccount));

    const validateLoginId = () => {
        loginIdError.value = waiterAccount.value.loginId ? '' : 'Eine Login-ID muss angegeben werden.';
        return !loginIdError.value;
    };

    const validatePersonalData = () => {
        errors.value = {
            firstName: waiterAccount.value.firstName ? '' : 'Ein Vorname muss angegeben werden.',
            lastName: waiterAccount.value.lastName ? '' : 'Ein Nachname muss angegeben werden.',
        };
        return !Object.values(errors.value).some(Boolean);
    };
    const passwordErrors = ref<{ oldPassword: string; newPassword: string; newPasswordRetry: string }>({
        oldPassword: '',
        newPassword: '',
        newPasswordRetry: ''
    });

    const activeSection = ref<'loginId' | 'password' | 'personalData'>('loginId');

    const passwords = ref<ChangePasswordRequest>({
        oldPassword: '',
        newPassword: ''
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

    const passwordsMatch = computed(() => passwords.value.newPassword && passwords.value.newPassword === newPasswordRetry.value);

    const validatePassword = () => {
        passwordErrors.value.oldPassword = '';
        passwordErrors.value.newPassword = '';
        passwordErrors.value.newPasswordRetry = '';

        if (!passwords.value.oldPassword) {
            passwordErrors.value.oldPassword = 'Das aktuelle Passwort muss angegeben werden.';
        }

        if (!passwords.value.newPassword) {
            passwordErrors.value.newPassword = 'Ein neues Passwort muss angegeben werden.';
        } else {
            const unmet: string[] = [];
            if (!hasMinLength.value)
                unmet.push('mindestens 8 Zeichen');
            if (!hasLowercase.value)
                unmet.push('mindestens 1 Kleinbuchstabe');
            if (!hasUppercase.value)
                unmet.push('mindestens 1 Großbuchstabe');
            if (!hasSpecialChar.value)
                unmet.push('mindestens 1 Sonderzeichen');
            if (unmet.length)
                passwordErrors.value.newPassword = `Passwort muss ${unmet.join(', ')} enthalten.`;
        }

        if (!passwordErrors.value.newPassword) {
            if (!newPasswordRetry.value)
                passwordErrors.value.newPasswordRetry = 'Das Passwort muss wiederholt werden.';
            else if (!passwordsMatch.value)
                passwordErrors.value.newPasswordRetry = 'Passwörter stimmen nicht überein.';
        }

        return !Object.values(passwordErrors.value).some(Boolean);
    };

    const handleUpdateWaiter = async () => {
        if (activeSection.value === 'loginId') {

            if (!validateLoginId())
                return;
            if (!hasChanges.value) {
                popupStore.setSuccess('Keine Änderungen vorgenommen.');
                emit('cancel');
                return;
            };

            try {
                await changeLoginId(waiterAccount.value.loginId, props.waiterAccount.id, props.waiterAccount.restaurantId);
                popupStore.setSuccess('Login-ID erfolgreich aktualisiert.');
                emit('success', { ...waiterAccount.value });
            } catch (error) {
                popupStore.setError('Aktualisieren von Login-ID fehlgeschlagen.');
            };

        } else if (activeSection.value === 'personalData') {

            if (!validatePersonalData())
                return;
            if (!hasChanges.value) {
                popupStore.setSuccess('Keine Änderungen vorgenommen.');
                emit('cancel');
                return;
            };

            try {
                const updateData: UpdateWaiterRequest = {
                    firstName: waiterAccount.value.firstName,
                    lastName: waiterAccount.value.lastName,
                };
                const updatedWaiter = await updateWaiter(updateData, props.waiterAccount.id, props.waiterAccount.restaurantId);
                popupStore.setSuccess('Kellner-Daten erfolgreich aktualisiert.');
                emit('success', updatedWaiter);
            } catch (error) {
                popupStore.setError('Kellner-Aktualisierung fehlgeschlagen.');
            };

        } else if (activeSection.value === 'password') {

            if (!validatePassword())
                return;

            try {
                await changePassword(passwords.value, props.waiterAccount.id, props.waiterAccount.restaurantId);
                popupStore.setSuccess('Passwort erfolgreich geändert.');
                passwords.value = { oldPassword: '', newPassword: '' };
                newPasswordRetry.value = '';
            } catch (error) {
                popupStore.setError('Ändern von Passwort fehlgeschlagen.');
            };

        }
    };

</script>

<template>
    <div class="border-2 border-ownblue-500 rounded-xl p-5">

        <WindowHeader
            :img-src="GearSVG"
            img-alt="Ein Zahnrad"
            :show-cancel="true"
            @cancel="emit('cancel')">
            Kellner bearbeiten
        </WindowHeader>

        <div class="flex flex-col w-full">
            <form @submit.prevent="handleUpdateWaiter()" class="flex flex-col gap-3">

                <div class="flex justify-center-safe gap-10">
                    <button
                        type="button"
                        class="text-xl font-medium"
                        :class="activeSection === 'loginId' ? 'text-ownblue-500' : 'text-slate-900 hover:text-blue-400'"
                        @click="activeSection = 'loginId'">
                        Login-ID bearbeiten
                    </button>
                    <button
                        type="button"
                        class="text-xl font-medium"
                        :class="activeSection === 'personalData' ? 'text-ownblue-500' : 'text-slate-900 hover:text-blue-400'"
                        @click="activeSection = 'personalData'">
                        Persönliche Daten bearbeiten
                    </button>
                    <button
                        type="button"
                        class="text-xl font-medium"
                        :class="activeSection === 'password' ? 'text-ownblue-500' : 'text-slate-900 hover:text-blue-400'"
                        @click="activeSection = 'password'">
                        Passwort bearbeiten
                    </button>
                </div>

                <CustomInputField v-if="activeSection === 'loginId'"
                    v-model="waiterAccount.loginId"
                    type="text"
                    label="Login-ID"
                    name="loginId"
                    placeholder="Login-ID eingeben"
                    :error="loginIdError"/>

                <div v-if="activeSection === 'personalData'" class="flex flex-col gap-3">
                    <CustomInputField
                        v-model="waiterAccount.firstName"
                        type="text"
                        label="Vorname"
                        name="firstName"
                        placeholder="Vornamen eingeben"
                        :error="errors.firstName"/>
                    <CustomInputField
                        v-model="waiterAccount.lastName"
                        type="text"
                        label="Nachname"
                        name="lastName"
                        placeholder="Nachnamen eingeben"
                        :error="errors.lastName"/>
                </div>

                <CustomInputField v-if="activeSection === 'password'"
                    v-model="passwords.oldPassword"
                    type="password"
                    label="Derzeitiges Passwort"
                    name="oldPassword"
                    placeholder="Derzeitiges Passwort eingeben"
                    :error="passwordErrors.oldPassword"/>

                <CustomInputField v-if="activeSection === 'password'"
                    v-model="passwords.newPassword"
                    type="password"
                    label="Neues Passwort"
                    name="newPassword"
                    placeholder="Neues Passwort eingeben"
                    :error="passwordErrors.newPassword"/>

                <CustomInputField v-if="activeSection === 'password'"
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

                <CustomButton
                    variant="editBlue"
                    class="mt-4">
                    Speichern
                </CustomButton>

            </form>
        </div>
    </div>
</template>