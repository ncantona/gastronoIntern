<script setup lang="ts">
import Window from '@/components/General/Window.vue';
import CustomButton from '@/components/General/CustomButton.vue';
import { ref } from 'vue';

interface Account {
    id: string;
    loginId: string;
    firstName: string;
    lastName: string;
    email: string;
    roles: string[];
}

const props = defineProps<{
    accounts: Account[];
}>();

const emit = defineEmits<{
    (e: 'createAccount'): void;
    (e: 'editAccount', account: Account): void;
    (e: 'deleteAccount', accountId: string): void;
}>();

const getRoleDisplay = (roles: string[]): string => {
    const roleMap: Record<string, string> = {
        'HOST': 'Manager',
        'WAITER': 'Kellner',
        'KITCHEN': 'Küche',
        'BAR': 'Bar',
    };
    return roles.map(role => roleMap[role] || role).join(', ');
};

const getRoleBadgeColor = (roles: string[]): string => {
    if (roles.includes('HOST')) return 'bg-purple-100 text-purple-800';
    if (roles.includes('WAITER')) return 'bg-blue-100 text-blue-800';
    if (roles.includes('KITCHEN')) return 'bg-orange-100 text-orange-800';
    if (roles.includes('BAR')) return 'bg-green-100 text-green-800';
    return 'bg-gray-100 text-gray-800';
};

const confirmDelete = (account: Account) => {
    if (confirm(`Möchtest du den Account von ${account.firstName} ${account.lastName} wirklich löschen?`)) {
        emit('deleteAccount', account.id);
    }
};
</script>

<template>
    <Window class="p-8">
        <div class="flex justify-between items-center mb-6">
            <div class="flex gap-3 items-center">
                <img src="" alt="Accounts Icon" class="w-6">
                <h2 class="text-2xl font-bold text-slate-900">Interne Accounts</h2>
            </div>
            <CustomButton variant="editBlue" @click="emit('createAccount')">
                + Account erstellen
            </CustomButton>
        </div>

        <div v-if="accounts.length === 0" class="text-center py-12 text-slate-500">
            <p class="text-lg">Keine Accounts vorhanden</p>
            <p class="text-sm mt-2">Erstelle deinen ersten Account</p>
        </div>

        <div v-else class="space-y-3">
            <div
                v-for="account in accounts"
                :key="account.id"
                class="border border-slate-200 rounded-lg p-5 hover:shadow-md transition-shadow"
            >
                <div class="flex justify-between items-start">
                    <div class="flex-1">
                        <div class="flex items-center gap-3 mb-2">
                            <h3 class="text-lg font-semibold text-slate-900">
                                {{ account.firstName }} {{ account.lastName }}
                            </h3>
                            <span 
                                class="px-3 py-1 rounded-full text-xs font-medium"
                                :class="getRoleBadgeColor(account.roles)"
                            >
                                {{ getRoleDisplay(account.roles) }}
                            </span>
                        </div>
                        <div class="space-y-1 text-sm text-slate-600">
                            <p><span class="font-medium">Login-ID:</span> {{ account.loginId }}</p>
                            <p><span class="font-medium">E-Mail:</span> {{ account.email }}</p>
                        </div>
                    </div>
                    <div class="flex gap-2">
                        <button
                            @click="emit('editAccount', account)"
                            class="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        >
                            Bearbeiten
                        </button>
                        <button
                            @click="confirmDelete(account)"
                            class="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                            Löschen
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Window>
</template>
