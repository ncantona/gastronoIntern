<script setup lang="ts">
    import { usePopupStore } from '@/stores/General/usePopupStore';
    import { useAuthStore } from '@/stores/Auth/useAuthStore';
    import { ref } from 'vue';

    import RoleDropdown from '@/components/Admin/General/RoleDropdownDashboardAccount.vue';
    import CustomInputField from '@/components/General/CustomInputField.vue';
    import WindowHeader from '@/components/General/WindowHeader.vue';
    import CustomButton from '@/components/General/CustomButton.vue';
    
    import PlusInCircleSVG from '@/assets/svgs/plusBlack.svg';
    
    type Role = 'ROLE_KITCHEN' | 'ROLE_BAR' | '';

    type InternErrors = {
        loginId: string,
        roles: string,
    };

    interface RestaurantAccount {
        loginId: string,
        firstName: string,
        lastName: string,
        email: string,
        roles: Role[],
        restaurantId: number,
    };

    interface InternAccountRequest {
        loginId: string,
        roles: string,
        restaurantId: number,
        password: string,
    };    

    interface RestaurantAccountResponse {
        id: string,
        loginId: string,
        firstName: string,
        lastName: string,
        email: string,
        roles: string[],
        restaurantId: number,
    };
    
    const props = defineProps<{
        restaurantId: number,
    }>();

    const initialRestaurantAccount = <InternAccountRequest>{
        loginId: '',
        password: 'Password123!',
        roles: '' as Role,
        restaurantId: props.restaurantId,
    };

    const emit = defineEmits<{
        (e: 'success', hostAccount: RestaurantAccountResponse): void,
        (e: 'cancel'): void,
    }>();

    const authStore = useAuthStore();
    const popupStore = usePopupStore();

    const internAccount = ref<InternAccountRequest>({ ...initialRestaurantAccount });

    const errors = ref<InternErrors>({
        loginId: '',
        roles: '',
    });

    const resetForm = () => internAccount.value = { ...initialRestaurantAccount };
    const validate = () => {
        errors.value = {
            loginId: internAccount.value.loginId ? '' : 'Ein Login-ID muss angegeben werden.',
            roles: internAccount.value.roles ? '' : 'Eine Rolle muss angegeben werden.',
        }

        return !Object.values(errors.value).some(Boolean);
    }

    const createIntern = async () => {
        if (!validate())
            return;

        try {
            const newIntern = <RestaurantAccountResponse> await authStore.registerRestaurantIntern({ ...internAccount.value, password: 'Password123!'});
            popupStore.setSuccess('Intern wurde erfolgreich angelegt.');
            emit('success', newIntern);
            resetForm();
        } catch (error) {
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
            <form @submit.prevent="createIntern()" class="flex flex-col gap-3">

                <CustomInputField
                    v-model="internAccount.loginId"
                    type="text"
                    label="Login-ID"
                    name="loginId"
                    placeholder="Login-ID eingeben"
                    :error="errors.loginId"/>

                <RoleDropdown
                    v-model="internAccount.roles"
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