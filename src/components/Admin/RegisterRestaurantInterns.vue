<script setup lang="ts">
    import { isValidEmail, checkPassword } from '@/GeneralTypescript/HelperFunctions';
    import CustomInputField from '@/components/General/CustomInputField.vue';
    import CustomButton from '@/components/General/CustomButton.vue';
    import { usePopupStore } from '@/stores/General/usePopupStore';
    import { useAuthStore } from '@/stores/Auth/useAuthStore';
    import { ref } from 'vue';

    const emits = defineEmits(['registerSuccess']);

    const authStore = useAuthStore();
    const popupStore = usePopupStore();

    const loginId = ref<string>('');
    const password = ref<string>('');

    const errorLoginId = ref<string>('');
    const errorPassword = ref<string>('');

    const clearFields = () => {
        loginId.value = '',
    }

    const clearErrors = () => {
        errorLoginId.value = '';
    }

    const handleSubmit = async () => {
        const userData = {
            loginId: loginId.value,
            password: password.value,
        };

        clearErrors();

        const passwordError = checkPassword(userData.password)
        if (!userData.loginId)
            errorLoginId.value = 'Bitte gib deinen Vornamen ein.';
        if (!userData.password)
            errorPassword.value = 'Bitte gib dein Passwort ein.';

        try {
            await authStore.registerSystemUser(userData);
            clearFields();
        } catch (error) {
            popupStore.setError('Registrierung fehlgeschlagen.');
        }
    }

</script>

<template>
    <div class="flex flex-col self-center h-full w-full justify-center">
        <span class="mainHeader hidden lg:block">Account hinzufügen</span>
        <div class="w-full h-full items-center justify-center lg:h-auto flex flex-col gap-5 bg-white/50 shadow-xl lg:rounded-lg p-5">
        <form
            @submit.prevent=""
            class="max-w-100 w-full justify-center flex flex-col gap-5 p-5">
            <span class="mainHeader lg:hidden">Registrieren</span>
            <CustomInputField
                v-model="loginId"
                type="text"
                label="ID"
                name="id"
                placeholder="Grätzlgarten-küche"
                :error="errorLoginId"
            />
            <CustomButton class="mt-4" @click="handleSubmit">Registrieren</CustomButton>
        </form>
        </div>
    </div>
</template>