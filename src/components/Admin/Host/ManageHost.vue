<script setup lang="ts">
    import { deleteHost, getHost } from '@/Services/restaurantAccounts.service';
    import type { RestaurantAccountResponse } from '@/Types/user.types';
    import { usePopupStore } from '@/stores/General/usePopupStore';
    import { onMounted, ref } from 'vue';

    import DeleteWindow from '@/components/General/DeleteWindow.vue';
    import CreateHost from '@/components/Admin/Host/CreateHost.vue';
    import EditHost from '@/components/Admin/Host/EditHost.vue';
    import HostInfo from '@/components/ConnectedComponents/HostInfo.vue';

    const props = defineProps<{
        restaurantId: number;
    }>();

    const popupStore = usePopupStore();

    const hostAccount = ref<RestaurantAccountResponse | null>();

    const showEditHost = ref<boolean>(false);
    const showDeleteWindow = ref<boolean>(false);

    const handleDeleteHost = async () => {
        if (!hostAccount.value)
            return;

        try {
            await deleteHost(hostAccount.value.id);
            popupStore.setSuccess('Host wurde erfolgreich gelöscht.');
            hostAccount.value = null;
        } catch {
            popupStore.setError('Löschung des Host fehlgeschlagen.');
        }
    }

    onMounted(async () => {
        hostAccount.value = await getHost(props.restaurantId);
    });

</script>

<template>

    <HostInfo
        v-if="hostAccount && !showEditHost"
        :host="hostAccount"
        :showEdit="true"
        :showDelete="true"
        @edit="showEditHost = true"
        @delete="showDeleteWindow = true"/>

    <EditHost
        v-if="hostAccount && showEditHost"
        :hostAccount="hostAccount"
        @success="showEditHost = false; hostAccount = $event"
        @cancel="showEditHost = false"/>

    <CreateHost
        v-if="!hostAccount"
        :restaurantId="restaurantId"
        @success="hostAccount = $event"/>

    <DeleteWindow
        v-if="showDeleteWindow"
        @cancel="showDeleteWindow = false"
        @delete="handleDeleteHost(); showDeleteWindow = false">
        <div class="flex flex-col gap-4 justify-center items-center">
            <span>Möchtest du den Host-Account mit der Login-ID:</span>
            <span class="flex w-full justify-center text-xl font-medium">{{ hostAccount?.loginId }}</span>
            <span>wirklich löschen?</span>
            <span class="text-gray-400">Dies kann nicht rückgängig gemacht werden.</span>
        </div>
    </DeleteWindow>
</template>