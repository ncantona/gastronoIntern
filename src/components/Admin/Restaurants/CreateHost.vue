<script setup lang="ts">
    import { usePopupStore } from '@/stores/General/usePopupStore';
    import { ref } from 'vue';

    import CustomInputField from '@/components/General/CustomInputField.vue';
    import CustomButton from '@/components/General/CustomButton.vue';
    import Window from '@/components/General/Window.vue';
    import { useAuthStore } from '@/stores/Auth/useAuthStore';
    import { isValidEmail } from '@/GeneralTypescript/HelperFunctions';

    const props = defineProps<{
        restaurantId: number,
    }>();

    const authStore = useAuthStore();
    const popupStore = usePopupStore();

    const clearInputFields = () => {
        account.value.loginId = '';
        account.value.firstName = '';
        account.value.lastName = '';
        account.value.email = '';
    }

    const account = ref({
        loginId: '',
        firstName: '',
        lastName: '',
        email: '',
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
                popupStore.setSuccess('Anlegen erfolgreich.');
            } catch (error) {
                popupStore.setError('Anlegen fehlgeschlagen.');
            }
        }
    };

    const showCreateHost = ref<boolean>(false);

</script>

<template>
    <Window class="p-12">
        <div class="flex justify-between">
            <div class="flex gap-3 mb-5">
                <img src="@/assets/svgs/settingsBlack.svg" alt="Plus Icon" class="w-6">
                <Cust class="subHeader">Host verwalten</Cust>
            </div>
            <button v-show="showCreateHost" class="cursor-pointer text-blue-500 hover:text-blue-400" @click="showCreateHost = false; errors.fill(''); clearInputFields()">
                abbrechen
            </button>
        </div>
        <div class="flex flex-col w-full">
            <form
                v-if="showCreateHost"
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
                <CustomButton
                    variant="submit"
                    class="mt-4 gap-2"
                    @click="handleSubmit()">
                    anlegen
                </CustomButton>
            </form>
            <CustomButton
                v-show="!showCreateHost"
                variant="submit"
                class="mt-4 gap-2"
                @click="showCreateHost = true">
                <img src="@/assets/svgs/plusWhite.svg" alt="Plus Icon" class="w-5">
                Host anlegen
            </CustomButton>
        </div>
    </Window>
</template>