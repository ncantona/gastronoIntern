<script setup lang="ts">
    import type { HostErrors, RestaurantAccountResponse } from '@/Types/user.types';
    import { updateHost } from '@/Services/restaurantAccounts.service';
    import { isValidEmail } from '@/GeneralTypescript/HelperFunctions';
    import { usePopupStore } from '@/stores/General/usePopupStore';
    import { computed, ref } from 'vue';

    import CustomInputField from '@/components/General/CustomInputField.vue';
    import WindowHeader from '@/components/General/WindowHeader.vue';
    import CustomButton from '@/components/General/CustomButton.vue';
    import Window from '@/components/General/Window.vue';

    import GearSVG from '@/assets/svgs/settingsBlack.svg';

    const props = defineProps<{
        hostAccount: RestaurantAccountResponse,
    }>();

    const emit = defineEmits<{
        (e: 'success', restaurant: RestaurantAccountResponse): void,
        (e: 'cancel'): void,
    }>();

    const popupStore = usePopupStore();

    const hostAccount = ref<RestaurantAccountResponse>({ ...props.hostAccount });

    const errors = ref<HostErrors>({
        loginId: '',
        firstName: '',
        lastName: '',
        email: '',
    });

    const hasChanges = computed(() => JSON.stringify(hostAccount.value) !== JSON.stringify(props.hostAccount));

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

    const handleUpdateHost = async () => {
        if (!validate())
            return;
        if (!hasChanges.value) {
            popupStore.setSuccess('Keine Änderungen vorgenommen.');
            emit('cancel');
            return;
        }

        try {
            const newHost = await updateHost(hostAccount.value, props.hostAccount.id)
            popupStore.setSuccess('Host wurde erfolgreich aktualisiert.');
            emit('success', newHost);
        } catch (error) {
            popupStore.setError('Host-Aktualisierung fehlgeschlagen.');
        }
    }

</script>

<template>
    <Window class="p-12 border-2 border-blue-500">

        <WindowHeader
            :img-src="GearSVG"
            img-alt="Ein Zahnrad"
            :show-cancel="true"
            @cancel="emit('cancel')">
            Host bearbeiten
        </WindowHeader>

        <div class="flex flex-col w-full">
            <form @submit.prevent="handleUpdateHost()" class="flex flex-col gap-3">

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
                    variant="editBlue"
                    class="mt-4">
                    Änderungen speichern
                </CustomButton>

            </form>
        </div>
    </Window>
</template>