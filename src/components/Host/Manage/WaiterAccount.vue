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

    const emit = defineEmits(['edit']);

    const fullName = props.account.firstName + ' ' + props.account.lastName;

</script>

<template>
    <div class="border border-gray-300 bg-gray-50 rounded-xl p-5 flex justify-between 
        transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-lg">
        <div class="flex gap-5 w-full ">
            <img src="@/assets/svgs/waiterIcon.svg" alt="" class="max-w-18">
            <div class="space-y-6">

                <div>
                    <label class="text-sm text-slate-500 font-medium">Name</label>
                    <p class="text-lg text-slate-900 mt-1">{{ fullName }}</p>
                </div>
                
                <div>
                    <label class="text-sm text-slate-500 font-medium">Login-ID</label>
                    <p class="text-lg text-slate-900 mt-1">{{ account.loginId }}</p>
                </div>

            </div>

        </div>
        <button @click="emit('edit')" class="h-full">
            <img src="@/assets/svgs/editBlue.svg" alt="Icon Bearbeitung" class="max-w-6">
        </button>
    </div>
</template>
