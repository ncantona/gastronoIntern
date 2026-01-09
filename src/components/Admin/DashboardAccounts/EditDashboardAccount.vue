<script setup lang="ts">
    import { usePopupStore } from '@/stores/General/usePopupStore';
    import { useAuthStore } from '@/stores/Auth/useAuthStore';
    import { computed, ref } from 'vue';

    import RoleDropdown from '@/components/Admin/General/RoleDropdownDashboardAccount.vue';
    import CustomInputField from '@/components/General/CustomInputField.vue';
    import WindowHeader from '@/components/General/WindowHeader.vue';
    import CustomButton from '@/components/General/CustomButton.vue';
    
    import GearSVG from '@/assets/svgs/settingsBlack.svg';
    
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
        roles: string[],
        restaurantId: number,
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
        dashboardAccount: RestaurantAccountResponse,
        restaurantId: number,
    }>();

    const emit = defineEmits<{
        (e: 'success', hostAccount: RestaurantAccountResponse): void,
        (e: 'cancel'): void,
    }>();

    const authStore = useAuthStore();
    const popupStore = usePopupStore();

    const dashboardAccount = ref<RestaurantAccountResponse>({ ...props.dashboardAccount });

    const errors = ref<InternErrors>({
        loginId: '',
        roles: '',
    });
    const hasChanges = computed(() => JSON.stringify(dashboardAccount.value) !== JSON.stringify(props.dashboardAccount));
    const validate = () => {
        errors.value = {
            loginId: dashboardAccount.value.loginId ? '' : 'Ein Login-ID muss angegeben werden.',
            roles: dashboardAccount.value.roles[0] ? '' : 'Eine Rolle muss angegeben werden.',
        }

        return !Object.values(errors.value).some(Boolean);
    }

    const updateDashboardAccount = async () => {
        if (!validate())
            return;
        if (!hasChanges.value) {
            popupStore.setSuccess('Keine Änderungen vorgenommen.');
            emit('success', { ...props.dashboardAccount });
            return;
        }
    
        try {
           /*  const newIntern = <RestaurantAccountResponse> await authStore.registerRestaurantHost({ ...hostAccount.value, password: 'Password123!'}); */
            popupStore.setSuccess('Dashboard-Account wurde erfolgreich aktualisiert.');
            emit('success', props.dashboardAccount ); //UMÄNDERN WENN API DA IST
        } catch (error) {
            popupStore.setError('Aktualisieren von Dashboard-Account fehlgeschlagen.');
        }
    };

</script>

<template>
    <div class="border-2 border-ownblue-500 rounded-xl p-5">

        <WindowHeader
            :img-src="GearSVG"
            img-alt="Ein Pluszeichen in einem Kreis"
            :show-cancel="true"
            @cancel="emit('cancel')">
            Dashboard-Account bearbeiten
        </WindowHeader>

        <div class="flex flex-col w-full">
            <form @submit.prevent="updateDashboardAccount()" class="flex flex-col gap-3">

                <CustomInputField
                    v-model="dashboardAccount.loginId"
                    type="text"
                    label="Login-ID"
                    name="loginId"
                    placeholder="Login-ID eingeben"
                    :error="errors.loginId"/>

                <RoleDropdown
                    v-model="dashboardAccount.roles[0]"
                    :errorMsg="errors.roles"/>

                <div class="flex gap-5 w-full">
                    <CustomButton
                        variant="editBlue"
                        class="mt-4 w-full">
                        Speichern
                    </CustomButton>
                    
                </div>
            </form>

        </div>
    </div>
</template>