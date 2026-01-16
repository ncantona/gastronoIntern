<script setup lang="ts">
    import type { HostErrors, RegisterHostAccountRequest, RestaurantAccountResponse } from '@/Types/user.types';
    import { registerHost } from '@/Services/restaurantAccounts.service';
    import { isValidEmail } from '@/GeneralTypescript/HelperFunctions';
    import { usePopupStore } from '@/stores/General/usePopupStore';
    import { ref } from 'vue';

    import CustomInputField from '@/components/General/CustomInputField.vue';
    import WindowHeader from '@/components/General/WindowHeader.vue';
    import CustomButton from '@/components/General/CustomButton.vue';
    import Window from '@/components/General/Window.vue';
    
    import PlusInCircleSVG from '@/assets/svgs/plusBlack.svg';
    
    const props = defineProps<{
        restaurantId: number,
    }>();

    const initialRestaurantAccount = <RegisterHostAccountRequest>{
        loginId: '',
        firstName: '',
        lastName: '',
        email: '',
        restaurantId: props.restaurantId,
        password: 'Password123!',
    };

    const emit = defineEmits<{
        (e: 'success', hostAccount: RestaurantAccountResponse): void,
    }>();

    const popupStore = usePopupStore();

    const hostAccount = ref<RegisterHostAccountRequest>({ ...initialRestaurantAccount });

    const errors = ref<HostErrors>({
        loginId: '',
        firstName: '',
        lastName: '',
        email: '',
    });

    const resetForm = () => hostAccount.value = { ...initialRestaurantAccount };
    const validate = () => {
        errors.value = {
            loginId: hostAccount.value.loginId ? '' : 'Ein Login-ID muss angegeben werden.',
            firstName: hostAccount.value.firstName ? '' : 'Ein Vorname muss angegeben werden.',
            lastName: hostAccount.value.lastName ? '' : 'Ein Nachname muss angegeben werden.',
            email: hostAccount.value.email ? '' : 'Eine E-Mail-Adresse muss angegeben werden.',
        }
        if (!errors.value.email && !isValidEmail(hostAccount.value.email))
            errors.value.email = 'Eine gültige E-Mail-Adresse muss angegeben werden.';

        return !Object.values(errors.value).some(Boolean);
    }

    const handleCreateHost = async () => {
        if (!validate())
            return;

        try {
            const newHost = await registerHost({ ...hostAccount.value });
            popupStore.setSuccess('Host wurde erfolgreich angelegt.');
            emit('success', newHost );
            resetForm();
        } catch (error) {
            popupStore.setError('Anlegen fehlgeschlagen.');
        }
    };

</script>

<template>
    <Window class="p-12">

        <WindowHeader
            :img-src="PlusInCircleSVG"
            img-alt="Ein Pluszeichen in einem Kreis">
            Host anlegen
        </WindowHeader>

        <div class="flex flex-col w-full">
            <form @submit.prevent="handleCreateHost()" class="flex flex-col gap-3">

                <CustomInputField
                    v-model="hostAccount.loginId"
                    type="text"
                    label="Login-ID"
                    name="loginId"
                    placeholder="Login-ID eingeben"
                    :error="errors.loginId"/>

                <div class="flex gap-10">
                    <CustomInputField
                        v-model="hostAccount.firstName"
                        type="text"
                        label="Vorname"
                        name="firstName"
                        placeholder="Vornamen eingeben"
                        :error="errors.firstName"
                        class="w-5/10"/>

                    <CustomInputField
                        v-model="hostAccount.lastName"
                        type="text"
                        label="Nachname"
                        name="lastName"
                        placeholder="Nachnamen eingeben"
                        :error="errors.lastName"
                        class="w-5/10"/>
                </div>

                <CustomInputField
                    v-model="hostAccount.email"
                    type="text"
                    label="E-Mail-Adresse"
                    name="email"
                    placeholder="E-Mail-Adresse eingeben"
                    :error="errors.email"/>

                <CustomButton
                    variant="submit"
                    class="mt-4">
                    Host anlegen
                </CustomButton>
            </form>

        </div>
    </Window>
</template>