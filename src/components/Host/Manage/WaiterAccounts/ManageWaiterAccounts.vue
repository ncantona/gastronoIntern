<script setup lang="ts">
    import type { WaiterResponse } from '@/Types/waiter.types';
    import { deleteWaiter, getAllWaiters } from '@/Services/waiter.service';
    import { onMounted, ref } from 'vue';
    
    import WaiterAccount from '@/components/Host/Manage/WaiterAccounts/WaiterAccount.vue';
    import CustomButton from '@/components/General/CustomButton.vue';
    import CreateWaiterAccount from './CreateWaiterAccount.vue';
    import EditWaiterAccount from './EditWaiterAccount.vue';
    import Window from '@/components/General/Window.vue';
import DeleteWindow from '@/components/General/DeleteWindow.vue';
import { usePopupStore } from '@/stores/General/usePopupStore';

    const props = defineProps<{
        restaurantId: number
    }>();

    const popupStore = usePopupStore();

    const waiterAccounts = ref<WaiterResponse[]>([]);

    const showCreate = ref<boolean>(false);
    const showEdit = ref<string>('');
    const showDelete = ref<string>('');

    const updateLocalWaiter = (
        updatedWaiter: WaiterResponse,
        index: number
    ): void => {
        waiterAccounts.value[index] = updatedWaiter;
    };

    const handleDeleteWaiter = async (
        waiterId: string,
    ): Promise<void> => {
        try {
            await deleteWaiter(waiterId, props.restaurantId);
            popupStore.setSuccess('Kellner wurde erfolgreich gelöscht.');
            waiterAccounts.value = waiterAccounts.value.filter(waiter => waiter.id !== waiterId);
        } catch (error) {
            popupStore.setError('Löschung des Kellners fehlgeschlagen.')
        }
    };

    onMounted(async (
    ): Promise<void> => {
        waiterAccounts.value = await getAllWaiters(props.restaurantId);
    });
</script>

<template>
    <Window class="p-12">
        <div class="flex flex-col gap-5">

            <h2 class="text-2xl font-bold text-slate-900 mb-6">Kellner-Accounts</h2>
            
            <CustomButton v-show="!showCreate" variant="editBlue" class="w-full mb-6 gap-2" @click="showCreate=true">
                <img src="@/assets/svgs/plusWhite.svg" alt="" class="max-w-5">
                <span>
                    Kellner anlegen
                </span>
            </CustomButton>
            
            <CreateWaiterAccount
                v-if="showCreate"
                :restaurantId="restaurantId"
                @success="waiterAccounts.push($event); showCreate=false"
                @cancel="showCreate=false"/>

            <div v-for="(acc, index) in waiterAccounts" :key="acc.id" class="flex flex-col gap-5">

                <WaiterAccount
                    v-if="showEdit !== acc.id"
                    :waiterAccount="acc"
                    @edit="showEdit = acc.id"
                    @delete="showDelete = acc.id"/>

                <EditWaiterAccount
                    v-if="showEdit === acc.id"
                    :waiterAccount="acc"
                    @cancel="showEdit = ''"
                    @success="updateLocalWaiter($event, index); showEdit = ''"/>

                <DeleteWindow
                    v-if="showDelete === acc.id"
                    @cancel="showDelete = ''"
                    @delete="handleDeleteWaiter(acc.id); showDelete = ''">
                    <div class="flex flex-col gap-4 justify-center items-center">
                        <span>Möchtest du den Kellner:</span>
                        <span class="flex w-full justify-center text-xl font-medium">{{ acc.firstName + ' ' + acc.lastName }}</span>
                        <span>wirklich löschen?</span>
                        <span class="text-gray-400">Dies kann nicht rückgängig gemacht werden.</span>
                    </div>
                </DeleteWindow>
            </div>
        </div>

    </Window>
</template>
