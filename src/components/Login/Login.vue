<script setup lang="ts">
    import CustomInputField from '@/components/General/CustomInputField.vue';
    import CustomButton from '@/components/General/CustomButton.vue';
    import { usePopupStore } from '@/stores/General/usePopupStore';
    import { useAuthStore } from '@/stores/Auth/useAuthStore';
    import { log } from '@/utils/logger';
    import router from '@/router';
    import { ref } from 'vue';

    const authStore = useAuthStore();
    const popupStore = usePopupStore();

    const id = ref<string>('');
    const password = ref<string>('');

    const errorId = ref<string>('');
    const errorPassword = ref<string>('');

    const clearErrors = () => {
        errorId.value = '';
        errorPassword.value = '';
    }

    const handleSubmit = async () => {
        const userData = {
            loginId: id.value,
            password: password.value,
        };

        clearErrors();

        if (!userData.loginId)
            errorId.value = 'Bitte gib deine ID ein.';
        else if (!userData.password) {
            errorPassword.value = 'Bitte gib dein Passwort ein.';
        }
        else {
            try {
                await authStore.loginSystemUser(userData);
                log.debug('Successfully logged in: ', authStore.user);
                id.value = '';
                if (authStore.user?.roles.includes('ROLE_KITCHEN'))
                    await router.push({ name: 'dashboardkitchen' });
                if (authStore.user?.roles.includes('ROLE_BAR'))
                    await router.push({ name: 'dashboardbar' });
                if (authStore.user?.roles.includes('ROLE_HOST'))
                    await router.push({ name: 'dashboardhost' });
                if (authStore.user?.roles.includes('ROLE_WAITER'))
                    await router.push({ name: 'dashboardwaiter' });
                if (authStore.user?.roles.includes('ROLE_RESTAURANT'))
                    await router.push({ name: 'dashboardrestaurant' });
                if (authStore.user?.roles.includes('ROLE_ADMIN'))
                    await router.push({ name: 'dashboardadmin' });
            } catch (error) {
                popupStore.setError('Logindaten stimmen nicht überein.');
            }
        }
        password.value = '';
    }

</script>

<template>
    <div class="flex flex-col gap-3 lg:max-w-100 w-full">
        <span class="mainHeader hidden lg:block">System-Login</span>
        <div class="w-full h-full items-center lg:justify-center lg:h-auto flex flex-col gap-5 bg-white/50 shadow-xl rounded-lg p-5">
            <form
                @submit.prevent=""
                class="max-w-100 w-full justify-center flex flex-col gap-5 p-5">
                <span class="mainHeader lg:hidden">System-Login</span>
                <CustomInputField
                    v-model="id"
                    type="id"
                    label="ID"
                    name="id"
                    placeholder="ID eingeben"
                    :error="errorId"
                    />
                <CustomInputField
                    v-model="password"
                    type="password"
                    label="Passwort"
                    name="password"
                    placeholder="Passwort eingeben"
                    :error="errorPassword"
                    />
                <CustomButton class="mt-4" @click="handleSubmit">Einloggen</CustomButton>
            </form>
        </div>
    </div>
</template>