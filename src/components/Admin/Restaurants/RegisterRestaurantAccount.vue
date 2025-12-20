<script setup lang="ts">
    import { isValidEmail } from '@/GeneralTypescript/HelperFunctions';
    import { usePopupStore } from '@/stores/General/usePopupStore';
    import { useAuthStore } from '@/stores/Auth/useAuthStore';
    import { ref } from 'vue';

    import CustomInputField from '@/components/General/CustomInputField.vue';
    import CustomButton from '@/components/General/CustomButton.vue';

    const props = defineProps<{
        restaurantId: number,
    }>();

    const emits = defineEmits(['registerSuccess']);
    
    const authStore = useAuthStore();
    const popupStore = usePopupStore();

    const account = ref({
        loginId: '',
        firstName: '',
        lastName: '',
        email: '',
        password: 'password123',
        restaurantId: props.restaurantId,
    });

    const errors = ref<[string, string, string, string]>([
        '', '', '', ''
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
                popupStore.setSuccess('Anlegen erfolgreich.');
            } catch (error) {
                popupStore.setError('Anlegen fehlgeschlagen.');
            }
        }
    }

</script>

<template>
    <div class="flex flex-col self-center h-full w-full justify-center">
        <div class="w-full h-full items-center justify-center lg:h-auto flex flex-col gap-5 lg:rounded-lg">
            <form
                @submit.prevent=""
                class="max-w-100 w-full justify-center flex flex-col gap-5 p-5">
                <span class="mainHeader lg:hidden">Registrieren</span>
                <CustomInputField
                    v-model="account.loginId"
                    type="text"
                    label="Login-ID"
                    name="loginId"
                    placeholder="Login-ID eingeben"
                    :error="errors[0]"
                />
                <CustomInputField
                    v-model="account.firstName"
                    type="text"
                    label="Vorname"
                    name="firstName"
                    placeholder="Vornamen eingeben"
                    :error="errors[1]"
                />
                <CustomInputField
                    v-model="account.lastName"
                    type="text"
                    label="Nachname"
                    name="lastName"
                    placeholder="Nachnamen eingeben"
                    :error="errors[2]"
                />
                <CustomInputField
                    v-model="account.email"
                    type="text"
                    label="E-Mail-Adresse"
                    name="email"
                    placeholder="E-Mail-Adresse eingeben"
                    :error="errors[3]"
                />
                <CustomButton variant="submit" class="mt-4" @click="handleSubmit">Account anlegen</CustomButton>
            </form>
        </div>
    </div>
</template>