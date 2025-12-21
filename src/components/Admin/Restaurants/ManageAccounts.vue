<script setup lang="ts">
    import { ref } from 'vue';
    
    import RegisterRestaurantAccount from '@/components/Admin/Restaurants/RegisterRestaurantAccount.vue';
    import MainAccountInfo from '@/components/Admin/Restaurants/MainAccountInfo.vue';
    import RoleDropdown from '@/components/Admin/Restaurants/RoleDropdown.vue';
    import CustomInputField from '@/components/General/CustomInputField.vue';
    import CustomButton from '@/components/General/CustomButton.vue';

    type Role = 'ROLE_KITCHEN' | 'ROLE_HOST' | 'ROLE_BAR' | 'ROLE_RESTAURANT';
    
    interface RestaurantAccount {
        id: string,
        loginId: string,
        firstName: string,
        lastName: string,
        email: string,
        roles: string[],
    };

    const emits = defineEmits(['editSuccess']);
    
    const props = defineProps<{
        restaurantName: string,
        restaurantId: number;
    }>();

    const errorLoginId = ref<string>('');
    const currentView = ref<string>('main');

    const loginId = ref<string>('');
    const role = ref<Role | ''>('');

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

    const hostAccount = accounts.value.find(account => account.roles.includes('ROLE_HOST')) as RestaurantAccount;
    const internAccounts = accounts.value.filter(account => !account.roles.includes('ROLE_HOST'));

    const deleteAccount = async () => {

    }

</script>

<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 backdrop-blur-sm" @click="emits('editSuccess')">
        <div class="bg-white/90 shadow-xl rounded-lg p-10 flex flex-col gap-3 min-h-180" @click.stop>
            <span class="mainHeader self-center">
                Restaurant-Accounts verwalten
            </span>
            <span class="self-center text-2xl">
                {{ restaurantName }}
            </span>
            <div class="w-110 self-center flex justify-around mt-3">
                <button
                    @click="currentView = 'main'"
                    :class="currentView === 'main' ? 'text-blue-600' : ''"
                    class="cursor-pointer">
                    Hauptaccount
                </button>
                <button
                    @click="currentView = 'intern'"
                    :class="currentView === 'intern' ? 'text-blue-600' : ''"
                    class="cursor-pointer">
                    Interns
                </button>
            </div>
            <div v-show="currentView === 'intern'" class="flex gap-30 mt-3 min-h-130">
                <div class="flex flex-col gap-5">
                    <div class="text-xl font-semibold pr-3 pl-3 grid 2xl:grid-cols-[minmax(0,15rem)_minmax(0,15rem)_minmax(0,1fr)]">
                        <span>ID</span>
                        <span>Rolle</span>
                    </div>
                    <div v-for="account in internAccounts" class="grid 2xl:grid-cols-[minmax(0,15rem)_minmax(0,15rem)_minmax(0,1fr)] items-center shadow-xl p-3 rounded-2xl">
                        <span>{{ account.loginId }}</span>
                        <span v-for="role in account.roles">{{ role }}</span>
                        <div class="flex justify-end">
                            <CustomButton
                                variant="delete"
                                class="max-w-14 max-h-12">
                                <img src="@/assets/svgs/deleteWhite.svg" alt="Delte Icon" class="w-6">
                            </CustomButton>
                        </div>
                    </div>
                </div>
                <div class="h-full flex flex-col">
                    <form @submit.prevent="" class="flex flex-col gap-4">
                        <span class="font-semibold self-center mb-3">Account hinzufügen</span>
                        <CustomInputField
                            v-model="loginId"
                            type="text"
                            name="loginId"
                            :placeholder="props.restaurantName + 'Küche'"
                            :error="errorLoginId"
                        />
                        <RoleDropdown v-model="role"></RoleDropdown>
                        <CustomButton
                            variant="submit"
                            @click="deleteAccount()"
                            class="gap-3">
                            <img src="@/assets/svgs/plusWhite.svg" alt="Plus Icon" class="w-6">Account hinzufügen
                        </CustomButton>
                    </form>
                </div>
            </div>
            <RegisterRestaurantAccount v-if="currentView === 'main' && !hostAccount" :restaurantId="restaurantId"/>
            <MainAccountInfo class="flex justify-center min-h-130" v-if="currentView === 'main' && hostAccount" v-model="hostAccount"/>
        </div>
    </div>
</template>