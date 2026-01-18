<script setup lang="ts">
import type { WaiterResponse } from '@/Types/waiter.types';


    const props = defineProps<{
        waiterAccount: WaiterResponse;
    }>();

    const emit = defineEmits(['edit', 'delete']);

    const fullName = props.waiterAccount.firstName + ' ' + props.waiterAccount.lastName;

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
                    <p class="text-lg text-slate-900 mt-1">{{ waiterAccount.loginId }}</p>
                </div>

            </div>

        </div>
        <div class="h-full flex gap-3">
            <button @click="emit('edit')" class="h-full">
                <img src="@/assets/svgs/editBlue.svg" alt="Icon Bearbeitung" class="max-w-7">
            </button>
            <button @click="emit('delete')" class="h-full">
                <img src="@/assets/svgs/trashRed.svg" alt="Icon Bearbeitung" class="max-w-7">
            </button>
        </div>
    </div>
</template>
