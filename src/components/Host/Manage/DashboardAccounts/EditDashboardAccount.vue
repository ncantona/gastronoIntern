<script setup lang="ts">
    import { usePopupStore } from '@/stores/General/usePopupStore';
    import { useAuthStore } from '@/stores/Auth/useAuthStore';
    import { computed, ref } from 'vue';

    import CustomInputField from '@/components/General/CustomInputField.vue';
    import WindowHeader from '@/components/General/WindowHeader.vue';
    import CustomButton from '@/components/General/CustomButton.vue';
    
    import GearSVG from '@/assets/svgs/settingsBlack.svg';
    type PasswordErrors = {
        newPassword: string,
        newPasswordRetry: string,
    };

    interface RestaurantAccount {
        loginId: string,
        firstName: string,
        lastName: string,
        email: string,
        roles: string[],
        restaurantId: number,
    };

    interface RestaurantAccountResponse {
        id: string,
        loginId: string,
        firstName: string,
        lastName: string,
        email: string,
        roles: string[],
        restaurantId: number,
    };
    
    const props = defineProps<{
        dashboardAccount: RestaurantAccountResponse,
        restaurantId: number,
    }>();

    const emit = defineEmits<{
        (e: 'success', hostAccount: RestaurantAccountResponse): void,
        (e: 'cancel'): void,
    }>();

    const authStore = useAuthStore();
    const popupStore = usePopupStore();

    const dashboardAccount = ref<RestaurantAccountResponse>({ ...props.dashboardAccount });

    const passwordErrors = ref<PasswordErrors>({
        newPassword: '',
        newPasswordRetry: '',
    });

    const idError = ref<string>('');

    const hasChanges = computed(() => JSON.stringify(dashboardAccount.value) !== JSON.stringify(props.dashboardAccount));
    const validate = () => {
        if (activeSection.value === 'id') {
            idError.value = dashboardAccount.value.loginId ? '' : 'Ein Login-ID muss angegeben werden.';

            return (idError.value);
        }
        else {
            passwordErrors.value.newPassword = '';
            passwordErrors.value.newPasswordRetry = '';

            if (!newPassword.value) {
                passwordErrors.value.newPassword = 'Ein neues Passwort muss angegeben werden.';
            } else {
                const unmetRequirements: string[] = [];
                if (!hasMinLength.value) unmetRequirements.push('mindestens 8 Zeichen');
                if (!hasLowercase.value) unmetRequirements.push('mindestens 1 Kleinbuchstaben');
                if (!hasUppercase.value) unmetRequirements.push('mindestens 1 Großbuchstaben');
                if (!hasSpecialChar.value) unmetRequirements.push('mindestens 1 Sonderzeichen');

                if (unmetRequirements.length) {
                    passwordErrors.value.newPassword = `Passwort muss ${unmetRequirements.join(', ')} enthalten.`;
                }
            }

            if (!passwordErrors.value.newPassword) {
                if (!newPasswordRetry.value)
                    passwordErrors.value.newPasswordRetry = 'Das Passwort muss wiederholt werden.';
                else if (!passwordsMatch.value)
                    passwordErrors.value.newPasswordRetry = 'Passwörter stimmen nicht überein.';
            }

            return !Object.values(passwordErrors.value).some(Boolean);
        }
    }

    const updateDashboardAccount = async () => {
        if (!validate())
            return;
        if (!hasChanges.value) {
            popupStore.setSuccess('Keine Änderungen vorgenommen.');
            emit('success', { ...props.dashboardAccount });
            return;
        }
    
        try {
           /*  const newIntern = <RestaurantAccountResponse> await authStore.registerRestaurantHost({ ...hostAccount.value, password: 'Password123!'}); */
            popupStore.setSuccess('Dashboard-Account wurde erfolgreich aktualisiert.');
            emit('success', props.dashboardAccount ); //UMÄNDERN WENN API DA IST
        } catch (error) {
            popupStore.setError('Aktualisieren von Dashboard-Account fehlgeschlagen.');
        }
    };

    const activeSection = ref<string>('info');

    const newPassword = ref<string>('');
    const newPasswordRetry = ref<string>('');

    const hasMinLength = computed(() => newPassword.value.length >= 8)
    const hasLowercase = computed(() => /[a-z]/.test(newPassword.value))
    const hasUppercase = computed(() => /[A-Z]/.test(newPassword.value))
    const hasSpecialChar = computed(() => /[^A-Za-z0-9]/.test(newPassword.value))
    const passwordsMatch = computed(
    () => newPassword.value && newPassword.value === newPasswordRetry.value
    )

    const passwordScore = computed(() => {
        let score = 0;
        if (hasMinLength.value) score++;
        if (hasLowercase.value) score++;
        if (hasUppercase.value) score++;
        if (hasSpecialChar.value) score++;
        return score;
    });

    const passwordStrengthPercent = computed(() => `${(passwordScore.value / 4) * 100}%`);
    const passwordStrengthLabel = computed(() => {
        if (passwordScore.value <= 1) return 'Sehr schwach';
        if (passwordScore.value === 2) return 'Schwach';
        if (passwordScore.value === 3) return 'Okay';
        if (passwordScore.value === 4) return 'Stark';
        return 'Sehr stark';
    });
    const passwordStrengthColor = computed(() => {
        if (passwordScore.value <= 1) return '#ef4444';
        if (passwordScore.value === 2) return '#f97316';
        if (passwordScore.value === 3) return '#eab308';
        if (passwordScore.value === 4) return '#22c55e';
        return '#16a34a';
    });

    const dotClass = (valid :boolean) => valid ? 'text-green-600' : 'text-slate-400'
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
            <form @submit.prevent="updateDashboardAccount()" class="flex flex-col gap-3">

                <div class="flex justify-center-safe gap-10">
                    <button
                        type="button"
                        class="text-xl font-medium"
                        :class="activeSection === 'info' ? 'text-ownblue-500' : 'text-slate-900 hover:text-blue-400'"
                        @click="activeSection = 'info'">
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
                    v-if="activeSection === 'info'"
                    v-model="dashboardAccount.loginId"
                    type="text"
                    label="Login-ID"
                    name="loginId"
                    placeholder="Login-ID eingeben"
                    :error="idError"/>

                <CustomInputField
                    v-if="activeSection === 'password'"
                    v-model="newPassword"
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

                <div v-if="activeSection === 'password'" class="bg-slate-50 border border-slate-200 rounded-lg p-4">
                    <h3 class="text-sm font-medium text-slate-900 mb-2">
                    Passwort-Anforderungen:
                    </h3>

                    <ul class="text-sm text-slate-600 space-y-1">
                        <li class="flex items-center gap-2">
                            <span :class="dotClass(hasMinLength)">●</span>
                            Mindestens 8 Zeichen
                        </li>

                        <li class="flex items-center gap-2">
                            <span :class="dotClass(hasLowercase)">●</span>
                            Mindestens 1 Kleinbuchstabe
                        </li>

                        <li class="flex items-center gap-2">
                            <span :class="dotClass(hasUppercase)">●</span>
                            Mindestens 1 Großbuchstabe
                        </li>

                        <li class="flex items-center gap-2">
                            <span :class="dotClass(hasSpecialChar)">●</span>
                            Mindestens 1 Sonderzeichen
                        </li>
                    </ul>
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