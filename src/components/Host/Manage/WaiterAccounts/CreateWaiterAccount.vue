<script setup lang="ts">
    import { ref } from 'vue';
    import { usePopupStore } from '@/stores/General/usePopupStore';
    import { registerWaiter } from '@/Services/waiter.service';
    import type { WaiterRequest, WaiterResponse } from '@/Types/waiter.types';

    import CustomInputField from '@/components/General/CustomInputField.vue';
    import WindowHeader from '@/components/General/WindowHeader.vue';
    import CustomButton from '@/components/General/CustomButton.vue';
    
    import PlusInCircleSVG from '@/assets/svgs/plusBlack.svg';
    
    const props = defineProps<{
        restaurantId: number,
    }>();

    const initialWaiter: WaiterRequest = {
        firstName: '',
        lastName: '',
        password: '',
        loginId: '',
        restaurantId: props.restaurantId,
    };

    const emit = defineEmits<{
        (e: 'success', waiter: WaiterResponse): void,
        (e: 'cancel'): void,
    }>();

    const popupStore = usePopupStore();

    const waiter = ref<WaiterRequest>({ ...initialWaiter });

    const errors = ref<{ firstName: string; lastName: string; loginId: string; password: string }>({
        firstName: '',
        lastName: '',
        loginId: '',
        password: '',
    });

    const resetForm = () => (waiter.value = { ...initialWaiter });

    const validate = () => {
        errors.value = {
            firstName: waiter.value.firstName ? '' : 'Ein Vorname muss angegeben werden.',
            lastName: waiter.value.lastName ? '' : 'Ein Nachname muss angegeben werden.',
            loginId: waiter.value.loginId ? '' : 'Eine Login-ID muss angegeben werden.',
            password: waiter.value.password ? '' : 'Ein Passwort muss angegeben werden.',
        };
        return !Object.values(errors.value).some(Boolean);
    };

    const handleCreateWaiter = async () => {
        if (!validate()) return;
        try {
            const newWaiter = await registerWaiter({ ...waiter.value }, props.restaurantId);
            popupStore.setSuccess('Kellner wurde erfolgreich angelegt.');
            emit('success', newWaiter);
            resetForm();
        } catch {
            popupStore.setError('Anlegen des Kellners fehlgeschlagen.');
        }
    };

</script>

<template>
    <div class="border-2 border-ownblue-500 rounded-xl p-5">

        <WindowHeader
            :img-src="PlusInCircleSVG"
            img-alt="Ein Pluszeichen in einem Kreis">
            Kellner-Account anlegen
        </WindowHeader>

        <div class="flex flex-col w-full">
            <form @submit.prevent="handleCreateWaiter()" class="flex flex-col gap-3">

                <CustomInputField
                    v-model="waiter.firstName"
                    type="text"
                    label="Vorname"
                    name="firstName"
                    placeholder="Vorname eingeben"
                    :error="errors.firstName"/>

                <CustomInputField
                    v-model="waiter.lastName"
                    type="text"
                    label="Nachname"
                    name="lastName"
                    placeholder="Nachname eingeben"
                    :error="errors.lastName"/>

                <CustomInputField
                    v-model="waiter.loginId"
                    type="text"
                    label="Login-ID"
                    name="loginId"
                    placeholder="Login-ID eingeben"
                    :error="errors.loginId"/>

                <CustomInputField
                    v-model="waiter.password"
                    type="password"
                    label="Passwort"
                    name="password"
                    placeholder="Passwort eingeben"
                    :error="errors.password"/>

                <div class="flex gap-5 w-full">
                    <CustomButton
                        variant="editBlue"
                        class="mt-4 w-full">
                        Kellner-Account anlegen
                    </CustomButton>
                    
                    <CustomButton
                        variant="cancel"
                        class="mt-4 w-full"
                        @click="emit('cancel')">
                        Abbrechen
                    </CustomButton>
                </div>
            </form>

        </div>
    </div>
</template>