<script setup lang="ts">
    import { usePopupStore } from '@/stores/General/usePopupStore';
    import { ref } from 'vue';

    import CustomInputField from '@/components/General/CustomInputField.vue';
    import CustomButton from '@/components/General/CustomButton.vue';
    import Window from '@/components/General/Window.vue';
    import { useAuthStore } from '@/stores/Auth/useAuthStore';
    import { isValidEmail } from '@/GeneralTypescript/HelperFunctions';

    interface RestaurantAccount {
        id: string,
        loginId: string,
        firstName: string,
        lastName: string,
        email: string,
        roles: string[],
    };

    const props = defineProps<{
        host: RestaurantAccount,
        restaurantId: number,
    }>();

    const emits = defineEmits(['goBack']);

    const authStore = useAuthStore();
    const popupStore = usePopupStore();

    const account = ref({
        loginId: props.host.loginId,
        firstName: props.host.firstName,
        lastName: props.host.lastName,
        email: props.host.email,
        password: 'password123',
        restaurantId: props.restaurantId,
    });

    const errors = ref<[string, string, string, string, string]>([
        '', '', '', '', ''
    ]);

    const handleSubmit = async () => {
        errors.value.fill('');

        if (!account.value.loginId)
            errors.value[0] = 'Login-ID darf nicht leer sein.'
        if (!account.value.firstName)
            errors.value[1] = 'Vorname darf nicht leer sein.';
        if (!account.value.lastName)
            errors.value[2] = 'Nachname darf nicht leer sein.';
        if (!account.value.email)
            errors.value[3] = 'Email darf nicht leer sein.';
        else if (!isValidEmail(account.value.email))
            errors.value[3] = 'Bitte gib eine gültige E-Mail-Adresse ein.';

        if (!(errors.value[0] || errors.value[1] || errors.value[2] || errors.value[3])) {
            try {
                await authStore.registerRestaurantHost(account.value);
                popupStore.setSuccess('Aktualsieren erfolgreich.');
            } catch (error) {
                popupStore.setError('Aktualsieren fehlgeschlagen.');
            }
        }
    }

</script>

<template>
    <Window class="p-12 border-2 border-blue-500">
        <div class="flex justify-between items-center mb-5">
            <div class="flex gap-3 items-center">
                <img src="@/assets/svgs/settingsBlack.svg" alt="Setting Icon" class="w-6">
                <h2 class="text-2xl font-semibold">Host bearbeiten</h2>
            </div>
            <button
                class="cursor-pointer text-blue-500 hover:text-blue-400"
                @click="emits('goBack')">
                Abbrechen
            </button>
        </div>
        <div class="flex flex-col w-full">
            <form
                @submit.prevent=""
                class="flex flex-col gap-3">
                <CustomInputField
                    v-model="account.loginId"
                    type="text"
                    label="Login-ID"
                    name="loginId"
                    placeholder="Login-ID eingeben"
                    :error="errors[0]"
                />
                <div class="flex gap-10">
                    <CustomInputField
                        v-model="account.firstName"
                        type="text"
                        label="Vorname"
                        name="firstName"
                        placeholder="Vornamen eingeben"
                        :error="errors[1]"
                        class="w-5/10"
                    />
                    <CustomInputField
                        v-model="account.lastName"
                        type="text"
                        label="Nachname"
                        name="lastName"
                        placeholder="Nachnamen eingeben"
                        :error="errors[2]"
                        class="w-5/10"
                    />
                </div>
                <CustomInputField
                    v-model="account.email"
                    type="text"
                    label="E-Mail-Adresse"
                    name="email"
                    placeholder="E-Mail-Adresse eingeben"
                    :error="errors[3]"
                />
                <div class="flex flex-col">
                    <CustomButton
                        variant="editBlue"
                        class="mt-4"
                        @click="handleSubmit()">
                        Änderungen speichern
                    </CustomButton>
                </div>
            </form>
        </div>
    </Window>
</template>