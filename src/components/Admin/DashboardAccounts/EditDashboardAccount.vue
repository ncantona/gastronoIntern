<script setup lang="ts">
    import type { DashboardAccountErrors, RestaurantAccountResponse, UpdateDashboardAccountRequestByAdmin } from '@/Types/user.types';
    import { updateDashboardAccountByAdmin } from '@/Services/restaurantAccounts.service';
    import { usePopupStore } from '@/stores/General/usePopupStore';
    import { computed, ref } from 'vue';

    import RoleDropdown from '@/components/Admin/General/RoleDropdownDashboardAccount.vue';
    import CustomInputField from '@/components/General/CustomInputField.vue';
    import WindowHeader from '@/components/General/WindowHeader.vue';
    import CustomButton from '@/components/General/CustomButton.vue';
    
    import GearSVG from '@/assets/svgs/settingsBlack.svg';
    
    const props = defineProps<{
        dashboardAccount: RestaurantAccountResponse,
        restaurantId: number,
    }>();

    const emit = defineEmits<{
        (e: 'success', hostAccount: RestaurantAccountResponse): void,
        (e: 'cancel'): void,
    }>();

    const popupStore = usePopupStore();

    const dashboardAccount = ref<UpdateDashboardAccountRequestByAdmin>({ loginId: props.dashboardAccount.loginId, roles: props.dashboardAccount.roles[0] });

    const errors = ref<DashboardAccountErrors>({
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

    const handleUpdateDashboardAccount = async () => {
        if (!validate())
            return;
        if (!hasChanges.value) {
            popupStore.setSuccess('Keine Änderungen vorgenommen.');
            emit('success', { ...props.dashboardAccount });
            return;
        }
    
        try {
            const newDashboardAccount = await updateDashboardAccountByAdmin({ ...dashboardAccount.value }, props.dashboardAccount.id);
            popupStore.setSuccess('Dashboard-Account wurde erfolgreich aktualisiert.');
            emit('success', newDashboardAccount );
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
            <form @submit.prevent="handleUpdateDashboardAccount()" class="flex flex-col gap-3">

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