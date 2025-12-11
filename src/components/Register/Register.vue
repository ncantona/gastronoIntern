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

const firstName = ref<string>('');
const lastName = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');
const retypePassword = ref<string>('');

const errorFirstName = ref<string>('');
const errorLastName = ref<string>('');
const errorEmail = ref<string>('');
const errorPassword = ref<string>('');
const errorRetypePassword = ref<string>('');

const clearFields = () => {
    firstName.value = '';
    lastName.value = '';
    email.value = '';
    password.value = '';
    retypePassword.value = '';
}

const clearErrors = () => {
    errorFirstName.value = '';
    errorLastName.value = '';
    errorEmail.value = '';
    errorPassword.value = '';
    errorRetypePassword.value = '';
}

const handleSubmit = async () => {
    const userData = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
    };

    clearErrors();

    const passwordError = checkPassword(userData.password)
    if (!userData.firstName)
        errorFirstName.value = 'Bitte gib deinen Vornamen ein.';
    if (!userData.lastName)
        errorLastName.value = 'Bitte gib deinen Nachnamen ein.';
    if (!userData.email)
        errorEmail.value = 'Bitte gib deine E-Mail-Adresse ein.';
    else if (!isValidEmail(userData.email))
        errorEmail.value = 'Bitte gib eine gültige E-Mail-Adresse ein.';
    if (!userData.password)
        errorPassword.value = 'Bitte gib dein Passwort ein.';
    else if (passwordError > 0) {
        if (passwordError == 1)
            errorPassword.value = 'Dein Password muss mindestens 8 Zeichen lang sein.';
        else if (passwordError == 2)
            errorPassword.value = 'Dein Password muss mindestens 1 Kleinbuchstaben enthalten.';
        else if (passwordError == 3)
            errorPassword.value = 'Dein Password muss mindestens 1 Großbuchstaben enthalten.';
        else if (passwordError == 4)
            errorPassword.value = 'Dein Password muss mindestens 1 Ziffer einthalten.';  
        else if (passwordError == 5)
            errorPassword.value = 'Dein Password muss mindestens 1 Sonderzeichen enthalten.';  
    }
    else if (!retypePassword.value) {
        errorRetypePassword.value = 'Bitte wiederhole dein Passwort';
    }
    else if (retypePassword.value != userData.password)
        errorRetypePassword.value = 'Passwort stimmt nicht überein.'

    if (!(errorFirstName.value || errorLastName.value || errorEmail.value
    || errorPassword.value || errorRetypePassword.value)) {
        try {
            await authStore.registerUser(userData);
            clearFields();
        } catch (error) {
            popupStore.setError('Registrierung fehlgeschlagen.');
        }
    }
}

</script>

<template>
    <div class="flex flex-col gap-3 lg:max-w-100 w-full">
        <span class="mainHeader hidden lg:block">Registrieren</span>
        <div class="w-full h-full items-center justify-center lg:h-auto flex flex-col gap-5 bg-white/50 shadow-xl lg:rounded-lg p-5">
        <form
            @submit.prevent=""
            class="max-w-100 w-full justify-center flex flex-col gap-5 p-5">
            <span class="mainHeader lg:hidden">Registrieren</span>
            <CustomInputField
                v-model="firstName"
                type="text"
                label="Vorname"
                name="firstName"
                placeholder="Vornamen eingeben"
                :error="errorFirstName"
            />
            <CustomInputField
                v-model="lastName"
                type="text"
                label="Nachname"
                name="lastName"
                placeholder="Nachnamen eingeben"
                :error="errorLastName"
            />
            <CustomInputField
                v-model="email"
                type="text"
                label="E-Mail-Adresse"
                name="email"
                placeholder="E-Mail-Adresse eingeben"
                :error="errorEmail"
            />
            <CustomInputField
                v-model="password"
                type="password"
                label="Passwort"
                name="password"
                placeholder="Passwort eingeben"
                :error="errorPassword"
                />
            <CustomInputField
                v-model="retypePassword"
                type="password"
                label="Passwort wiederholen"
                name="retypePassword"
                placeholder="Passwort erneut eingeben"
                :error="errorRetypePassword"
            />
            <CustomButton class="mt-4" @click="handleSubmit">Registrieren</CustomButton>
            <div class="flex flex-col items-center gap-3 mt-5">
                <span class="text-stone-500">Du hast bereits ein Konto?</span>
                <RouterLink :to="{name: 'userlogin'}" class="CoButton">
                        Einloggen
                </RouterLink>
            </div>
        </form>
        </div>
    </div>
</template>