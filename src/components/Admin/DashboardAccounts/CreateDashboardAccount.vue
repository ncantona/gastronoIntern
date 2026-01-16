<script setup lang="ts">
    import type { DashboardAccountErrors, RegisterDashboardAccountRequest, RestaurantAccountResponse } from '@/Types/user.types';
    import { registerDashboardAccount } from '@/Services/restaurantAccounts.service';
    import { usePopupStore } from '@/stores/General/usePopupStore';
    import { ref } from 'vue';

    import RoleDropdown from '@/components/Admin/General/RoleDropdownDashboardAccount.vue';
    import CustomInputField from '@/components/General/CustomInputField.vue';
    import WindowHeader from '@/components/General/WindowHeader.vue';
    import CustomButton from '@/components/General/CustomButton.vue';
    
    import PlusInCircleSVG from '@/assets/svgs/plusBlack.svg';
    
    const props = defineProps<{
        restaurantId: number,
    }>();

    const initialDashboardAccount = <RegisterDashboardAccountRequest>{
        loginId: '',
        password: 'Password123!',
        roles: '',
        restaurantId: props.restaurantId,
    };

    const emit = defineEmits<{
        (e: 'success', hostAccount: RestaurantAccountResponse): void,
        (e: 'cancel'): void,
    }>();

    const popupStore = usePopupStore();

    const dashboardAccount = ref<RegisterDashboardAccountRequest>({ ...initialDashboardAccount });

    const errors = ref<DashboardAccountErrors>({
        loginId: '',
        roles: '',
    });

    const resetForm = () => dashboardAccount.value = { ...initialDashboardAccount };
    const validate = () => {
        errors.value = {
            loginId: dashboardAccount.value.loginId ? '' : 'Ein Login-ID muss angegeben werden.',
            roles: dashboardAccount.value.roles ? '' : 'Eine Rolle muss angegeben werden.',
        }

        return !Object.values(errors.value).some(Boolean);
    }

    const handleCreateDashboardAccount = async () => {
        if (!validate())
            return;

        try {
            const newDashboardAccount = await registerDashboardAccount({ ...dashboardAccount.value })
            popupStore.setSuccess('Intern wurde erfolgreich angelegt.');
            emit('success', newDashboardAccount);
            resetForm();
        } catch {
            popupStore.setError('Anlegen von Intern fehlgeschlagen.');
        }
    };

</script>

<template>
    <div class="border-2 border-ownblue-500 rounded-xl p-5">

        <WindowHeader
            :img-src="PlusInCircleSVG"
            img-alt="Ein Pluszeichen in einem Kreis">
            Dashboard-Account anlegen
        </WindowHeader>

        <div class="flex flex-col w-full">
            <form @submit.prevent="handleCreateDashboardAccount()" class="flex flex-col gap-3">

                <CustomInputField
                    v-model="dashboardAccount.loginId"
                    type="text"
                    label="Login-ID"
                    name="loginId"
                    placeholder="Login-ID eingeben"
                    :error="errors.loginId"/>

                <RoleDropdown
                    v-model="dashboardAccount.roles"
                    :errorMsg="errors.roles"/>

                <div class="flex gap-5 w-full">
                    <CustomButton
                        variant="editBlue"
                        class="mt-4 w-full">
                        Dashboard-Account anlegen
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