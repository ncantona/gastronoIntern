<script setup lang="ts">
    import { usePopupStore } from '@/stores/General/usePopupStore';
    import { computed, ref } from 'vue';

    import CustomInputField from '@/components/General/CustomInputField.vue';
    import { useAuthStore } from '@/stores/Auth/useAuthStore';
    import Window from '@/components/General/Window.vue';
import CustomButton from '@/components/General/CustomButton.vue';
import RoleDropdown from './RoleDropdown.vue';
import ErrorMsg from '@/components/General/ErrorMsg.vue';

    const props = defineProps<{
        restaurantId: number;
    }>();

    const authStore = useAuthStore();
    const popupStore = usePopupStore();
    type Role = 'ROLE_KITCHEN' | 'ROLE_HOST' | 'ROLE_BAR' | 'ROLE_RESTAURANT' | '';
    
    interface RestaurantAccount {
        id: string,
        loginId: string,
        firstName: string,
        lastName: string,
        email: string,
        roles: string[],
    };

    const accounts = ref<RestaurantAccount[]>([
        {
            id: "1",
            loginId: 'ID-Küche',
            firstName: '',
            lastName: '',
            email: '',
            roles: ['ROLE_KITCHEN'],
        },
        {
            id: "2",
            loginId: 'ID-Bar',
            firstName: '',
            lastName: '',
            email: '',
            roles: ['ROLE_BAR'],
        },
        {
            id: "3",
            loginId: 'ID-Host',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john-doe@gmail.com',
            roles: ['ROLE_HOST'],
        },
        {
            id: "4",
            loginId: 'ID-Restaurant',
            firstName: '',
            lastName: '',
            email: '',
            roles: ['ROLE_RESTAURANT'],
        },
    ]);

    const internAccounts = ref(accounts.value.filter(account => !account.roles.includes('ROLE_HOST')) ?? []);
    
    const showEditIntern = ref<boolean[]>(Array(internAccounts.value.length).fill(false));
    const errorInternLoginId = ref<string>('');

    const internLoginIds = computed<string[]>(
        () => internAccounts.value.map(account => account.loginId),
    );

    const newInternLoginId = ref<string>('');
    const newInternRole = ref<Role>('');
    const errorNewInternLoginId = ref<string>('');
    const errorNewInternRole = ref<string>('');

    const showCreateIntern = ref<boolean>(false);

    const updateIntern = async (id :string, index :number) => {
        const internToUpdate = internAccounts.value.find(account => account.id === id);
        if (!internToUpdate)
            return;
        
        try {
            internToUpdate.loginId = internLoginIds.value[index];
            showEditIntern.value[index] = false;
        } catch {
            
        }
    };

    const createIntern = async () => {
        errorNewInternLoginId.value = '';
        errorNewInternRole.value = '';

        const data = {
           id: '100',
           loginId: newInternLoginId.value,
           firstName: '',
           lastName: '',
           email: '',
           restaurantId: props.restaurantId,
           roles: Array.of(newInternRole.value),
        }

        if (!data.loginId)
            errorNewInternLoginId.value = 'Login-ID darf nicht leer sein.';
        if (!newInternRole.value)
            errorNewInternRole.value = 'Rolle muss ausgewählt werden.';
        if (!errorNewInternLoginId.value && !errorNewInternRole.value)
            try {
                showCreateIntern.value = false;
                popupStore.success = 'Intern erfolgreich angelegt.';
                internAccounts.value.push(data);
                newInternLoginId.value = '';
                newInternRole.value = '';
            } catch {
                popupStore.error = 'Intern anlegen fehlgeschlagen.'
            }
    };

    const deleteIntern = async (id :string) => {
        internAccounts.value = internAccounts.value.filter(account => account.id != id);
        console.log(internAccounts.value);
    }

</script>

<template>
    <Window class="p-12">
        <div class="flex gap-3 mb-5">
            <img src="@/assets/svgs/settingsBlack.svg" alt="Plus Icon" class="w-6">
            <span class="subHeader">Interns verwalten</span>
        </div>
        <div class="grid gap-10 grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]">
            <div v-for="(account, index) in internAccounts" :key="account.id" class="h-fit min-h-24 flex flex-col gap-2 shadow-[0_0_8px_rgba(0,0,0,0.1)] hover:shadow-[0_0_8px_rgba(0,0,0,0.2)]  rounded-lg p-4">
                <div class="flex justify-between">
                    <span class="font-semibold">
                        {{ account.roles[0] === 'ROLE_KITCHEN' ? 'Küche' :
                        account.roles[0] === 'ROLE_BAR' ? 'Bar' :
                        account.roles[0] === 'ROLE_RESTAURANT' ? 'Restaurant' : '' }}
                    </span>
                    <div v-if="!showEditIntern[index]" class="flex gap-3 items-center">
                        <button class="cursor-pointer" @click="showEditIntern[index] = true">
                            <img src="@/assets/svgs/editBlue.svg" alt="Edit Icon" class="w-7">
                        </button>
                        <button class="cursor-pointer" @click="deleteIntern(account.id)">
                            <img src="@/assets/svgs/trashRed.svg" alt="trash Icon" class="w-7">
                        </button>
                    </div>
                    <button v-if="showEditIntern[index]" class="cursor-pointer text-blue-500 hover:text-blue-400" @click="showEditIntern[index] = false; internLoginIds[index] = account.loginId">
                        abbrechen
                    </button>
                </div>
                <div v-if="!showEditIntern[index]" class="flex gap-3">
                    <span>{{ account.loginId }}</span>
                    
                </div>
                <form @submit.prevent="" v-if="showEditIntern[index]" class="flex flex-col gap-2">
                    <CustomInputField
                        v-model="internLoginIds[index]"
                        type="text"
                        name="internLoginId"
                        :error="errorInternLoginId"  
                    />
                    <CustomButton @click="updateIntern(account.id, index)" variant="editBlue" class="w-full">
                        Aktualisieren
                    </CustomButton>
                </form >
            </div>
            <div :class="!showCreateIntern ? 'justify-center' : ''" class="h-fit min-h-24 flex flex-col gap-2 shadow-[0_0_8px_rgba(0,0,0,0.1)] hover:shadow-[0_0_8px_rgba(0,0,0,0.2)] rounded-lg p-4">
                <CustomButton class="flex gap-2 items-center" v-show="!showCreateIntern" variant="submit" @click="showCreateIntern = true">
                    <img src="@/assets/svgs/plusWhite.svg" alt="Plus Icon" class="w-5">
                    Intern anlegen
                </CustomButton>
                <form @submit.prevent="" v-show="showCreateIntern" class="flex flex-col gap-2">
                    <div class="flex justify-end">
                        <button v-show="showCreateIntern" class="cursor-pointer text-blue-500 hover:text-blue-400" @click="showCreateIntern = false; newInternLoginId = ''; newInternRole = ''; errorNewInternLoginId = ''; errorNewInternRole = ''">
                            abbrechen
                        </button>
                    </div>
                    <CustomInputField
                        v-model="newInternLoginId"
                        type="text"
                        name="newInternLoginId"
                        placeholder="Login-ID"
                        :error="errorNewInternLoginId"
                    />
                    <div class="flex flex-col gap-2">
                        <RoleDropdown v-model="newInternRole"/>
                        <ErrorMsg v-show="errorNewInternRole">{{ errorNewInternRole }}</ErrorMsg>
                    </div>
                    <CustomButton variant="submit" class="w-full" @click="createIntern()">anlegen</CustomButton>
                </form>
            </div>
        </div>
    </Window>
</template>