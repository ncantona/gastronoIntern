<script setup lang="ts">
    import kitchenIcon from '@/assets/svgs/kitchenIcon.svg';
    import barIcon from '@/assets/svgs/barIcon.svg';
    import welcomeIcon from '@/assets/svgs/welcomeIcon.svg';

    interface Account {
        id: string;
        loginId: string;
        firstName: string;
        lastName: string;
        email: string;
        roles: string[];
    }

    const props = defineProps<{
        account: Account;
    }>();

    const roleMap: Record<string, { label :string, color :string, icon: string }> = {
        ROLE_KITCHEN: { label: 'Küche', color: 'bg-orange-100 text-orange-700', icon: kitchenIcon },
        ROLE_BAR: { label: 'Bar', color: 'bg-blue-100 text-blue-700', icon: barIcon },
        ROLE_RESTAURANT: { label: 'Restaurant', color: 'bg-green-100 text-green-700', icon: welcomeIcon },
    };

    const roleInfo = roleMap[props.account.roles[0]];
</script>

<template>
    <div class="border border-gray-300 bg-gray-50 rounded-xl p-5 flex justify-between items-center
        transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-lg">
        <div class="flex gap-5 w-full items-center">
            <img :src="roleInfo.icon" alt="" class="max-w-18">
            <div>
                <label class="text-sm text-slate-500 font-medium">Login-ID</label>
                <p class="text-lg text-slate-900 mt-1">{{ account.loginId }}</p>
            </div>
        </div>
        <div class="flex gap-3">
            <div class="py-2 px-5 rounded-full h-fit" :class="roleInfo.color">
                {{ roleInfo.label }}
            </div>
            <button @click="itemToEdit = element; showEditItem = true">
                <img src="@/assets/svgs/editBlue.svg" alt="" class="max-w-6">
            </button>
        </div>
    </div>
</template>
