<script setup lang="ts">
    import type { RestaurantAccountResponse } from '@/Types/user.types';
    import InfoPart from '@/components/General/InfoPart.vue';
    
    import kitchenIcon from '@/assets/svgs/kitchenIcon.svg';
    import welcomeIcon from '@/assets/svgs/welcomeIcon.svg';
    import barIcon from '@/assets/svgs/barIcon.svg';

    const props = defineProps<{
        account: RestaurantAccountResponse;
        showEdit?: boolean,
        showDelete?: boolean,
    }>();

    const emit = defineEmits(['edit', 'delete']);

    const roleMap: Record<string, { label :string, color :string, icon: string }> = {
        ROLE_KITCHEN: { label: 'Küche', color: 'bg-orange-100 text-orange-700', icon: kitchenIcon },
        ROLE_BAR: { label: 'Bar', color: 'bg-blue-100 text-blue-700', icon: barIcon },
        ROLE_RESTAURANT: { label: 'Restaurant', color: 'bg-green-100 text-green-700', icon: welcomeIcon },
    };

    const roleInfo = roleMap[props.account.roles[0]];

</script>

<template>
    <div class="border border-gray-300 bg-gray-50 rounded-xl p-5 flex justify-between h-30 items-center transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-lg">

        <div class="flex gap-5 w-full items-center h-full">
            <img :src="roleInfo.icon" alt="" class="max-w-18">
            <InfoPart
                label="Login-ID"
                :lines="[account.loginId]"
                :show-seperator="false"/>
        </div>

        <div class="flex gap-10 h-full items-start">
            <h3
                class="py-2 px-5 rounded-full self-center"
                :class="roleInfo.color">
                {{ roleInfo.label }}
            </h3>

            <div class="flex gap-3">
                <button v-if="showEdit" class="cursor-pointer" @click="emit('edit')">
                    <img src="@/assets/svgs/editBlue.svg" alt="Plus Icon" class="max-w-7">
                </button>
                <button v-if="showDelete" class="cursor-pointer" @click="emit('delete', { ...account })">
                    <img src="@/assets/svgs/trashRed.svg" alt="Plus Icon" class="max-w-7">
                </button>
            </div>
            
        </div>

    </div>
</template>